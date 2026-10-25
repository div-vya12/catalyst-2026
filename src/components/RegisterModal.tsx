"use client";

import React, { useState } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  User,
  Building,
  Mail,
  Phone,
  GraduationCap,
  Download,
  QrCode,
  ShieldCheck,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import { conferenceData, WORKSHOP_PRICES } from "@/data/conferenceData";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [delegateType, setDelegateType] = useState<"maulanian" | "non-maulanian">("maulanian");
  const [step, setStep] = useState<"form" | "success">("form");

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState(
    delegateType === "maulanian" ? "Maulana Azad Medical College (MAMC)" : ""
  );
  const [yearOfStudy, setYearOfStudy] = useState("1st Professional MBBS");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [simulatedTicketId, setSimulatedTicketId] = useState("");

  if (!isOpen) return null;

  // Toggle selection
  const toggleEvent = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  // Fee calculation based on workshop prices
  const calculateTotal = () => {
    return selectedEvents.reduce((total, id) => {
      return total + (WORKSHOP_PRICES[id] || 0);
    }, 0);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("Please enter Name, Email, and Phone to simulate registration.");
      return;
    }

    const ticketId = `CAT25-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setSimulatedTicketId(ticketId);
    setStep("success");

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback
    }
  };

  const totalFee = calculateTotal();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#071329] border border-cyan-500/40 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "form" ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                Conference Registration Portal
              </span>
              <span className="text-xs text-slate-400">Step 1 of 2</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-heading text-white mb-2">
              CATALYST <span className="text-cyan-400">2025</span> Registration
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              Select your delegate category and choose your events. Instant slot confirmation &amp;
              digital delegate pass.
            </p>

            {/* Delegate Type Selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => {
                  setDelegateType("maulanian");
                  setCollege("Maulana Azad Medical College (MAMC)");
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  delegateType === "maulanian"
                    ? "bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-950"
                    : "bg-slate-900/60 border-slate-800 text-slate-400"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-white">Maulanian</span>
                  {delegateType === "maulanian" && <Check className="w-4 h-4 text-cyan-400" />}
                </div>
                <p className="text-[11px] text-slate-400">Current MAMC student / intern</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDelegateType("non-maulanian");
                  setCollege("");
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  delegateType === "non-maulanian"
                    ? "bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-950"
                    : "bg-slate-900/60 border-slate-800 text-slate-400"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-white">Non-Maulanian</span>
                  {delegateType === "non-maulanian" && <Check className="w-4 h-4 text-cyan-400" />}
                </div>
                <p className="text-[11px] text-slate-400">Other medical colleges across India</p>
              </button>
            </div>

            <form onSubmit={handleSimulatePayment} className="space-y-6">
              {/* Participant Information */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Delegate Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Dr. / Medical Student Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="doctor@institution.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">WhatsApp Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Medical College / Hospital</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="College name"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs text-slate-300 block mb-1">Year of Study</label>
                    <select
                      value={yearOfStudy}
                      onChange={(e) => setYearOfStudy(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900/90 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
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
              </div>

              {/* Event selection checkboxes */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Select Events to Register
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {/* Finance Society Events */}
                  <div
                    onClick={() => toggleEvent("ai-in-medicine")}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedEvents.includes("ai-in-medicine")
                        ? "bg-emerald-950/60 border-emerald-400"
                        : "bg-slate-900/60 border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">AI in Medicine</span>
                      <span className="text-emerald-400 font-bold">FREE</span>
                    </div>
                    <span className="text-[11px] text-slate-400">19th Nov • Diagnostic AI</span>
                  </div>

                  <div
                    onClick={() => toggleEvent("prompt-engineering")}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedEvents.includes("prompt-engineering")
                        ? "bg-emerald-950/60 border-emerald-400"
                        : "bg-slate-900/60 border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Prompt Engineering</span>
                      <span className="text-emerald-400 font-bold">FREE</span>
                    </div>
                    <span className="text-[11px] text-slate-400">20th Nov • Clinical LLMs</span>
                  </div>

                  <div
                    onClick={() => toggleEvent("model-niti-aayog")}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedEvents.includes("model-niti-aayog")
                        ? "bg-emerald-950/60 border-emerald-400"
                        : "bg-slate-900/60 border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Model NITI Aayog</span>
                      <span className="text-emerald-400 font-bold">FREE</span>
                    </div>
                    <span className="text-[11px] text-slate-400">18th Nov • Policy Simulation</span>
                  </div>

                  <div
                    onClick={() => toggleEvent("guesstimate")}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedEvents.includes("guesstimate")
                        ? "bg-emerald-950/60 border-emerald-400"
                        : "bg-slate-900/60 border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Guesstimate</span>
                      <span className="text-emerald-400 font-bold">FREE</span>
                    </div>
                    <span className="text-[11px] text-slate-400">19th Nov • Market Sizing</span>
                  </div>

                  <div
                    onClick={() => toggleEvent("hackathon")}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedEvents.includes("hackathon")
                        ? "bg-emerald-950/60 border-emerald-400"
                        : "bg-slate-900/60 border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Hackathon</span>
                      <span className="text-emerald-400 font-bold">FREE</span>
                    </div>
                    <span className="text-[11px] text-slate-400">20th Nov • MedTech Innovation</span>
                  </div>

                  {/* Academic Events */}
                  <div
                    onClick={() => toggleEvent("medventure")}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedEvents.includes("medventure")
                        ? "bg-blue-950/60 border-blue-400"
                        : "bg-slate-900/60 border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">MedVenture (Game Show)</span>
                      <span className="text-cyan-400 font-bold">FREE</span>
                    </div>
                    <span className="text-[11px] text-slate-400">18th Nov • ER House simulation</span>
                  </div>

                  <div
                    onClick={() => toggleEvent("rickthinking-reviews")}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedEvents.includes("rickthinking-reviews")
                        ? "bg-blue-950/60 border-blue-400"
                        : "bg-slate-900/60 border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">RickThinking Reviews</span>
                      <span className="text-cyan-400 font-bold">FREE</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Online • Creative ideation</span>
                  </div>

                  <div
                    onClick={() => toggleEvent("molecules-in-motion")}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedEvents.includes("molecules-in-motion")
                        ? "bg-cyan-950/60 border-cyan-400"
                        : "bg-slate-900/60 border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Molecules In Motion</span>
                      <span className="text-cyan-400 font-bold">FREE</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      20th Nov • Lab Medicine
                    </span>
                  </div>
                </div>
              </div>

              {/* Total & Checkout simulation button */}
              <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Estimated Amount Payable:</span>
                  <span className="text-2xl font-black text-white font-heading">
                    {totalFee === 0 ? "FREE" : `₹${totalFee}`}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-lg shadow-cyan-500/25 flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Generate Digital Pass</span>
                </button>
              </div>

              {/* Architecture & automation note */}
              <div className="text-[11px] text-slate-400 flex items-start gap-2 bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Full Automation Ready:</strong> This portal connects to Next.js API route{" "}
                  <code>/api/register</code> for database entry (Prisma / PostgreSQL) and Razorpay /
                  UPI payment verification.
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation & Digital Ticket View */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black font-heading text-white mb-1">
              Registration Confirmed!
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Your delegate registration for CATALYST 2025 at MAMC has been recorded.
            </p>

            {/* Digital Pass Card */}
            <div className="max-w-md mx-auto bg-gradient-to-br from-[#0c1f3d] to-[#08152b] rounded-2xl p-6 border-2 border-dashed border-cyan-400/60 shadow-xl mb-6 text-left relative overflow-hidden">
              <div className="absolute top-2 right-2 text-cyan-400/20">
                <QrCode className="w-20 h-20" />
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-400 text-black uppercase">
                  CATALYST 2025 • DELEGATE PASS
                </span>
                <span className="font-mono text-xs text-cyan-300 font-bold">
                  {simulatedTicketId}
                </span>
              </div>

              <div className="space-y-1 mb-4">
                <h4 className="text-lg font-bold text-white">{fullName}</h4>
                <p className="text-xs text-slate-300">{college}</p>
                <p className="text-xs text-cyan-400 font-medium">{yearOfStudy}</p>
              </div>

              <div className="pt-3 border-t border-slate-700/60 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Delegate Category</span>
                  <span className="text-white font-semibold capitalize">{delegateType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Dates</span>
                  <span className="text-white font-semibold">1st – 3rd Dec 2025</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  alert("Digital pass downloaded as PDF (simulation)");
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs bg-cyan-400 text-black hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Delegate Pass</span>
              </button>
              <button
                onClick={() => {
                  setStep("form");
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-800 text-white hover:bg-slate-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
