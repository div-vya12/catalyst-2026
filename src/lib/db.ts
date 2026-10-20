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
const memoryStore: RegistrationInput[] = [];

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
      // Fallback
    }
  }

  // Fallback to memory store
  const fallbackRecord = {
    ...input,
    email: input.email.toLowerCase().trim(),
    createdAt: new Date().toISOString(),
  };
  memoryStore.push(fallbackRecord);
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
