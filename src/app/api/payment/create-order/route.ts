import { NextRequest, NextResponse } from "next/server";
import { findRegistration } from "@/lib/db";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ticketId, amount: requestedAmount } = body;

    if (!ticketId) {
      return NextResponse.json(
        { error: "Ticket ID is required to create a payment order" },
        { status: 400 }
      );
    }

    // Lookup registration
    const reg = await findRegistration(ticketId);
    if (!reg) {
      return NextResponse.json(
        { error: "Registration record not found" },
        { status: 404 }
      );
    }

    const amountInRupees = requestedAmount || reg.amountPayable || 0;

    if (amountInRupees <= 0) {
      return NextResponse.json(
        { error: "No payment required for this registration (Amount is ₹0)" },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Live / Test Razorpay credentials configured
    if (keyId && keySecret && keyId !== "rzp_test_placeholder") {
      try {
        const instance = new Razorpay({
          key_id: keyId,
          key_secret: keySecret,
        });

        const order = await instance.orders.create({
          amount: Math.round(amountInRupees * 100), // Razorpay takes amount in paise
          currency: "INR",
          receipt: ticketId,
          notes: {
            ticketId,
            fullName: reg.fullName,
            email: reg.email,
            phone: reg.phone,
          },
        });

        return NextResponse.json({
          success: true,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId: keyId,
          ticketId,
          isLiveMode: true,
        });
      } catch (razorpayError: any) {
        console.error("Razorpay order creation error:", razorpayError);
        return NextResponse.json(
          {
            error: "Failed to create Razorpay order",
            details: razorpayError?.message || String(razorpayError),
          },
          { status: 502 }
        );
      }
    }

    // Graceful fallback for local development or preview without configured API keys
    const simulatedOrderId = `order_sim_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    return NextResponse.json({
      success: true,
      orderId: simulatedOrderId,
      amount: Math.round(amountInRupees * 100),
      currency: "INR",
      keyId: "rzp_test_placeholder",
      ticketId,
      isSimulated: true,
      message:
        "Demo Checkout Mode: Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.local for live payments.",
    });
  } catch (error: any) {
    console.error("Create order API error:", error);
    return NextResponse.json(
      { error: "Internal server error during order creation", details: error.message },
      { status: 500 }
    );
  }
}
