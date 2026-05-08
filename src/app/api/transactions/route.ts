import { NextRequest, NextResponse } from "next/server";
import { mockPayments } from "@/lib/utils/mock-data";

// GET /api/transactions — list completed transactions
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") ?? "20");

  const transactions = mockPayments
    .filter((p) => p.txHash)
    .slice(0, limit)
    .map((p) => ({
      id: p.id,
      txHash: p.txHash,
      amount: p.amount,
      currency: p.currency,
      status: p.status,
      type: p.type,
      recipient: p.workerName ?? p.groupName,
      completedAt: p.completedAt,
      createdAt: p.createdAt,
    }));

  return NextResponse.json({ transactions, total: transactions.length });
}
