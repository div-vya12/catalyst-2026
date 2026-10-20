import { NextRequest, NextResponse } from "next/server";
import { findRegistration } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: "Query parameter 'query' is required (Ticket ID, email, or phone)" },
        { status: 400 }
      );
    }

    const registration = await findRegistration(query.trim());

    if (!registration) {
      return NextResponse.json(
        { error: "No registration found matching your details. Please check your Ticket ID or Email." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: registration,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Check registration error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve registration", details: error.message },
      { status: 500 }
    );
  }
}
