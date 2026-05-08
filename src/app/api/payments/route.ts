import { NextRequest, NextResponse } from "next/server";
import { mockPayments } from "@/lib/utils/mock-data";

// GET /api/payments — list payments with optional filters
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const type = searchParams.get("type");
  const limit = parseInt(searchParams.get("limit") ?? "50");

  let payments = mockPayments;

  if (status) {
    payments = payments.filter((p) => p.status === status.toUpperCase());
  }

  if (type) {
    payments = payments.filter((p) => p.type === type.toUpperCase());
  }

  return NextResponse.json({
    payments: payments.slice(0, limit),
    total: payments.length,
  });
}

// POST /api/payments — initiate a new payment
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { workerId, groupId, amount, currency, memo, type } = body;

  if (!amount || !currency) {
    return NextResponse.json(
      { error: "amount and currency are required" },
      { status: 400 }
    );
  }

  if (!workerId && !groupId) {
    return NextResponse.json(
      { error: "Either workerId or groupId is required" },
      { status: 400 }
    );
  }

  if (!["XLM", "USDC"].includes(currency)) {
    return NextResponse.json({ error: "currency must be XLM or USDC" }, { status: 400 });
  }

  // In production, this would:
  // 1. Build the Stellar transaction
  // 2. Return the unsigned XDR for client-side signing
  // 3. Accept the signed XDR and submit to Stellar
  const newPayment = {
    id: `p${Date.now()}`,
    amount: parseFloat(amount),
    currency,
    type: type ?? "ONE_TIME",
    status: "PENDING",
    memo: memo ?? null,
    workerId: workerId ?? null,
    groupId: groupId ?? null,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ payment: newPayment }, { status: 201 });
}
