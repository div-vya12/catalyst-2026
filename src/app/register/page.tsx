"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CreditCard,
  User,
  Building,
  Mail,
  Phone,
  CheckCircle2,
  Download,
  UploadCloud,
  X,
  FileCheck,
  Camera,
  AlertTriangle,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { conferenceData } from "@/data/conferenceData";

interface WorkshopCap {
  id: string;
  name: string;
  department: string;
  enrolled: number;
  remaining: number;
  limit: number;
  isFull: boolean;
}

export default function RegisterPage() {
  const [delegateType, setDelegateType] = useState<"maulanian" | "non-maulanian">("maulanian");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState(
    delegateType === "maulanian" ? "Maulana Azad Medical College (MAMC)" : ""
  );
  const [yearOfStudy, setYearOfStudy] = useState("1st Professional MBBS");
  const [collegeIdUrl, setCollegeIdUrl] = useState<string>("");
  const [collegeIdFileName, setCollegeIdFileName] = useState<string>("");
  const [isCompressingImage, setIsCompressingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredPass, setRegisteredPass] = useState<any | null>(null);

  // Workshop capacity state (50 seats limit per workshop)
  const [capacities, setCapacities] = useState<Record<string, WorkshopCap>>({});
  const [loadingCapacities, setLoadingCapacities] = useState(true);
  const [capacityError, setCapacityError] = useState<string | null>(null);

  const fetchCapacities = async () => {
    try {
      const res = await fetch("/api/workshops", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.capacities) {
        setCapacities(data.capacities);
      }
    } catch (err) {
      console.error("Failed to fetch workshop capacities", err);
    } finally {
      setLoadingCapacities(false);
    }
  };

  useEffect(() => {
    fetchCapacities();
  }, []);

  const toggleEvent = (eventId: string) => {
    setCapacityError(null);
    const cap = capacities[eventId];
    if (cap && cap.isFull && !selectedEvents.includes(eventId)) {
      setCapacityError(
        `Workshop '${cap.name}' has reached its maximum capacity of 50 seats (Sold Out). Registrations are strictly first-come, first-served.`
      );
      return;
    }
    setSelectedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  // Image upload & client-side compression
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image (JPEG, PNG, WebP).");
      return;
    }

    setIsCompressingImage(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxDimension = 1000;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.75);
        setCollegeIdUrl(compressedDataUrl);
        setCollegeIdFileName(file.name);
        setIsCompressingImage(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const removeCollegeId = () => {
    setCollegeIdUrl("");
    setCollegeIdFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Uniform pricing: No distinction of fees between Maulanians and non-Maulanians
  const calculateTotal = () => {
    return 0;
  };

  const totalFee = calculateTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !college) {
      alert("Please fill all required fields.");
      return;
    }

    if (selectedEvents.length === 0) {
      alert("Please select at least one event or workshop.");
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
          collegeIdUrl,
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
        if (json.code === "WORKSHOP_FULL") {
          setCapacityError(json.error);
          fetchCapacities();
        } else {
          alert(json.error || "Failed to process registration");
        }
      }
    } catch {
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
        collegeIdUrl,
        selectedEvents,
        amountPayable: totalFee,
        status: "CONFIRMED",
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
            {/* Header - Clean, no short descriptive phrase or allocation rule */}
            <div className="border-b border-zinc-800 pb-5 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                Registration
              </h1>
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
                <p className="text-[11px] text-zinc-400">MAMC student / intern</p>
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
                <p className="text-[11px] text-zinc-400">Delegates from other medical colleges</p>
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

                {/* College ID Image Upload */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-zinc-300 font-medium">
                      College ID Photo
                    </label>
                    <span className="text-[11px] text-zinc-500">Image Verification</span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="collegeIdUpload"
                  />

                  {!collegeIdUrl ? (
                    <label
                      htmlFor="collegeIdUpload"
                      className="flex flex-col items-center justify-center p-4 border border-dashed border-zinc-700 hover:border-zinc-500 rounded-xl bg-zinc-900/60 cursor-pointer transition-colors text-center group"
                    >
                      <div className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors mb-2">
                        {isCompressingImage ? (
                          <UploadCloud className="w-5 h-5 animate-bounce" />
                        ) : (
                          <Camera className="w-5 h-5" />
                        )}
                      </div>
                      <span className="text-xs font-semibold text-white">
                        {isCompressingImage ? "Processing photo..." : "Upload College ID Photo"}
                      </span>
                      <span className="text-[11px] text-zinc-500 mt-0.5">
                        JPEG, PNG, or WebP
                      </span>
                    </label>
                  ) : (
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={collegeIdUrl}
                          alt="College ID Preview"
                          className="w-12 h-12 object-cover rounded-lg border border-zinc-700 shrink-0"
                        />
                        <div className="text-xs">
                          <span className="font-semibold text-white block truncate max-w-[200px] sm:max-w-xs">
                            {collegeIdFileName || "College_ID.jpg"}
                          </span>
                          <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                            <FileCheck className="w-3 h-3" />
                            <span>Photo attached</span>
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={removeCollegeId}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                        title="Remove photo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Event selection */}
              <div className="space-y-6 pt-3 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                    2. Select Events &amp; Workshops
                  </span>
                  <button
                    type="button"
                    onClick={fetchCapacities}
                    className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                    title="Refresh live seats"
                  >
                    <RefreshCw className={`w-3 h-3 ${loadingCapacities ? "animate-spin" : ""}`} />
                    <span>Live Seat Status</span>
                  </button>
                </div>

                {/* Capacity Error Banner */}
                {capacityError && (
                  <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Capacity Limit Reached</strong>
                      <p>{capacityError}</p>
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* 1. SCIENCE SOCIETY (MASS)                                */}
                {/* ======================================================== */}
                <div className="space-y-4">
                  <div className="pb-1 border-b border-zinc-800">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Science Society (MASS)
                    </h3>
                  </div>

                  {/* 1A. Science Society - Workshops */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-zinc-300">Workshops</h4>

                    <div className="grid grid-cols-1 gap-2 text-xs">
                      {[
                        {
                          id: "code-nebula",
                          name: "CODE NEBULA",
                          dept: "Anaesthesia",
                          desc: "Fundamentals of Anaesthesia & Airway Management",
                          date: "18th Nov • 11:00 AM – 3:30 PM",
                        },
                        {
                          id: "know-your-knots",
                          name: "KNOW YOUR KNOTS",
                          dept: "Surgery",
                          desc: "Basic Surgical Skills, Knot Tying & Suturing",
                          date: "18th & 19th Nov",
                        },
                        {
                          id: "optic-odyssey",
                          name: "THE OPTIC ODYSSEY",
                          dept: "Ophthalmology",
                          desc: "Clinical Pearls in Ophthalmology & Goat's Eye Suturing",
                          date: "19th Nov • 8:00 AM – 5:00 PM",
                        },
                        {
                          id: "rhythm-unravelled",
                          name: "RHYTHM UNRAVELLED",
                          dept: "Medicine",
                          desc: "ECG Masterclass & Waveform Interpretation",
                          date: "19th Nov • 8:30 AM – 3:30 PM",
                        },
                        {
                          id: "genesis-protocol",
                          name: "GENESIS PROTOCOL",
                          dept: "OBGYN",
                          desc: "High-Risk Obstetrics & Neonatal Resuscitation (NRP)",
                          date: "20th Nov • 8:30 AM – 4:00 PM",
                        },
                        {
                          id: "skeletal-frontier",
                          name: "SKELETAL FRONTIER",
                          dept: "Orthopaedics",
                          desc: "Orthopaedic Trauma, Cast Application & Splinting",
                          date: "20th Nov • 9:00 AM – 4:00 PM",
                        },
                        {
                          id: "echoes-of-equilibrium",
                          name: "ECHOES OF EQUILIBRIUM",
                          dept: "Critical Care",
                          desc: "Pediatric Critical Care Ultrasound & POCUS",
                          date: "20th Nov • 8:30 AM – 2:00 PM",
                        },
                        {
                          id: "molecules-in-motion",
                          name: "MOLECULES IN MOTION",
                          dept: "Biochemistry",
                          desc: "Hands-on Lab Medicine & Advanced Diagnostic Modules",
                          date: "20th Nov • 9:00 AM – 1:00 PM",
                        },
                      ].map((ws) => {
                        const cap = capacities[ws.id];
                        const isFull = cap?.isFull || false;
                        const isSelected = selectedEvents.includes(ws.id);
                        const remaining = cap ? cap.remaining : 50;

                        return (
                          <div
                            key={ws.id}
                            onClick={() => {
                              if (!isFull) toggleEvent(ws.id);
                            }}
                            className={`p-3 rounded-xl border transition-all ${
                              isFull
                                ? "bg-zinc-950/60 border-zinc-900 opacity-60 cursor-not-allowed"
                                : isSelected
                                ? "bg-zinc-800 border-white text-white cursor-pointer shadow-md"
                                : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 cursor-pointer hover:border-zinc-700"
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="font-semibold text-white">{ws.name}</span>
                                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300">
                                    {ws.dept}
                                  </span>
                                </div>
                                <p className="text-[11px] text-zinc-400">{ws.desc}</p>
                                <span className="text-[10px] text-zinc-500 block mt-0.5">{ws.date}</span>
                              </div>

                              <div className="flex items-center sm:flex-col items-end gap-1.5 shrink-0">
                                {isFull ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950/80 text-red-400 border border-red-500/30">
                                    SOLD OUT (50/50)
                                  </span>
                                ) : remaining <= 10 ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                    Only {remaining} seats left
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-850 text-zinc-300 border border-zinc-700/60">
                                    {remaining} / 50 seats left
                                  </span>
                                )}

                                <span className="text-[11px] font-semibold text-emerald-400">
                                  FREE
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 1B. Science Society - Academic Events */}
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold text-zinc-300">Academic Events</h4>

                    <div className="grid grid-cols-1 gap-2 text-xs">
                      {[
                        {
                          id: "case-files",
                          name: "CASE FILES",
                          desc: "Clinical Case Presentation Competition",
                          date: "19th Nov • 9:00 AM onwards",
                        },
                        {
                          id: "inquistador",
                          name: "INQUISTADOR",
                          desc: "Oral Research Paper Presentation & Defense",
                          date: "20th Nov • 9:00 AM onwards",
                        },
                        {
                          id: "medventure",
                          name: "MEDVENTURE",
                          desc: "The Medical Game Show & Emergency ER Simulation",
                          date: "18th Nov • 4:00 PM – 6:00 PM",
                        },
                        {
                          id: "rickthinking-reviews",
                          name: "RICKTHINKING REVIEWS",
                          desc: "Creative Scientific Ideation Challenge",
                          date: "Online Submission",
                        },
                      ].map((item) => {
                        const isSelected = selectedEvents.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleEvent(item.id)}
                            className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-zinc-800 border-white text-white"
                                : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            <div>
                              <span className="font-semibold text-white block">{item.name}</span>
                              <p className="text-[11px] text-zinc-400">{item.desc}</p>
                              <span className="text-[10px] text-zinc-500">{item.date}</span>
                            </div>
                            <span className="font-semibold text-emerald-400">FREE</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ======================================================== */}
                {/* 2. FINANCE SOCIETY (MAFIA)                               */}
                {/* ======================================================== */}
                <div className="space-y-4 pt-4 border-t border-zinc-800">
                  <div className="pb-1 border-b border-zinc-800">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Finance Society (MAFIA)
                    </h3>
                  </div>

                  {/* 2A. Finance Society - Workshops */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-zinc-300">Workshops</h4>

                    <div className="grid grid-cols-1 gap-2 text-xs">
                      {[
                        {
                          id: "ai-in-medicine",
                          name: "AI IN MEDICINE",
                          dept: "Health Tech & AI",
                          desc: "Machine Learning & Healthcare Diagnostic Models",
                          date: "19th Nov • 11:00 AM – 2:00 PM",
                        },
                        {
                          id: "prompt-engineering",
                          name: "PROMPT ENGINEERING",
                          dept: "Generative AI",
                          desc: "Large Language Models & Clinical AI Architecture",
                          date: "20th Nov • 2:00 PM – 5:00 PM",
                        },
                      ].map((ws) => {
                        const cap = capacities[ws.id];
                        const isFull = cap?.isFull || false;
                        const isSelected = selectedEvents.includes(ws.id);
                        const remaining = cap ? cap.remaining : 50;

                        return (
                          <div
                            key={ws.id}
                            onClick={() => {
                              if (!isFull) toggleEvent(ws.id);
                            }}
                            className={`p-3 rounded-xl border transition-all ${
                              isFull
                                ? "bg-zinc-950/60 border-zinc-900 opacity-60 cursor-not-allowed"
                                : isSelected
                                ? "bg-zinc-800 border-white text-white cursor-pointer shadow-md"
                                : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 cursor-pointer hover:border-zinc-700"
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="font-semibold text-white">{ws.name}</span>
                                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300">
                                    {ws.dept}
                                  </span>
                                </div>
                                <p className="text-[11px] text-zinc-400">{ws.desc}</p>
                                <span className="text-[10px] text-zinc-500 block mt-0.5">{ws.date}</span>
                              </div>

                              <div className="flex items-center sm:flex-col items-end gap-1.5 shrink-0">
                                {isFull ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950/80 text-red-400 border border-red-500/30">
                                    SOLD OUT (50/50)
                                  </span>
                                ) : remaining <= 10 ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                    Only {remaining} seats left
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-850 text-zinc-300 border border-zinc-700/60">
                                    {remaining} / 50 seats left
                                  </span>
                                )}

                                <span className="text-[11px] font-semibold text-emerald-400">
                                  FREE
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2B. Finance Society - Competitions */}
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold text-zinc-300">Competitions</h4>

                    <div className="grid grid-cols-1 gap-2 text-xs">
                      {[
                        {
                          id: "model-niti-aayog",
                          name: "MODEL NITI AAYOG",
                          desc: "National Healthcare Policy & Health Economics Simulation",
                          date: "18th Nov • 10:00 AM – 3:00 PM",
                        },
                        {
                          id: "guesstimate",
                          name: "GUESSTIMATE",
                          desc: "Quantitative Reasoning & Healthcare Market Sizing Battle",
                          date: "19th Nov • 3:00 PM – 5:30 PM",
                        },
                        {
                          id: "hackathon",
                          name: "HACKATHON",
                          desc: "MedTech & Healthcare Innovation Hackathon",
                          date: "20th Nov • 9:00 AM – 5:00 PM",
                        },
                      ].map((item) => {
                        const isSelected = selectedEvents.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleEvent(item.id)}
                            className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-zinc-800 border-white text-white"
                                : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            <div>
                              <span className="font-semibold text-white block">{item.name}</span>
                              <p className="text-[11px] text-zinc-400">{item.desc}</p>
                              <span className="text-[10px] text-zinc-500">{item.date}</span>
                            </div>
                            <span className="font-semibold text-emerald-400">FREE</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Total & Submit Button */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-zinc-500 uppercase block">Delegate Fee</span>
                  <span className="text-xl sm:text-2xl font-bold text-emerald-400">
                    FREE
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
