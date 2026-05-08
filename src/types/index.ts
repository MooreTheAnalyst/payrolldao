// Core domain types for PayrollDAO

export type Currency = "XLM" | "USDC";
export type PaymentStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "CANCELLED";
export type PaymentType = "ONE_TIME" | "RECURRING" | "STREAMED";
export type WorkerStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type GroupStatus = "ACTIVE" | "PAUSED" | "ARCHIVED";
export type PayFrequency = "WEEKLY" | "BIWEEKLY" | "MONTHLY";

export interface Worker {
  id: string;
  name: string;
  walletAddress: string;
  email?: string;
  role?: string;
  status: WorkerStatus;
  createdAt: string;
}

export interface PayrollGroup {
  id: string;
  name: string;
  description?: string;
  currency: Currency;
  frequency: PayFrequency;
  amount: number;
  status: GroupStatus;
  memberCount?: number;
  createdAt: string;
}

export interface Payment {
  id: string;
  amount: number;
  currency: Currency;
  type: PaymentType;
  status: PaymentStatus;
  txHash?: string;
  memo?: string;
  workerName?: string;
  workerWallet?: string;
  groupName?: string;
  scheduledAt?: string;
  completedAt?: string;
  createdAt: string;
}

export interface AnalyticsData {
  totalPaid: number;
  totalWorkers: number;
  activeGroups: number;
  pendingPayments: number;
  recentPayments: Payment[];
  monthlyVolume: { month: string; amount: number }[];
}

export interface WalletState {
  address: string | null;
  network: "testnet" | "mainnet";
  connected: boolean;
  balance?: { xlm: string; usdc: string };
}
