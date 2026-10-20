import { PrismaClient } from "@prisma/client";

// Global Prisma singleton to avoid multiple instances in serverless environments
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  (process.env.DATABASE_URL
    ? new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
      })
    : undefined);

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}

export interface RegistrationInput {
  ticketId: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  yearOfStudy: string;
  delegateType: string;
  selectedEvents: string[];
  amountPayable: number;
  currency?: string;
  status?: string;
  paymentId?: string;
}

// In-memory fallback cache (used when DATABASE_URL is not yet connected during setup)
const memoryStore: (RegistrationInput & { id: string; createdAt: string; updatedAt: string })[] = [];

/**
 * Persist registration record to Database (Prisma / PostgreSQL)
 * Automatically falls back to in-memory store if DATABASE_URL is not yet set
 */
export async function saveRegistration(input: RegistrationInput) {
  if (prisma && process.env.DATABASE_URL) {
    try {
      const created = await prisma.registration.create({
        data: {
          ticketId: input.ticketId,
          fullName: input.fullName,
          email: input.email.toLowerCase().trim(),
          phone: input.phone.trim(),
          college: input.college.trim(),
          yearOfStudy: input.yearOfStudy,
          delegateType: input.delegateType,
          selectedEvents: input.selectedEvents,
          amountPayable: input.amountPayable,
          currency: input.currency || "INR",
          status: input.status || (input.amountPayable === 0 ? "CONFIRMED" : "PENDING_PAYMENT"),
          paymentId: input.paymentId,
        },
      });
      return { record: created, source: "database" };
    } catch (error) {
      console.error("[Database Error] Failed to save via Prisma:", error);
    }
  }

  // Fallback to memory store
  const now = new Date().toISOString();
  const fallbackRecord = {
    id: `mem-${Math.random().toString(36).substring(2, 9)}`,
    ...input,
    email: input.email.toLowerCase().trim(),
    createdAt: now,
    updatedAt: now,
  };
  memoryStore.unshift(fallbackRecord);
  return { record: fallbackRecord, source: "memory_fallback" };
}

/**
 * Query registration by Ticket ID, Email, or Phone
 */
export async function findRegistration(query: string) {
  const cleanQuery = query.trim();
  const lowerQuery = cleanQuery.toLowerCase();

  if (prisma && process.env.DATABASE_URL) {
    try {
      const found = await prisma.registration.findFirst({
        where: {
          OR: [
            { ticketId: { equals: cleanQuery, mode: "insensitive" } },
            { email: { equals: lowerQuery, mode: "insensitive" } },
            { phone: { equals: cleanQuery } },
          ],
        },
      });

      if (found) {
        return found;
      }
    } catch (error) {
      console.error("[Database Error] Failed to query via Prisma:", error);
    }
  }

  // Lookup in fallback store
  return memoryStore.find(
    (item) =>
      item.ticketId.toUpperCase() === cleanQuery.toUpperCase() ||
      item.email.toLowerCase() === lowerQuery ||
      item.phone === cleanQuery
  );
}

/**
 * Retrieve all registrations (for Admin Dashboard)
 */
export async function getAllRegistrations() {
  if (prisma && process.env.DATABASE_URL) {
    try {
      const records = await prisma.registration.findMany({
        orderBy: { createdAt: "desc" },
      });
      return { records, source: "database" };
    } catch (error) {
      console.error("[Database Error] Failed to fetch all registrations:", error);
    }
  }

  return { records: memoryStore, source: "memory_fallback" };
}

/**
 * Delete a registration (for Admin)
 */
export async function deleteRegistration(ticketId: string) {
  if (prisma && process.env.DATABASE_URL) {
    try {
      const deleted = await prisma.registration.deleteMany({
        where: { ticketId },
      });
      return deleted.count > 0;
    } catch (error) {
      console.error("[Database Error] Failed to delete registration:", error);
    }
  }

  const idx = memoryStore.findIndex((r) => r.ticketId === ticketId);
  if (idx !== -1) {
    memoryStore.splice(idx, 1);
    return true;
  }
  return false;
}

/**
 * Comprehensive Database Health Check
 */
export async function checkDatabaseHealth() {
  const start = performance.now();
  const timestamp = new Date().toISOString();

  if (!process.env.DATABASE_URL) {
    return {
      status: "degraded",
      mode: "memory_fallback",
      message: "DATABASE_URL environment variable is not configured. Using active in-memory cache.",
      latencyMs: 0,
      totalRegistrations: memoryStore.length,
      timestamp,
      details: {
        configured: false,
        driver: "memory",
      },
    };
  }

  if (!prisma) {
    return {
      status: "error",
      mode: "disconnected",
      message: "Prisma client failed to initialize with provided DATABASE_URL.",
      latencyMs: 0,
      totalRegistrations: 0,
      timestamp,
      details: {
        configured: true,
        driver: "postgresql",
      },
    };
  }

  try {
    // Run lightweight query
    await prisma.$queryRaw`SELECT 1`;
    const count = await prisma.registration.count();
    const latencyMs = Math.round(performance.now() - start);

    return {
      status: "healthy",
      mode: "postgresql",
      message: "PostgreSQL database connection is active, responsive, and verified.",
      latencyMs,
      totalRegistrations: count,
      timestamp,
      details: {
        configured: true,
        driver: "postgresql",
        urlConfigured: true,
      },
    };
  } catch (error: any) {
    const latencyMs = Math.round(performance.now() - start);
    return {
      status: "error",
      mode: "postgresql_unreachable",
      message: error?.message || "Failed to execute database query.",
      latencyMs,
      totalRegistrations: 0,
      timestamp,
      details: {
        configured: true,
        driver: "postgresql",
        errorName: error?.name,
      },
    };
  }
}
