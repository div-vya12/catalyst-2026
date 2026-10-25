/**
 * Razorpay Client Utility for CATALYST 2026
 * Handles dynamic script injection, order creation, and modal checkout.
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
      console.warn("Failed to load official Razorpay script.");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export interface RazorpayCheckoutOptions {
  ticketId: string;
  amount: number; // in INR
  fullName: string;
  email: string;
  phone: string;
  onSuccess: (data: any) => void;
  onError: (err: any) => void;
  onDismiss?: () => void;
}

export const launchRazorpayCheckout = async ({
  ticketId,
  amount,
  fullName,
  email,
  phone,
  onSuccess,
  onError,
  onDismiss,
}: RazorpayCheckoutOptions) => {
  try {
    // 1. Create order from backend
    const orderRes = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketId, amount }),
    });

    const orderData = await orderRes.json();
    if (!orderRes.ok || !orderData.success) {
      throw new Error(orderData.error || "Failed to initialize payment order");
    }

    // 2. Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();

    // 3. If in simulated mode or script failed, offer simulated checkout
    if (orderData.isSimulated || !scriptLoaded || !window.Razorpay) {
      console.info("[Razorpay Notice] Operating in simulation mode:", orderData.message);
      
      const confirmSimulated = window.confirm(
        `[Razorpay Demo Mode]\n\nTicket: ${ticketId}\nDelegate: ${fullName}\nAmount: ₹${amount}\n\nClick OK to simulate successful payment, or Cancel to abort.`
      );

      if (confirmSimulated) {
        const simulatedPaymentId = `pay_sim_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ticketId,
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: simulatedPaymentId,
            razorpay_signature: "simulated_valid_signature",
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyRes.ok && verifyData.success) {
          onSuccess(verifyData);
        } else {
          onError(new Error(verifyData.error || "Verification failed"));
        }
      } else {
        if (onDismiss) onDismiss();
      }
      return;
    }

    // 4. Launch Official Razorpay Modal
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency || "INR",
      name: "CATALYST 2026",
      description: "MAMC Clinical Workshop & Delegate Registration",
      image: "/logo.png",
      order_id: orderData.orderId,
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
          if (onDismiss) onDismiss();
        },
      },
      handler: async function (response: any) {
        try {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ticketId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            onSuccess(verifyData);
          } else {
            onError(new Error(verifyData.error || "Payment signature verification failed"));
          }
        } catch (err: any) {
          onError(err);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response: any) {
      onError(new Error(response?.error?.description || "Payment transaction failed"));
    });
    rzp.open();
  } catch (err: any) {
    console.error("Razorpay checkout launch error:", err);
    onError(err);
  }
};
