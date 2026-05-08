import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WalletState } from "@/types";
import { getFreighterAddress, getWalletBalance, isFreighterInstalled } from "@/lib/stellar";

interface WalletStore extends WalletState {
  connecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  setNetwork: (network: "testnet" | "mainnet") => void;
  refreshBalance: () => Promise<void>;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      address: null,
      network: "testnet",
      connected: false,
      balance: undefined,
      connecting: false,
      error: null,

      connect: async () => {
        set({ connecting: true, error: null });

        if (!isFreighterInstalled()) {
          set({
            connecting: false,
            error: "Freighter wallet extension not found. Please install it from freighter.app",
          });
          return;
        }

        const address = await getFreighterAddress();
        if (!address) {
          set({ connecting: false, error: "Failed to get wallet address" });
          return;
        }

        const balance = await getWalletBalance(address, get().network).catch(() => ({
          xlm: "0",
          usdc: "0",
        }));

        set({ address, connected: true, balance, connecting: false });
      },

      disconnect: () => {
        set({ address: null, connected: false, balance: undefined, error: null });
      },

      setNetwork: (network) => {
        set({ network });
        // Refresh balance on network change if connected
        const { address } = get();
        if (address) {
          getWalletBalance(address, network)
            .then((balance) => set({ balance }))
            .catch(() => {});
        }
      },

      refreshBalance: async () => {
        const { address, network } = get();
        if (!address) return;
        const balance = await getWalletBalance(address, network).catch(() => ({
          xlm: "0",
          usdc: "0",
        }));
        set({ balance });
      },
    }),
    {
      name: "payrolldao-wallet",
      // Only persist non-sensitive state
      partialize: (state) => ({
        network: state.network,
        address: state.address,
        connected: state.connected,
      }),
    }
  )
);
