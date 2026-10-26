/**
 * Razorpay Standard Web Checkout Client
 * Dynamic script injection, order creation, modal checkout & signature verification
 */

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay Checkout script.");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export interface RazorpayCheckoutOptions {
  ticketId?: string;
  amount: number; // in INR (e.g. 399)
  fullName?: string;
  email?: string;
  phone?: string;
  onSuccess: (data: any) => void;
  onError: (err: any) => void;
  onDismiss?: () => void;
}

export const launchRazorpayCheckout = async ({
  ticketId = "",
  amount,
  fullName = "Delegate",
  email = "delegate@mamc.ac.in",
  phone = "",
  onSuccess,
  onError,
  onDismiss,
}: RazorpayCheckoutOptions) => {
  try {
    const amountInPaise = Math.round(amount * 100);

    // 1. Create order on backend: POST /api/create-order
    const orderRes = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        receipt: ticketId ? `rcpt_${ticketId}` : `rcpt_${Date.now()}`,
        ticketId,
      }),
    });

    const orderData = await orderRes.json();
    if (!orderRes.ok || !orderData.order_id && !orderData.orderId) {
      throw new Error(orderData.error || orderData.details || "Failed to create payment order");
    }

    const orderId = orderData.order_id || orderData.orderId;
    const keyId =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      orderData.key_id ||
      orderData.keyId ||
      "rzp_test_TsQizXRHi41jue";

    // 2. Ensure Razorpay script is loaded
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded || !window.Razorpay) {
      throw new Error("Unable to load Razorpay checkout SDK. Please check your internet connection.");
    }

    // 3. Configure Razorpay modal options
    const options = {
      key: keyId,
      amount: orderData.amount,
      currency: orderData.currency || "INR",
      name: "CATALYST 2026",
      description: "MAMC Clinical Workshops & Delegate Registration",
      image: "/logo.png",
      order_id: orderId,
      prefill: {
        name: fullName,
        email: email,
        contact: phone,
      },
      theme: {
        color: "#090a0f",
      },
      modal: {
        ondismiss: function () {
          console.log("[Razorpay] Checkout modal dismissed by user");
          if (onDismiss) onDismiss();
        },
      },
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        try {
          // 4. Send signatures to verification endpoint: POST /api/verify-payment
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ticketId,
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            onSuccess(verifyData);
          } else {
            onError(new Error(verifyData.error || "Payment verification failed"));
          }
        } catch (err: any) {
          onError(err);
        }
      },
    };

    const rzp = new window.Razorpay(options);

    // 5. Handle payment failure event
    rzp.on("payment.failed", function (response: any) {
      const errorDescription =
        response?.error?.description ||
        response?.error?.reason ||
        "Payment transaction failed or was declined.";
      console.error("[Razorpay Payment Failed]:", response?.error);
      onError(new Error(errorDescription));
    });

    rzp.open();
  } catch (err: any) {
    console.error("[Razorpay Launch Error]:", err);
    onError(err);
  }
};
