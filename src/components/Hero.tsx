"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
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

  // Countdown timer state targeting 18th November 2026
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(`${conference.start_date}T09:00:00+05:30`).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [conference.start_date]);

  return (
    <section id="overview" className="relative min-h-[90vh] flex items-center pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden bg-[#090a0f]">
      {/* Interactive touch/cursor reactive canvas */}
      <InteractiveCanvas />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* Clean, Informative Hero Card */}
        <div className="minimal-card rounded-2xl p-6 sm:p-10 text-left border border-zinc-800 shadow-2xl">
          {/* Header pill */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-800 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {conference.type}
            </span>
            <span className="text-xs text-zinc-400">
              {conference.institution}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-2 font-heading">
            {conference.name}
          </h1>

          {/* Tagline */}
          <p className="text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">
            {conference.tagline}
          </p>

          {/* Clean Description */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 max-w-2xl">
            {conference.description}
          </p>

          {/* Conference Details Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-8 text-xs text-zinc-300">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
              <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">Dates</span>
                <span className="font-semibold text-white">{conference.display_dates}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
              <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">Venue</span>
                <span className="font-semibold text-white">MAMC Campus, New Delhi</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
              <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">Countdown</span>
                <span className="font-semibold text-white font-mono">
                  {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </span>
              </div>
            </div>
          </div>

          {/* 3 Prominent Landing Options */}
          <div className="border-t border-zinc-800 pt-6">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block mb-3">
              Conference Access
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option 1: Primary Action -> Register */}
              <Link
                href="/register"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all font-semibold text-xs sm:text-sm shadow-md active:scale-[0.98]"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 fill-black" />
                  <span>Register Now</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Option 2: Explore */}
              <a
                href="#workshops"
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:border-zinc-500 text-zinc-200 transition-all font-semibold text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-zinc-400" />
                  <span>Explore Events</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-normal">8 Workshops</span>
              </a>

              {/* Option 3: Check Existing Registration */}
              <button
                type="button"
                onClick={onOpenCheckRegistration}
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:border-zinc-500 text-zinc-200 transition-all font-semibold text-xs sm:text-sm text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-zinc-400" />
                  <span>Check Registration</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-normal">Lookup Pass</span>
              </button>
            </div>
          </div>

          {/* Key Facts Summary */}
          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" />
              Open to MBBS 1st Year to Interns
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" />
              8 Hands-on Clinical Workshops
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" />
              MASS &amp; MAFIA Official Events
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
