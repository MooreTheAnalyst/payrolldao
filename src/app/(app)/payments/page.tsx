"use client";

import { useState } from "react";
import { Send, Repeat, ExternalLink, Filter } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";
import PaymentStatusBadge from "@/components/ui/PaymentStatusBadge";
import Badge from "@/components/ui/Badge";
import SendPaymentModal from "@/components/payments/SendPaymentModal";
import { mockPayments } from "@/lib/utils/mock-data";
import { formatAmount, formatDate, shortenAddress } from "@/lib/utils";
import type { PaymentType } from "@/types";

const typeLabel: Record<PaymentType, string> = {
  ONE_TIME: "One-time",
  RECURRING: "Recurring",
  STREAMED: "Streamed",
};

export default function PaymentsPage() {
  const [showSend, setShowSend] = useState(false);
  const [filter, setFilter] = useState<"ALL" | "COMPLETED" | "PENDING" | "PROCESSING">("ALL");

  const filtered = mockPayments.filter(
    (p) => filter === "ALL" || p.status === filter
  );

  const totalCompleted = mockPayments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = mockPayments
    .filter((p) => p.status === "PENDING" || p.status === "PROCESSING")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <DashboardHeader
        title="Payments"
        description="Send payments and view transaction history"
        actions={
          <Button size="sm" onClick={() => setShowSend(true)}>
            <Send className="h-4 w-4" />
            Send Payment
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Total Sent</p>
            <p className="mt-1 text-2xl font-bold text-emerald-400">
              ${totalCompleted.toLocaleString()} USDC
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Pending / Processing</p>
            <p className="mt-1 text-2xl font-bold text-yellow-400">
              ${totalPending.toLocaleString()} USDC
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Total Transactions</p>
            <p className="mt-1 text-2xl font-bold text-white">{mockPayments.length}</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={() => setShowSend(true)}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-left hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-colors"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <Send className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="font-medium text-white">One-time Payment</p>
              <p className="text-sm text-gray-500">Send USDC or XLM to a single worker</p>
            </div>
          </button>

          <button
            onClick={() => setShowSend(true)}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-left hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-colors"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
              <Repeat className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <p className="font-medium text-white">Group Payroll</p>
              <p className="text-sm text-gray-500">Pay all workers in a payroll group</p>
            </div>
          </button>
        </div>

        {/* Transaction history */}
        <div className="rounded-2xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <h3 className="text-sm font-medium text-white">Transaction History</h3>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <div className="flex gap-1">
                {(["ALL", "COMPLETED", "PROCESSING", "PENDING"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                      filter === f
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {filtered.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
                    {payment.type === "RECURRING" ? (
                      <Repeat className="h-4 w-4 text-cyan-400" />
                    ) : (
                      <Send className="h-4 w-4 text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white">
                        {payment.workerName ?? payment.groupName ?? "Unknown"}
                      </p>
                      <Badge variant="neutral">{typeLabel[payment.type]}</Badge>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                      {payment.workerWallet && (
                        <span>{shortenAddress(payment.workerWallet)}</span>
                      )}
                      {payment.memo && <span>· {payment.memo}</span>}
                      <span>· {formatDate(payment.createdAt)}</span>
                    </div>
                    {payment.txHash && (
                      <a
                        href={`https://stellar.expert/explorer/testnet/tx/${payment.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 flex items-center gap-1 text-xs text-emerald-400 hover:underline"
                      >
                        View on Stellar Expert
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
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

      <SendPaymentModal open={showSend} onClose={() => setShowSend(false)} />
    </div>
  );
}
