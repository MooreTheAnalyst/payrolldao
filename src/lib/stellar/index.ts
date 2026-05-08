/**
 * Stellar SDK utilities for PayrollDAO
 *
 * This module provides helpers for:
 * - Wallet connection via Freighter browser extension
 * - Sending XLM and USDC payments on Stellar
 * - Transaction verification
 * - Mock streaming payroll simulation
 *
 * For production use, replace mock streaming with a proper
 * scheduled job or Stellar payment channel implementation.
 */

import {
  Horizon,
  Keypair,
  Networks,
  TransactionBuilder,
  BASE_FEE,
  Operation,
  Asset,
  Memo,
} from "@stellar/stellar-sdk";

// USDC issuer on Stellar testnet (Circle's testnet issuer)
const USDC_ISSUER_TESTNET = "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5";
// USDC issuer on Stellar mainnet
const USDC_ISSUER_MAINNET = "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN";

export type StellarNetwork = "testnet" | "mainnet";

export interface PaymentParams {
  senderKeypair?: Keypair; // Only for server-side signing; use Freighter for client
  senderAddress: string;
  recipientAddress: string;
  amount: string;
  currency: "XLM" | "USDC";
  memo?: string;
  network: StellarNetwork;
}

export interface StreamPaymentParams {
  senderAddress: string;
  recipients: { address: string; amount: string }[];
  currency: "XLM" | "USDC";
  network: StellarNetwork;
  intervalMs?: number; // For mock streaming simulation
}

/**
 * Returns the Horizon server for the given network.
 */
export function getHorizonServer(network: StellarNetwork): Horizon.Server {
  const url =
    network === "testnet"
      ? "https://horizon-testnet.stellar.org"
      : "https://horizon.stellar.org";
  return new Horizon.Server(url);
}

/**
 * Returns the Stellar network passphrase.
 */
export function getNetworkPassphrase(network: StellarNetwork): string {
  return network === "testnet" ? Networks.TESTNET : Networks.PUBLIC;
}

/**
 * Returns the USDC asset for the given network.
 */
export function getUSDCAsset(network: StellarNetwork): Asset {
  const issuer = network === "testnet" ? USDC_ISSUER_TESTNET : USDC_ISSUER_MAINNET;
  return new Asset("USDC", issuer);
}

/**
 * Fetches the XLM and USDC balance for a given Stellar address.
 */
export async function getWalletBalance(
  address: string,
  network: StellarNetwork
): Promise<{ xlm: string; usdc: string }> {
  const server = getHorizonServer(network);
  const account = await server.loadAccount(address);

  let xlm = "0";
  let usdc = "0";

  for (const balance of account.balances) {
    if (balance.asset_type === "native") {
      xlm = parseFloat(balance.balance).toFixed(2);
    } else if (
      balance.asset_type === "credit_alphanum4" &&
      balance.asset_code === "USDC"
    ) {
      usdc = parseFloat(balance.balance).toFixed(2);
    }
  }

  return { xlm, usdc };
}

/**
 * Builds an unsigned Stellar payment transaction (XLM or USDC).
 * The transaction must be signed by the sender before submission.
 */
export async function buildPaymentTransaction(params: PaymentParams) {
  const { senderAddress, recipientAddress, amount, currency, memo, network } = params;

  const server = getHorizonServer(network);
  const account = await server.loadAccount(senderAddress);

  const asset = currency === "XLM" ? Asset.native() : getUSDCAsset(network);

  const builder = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: getNetworkPassphrase(network),
  })
    .addOperation(
      Operation.payment({
        destination: recipientAddress,
        asset,
        amount,
      })
    )
    .setTimeout(30);

  if (memo) {
    builder.addMemo(Memo.text(memo.slice(0, 28))); // Stellar memo max 28 bytes
  }

  return builder.build();
}

/**
 * Submits a signed transaction to the Stellar network.
 * Returns the transaction hash on success.
 */
export async function submitTransaction(
  signedXdr: string,
  network: StellarNetwork
): Promise<string> {
  const server = getHorizonServer(network);
  const { TransactionBuilder } = await import("@stellar/stellar-sdk");
  const tx = TransactionBuilder.fromXDR(signedXdr, getNetworkPassphrase(network));
  const result = await server.submitTransaction(tx);
  return result.hash;
}

/**
 * Verifies a transaction exists on-chain and returns its status.
 */
export async function verifyTransaction(
  txHash: string,
  network: StellarNetwork
): Promise<{ success: boolean; memo?: string; createdAt?: string }> {
  const server = getHorizonServer(network);
  try {
    const tx = await server.transactions().transaction(txHash).call();
    return {
      success: tx.successful,
      memo: tx.memo,
      createdAt: tx.created_at,
    };
  } catch {
    return { success: false };
  }
}

/**
 * Mock streaming payroll simulation for demo purposes.
 *
 * In a real implementation, this would use Stellar payment channels
 * or a scheduled job to send micro-payments at regular intervals.
 *
 * This mock fires onPayment callbacks at the given interval to
 * simulate the streaming experience in the UI.
 */
export function mockStreamPayroll(
  params: StreamPaymentParams,
  onPayment: (recipient: string, amount: string, txHash: string) => void,
  onComplete: () => void
): () => void {
  const { recipients, intervalMs = 2000 } = params;
  let index = 0;

  const interval = setInterval(() => {
    if (index >= recipients.length) {
      clearInterval(interval);
      onComplete();
      return;
    }

    const { address, amount } = recipients[index];
    // Generate a mock tx hash for demo
    const mockTxHash = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");

    onPayment(address, amount, mockTxHash);
    index++;
  }, intervalMs);

  // Return cleanup function
  return () => clearInterval(interval);
}

/**
 * Checks if the Freighter wallet extension is installed.
 * Freighter injects window.freighter in the browser.
 */
export function isFreighterInstalled(): boolean {
  if (typeof window === "undefined") return false;
  return !!(window as unknown as { freighter?: unknown }).freighter;
}

/**
 * Requests the connected wallet address from Freighter.
 * Returns null if Freighter is not installed or user rejects.
 */
export async function getFreighterAddress(): Promise<string | null> {
  if (!isFreighterInstalled()) return null;
  try {
    const freighter = (window as unknown as { freighter: { getPublicKey: () => Promise<string> } }).freighter;
    return await freighter.getPublicKey();
  } catch {
    return null;
  }
}

/**
 * Signs a transaction XDR using Freighter.
 * Returns the signed XDR string.
 */
export async function signWithFreighter(
  transactionXdr: string,
  network: StellarNetwork
): Promise<string | null> {
  if (!isFreighterInstalled()) return null;
  try {
    const freighter = (window as unknown as {
      freighter: { signTransaction: (xdr: string, opts: { network: string }) => Promise<string> };
    }).freighter;
    return await freighter.signTransaction(transactionXdr, {
      network: network === "testnet" ? "TESTNET" : "PUBLIC",
    });
  } catch {
    return null;
  }
}
