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
    const result = await ensureDatabaseTables();
    const updatedHealth = await checkDatabaseHealth();

    return NextResponse.json(
      {
        success: result.success,
        error: result.error,
        step: result.step,
        message: result.success
          ? "Database tables successfully initialized."
          : `Failed to initialize database tables: ${result.error || "Unknown error"}`,
        health: updatedHealth,
      },
      { status: result.success ? 200 : 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
