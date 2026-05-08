import { NextRequest, NextResponse } from "next/server";
import { mockPayrollGroups } from "@/lib/utils/mock-data";

// GET /api/payroll — list all payroll groups
export async function GET() {
  return NextResponse.json({
    groups: mockPayrollGroups,
    total: mockPayrollGroups.length,
  });
}

// POST /api/payroll — create a new payroll group
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, description, currency, frequency, amount } = body;

  if (!name || !currency || !frequency || amount === undefined) {
    return NextResponse.json(
      { error: "name, currency, frequency, and amount are required" },
      { status: 400 }
    );
  }

  if (!["XLM", "USDC"].includes(currency)) {
    return NextResponse.json({ error: "currency must be XLM or USDC" }, { status: 400 });
  }

  if (!["WEEKLY", "BIWEEKLY", "MONTHLY"].includes(frequency)) {
    return NextResponse.json(
      { error: "frequency must be WEEKLY, BIWEEKLY, or MONTHLY" },
      { status: 400 }
    );
  }

  const newGroup = {
    id: `pg${Date.now()}`,
    name,
    description: description ?? null,
    currency,
    frequency,
    amount: parseFloat(amount),
    status: "ACTIVE" as const,
    memberCount: 0,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ group: newGroup }, { status: 201 });
}
