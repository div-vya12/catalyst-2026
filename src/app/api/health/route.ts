import { NextResponse } from "next/server";
import { checkDatabaseHealth, ensureDatabaseTables } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const health = await checkDatabaseHealth();
  const statusCode = health.status === "error" ? 503 : 200;

  return NextResponse.json(health, { status: statusCode });
}

export async function POST() {
  try {
    const success = await ensureDatabaseTables();
    const updatedHealth = await checkDatabaseHealth();

    return NextResponse.json(
      {
        success,
        message: success
          ? "Database tables successfully initialized."
          : "Failed to initialize database tables.",
        health: updatedHealth,
      },
      { status: success ? 200 : 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
