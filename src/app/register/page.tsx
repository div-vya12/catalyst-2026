"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CreditCard,
  User,
  Building,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Download,
  QrCode,
  Calendar,
} from "lucide-react";
import confetti from "canvas-confetti";
import { conferenceData } from "@/data/conferenceData";

export default function RegisterPage() {
  const [delegateType, setDelegateType] = useState<"maulanian" | "non-maulanian">("maulanian");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState(
    delegateType === "maulanian" ? "Maulana Azad Medical College (MAMC)" : ""
  );
  const [yearOfStudy, setYearOfStudy] = useState("1st Professional MBBS");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredPass, setRegisteredPass] = useState<any | null>(null);

  const toggleEvent = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const calculateTotal = () => {
    let total = 0;
    const isMAMC = delegateType === "maulanian";

    const workshopCount = selectedEvents.filter((id) =>
      conferenceData.workshops.some((w) => w.id === id)
    ).length;

    selectedEvents.forEach((id) => {
      if (id === "the-boardroom") total += 99;
      if (id === "business-bootcamp") total += 349;
      if (id === "venture-wars") total += 249;
      if (id === "medventure") total += isMAMC ? 0 : 50;
      if (id === "rickthinking-reviews") total += isMAMC ? 0 : 50;
      if (id === "molecules-in-motion") {
        total += workshopCount >= 2 ? 0 : 100;
      }
    });

    return total;
  };

  const totalFee = calculateTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !college) {
      alert("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          college,
          yearOfStudy,
          delegateType,
          selectedEvents,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setRegisteredPass(json.data);
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      } else {
        alert(json.error || "Failed to process registration");
      }
    } catch (err: any) {
      // Offline / fallback simulated pass
      const fallbackTicketId = `CAT26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setRegisteredPass({
        ticketId: fallbackTicketId,
        fullName,
        email,
        phone,
        college,
        yearOfStudy,
        delegateType,
        selectedEvents,
        amountPayable: totalFee,
        status: totalFee === 0 ? "CONFIRMED" : "PENDING_PAYMENT",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to CATALYST 2026 Home</span>
        </Link>

        {!registeredPass ? (
          <div className="bg-[#11131c] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {/* Header */}
            <div className="border-b border-zinc-800 pb-5 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block mb-1">
                Official Registration
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                CATALYST 2026 Registration
              </h1>
              <p className="text-xs text-zinc-400">
                Maulana Azad Medical College (MAMC), New Delhi • 18th – 20th November 2026
              </p>
            </div>

            {/* Delegate Type Switcher */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => {
                  setDelegateType("maulanian");
                  setCollege("Maulana Azad Medical College (MAMC)");
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  delegateType === "maulanian"
                    ? "bg-zinc-800/90 border-white text-white"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-xs sm:text-sm">Maulanian</span>
                  {delegateType === "maulanian" && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <p className="text-[11px] text-zinc-400">Current MAMC student / intern</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDelegateType("non-maulanian");
                  setCollege("");
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  delegateType === "non-maulanian"
                    ? "bg-zinc-800/90 border-white text-white"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-xs sm:text-sm">Non-Maulanian</span>
                  {delegateType === "non-maulanian" && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <p className="text-[11px] text-zinc-400">Other medical colleges across India</p>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Details */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  1. Participant Information
                </span>

                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Dr. / Student Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-zinc-300 block mb-1">Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="you@college.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-300 block mb-1">Mobile / WhatsApp</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Medical College / Hospital</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Name of your medical institution"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Year of Study</label>
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-zinc-500"
                  >
                    <option>1st Professional MBBS</option>
                    <option>2nd Professional MBBS</option>
                    <option>3rd Professional (Part 1) MBBS</option>
                    <option>3rd Professional (Part 2 / Final) MBBS</option>
                    <option>Compulsory Rotatory Medical Intern</option>
                    <option>Postgraduate Resident (MD/MS)</option>
                  </select>
                </div>
              </div>

              {/* Event selection */}
              <div className="space-y-3 pt-3 border-t border-zinc-800">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  2. Select Events &amp; Workshops
                </span>

                <div className="grid grid-cols-1 gap-2 text-xs">
                  {/* MAFIA */}
                  <div
                    onClick={() => toggleEvent("the-boardroom")}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                      selectedEvents.includes("the-boardroom")
                        ? "bg-zinc-800 border-white text-white"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <div>
                      <span className="font-medium text-white block">The Boardroom (MAFIA)</span>
                      <span className="text-[11px] text-zinc-500">18th Nov • Problem-solving GD &amp; PI</span>
                    </div>
                    <span className="font-semibold text-zinc-200">₹99</span>
                  </div>

                  <div
                    onClick={() => toggleEvent("business-bootcamp")}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                      selectedEvents.includes("business-bootcamp")
                        ? "bg-zinc-800 border-white text-white"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <div>
                      <span className="font-medium text-white block">Business Bootcamp for Medicos</span>
                      <span className="text-[11px] text-zinc-500">19th &amp; 20th Nov • Clinic &amp; Startup Plan</span>
                    </div>
                    <span className="font-semibold text-zinc-200">₹349</span>
                  </div>

                  <div
                    onClick={() => toggleEvent("venture-wars")}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                      selectedEvents.includes("venture-wars")
                        ? "bg-zinc-800 border-white text-white"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <div>
                      <span className="font-medium text-white block">Venture Wars</span>
                      <span className="text-[11px] text-zinc-500">20th Nov • Startup Strategy Battle</span>
                    </div>
                    <span className="font-semibold text-zinc-200">₹249/team</span>
                  </div>

                  {/* Academic Events with policy pricing */}
                  <div
                    onClick={() => toggleEvent("medventure")}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                      selectedEvents.includes("medventure")
                        ? "bg-zinc-800 border-white text-white"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <div>
                      <span className="font-medium text-white block">MedVenture (Medical Game Show)</span>
                      <span className="text-[11px] text-zinc-500">18th Nov • ER House simulation</span>
                    </div>
                    <span className="font-semibold text-zinc-200">
                      {delegateType === "maulanian" ? "FREE" : "₹50"}
                    </span>
                  </div>

                  <div
                    onClick={() => toggleEvent("rickthinking-reviews")}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                      selectedEvents.includes("rickthinking-reviews")
                        ? "bg-zinc-800 border-white text-white"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <div>
                      <span className="font-medium text-white block">RickThinking Reviews</span>
                      <span className="text-[11px] text-zinc-500">Online • Creative Ideation</span>
                    </div>
                    <span className="font-semibold text-zinc-200">
                      {delegateType === "maulanian" ? "FREE" : "₹50"}
                    </span>
                  </div>

                  <div
                    onClick={() => toggleEvent("molecules-in-motion")}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                      selectedEvents.includes("molecules-in-motion")
                        ? "bg-zinc-800 border-white text-white"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <div>
                      <span className="font-medium text-white block">Molecules in Motion (Biochemistry)</span>
                      <span className="text-[11px] text-zinc-500">FREE if 2+ workshops, else ₹100</span>
                    </div>
                    <span className="font-semibold text-zinc-200">Bundle Rule</span>
                  </div>
                </div>
              </div>

              {/* Total & Submit Button */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-zinc-500 uppercase block">Total Amount</span>
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    {totalFee === 0 ? "FREE" : `₹${totalFee}`}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white text-black hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{isSubmitting ? "Processing..." : "Complete Registration"}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="bg-[#11131c] border border-zinc-800 rounded-2xl p-6 sm:p-8 text-center animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">Registration Successful</h2>
            <p className="text-xs text-zinc-400 mb-6">
              Your delegate pass has been issued for CATALYST 2026 at Maulana Azad Medical College.
            </p>

            <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6 text-left space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400">
                  CATALYST 2026 DELEGATE PASS
                </span>
                <span className="font-mono text-xs font-bold text-emerald-400">
                  {registeredPass.ticketId}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{registeredPass.fullName}</h3>
                <p className="text-xs text-zinc-400">{registeredPass.college}</p>
                <p className="text-xs text-zinc-500">{registeredPass.yearOfStudy}</p>
              </div>

              <div className="pt-2 border-t border-zinc-800 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 block">Dates</span>
                  <span className="text-zinc-300 font-medium">18th – 20th Nov 2026</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">Category</span>
                  <span className="text-zinc-300 font-medium capitalize">
                    {registeredPass.delegateType}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => alert("Downloading pass PDF...")}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Pass</span>
              </button>
              <Link
                href="/"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
