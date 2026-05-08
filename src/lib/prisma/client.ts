/**
 * Prisma client singleton.
 *
 * Run `npx prisma generate` after setting up your DATABASE_URL
 * to enable database functionality. The app runs with mock data
 * if the database is not configured.
 *
 * Usage in API routes:
 *   const db = await getPrismaClient();
 *   if (!db) return; // running in demo mode
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismaClientType = any;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClientType };

let _prisma: PrismaClientType = globalForPrisma.prisma ?? null;

export async function getPrismaClient(): Promise<PrismaClientType | null> {
  if (_prisma) return _prisma;
  try {
    // Dynamic import so missing generated client doesn't break the build
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require("@prisma/client");
    const PrismaClient = mod.PrismaClient ?? mod.default?.PrismaClient;
    if (!PrismaClient) return null;
    _prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = _prisma;
    return _prisma;
  } catch {
    return null;
  }
}
