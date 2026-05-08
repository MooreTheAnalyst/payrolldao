import { NextRequest, NextResponse } from "next/server";
import { mockWorkers } from "@/lib/utils/mock-data";

// GET /api/workers — list all workers
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase();
  const status = searchParams.get("status");

  let workers = mockWorkers;

  if (search) {
    workers = workers.filter(
      (w) =>
        w.name.toLowerCase().includes(search) ||
        w.walletAddress.toLowerCase().includes(search) ||
        w.role?.toLowerCase().includes(search)
    );
  }

  if (status) {
    workers = workers.filter((w) => w.status === status.toUpperCase());
  }

  return NextResponse.json({ workers, total: workers.length });
}

// POST /api/workers — add a new worker
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, walletAddress, email, role } = body;

  if (!name || !walletAddress) {
    return NextResponse.json(
      { error: "name and walletAddress are required" },
      { status: 400 }
    );
  }

  // Validate Stellar address format (starts with G, 56 chars)
  if (!/^G[A-Z2-7]{55}$/.test(walletAddress)) {
    return NextResponse.json(
      { error: "Invalid Stellar wallet address" },
      { status: 400 }
    );
  }

  // In production, persist to database via Prisma
  const newWorker = {
    id: `w${Date.now()}`,
    name,
    walletAddress,
    email: email ?? null,
    role: role ?? null,
    status: "ACTIVE" as const,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ worker: newWorker }, { status: 201 });
}
