import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { updateRegistrationPayment, findRegistration } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: "Server configuration error. Razorpay secret is missing." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const order_id = body.order_id || body.razorpay_order_id;
    const payment_id = body.payment_id || body.razorpay_payment_id;
    const signature = body.signature || body.razorpay_signature;
    const ticketId = body.ticketId;

    // Validate missing fields
    if (!order_id || !payment_id || !signature) {
      return NextResponse.json(
        {
          error: "Missing required fields. order_id, payment_id, and signature are required.",
        },
        { status: 400 }
      );
    }

    // Alg: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${order_id}|${payment_id}`)
      .digest("hex");

    // Signature comparison
    if (expectedSignature !== signature) {
      console.warn("[Razorpay Verification Failed] Signature mismatch:", {
        expected: expectedSignature,
        received: signature,
      });
      return NextResponse.json(
        {
          success: false,
          error: "Payment verification failed. Invalid signature.",
        },
        { status: 400 }
      );
    }

    // If verified, update registration in database
    if (ticketId) {
      await updateRegistrationPayment(ticketId, payment_id, "CONFIRMED");
    }

    const updatedRecord = ticketId ? await findRegistration(ticketId) : null;

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      order_id,
      payment_id,
      ticketId,
      data: updatedRecord,
    });
  } catch (err: any) {
    console.error("[Server Error in verify-payment]:", err);
    return NextResponse.json(
      { error: "Internal server error during payment verification", details: err?.message },
      { status: 500 }
    );
  }
}
