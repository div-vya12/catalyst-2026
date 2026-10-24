"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Search,
  Compass,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";
import { InteractiveCanvas } from "./InteractiveCanvas";

interface HeroProps {
  onOpenCheckRegistration: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckRegistration }) => {
  const { conference } = conferenceData;

  return (
    <section
      id="overview"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden bg-[#090a0f]"
    >
      {/* Interactive touch/cursor reactive canvas */}
      <InteractiveCanvas />

      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[220px] sm:h-[350px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Open hero container - NOT inside a card box */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs sm:text-xs font-medium tracking-wide mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{conference.institution}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">{conference.type}</span>
        </div>

        {/* Big Stylized CATALYST 2026 Heading */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter text-white uppercase mb-4 leading-[0.95] select-none">
          CATALYST{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
            2026
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xs sm:text-sm md:text-base font-semibold text-zinc-400 uppercase tracking-[0.25em] mb-4">
          {conference.tagline}
        </p>

        {/* Clean Description */}
        <p className="text-xs sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
          {conference.description}
        </p>

        {/* Dates and Venue - Subtle & Understated (Less Value) */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-zinc-400 mb-10 font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span>{conference.display_dates}</span>
          </span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span>MAMC Campus, New Delhi</span>
          </span>
        </div>

        {/* Primary Action Buttons - Highlighted & Clearly Visible */}
        <div className="w-full max-w-xl mx-auto space-y-3.5">
          {/* Main 2 CTA Buttons: Register & Explore */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
            {/* Primary Action: Register Now */}
            <Link
              href="/register"
              className="group flex items-center justify-center gap-2.5 px-8 py-4 sm:py-4.5 rounded-2xl bg-white text-black hover:bg-zinc-100 font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(255,255,255,0.22)] hover:shadow-[0_0_45px_rgba(255,255,255,0.4)] transition-all duration-200 active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 fill-black text-black group-hover:scale-110 transition-transform" />
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary Action: Explore Events */}
            <a
              href="#workshops"
              className="group flex items-center justify-center gap-2.5 px-7 py-4 sm:py-4.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-white border-2 border-zinc-700 hover:border-zinc-400 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
            >
              <Compass className="w-4 h-4 text-zinc-300 group-hover:rotate-45 transition-transform" />
              <span>Explore Events</span>
            </a>
          </div>

          {/* Tertiary Action: Check Existing Registration */}
          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={onOpenCheckRegistration}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.98]"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span>Check Existing Registration</span>
            </button>
          </div>
        </div>

        {/* Minimal Key Facts Strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
            Open to MBBS 1st Year to Interns
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
            8 Clinical Wet-Lab &amp; Simulation Workshops
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
            MASS &amp; MAFIA Official Events
          </span>
        </div>
      </div>
    </section>
  );
};
