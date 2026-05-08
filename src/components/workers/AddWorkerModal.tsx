"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface AddWorkerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddWorkerModal({ open, onClose }: AddWorkerModalProps) {
  const [form, setForm] = useState({
    name: "",
    walletAddress: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Worker">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-gray-400">Full name</label>
          <input
            type="text"
            required
            placeholder="e.g. Amara Diallo"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-gray-400">Stellar wallet address</label>
          <input
            type="text"
            required
            placeholder="G..."
            value={form.walletAddress}
            onChange={(e) => setForm({ ...form, walletAddress: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-gray-600">
            The worker&apos;s Stellar public key (starts with G)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm text-gray-400">Email (optional)</label>
            <input
              type="email"
              placeholder="worker@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-gray-400">Role (optional)</label>
            <input
              type="text"
              placeholder="e.g. Delivery Driver"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Add Worker
          </Button>
        </div>
      </form>
    </Modal>
  );
}
