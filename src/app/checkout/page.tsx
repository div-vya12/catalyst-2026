"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Lock,
  Download,
  Calendar,
  Sparkles,
  RefreshCw,
  QrCode,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import { conferenceData, WORKSHOP_PRICES } from "@/data/conferenceData";
import { launchRazorpayCheckout } from "@/lib/razorpayClient";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ticketIdParam = searchParams.get("ticketId") || "";

  const [ticketIdInput, setTicketIdInput] = useState(ticketIdParam);
  const [ticketId, setTicketId] = useState(ticketIdParam);
  const [loading, setLoading] = useState(Boolean(ticketIdParam));
  const [registration, setRegistration] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{ paymentId?: string }>({});

  const fetchRegistration = async (id: string) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/check-registration?query=${encodeURIComponent(id)}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (res.ok && data.success && data.data) {
        setRegistration(data.data);
        if (data.data.status === "CONFIRMED" || data.data.status === "PAID") {
          setPaymentSuccess(true);
          setPaymentDetails({ paymentId: data.data.paymentId });
        }
      } else {
        setError(data.error || "No registration found for this ticket ID.");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load registration details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticketId) {
      fetchRegistration(ticketId);
    }
  }, [ticketId]);

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketIdInput.trim()) {
      setTicketId(ticketIdInput.trim());
      router.push(`/checkout?ticketId=${encodeURIComponent(ticketIdInput.trim())}`);
    }
  };

  // Resolve workshops and price breakdown
  const selectedEventIds: string[] = registration?.selectedEvents || [];
  const allEventsMap: Record<string, { name: string; dept?: string; price: number }> = {};

  conferenceData.workshops.forEach((ws) => {
    allEventsMap[ws.id] = {
      name: ws.name,
      dept: ws.department,
      price: WORKSHOP_PRICES[ws.id] || 0,
    };
  });

  conferenceData.mafia_events.events.forEach((ev) => {
    allEventsMap[ev.id] = {
      name: ev.name,
      dept: "Finance Society",
      price: WORKSHOP_PRICES[ev.id] || 0,
    };
  });

  conferenceData.academic_events.forEach((ev) => {
    allEventsMap[ev.id] = {
      name: ev.name,
      dept: "Academic Competition",
      price: 0,
    };
  });

  const orderItems = selectedEventIds.map((id) => {
    return (
      allEventsMap[id] || {
        name: id,
        dept: "Event",
        price: WORKSHOP_PRICES[id] || 0,
      }
    );
  });

  const calculatedTotal =
    registration?.amountPayable ??
    orderItems.reduce((acc, item) => acc + item.price, 0);

  const handlePayNow = () => {
    if (!registration) return;
    setIsProcessingPayment(true);

    launchRazorpayCheckout({
      ticketId: registration.ticketId,
      amount: calculatedTotal,
      fullName: registration.fullName,
      email: registration.email,
      phone: registration.phone,
      onSuccess: (data: any) => {
        setIsProcessingPayment(false);
        setPaymentSuccess(true);
        setPaymentDetails({ paymentId: data.paymentId });
        setRegistration((prev: any) => ({
          ...prev,
          status: "CONFIRMED",
          paymentId: data.paymentId,
        }));
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // confetti optional
        }
      },
      onError: (err: any) => {
        setIsProcessingPayment(false);
        alert(`Payment error: ${err?.message || "Payment was cancelled or failed."}`);
      },
      onDismiss: () => {
        setIsProcessingPayment(false);
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Navigation back */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Registration</span>
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            CATALYST 2026 Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 mb-3">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>256-bit SSL Secure Razorpay Gateway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-heading">
            Razorpay Checkout
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Complete payment for your CATALYST 2026 Clinical Workshops &amp; Events
          </p>
        </div>

        {/* Lookup Bar if no ticket ID is loaded */}
        {!ticketIdParam && !registration && (
          <div className="bg-[#11131c] border border-zinc-800 rounded-2xl p-6 mb-8 text-center">
            <h2 className="text-sm font-bold text-white mb-2">Have a Pending Registration?</h2>
            <p className="text-xs text-zinc-400 mb-4">
              Enter your Ticket ID (e.g., CAT26-XXXXXX) or Registered Email to open checkout:
            </p>
            <form onSubmit={handleLookupSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                placeholder="CAT26-XXXXXX or email"
                value={ticketIdInput}
                onChange={(e) => setTicketIdInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-black hover:bg-zinc-200 transition-colors"
              >
                Find Order
              </button>
            </form>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="bg-[#11131c] border border-zinc-800 rounded-2xl p-12 text-center">
            <RefreshCw className="w-6 h-6 text-zinc-400 animate-spin mx-auto mb-3" />
            <p className="text-xs text-zinc-400">Loading order details...</p>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="block text-white font-semibold">Order Not Found</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Main Checkout Box */}
        {registration && !loading && (
          <div className="space-y-6">
            {/* Payment Verified State */}
            {paymentSuccess ? (
              <div className="bg-[#11131c] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 text-center animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">Payment Confirmed!</h2>
                <p className="text-xs text-zinc-400 mb-6">
                  Your registration and workshop seats for CATALYST 2026 are fully confirmed.
                </p>

                <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6 text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400">
                      DELEGATE PASS
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {registration.ticketId}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">{registration.fullName}</h3>
                    <p className="text-xs text-zinc-400">{registration.college}</p>
                    <p className="text-xs text-zinc-500">{registration.yearOfStudy}</p>
                  </div>

                  <div className="pt-2 border-t border-zinc-800 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Amount Paid</span>
                      <span className="text-emerald-400 font-bold">₹{calculatedTotal}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Payment ID</span>
                      <span className="font-mono text-[11px] text-zinc-300 block truncate">
                        {paymentDetails.paymentId || registration.paymentId || "Verified"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors"
                  >
                    Return to Home
                  </Link>
                  <button
                    onClick={() => window.print()}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Order Review & Pay */
              <div className="bg-[#11131c] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                {/* Delegate Snapshot */}
                <div className="border-b border-zinc-800 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                      Delegate Order Review
                    </span>
                    <h2 className="text-xl font-bold text-white">{registration.fullName}</h2>
                    <p className="text-xs text-zinc-400">{registration.college}</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-zinc-500 block">TICKET ID</span>
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700 text-white inline-block">
                      {registration.ticketId}
                    </span>
                  </div>
                </div>

                {/* Selected Workshops Itemized Table */}
                <div className="space-y-4 mb-6">
                  <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                    Selected Workshops &amp; Events
                  </span>

                  <div className="space-y-2">
                    {orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-semibold text-white block">{item.name}</span>
                          <span className="text-[11px] text-zinc-500">{item.dept}</span>
                        </div>
                        <span className="font-bold text-white">
                          {item.price === 0 ? "FREE" : `₹${item.price}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total Summary */}
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 mb-6 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">₹{calculatedTotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Platform Convenience Fee</span>
                    <span className="text-emerald-400 font-medium">Waived (₹0)</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-sm">
                    <strong className="text-white font-bold">Total Amount Payable</strong>
                    <strong className="text-lg font-black text-emerald-400">
                      ₹{calculatedTotal}
                    </strong>
                  </div>
                </div>

                {/* Razorpay Checkout Trigger */}
                <div className="space-y-3">
                  <button
                    onClick={handlePayNow}
                    disabled={isProcessingPayment}
                    className="w-full py-4 rounded-xl text-sm font-bold bg-white text-black hover:bg-zinc-200 transition-all flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-50 active:scale-[0.99]"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>
                      {isProcessingPayment
                        ? "Opening Razorpay Gateway..."
                        : `Pay ₹${calculatedTotal} with Razorpay`}
                    </span>
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-500 pt-2">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Razorpay Verified</span>
                    </span>
                    <span>•</span>
                    <span>UPI, Debit/Credit Card, NetBanking</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090a0f] flex items-center justify-center text-zinc-400 text-xs">
          Loading checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
