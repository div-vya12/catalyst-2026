"use client";

import React, { useState } from "react";
import { CreditCard, Loader2, AlertCircle } from "lucide-react";
import { launchRazorpayCheckout } from "@/lib/razorpayClient";

interface RazorpayCheckoutButtonProps {
  ticketId?: string;
  amount: number; // in INR (e.g., 399) or in paise
  amountInPaise?: boolean;
  fullName?: string;
  email?: string;
  phone?: string;
  buttonText?: string;
  className?: string;
  onSuccess?: (paymentData: any) => void;
  onError?: (error: any) => void;
  onDismiss?: () => void;
}

export const RazorpayCheckoutButton: React.FC<RazorpayCheckoutButtonProps> = ({
  ticketId = "",
  amount,
  amountInPaise = false,
  fullName = "Delegate",
  email = "delegate@mamc.ac.in",
  phone = "9999999999",
  buttonText,
  className = "",
  onSuccess,
  onError,
  onDismiss,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Normalize amount to INR rupees for the helper
  const amountInRupees = amountInPaise ? Math.round(amount / 100) : amount;

  const handlePayment = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    await launchRazorpayCheckout({
      ticketId,
      amount: amountInRupees,
      fullName,
      email,
      phone,
      onSuccess: (data) => {
        setIsLoading(false);
        if (onSuccess) onSuccess(data);
      },
      onError: (err) => {
        setIsLoading(false);
        const msg = err?.message || "Payment was cancelled or failed.";
        setErrorMessage(msg);
        if (onError) onError(err);
      },
      onDismiss: () => {
        setIsLoading(false);
        if (onDismiss) onDismiss();
      },
    });
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handlePayment}
        disabled={isLoading}
        className={
          className ||
          "w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-white text-black hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 active:scale-[0.99]"
        }
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Connecting to Razorpay...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            <span>{buttonText || `Pay ₹${amountInRupees} with Razorpay`}</span>
          </>
        )}
      </button>

      {errorMessage && (
        <div className="mt-2 p-2.5 rounded-lg bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
