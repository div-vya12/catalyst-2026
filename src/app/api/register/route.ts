import { NextRequest, NextResponse } from "next/server";
import { conferenceData } from "@/data/conferenceData";
import { saveRegistration } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      college,
      yearOfStudy,
      delegateType,
      selectedEvents,
    } = body;

    // 1. Validation
    if (!fullName || !email || !phone || !college) {
      return NextResponse.json(
        { error: "Missing required delegate fields (fullName, email, phone, college)" },
        { status: 400 }
      );
    }

    if (!Array.isArray(selectedEvents) || selectedEvents.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one event or workshop." },
        { status: 400 }
      );
    }

    // 2. Server-side fee calculation (prevents client tampering)
    let calculatedTotal = 0;
    const isMAMC = delegateType === "maulanian";

    const workshopCount = selectedEvents.filter((id: string) =>
      conferenceData.workshops.some((w) => w.id === id)
    ).length;

    selectedEvents.forEach((id: string) => {
      if (id === "the-boardroom") calculatedTotal += 99;
      if (id === "business-bootcamp") calculatedTotal += 349;
      if (id === "venture-wars") calculatedTotal += 249;
      if (id === "medventure") calculatedTotal += isMAMC ? 0 : 50;
      if (id === "rickthinking-reviews") calculatedTotal += isMAMC ? 0 : 50;
      if (id === "molecules-in-motion") {
        calculatedTotal += workshopCount >= 2 ? 0 : 100;
      }
    });

    // 3. Generate unique Ticket/Registration ID for 2026
    const ticketId = `CAT26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // 4. Persist to Database (Prisma / PostgreSQL)
    const { record, source } = await saveRegistration({
      ticketId,
      fullName,
      email,
      phone,
      college,
      yearOfStudy,
      delegateType,
      selectedEvents,
      amountPayable: calculatedTotal,
      currency: "INR",
      status: calculatedTotal === 0 ? "CONFIRMED" : "PENDING_PAYMENT",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration recorded successfully",
        storageSource: source,
        data: record,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Registration route error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration", details: error.message },
      { status: 500 }
    );
  }
}
