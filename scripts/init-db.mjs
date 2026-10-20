import { PrismaClient } from "@prisma/client";

async function main() {
  const url =
    process.env.USERDB_PRISMA_DATABASE_URL ||
    process.env.USERDB_DATABASE_URL ||
    process.env.USERDB_POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL;

  if (!url) {
    console.log("[init-db] No database URL environment variable detected during build. Skipping build-time DB init.");
    return;
  }

  process.env.DATABASE_URL = url;

  console.log("[init-db] Database URL detected. Attempting to ensure Registration table...");

  const prisma = new PrismaClient({
    datasources: { db: { url } },
  });

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
    console.log("[init-db] Table 'Registration' checked/created successfully.");

    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "Registration" ADD COLUMN IF NOT EXISTS "collegeIdUrl" TEXT
      `);
    } catch {}

    try {
      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "Registration_ticketId_key" ON "Registration"("ticketId")
      `);
    } catch {}

    try {
      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "Registration_email_idx" ON "Registration"("email")
      `);
    } catch {}

    try {
      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "Registration_phone_idx" ON "Registration"("phone")
      `);
    } catch {}

    console.log("[init-db] Indexes checked/created successfully.");
  } catch (err) {
    console.warn("[init-db] Build-time table creation note (will run at runtime):", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.warn("[init-db] Script encountered note:", err.message);
});
