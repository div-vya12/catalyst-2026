import { PrismaClient } from "@prisma/client";

// Global Prisma singleton to avoid multiple instances in serverless environments
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Robust Database URL resolver:
 * Supports standard Vercel Postgres, custom named databases (e.g., USERDB_PRISMA_DATABASE_URL, USERDB_DATABASE_URL),
 * Neon, Supabase, and dynamic environment variable detection.
 */
export const getDatabaseConfig = (): { url: string; variableName: string } => {
  // 1. Direct priority matches (custom named Vercel databases like USERDB)
  if (process.env.USERDB_PRISMA_DATABASE_URL) {
    return { url: process.env.USERDB_PRISMA_DATABASE_URL, variableName: "USERDB_PRISMA_DATABASE_URL" };
  }
  if (process.env.USERDB_DATABASE_URL) {
    return { url: process.env.USERDB_DATABASE_URL, variableName: "USERDB_DATABASE_URL" };
  }
  if (process.env.USERDB_POSTGRES_URL) {
    return { url: process.env.USERDB_POSTGRES_URL, variableName: "USERDB_POSTGRES_URL" };
  }

  // 2. Standard Vercel Postgres matches
  if (process.env.POSTGRES_PRISMA_URL) {
    return { url: process.env.POSTGRES_PRISMA_URL, variableName: "POSTGRES_PRISMA_URL" };
  }
  if (process.env.DATABASE_URL) {
    return { url: process.env.DATABASE_URL, variableName: "DATABASE_URL" };
  }
  if (process.env.POSTGRES_URL) {
    return { url: process.env.POSTGRES_URL, variableName: "POSTGRES_URL" };
  }
  if (process.env.POSTGRES_URL_NON_POOLING) {
    return { url: process.env.POSTGRES_URL_NON_POOLING, variableName: "POSTGRES_URL_NON_POOLING" };
  }

  // 3. Dynamic scan for any custom Vercel database prefix (e.g., [STORENAME]_PRISMA_DATABASE_URL)
  for (const [key, val] of Object.entries(process.env)) {
    if (!val || typeof val !== "string") continue;

    if (
      key.endsWith("_PRISMA_DATABASE_URL") ||
      key.endsWith("_DATABASE_URL") ||
      key.endsWith("_POSTGRES_URL") ||
      key.endsWith("_URL")
    ) {
      if (val.startsWith("postgres://") || val.startsWith("postgresql://")) {
        return { url: val, variableName: key };
      }
    }
  }

  // 4. Any generic postgres connection string
  for (const [key, val] of Object.entries(process.env)) {
    if (!val || typeof val !== "string") continue;
    if (val.startsWith("postgres://") || val.startsWith("postgresql://")) {
      return { url: val, variableName: key };
    }
  }

  return { url: "", variableName: "NONE" };
};

export const getDatabaseUrl = (): string => {
  return getDatabaseConfig().url;
};

