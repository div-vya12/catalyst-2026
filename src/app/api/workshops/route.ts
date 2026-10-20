import { NextResponse } from "next/server";
import { getWorkshopSeatStats, WORKSHOP_SEAT_LIMIT, CLINICAL_WORKSHOPS } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const capacities = await getWorkshopSeatStats();
    return NextResponse.json(
      {
        success: true,
        seatLimit: WORKSHOP_SEAT_LIMIT,
        workshops: CLINICAL_WORKSHOPS,
        capacities,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch workshop capacities", details: error.message },
      { status: 500 }
    );
  }
}
