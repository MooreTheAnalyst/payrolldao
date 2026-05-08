"use client";

import { useState } from "react";
import { Plus, Users, Play, Pause, MoreHorizontal } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import CreateGroupModal from "@/components/payroll/CreateGroupModal";
import { mockPayrollGroups } from "@/lib/utils/mock-data";
import { formatAmount } from "@/lib/utils";
import type { GroupStatus } from "@/types";

const statusVariant: Record<GroupStatus, "success" | "warning" | "neutral"> = {
  ACTIVE: "success",
  PAUSED: "warning",
  ARCHIVED: "neutral",
};

export default function PayrollPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div>
      <DashboardHeader
        title="Payroll"
        description="Manage payroll groups and scheduled payments"
        actions={
          <Button size="sm" onClick={() => setShowCreate(true)}>
            <Plus className="h-4 w-4" />
            New Group
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Active Groups</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {mockPayrollGroups.filter((g) => g.status === "ACTIVE").length}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Total Workers Enrolled</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {mockPayrollGroups.reduce((sum, g) => sum + (g.memberCount ?? 0), 0)}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Monthly Obligation</p>
            <p className="mt-1 text-2xl font-bold text-emerald-400">
              $
              {mockPayrollGroups
                .filter((g) => g.status === "ACTIVE")
                .reduce((sum, g) => sum + g.amount * (g.memberCount ?? 0), 0)
                .toLocaleString()}{" "}
              USDC
            </p>
          </div>
        </div>

        {/* Groups list */}
        <div className="rounded-2xl border border-white/10 bg-white/5">
          <div className="border-b border-white/10 px-6 py-4">
            <h3 className="text-sm font-medium text-white">Payroll Groups</h3>
          </div>

          {mockPayrollGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users className="mb-3 h-10 w-10 text-gray-600" />
              <p className="text-sm text-gray-400">No payroll groups yet</p>
              <p className="mt-1 text-xs text-gray-600">Create a group to start paying workers</p>
              <Button className="mt-4" size="sm" onClick={() => setShowCreate(true)}>
                <Plus className="h-4 w-4" />
                Create Group
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {mockPayrollGroups.map((group) => (
                <div key={group.id} className="flex items-center justify-between px-6 py-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                      <Users className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white">{group.name}</p>
                        <Badge variant={statusVariant[group.status]}>
                          {group.status.charAt(0) + group.status.slice(1).toLowerCase()}
                        </Badge>
                      </div>
                      {group.description && (
                        <p className="mt-0.5 text-xs text-gray-500">{group.description}</p>
                      )}
                      <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                        <span>{group.memberCount} workers</span>
                        <span>·</span>
                        <span>{group.frequency.charAt(0) + group.frequency.slice(1).toLowerCase()}</span>
                        <span>·</span>
                        <span>{formatAmount(group.amount, group.currency)} / worker</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right mr-4">
                      <p className="text-sm font-semibold text-white">
                        {formatAmount(group.amount * (group.memberCount ?? 0), group.currency)}
                      </p>
                      <p className="text-xs text-gray-500">per cycle</p>
                    </div>
                    <Button variant="ghost" size="sm" aria-label="Toggle group">
                      {group.status === "ACTIVE" ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" aria-label="More options">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateGroupModal open={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
}
