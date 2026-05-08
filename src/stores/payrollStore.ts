import { create } from "zustand";
import type { Worker, PayrollGroup, Payment } from "@/types";
import { mockWorkers, mockPayrollGroups, mockPayments } from "@/lib/utils/mock-data";

interface PayrollStore {
  workers: Worker[];
  groups: PayrollGroup[];
  payments: Payment[];
  loading: boolean;

  addWorker: (worker: Omit<Worker, "id" | "createdAt" | "status">) => void;
  removeWorker: (id: string) => void;
  updateWorkerStatus: (id: string, status: Worker["status"]) => void;

  addGroup: (group: Omit<PayrollGroup, "id" | "createdAt" | "memberCount">) => void;
  updateGroupStatus: (id: string, status: PayrollGroup["status"]) => void;

  addPayment: (payment: Omit<Payment, "id" | "createdAt">) => void;
  updatePaymentStatus: (id: string, status: Payment["status"], txHash?: string) => void;
}

export const usePayrollStore = create<PayrollStore>((set) => ({
  workers: mockWorkers,
  groups: mockPayrollGroups,
  payments: mockPayments,
  loading: false,

  addWorker: (workerData) => {
    const worker: Worker = {
      ...workerData,
      id: `w${Date.now()}`,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ workers: [...state.workers, worker] }));
  },

  removeWorker: (id) => {
    set((state) => ({ workers: state.workers.filter((w) => w.id !== id) }));
  },

  updateWorkerStatus: (id, status) => {
    set((state) => ({
      workers: state.workers.map((w) => (w.id === id ? { ...w, status } : w)),
    }));
  },

  addGroup: (groupData) => {
    const group: PayrollGroup = {
      ...groupData,
      id: `pg${Date.now()}`,
      memberCount: 0,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ groups: [...state.groups, group] }));
  },

  updateGroupStatus: (id, status) => {
    set((state) => ({
      groups: state.groups.map((g) => (g.id === id ? { ...g, status } : g)),
    }));
  },

  addPayment: (paymentData) => {
    const payment: Payment = {
      ...paymentData,
      id: `p${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ payments: [payment, ...state.payments] }));
  },

  updatePaymentStatus: (id, status, txHash) => {
    set((state) => ({
      payments: state.payments.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              txHash: txHash ?? p.txHash,
              completedAt: status === "COMPLETED" ? new Date().toISOString() : p.completedAt,
            }
          : p
      ),
    }));
  },
}));
