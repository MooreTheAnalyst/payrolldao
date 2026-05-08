import { DollarSign, Users, Layers, Clock } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatCard from "@/components/ui/StatCard";
import PaymentStatusBadge from "@/components/ui/PaymentStatusBadge";
import { mockAnalytics, mockPayments } from "@/lib/utils/mock-data";
import { formatAmount, formatRelativeTime, shortenAddress } from "@/lib/utils";

export default function DashboardPage() {
  const { totalPaid, totalWorkers, activeGroups, pendingPayments } = mockAnalytics;

  return (
    <div>
      <DashboardHeader
        title="Dashboard"
        description="Overview of your payroll activity"
      />

      <div className="p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Paid (All Time)"
            value={`$${totalPaid.toLocaleString()}`}
            change="+18% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <StatCard
            title="Active Workers"
            value={totalWorkers}
            change="+3 this month"
            changeType="positive"
            icon={Users}
            iconColor="text-cyan-400"
          />
          <StatCard
            title="Payroll Groups"
            value={activeGroups}
            icon={Layers}
            iconColor="text-purple-400"
          />
          <StatCard
            title="Pending Payments"
            value={pendingPayments}
            change="Requires attention"
            changeType="negative"
            icon={Clock}
            iconColor="text-yellow-400"
          />
        </div>

        {/* Monthly volume chart (simplified bar) */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-sm font-medium text-gray-400">Monthly Payment Volume (USDC)</h3>
          <div className="flex items-end gap-2 h-32">
            {mockAnalytics.monthlyVolume.map((d) => {
              const max = Math.max(...mockAnalytics.monthlyVolume.map((v) => v.amount));
              const height = Math.round((d.amount / max) * 100);
              return (
                <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xs text-gray-500">${(d.amount / 1000).toFixed(1)}k</span>
                  <div
                    className="w-full rounded-t-md bg-emerald-500/60 hover:bg-emerald-500 transition-colors"
                    style={{ height: `${height}%` }}
                    title={`${d.month}: $${d.amount}`}
                  />
                  <span className="text-xs text-gray-500">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent payments */}
        <div className="rounded-2xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <h3 className="text-sm font-medium text-white">Recent Payments</h3>
            <a href="/payments" className="text-xs text-emerald-400 hover:underline">View all</a>
          </div>
          <div className="divide-y divide-white/5">
            {mockPayments.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-white">
                    {payment.workerName ?? payment.groupName ?? "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {payment.workerWallet
                      ? shortenAddress(payment.workerWallet)
                      : payment.type === "RECURRING"
                      ? "Payroll group"
                      : "—"}
                    {" · "}
                    {formatRelativeTime(payment.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white">
                    {formatAmount(payment.amount, payment.currency)}
                  </span>
                  <PaymentStatusBadge status={payment.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
