"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { mockWorkers, mockPayrollGroups } from "@/lib/utils/mock-data";

type PaymentMode = "one-time" | "group";

interface SendPaymentModalProps {
  open: boolean;
  onClose: () => void;
  defaultMode?: PaymentMode;
}

export default function SendPaymentModal({ open, onClose, defaultMode = "one-time" }: SendPaymentModalProps) {
  const [mode, setMode] = useState<PaymentMode>(defaultMode);
  const [form, setForm] = useState({
    workerId: "",
    groupId: "",
    amount: "",
    currency: "USDC",
    memo: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate Stellar transaction
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Send Payment">
      {/* Mode toggle */}
      <div className="mb-4 flex rounded-lg border border-white/10 bg-white/5 p-1">
        <button
          type="button"
          onClick={() => setMode("one-time")}
          className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${
            mode === "one-time" ? "bg-emerald-500 text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          One-time
        </button>
        <button
          type="button"
          onClick={() => setMode("group")}
          className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${
            mode === "group" ? "bg-emerald-500 text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          Group payroll
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "one-time" ? (
          <div>
            <label className="mb-1.5 block text-sm text-gray-400">Worker</label>
            <select
              required
              value={form.workerId}
              onChange={(e) => setForm({ ...form, workerId: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-gray-900 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="">Select a worker</option>
              {mockWorkers.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label className="mb-1.5 block text-sm text-gray-400">Payroll group</label>
            <select
              required
              value={form.groupId}
              onChange={(e) => setForm({ ...form, groupId: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-gray-900 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="">Select a group</option>
              {mockPayrollGroups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} ({g.memberCount} workers)
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm text-gray-400">Amount</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-gray-400">Currency</label>
            <select
              value={form.currency}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-gray-900 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="USDC">USDC</option>
              <option value="XLM">XLM</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-gray-400">Memo (optional)</label>
          <input
            type="text"
            placeholder="e.g. January salary"
            value={form.memo}
            onChange={(e) => setForm({ ...form, memo: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3">
          <p className="text-xs text-yellow-400">
            This will initiate a real Stellar transaction. Make sure your wallet is connected and has sufficient balance.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {loading ? "Sending..." : "Send Payment"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
