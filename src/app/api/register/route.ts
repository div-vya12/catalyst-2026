import { NextRequest, NextResponse } from "next/server";
import { conferenceData, WORKSHOP_PRICES } from "@/data/conferenceData";
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
      collegeIdUrl,
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

    // 2. Workshop pricing calculation
    const calculatedTotal = selectedEvents.reduce((total: number, id: string) => {
      return total + (WORKSHOP_PRICES[id] || 0);
    }, 0);

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
      collegeIdUrl,
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
        amountPayable: calculatedTotal,
        requiresPayment: calculatedTotal > 0,
        ticketId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error?.message?.startsWith("WORKSHOP_FULL:")) {
      const cleanMessage = error.message.replace("WORKSHOP_FULL: ", "");
      return NextResponse.json(
        {
          success: false,
          error: cleanMessage,
          code: "WORKSHOP_FULL",
        },
        { status: 409 }
      );
    }

    console.error("Registration route error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration", details: error.message },
      { status: 500 }
    );
  }
}
