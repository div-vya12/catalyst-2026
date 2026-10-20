import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const health = await checkDatabaseHealth();
  const statusCode = health.status === "error" ? 503 : 200;

  return NextResponse.json(health, { status: statusCode });
}
