import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { findRegistration } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Authentication failed. Razorpay credentials are missing." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    let { amount, currency = "INR", receipt, ticketId } = body;

    // If ticketId is provided and amount is not directly given, look up registration
    if ((amount === undefined || amount === null) && ticketId) {
      const reg = await findRegistration(ticketId);
      if (reg && reg.amountPayable) {
        amount = Math.round(reg.amountPayable * 100); // rupees to paise
      }
    }

    // Convert to number if passed as string
    if (typeof amount === "string") {
      amount = parseInt(amount, 10);
    }

    // Minimum amount validation: at least 100 paise (₹1)
    if (!amount || typeof amount !== "number" || isNaN(amount) || amount < 100) {
      return NextResponse.json(
        { error: "Invalid amount. Minimum amount must be at least 100 paise (₹1)." },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    try {
      const order = await razorpay.orders.create({
        amount: Math.round(amount),
        currency: currency || "INR",
        receipt: receipt || (ticketId ? `rcpt_${ticketId}` : `rcpt_${Date.now()}`),
        notes: body.notes || (ticketId ? { ticketId } : {}),
      });

      return NextResponse.json({
        success: true,
        order_id: order.id,
        orderId: order.id,
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: keyId,
      });
    } catch (apiError: any) {
      console.error("[Razorpay API Error]:", apiError);
      
      const statusCode = apiError?.statusCode || apiError?.error?.code;
      if (statusCode === 401 || (typeof statusCode === "string" && statusCode.toLowerCase().includes("unauthorized"))) {
        return NextResponse.json(
          { error: "Authentication failed. Invalid Razorpay credentials." },
          { status: 401 }
        );
      }

      return NextResponse.json(
        {
          error: "Failed to create Razorpay order",
          details: apiError?.error?.description || apiError?.message || "Razorpay API error",
        },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("[Server Error in create-order]:", err);
    return NextResponse.json(
      { error: "Internal server error during order creation", details: err?.message },
      { status: 500 }
    );
  }
}
