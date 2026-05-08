"use client";

import { useState } from "react";
import { Plus, UserPlus, Search, MoreHorizontal } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import AddWorkerModal from "@/components/workers/AddWorkerModal";
import { mockWorkers } from "@/lib/utils/mock-data";
import { shortenAddress, formatDate } from "@/lib/utils";
import type { WorkerStatus } from "@/types";

const statusVariant: Record<WorkerStatus, "success" | "neutral" | "error"> = {
  ACTIVE: "success",
  INACTIVE: "neutral",
  SUSPENDED: "error",
};

export default function WorkersPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = mockWorkers.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.walletAddress.toLowerCase().includes(search.toLowerCase()) ||
      w.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <DashboardHeader
        title="Workers"
        description="Manage your workforce and wallet addresses"
        actions={
          <Button size="sm" onClick={() => setShowAdd(true)}>
            <UserPlus className="h-4 w-4" />
            Add Worker
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Total Workers</p>
            <p className="mt-1 text-2xl font-bold text-white">{mockWorkers.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Active</p>
            <p className="mt-1 text-2xl font-bold text-emerald-400">
              {mockWorkers.filter((w) => w.status === "ACTIVE").length}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Inactive</p>
            <p className="mt-1 text-2xl font-bold text-gray-400">
              {mockWorkers.filter((w) => w.status !== "ACTIVE").length}
            </p>
          </div>
        </div>

        {/* Search + table */}
        <div className="rounded-2xl border border-white/10 bg-white/5">
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, wallet, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Plus className="mb-3 h-10 w-10 text-gray-600" />
              <p className="text-sm text-gray-400">No workers found</p>
              <Button className="mt-4" size="sm" onClick={() => setShowAdd(true)}>
                <UserPlus className="h-4 w-4" />
                Add Worker
              </Button>
            </div>
          ) : (
            <>
              {/* Table header */}
              <div className="grid grid-cols-12 gap-4 border-b border-white/5 px-6 py-3 text-xs font-medium uppercase tracking-wide text-gray-600">
                <div className="col-span-4">Worker</div>
                <div className="col-span-4">Wallet Address</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1" />
              </div>

              <div className="divide-y divide-white/5">
                {filtered.map((worker) => (
                  <div key={worker.id} className="grid grid-cols-12 items-center gap-4 px-6 py-4">
                    <div className="col-span-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-semibold text-emerald-400">
                          {worker.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{worker.name}</p>
                          {worker.email && (
                            <p className="text-xs text-gray-500">{worker.email}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-4">
                      <code className="text-xs text-gray-400">
                        {shortenAddress(worker.walletAddress, 8)}
                      </code>
                    </div>

                    <div className="col-span-2">
                      <span className="text-sm text-gray-400">{worker.role ?? "—"}</span>
                    </div>

                    <div className="col-span-1">
                      <Badge variant={statusVariant[worker.status]}>
                        {worker.status.charAt(0) + worker.status.slice(1).toLowerCase()}
                      </Badge>
                    </div>

                    <div className="col-span-1 flex justify-end">
                      <Button variant="ghost" size="sm" aria-label="More options">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <AddWorkerModal open={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  );
}
