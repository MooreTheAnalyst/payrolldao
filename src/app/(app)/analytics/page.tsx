import { DollarSign, Users, TrendingUp, CheckCircle } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatCard from "@/components/ui/StatCard";
import PaymentStatusBadge from "@/components/ui/PaymentStatusBadge";
import { mockAnalytics, mockPayments, mockWorkers, mockPayrollGroups } from "@/lib/utils/mock-data";
import { formatAmount } from "@/lib/utils";

export default function AnalyticsPage() {
  const completedPayments = mockPayments.filter((p) => p.status === "COMPLETED");
  const successRate = Math.round((completedPayments.length / mockPayments.length) * 100);

  // Currency breakdown
  const usdcTotal = mockPayments
    .filter((p) => p.status === "COMPLETED" && p.currency === "USDC")
    .reduce((sum, p) => sum + p.amount, 0);
  const xlmTotal = mockPayments
    .filter((p) => p.status === "COMPLETED" && p.currency === "XLM")
    .reduce((sum, p) => sum + p.amount, 0);

  // Payment type breakdown
  const typeBreakdown = {
    ONE_TIME: mockPayments.filter((p) => p.type === "ONE_TIME").length,
    RECURRING: mockPayments.filter((p) => p.type === "RECURRING").length,
    STREAMED: mockPayments.filter((p) => p.type === "STREAMED").length,
  };

  return (
    <div>
      <DashboardHeader
        title="Analytics"
        description="Payment trends and workforce insights"
      />

      <div className="p-6 space-y-6">
        {/* Top stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Volume"
            value={`$${mockAnalytics.totalPaid.toLocaleString()}`}
            change="All time"
            changeType="neutral"
            icon={DollarSign}
          />
          <StatCard
            title="Workers Paid"
            value={mockAnalytics.totalWorkers}
            change="Across all groups"
            changeType="neutral"
            icon={Users}
            iconColor="text-cyan-400"
          />
          <StatCard
            title="Success Rate"
            value={`${successRate}%`}
            change="Completed transactions"
            changeType="positive"
            icon={CheckCircle}
            iconColor="text-emerald-400"
          />
          <StatCard
            title="Avg. Payment"
            value={`$${Math.round(usdcTotal / (completedPayments.length || 1)).toLocaleString()}`}
            change="Per transaction"
            changeType="neutral"
            icon={TrendingUp}
            iconColor="text-purple-400"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Monthly volume chart */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-6 text-sm font-medium text-white">Monthly Volume (USDC)</h3>
            <div className="flex items-end gap-2 h-40">
              {mockAnalytics.monthlyVolume.map((d) => {
                const max = Math.max(...mockAnalytics.monthlyVolume.map((v) => v.amount));
                const height = Math.round((d.amount / max) * 100);
                return (
                  <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-xs text-gray-500">${(d.amount / 1000).toFixed(1)}k</span>
                    <div
                      className="w-full rounded-t-md bg-emerald-500/60 hover:bg-emerald-500 transition-colors cursor-default"
                      style={{ height: `${height}%` }}
                      title={`${d.month}: $${d.amount}`}
                    />
                    <span className="text-xs text-gray-500">{d.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Currency breakdown */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-6 text-sm font-medium text-white">Currency Breakdown</h3>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-400">USDC</span>
                  <span className="font-medium text-white">${usdcTotal.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${(usdcTotal / (usdcTotal + xlmTotal || 1)) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-400">XLM</span>
                  <span className="font-medium text-white">{xlmTotal.toLocaleString()} XLM</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-cyan-500"
                    style={{ width: `${(xlmTotal / (usdcTotal + xlmTotal || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <h4 className="mb-3 text-sm font-medium text-white">Payment Types</h4>
              <div className="space-y-2">
                {Object.entries(typeBreakdown).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {type === "ONE_TIME" ? "One-time" : type === "RECURRING" ? "Recurring" : "Streamed"}
                    </span>
                    <span className="font-medium text-white">{count} payments</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Group performance */}
        <div className="rounded-2xl border border-white/10 bg-white/5">
          <div className="border-b border-white/10 px-6 py-4">
            <h3 className="text-sm font-medium text-white">Group Performance</h3>
          </div>
          <div className="divide-y divide-white/5">
            {mockPayrollGroups.map((group) => {
              const groupPayments = mockPayments.filter((p) => p.groupName === group.name);
              const totalPaid = groupPayments
                .filter((p) => p.status === "COMPLETED")
                .reduce((sum, p) => sum + p.amount, 0);
              return (
                <div key={group.id} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-white">{group.name}</p>
                    <p className="text-xs text-gray-500">
                      {group.memberCount} workers · {group.frequency.toLowerCase()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-400">
                      {formatAmount(totalPaid, group.currency)}
                    </p>
                    <p className="text-xs text-gray-500">total paid</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent completed transactions */}
        <div className="rounded-2xl border border-white/10 bg-white/5">
          <div className="border-b border-white/10 px-6 py-4">
            <h3 className="text-sm font-medium text-white">Recent Completed Transactions</h3>
          </div>
          <div className="divide-y divide-white/5">
            {completedPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-white">
                    {payment.workerName ?? payment.groupName}
                  </p>
                  {payment.txHash && (
                    <a
                      href={`https://stellar.expert/explorer/testnet/tx/${payment.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400 hover:underline"
                    >
                      {payment.txHash.slice(0, 16)}...
                    </a>
                  )}
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
