import { PrismaClient } from "@prisma/client";

// Global Prisma singleton to avoid multiple instances in serverless environments
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Support Vercel Postgres, Neon, Supabase, and custom PostgreSQL connection strings
export const getDatabaseUrl = () => {
  return (
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    ""
  );
};

const activeUrl = getDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  (activeUrl
    ? new PrismaClient({
        datasources: {
          db: {
            url: activeUrl,
          },
        },
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
 * Automatically create the Registration table if it does not exist yet
 */
export async function ensureDatabaseTables() {
  if (!prisma || !getDatabaseUrl()) return false;

  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Registration" (
        "id" TEXT NOT NULL,
        "ticketId" TEXT NOT NULL,
        "fullName" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "college" TEXT NOT NULL,
        "yearOfStudy" TEXT NOT NULL,
        "delegateType" TEXT NOT NULL,
        "selectedEvents" TEXT[] NOT NULL DEFAULT '{}',
        "amountPayable" INTEGER NOT NULL DEFAULT 0,
        "currency" TEXT NOT NULL DEFAULT 'INR',
        "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
        "paymentId" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Registration_ticketId_key" ON "Registration"("ticketId");
    `);

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Registration_email_idx" ON "Registration"("email");
    `);

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Registration_phone_idx" ON "Registration"("phone");
    `);

    return true;
  } catch (err) {
    console.error("[Database Auto-Init Error]:", err);
    return false;
  }
}

/**
 * Persist registration record to Database (Prisma / PostgreSQL)
 * Automatically falls back to in-memory store if DATABASE_URL is not yet set
 */
export async function saveRegistration(input: RegistrationInput) {
  const url = getDatabaseUrl();

  if (prisma && url) {
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
    } catch (error: any) {
      console.error("[Database Error] Failed to save via Prisma:", error);

      // If table doesn't exist, auto-create and retry once
      if (error?.code === "P2021" || error?.message?.includes("does not exist")) {
        const initialized = await ensureDatabaseTables();
        if (initialized) {
          try {
            const retried = await prisma.registration.create({
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
            return { record: retried, source: "database" };
          } catch (retryErr) {
            console.error("[Database Retry Error]:", retryErr);
          }
        }
      }
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
  const url = getDatabaseUrl();

  if (prisma && url) {
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
  const url = getDatabaseUrl();

  if (prisma && url) {
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
  const url = getDatabaseUrl();

  if (prisma && url) {
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
 * Comprehensive Database Health Check with Detailed Diagnostics
 */
export async function checkDatabaseHealth() {
  const start = performance.now();
  const timestamp = new Date().toISOString();
  const url = getDatabaseUrl();

  // 1. Check if database connection string is configured
  if (!url) {
    return {
      status: "degraded",
      mode: "memory_fallback",
      message:
        "No database connection string configured. Set DATABASE_URL or POSTGRES_PRISMA_URL in Vercel environment variables.",
      latencyMs: 0,
      totalRegistrations: memoryStore.length,
      timestamp,
      details: {
        configured: false,
        driver: "memory",
        recommendation: "Attach Vercel Postgres in Vercel Dashboard -> Storage -> Postgres.",
      },
    };
  }

  // 2. Check if client initialized
  if (!prisma) {
    return {
      status: "error",
      mode: "disconnected",
      message: "Prisma client failed to initialize with provided connection string.",
      latencyMs: 0,
      totalRegistrations: 0,
      timestamp,
      details: {
        configured: true,
        driver: "postgresql",
        recommendation: "Verify that DATABASE_URL is a valid PostgreSQL connection string.",
      },
    };
  }

  // 3. Test basic connection
  let connectionVerified = false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    connectionVerified = true;
  } catch (connError: any) {
    const latencyMs = Math.round(performance.now() - start);
    return {
      status: "error",
      mode: "connection_failed",
      message: `Database server connection failed: ${connError?.message || "Connection refused or timed out"}`,
      latencyMs,
      totalRegistrations: 0,
      timestamp,
      details: {
        configured: true,
        driver: "postgresql",
        errorName: connError?.name,
        errorCode: connError?.code,
        recommendation:
          "Check that your PostgreSQL database is running and reachable. For Vercel Postgres, ensure '?sslmode=require' is attached to the connection string.",
      },
    };
  }

  // 4. Test table existence & auto-initialize if needed
  try {
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
        tablesInitialized: true,
      },
    };
  } catch (tableError: any) {
    // If the table doesn't exist (P2021), attempt automated self-healing creation!
    console.warn("[Health Check] Registration table missing. Attempting auto-initialization...");
    const initialized = await ensureDatabaseTables();

    if (initialized) {
      try {
        const count = await prisma.registration.count();
        const latencyMs = Math.round(performance.now() - start);
        return {
          status: "healthy",
          mode: "postgresql",
          message: "PostgreSQL connected and Registration table automatically created and verified!",
          latencyMs,
          totalRegistrations: count,
          timestamp,
          details: {
            configured: true,
            driver: "postgresql",
            tablesInitialized: true,
            autoRepaired: true,
          },
        };
      } catch (countErr) {
        // Continue to reporting
      }
    }

    const latencyMs = Math.round(performance.now() - start);
    return {
      status: "degraded",
      mode: "table_missing",
      message:
        "Database is reachable and responding, but the 'Registration' table has not been created yet.",
      latencyMs,
      totalRegistrations: 0,
      timestamp,
      details: {
        configured: true,
        driver: "postgresql",
        connectionVerified: true,
        errorName: tableError?.name,
        errorCode: tableError?.code,
        recommendation:
          "Click the 'Initialize Tables' button on this page, or run 'npx prisma db push' in your terminal.",
      },
    };
  }
}