// Mask connection string for safe UI diagnostics (e.g. postgres://default:***@ep-cool-123.pooler.neon.tech/verceldb)
export const maskDatabaseUrl = (url: string): string => {
  if (!url) return "None";
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.username}:***@${parsed.host}${parsed.pathname}`;
  } catch {
    return url.replace(/:[^:@]+@/, ":***@");
  }
};

/**
 * Get active Prisma Client dynamically configured with detected database URL
 */
export const getPrismaClient = (): PrismaClient | undefined => {
  const { url } = getDatabaseConfig();
  if (!url) return undefined;

  // Ensure process.env.DATABASE_URL is also set so Prisma internals can find it
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = url;
  }

  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  try {
    const client = new PrismaClient({
      datasources: {
        db: {
          url,
        },
      },
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = client;
    }
    return client;
  } catch (err) {
    console.error("[Prisma Initialization Error]:", err);
    return undefined;
  }
};

export const prisma = getPrismaClient();

export interface RegistrationInput {
  ticketId: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  yearOfStudy: string;
  delegateType: string;
  collegeIdUrl?: string;
  selectedEvents: string[];
  amountPayable: number;
  currency?: string;
  status?: string;
  paymentId?: string;
}

// In-memory fallback cache (used when no database is connected yet)
const memoryStore: (RegistrationInput & { id: string; createdAt: string; updatedAt: string })[] = [];

/**
 * Automatically create the Registration table if it does not exist yet
 */
export async function ensureDatabaseTables(): Promise<{ success: boolean; error?: string; step?: string }> {
  const client = getPrismaClient();
  if (!client) {
    return { success: false, error: "Prisma client could not be initialized. No database URL configured." };
  }

  // 1. Create main table (single SQL command without semicolon so Postgres extended query protocol succeeds)
  try {
    await client.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Registration" (
        "id" TEXT NOT NULL,
        "ticketId" TEXT NOT NULL,
        "fullName" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "college" TEXT NOT NULL,
        "yearOfStudy" TEXT NOT NULL,
        "delegateType" TEXT NOT NULL,
        "collegeIdUrl" TEXT,
        "selectedEvents" TEXT[] NOT NULL DEFAULT '{}',
        "amountPayable" INTEGER NOT NULL DEFAULT 0,
        "currency" TEXT NOT NULL DEFAULT 'INR',
        "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
        "paymentId" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
      )
    `);
  } catch (err: any) {
    console.error("[Database Auto-Init Error - Create Table]:", err);
    return { success: false, step: "CREATE TABLE", error: err?.message || String(err) };
  }

  // 2. Ensure collegeIdUrl column is present for backward compatibility
  try {
    await client.$executeRawUnsafe(`
      ALTER TABLE "Registration" ADD COLUMN IF NOT EXISTS "collegeIdUrl" TEXT
    `);
  } catch (err: any) {
    console.warn("[Database Auto-Init Warning - Column]:", err?.message);
  }

  // 3. Unique index on ticketId
  try {
    await client.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Registration_ticketId_key" ON "Registration"("ticketId")
    `);
  } catch (err: any) {
    console.warn("[Database Auto-Init Warning - ticketId Index]:", err?.message);
  }

  // 4. Index on email
  try {
    await client.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Registration_email_idx" ON "Registration"("email")
    `);
  } catch (err: any) {
    console.warn("[Database Auto-Init Warning - email Index]:", err?.message);
  }

  // 5. Index on phone
  try {
    await client.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Registration_phone_idx" ON "Registration"("phone")
    `);
  } catch (err: any) {
    console.warn("[Database Auto-Init Warning - phone Index]:", err?.message);
  }

  return { success: true };
}

/**
 * Persist registration record to Database (Prisma / PostgreSQL)
 */
export async function saveRegistration(input: RegistrationInput) {
  const client = getPrismaClient();

  if (client) {
    try {
      const created = await client.registration.create({
        data: {
          ticketId: input.ticketId,
          fullName: input.fullName,
          email: input.email.toLowerCase().trim(),
          phone: input.phone.trim(),
          college: input.college.trim(),
          yearOfStudy: input.yearOfStudy,
          delegateType: input.delegateType,
          collegeIdUrl: input.collegeIdUrl,
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
        if (initialized.success) {
          try {
            const retried = await client.registration.create({
              data: {
                ticketId: input.ticketId,
                fullName: input.fullName,
                email: input.email.toLowerCase().trim(),
                phone: input.phone.trim(),
                college: input.college.trim(),
                yearOfStudy: input.yearOfStudy,
                delegateType: input.delegateType,
                collegeIdUrl: input.collegeIdUrl,
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
  const client = getPrismaClient();

  if (client) {
    try {
      const found = await client.registration.findFirst({
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
  const client = getPrismaClient();

  if (client) {
    try {
      const records = await client.registration.findMany({
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
  const client = getPrismaClient();

  if (client) {
    try {
      const deleted = await client.registration.deleteMany({
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
  const { url, variableName } = getDatabaseConfig();
  const maskedUrl = maskDatabaseUrl(url);

  // 1. Check if database connection string is configured
  if (!url) {
    return {
      status: "degraded",
      mode: "memory_fallback",
      message:
        "No database connection string detected. Set USERDB_PRISMA_DATABASE_URL or DATABASE_URL in Vercel environment variables.",
      latencyMs: 0,
      totalRegistrations: memoryStore.length,
      timestamp,
      details: {
        configured: false,
        driver: "memory",
        detectedVariable: "NONE",
        recommendation: "Attach your database to the project in Vercel Dashboard -> Storage -> Postgres.",
      },
    };
  }

  // 2. Get Prisma Client
  const client = getPrismaClient();
  if (!client) {
    return {
      status: "error",
      mode: "disconnected",
      message: `Prisma client failed to initialize with ${variableName}.`,
      latencyMs: 0,
      totalRegistrations: 0,
      timestamp,
      details: {
        configured: true,
        driver: "postgresql",
        detectedVariable: variableName,
        connectionTarget: maskedUrl,
        recommendation: `Verify that ${variableName} contains a valid PostgreSQL connection string.`,
      },
    };
  }

  // 3. Test basic connection
  try {
    await client.$queryRaw`SELECT 1`;
  } catch (connError: any) {
    const latencyMs = Math.round(performance.now() - start);
    return {
      status: "error",
      mode: "connection_failed",
      message: `PostgreSQL connection failed via ${variableName}: ${connError?.message || "Connection refused"}`,
      latencyMs,
      totalRegistrations: 0,
      timestamp,
      details: {
        configured: true,
        driver: "postgresql",
        detectedVariable: variableName,
        connectionTarget: maskedUrl,
        errorName: connError?.name,
        errorCode: connError?.code,
        recommendation:
          "Check that your Vercel database is active and accepting connections. For serverless Neon, ensure SSL is active (?sslmode=require).",
      },
    };
  }

  // 4. Test table existence & auto-initialize if needed
  try {
    const count = await client.registration.count();
    const latencyMs = Math.round(performance.now() - start);

    return {
      status: "healthy",
      mode: "postgresql",
      message: `PostgreSQL database connection is active, responsive, and verified via ${variableName}.`,
      latencyMs,
      totalRegistrations: count,
      timestamp,
      details: {
        configured: true,
        driver: "postgresql",
        detectedVariable: variableName,
        connectionTarget: maskedUrl,
        tablesInitialized: true,
      },
    };
  } catch (tableError: any) {
    console.warn("[Health Check] Registration table missing. Attempting auto-initialization...");
    const initialized = await ensureDatabaseTables();

    if (initialized.success) {
      try {
        const count = await client.registration.count();
        const latencyMs = Math.round(performance.now() - start);
        return {
          status: "healthy",
          mode: "postgresql",
          message: `PostgreSQL connected via ${variableName} and Registration table automatically created & verified!`,
          latencyMs,
          totalRegistrations: count,
          timestamp,
          details: {
            configured: true,
            driver: "postgresql",
            detectedVariable: variableName,
            connectionTarget: maskedUrl,
            tablesInitialized: true,
            autoRepaired: true,
          },
        };
      } catch (countErr) {
        // Fall through
      }
    }

    const latencyMs = Math.round(performance.now() - start);
    return {
      status: "degraded",
      mode: "table_missing",
      message: `Database is connected via ${variableName}, but the 'Registration' table has not been created yet.${
        initialized.error ? ` Details: ${initialized.error}` : ""
      }`,
      latencyMs,
      totalRegistrations: 0,
      timestamp,
      details: {
        configured: true,
        driver: "postgresql",
        detectedVariable: variableName,
        connectionTarget: maskedUrl,
        errorName: tableError?.name,
        errorCode: tableError?.code,
        initError: initialized.error,
        initStep: initialized.step,
        recommendation: "Click 'Initialize Database Tables (1-Click)' on this page to create the table automatically.",
      },
    };
  }
}
