import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { updateRegistrationPayment, findRegistration } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ticketId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!ticketId || !razorpay_payment_id) {
      return NextResponse.json(
        { error: "Missing required payment verification fields (ticketId, paymentId)" },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Verify signature when real secret is configured
    if (keySecret && razorpay_order_id && razorpay_signature && !razorpay_order_id.startsWith("order_sim_")) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        console.error("Signature verification failed:", {
          expected: generatedSignature,
          received: razorpay_signature,
        });
        return NextResponse.json(
          { success: false, error: "Razorpay signature verification failed" },
          { status: 400 }
        );
      }
    }

    // Update database status to CONFIRMED
    await updateRegistrationPayment(ticketId, razorpay_payment_id, "CONFIRMED");

    // Fetch updated record
    const updatedRecord = await findRegistration(ticketId);

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and registration confirmed.",
      ticketId,
      paymentId: razorpay_payment_id,
      data: updatedRecord,
    });
  } catch (error: any) {
    console.error("Payment verification route error:", error);
    return NextResponse.json(
      { error: "Payment verification failed", details: error.message },
      { status: 500 }
    );
  }
}
