"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Stethoscope,
  Award,
  TrendingUp,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  const { conference } = conferenceData;

  // Countdown timer state
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
        // Fallback display if event date has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [conference.start_date]);

  return (
    <section id="overview" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-medical-grid">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium mb-6 shadow-sm shadow-cyan-950">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{conference.type}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">{conference.institution}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight mb-4">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
              {conference.name}
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl font-bold text-cyan-400/90 tracking-wide uppercase mb-6 font-heading">
            {conference.tagline}
          </p>

          {/* Hippocrates Quote */}
          <div className="relative max-w-2xl mx-auto mb-8 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <p className="text-sm sm:text-base italic text-slate-300 font-light">
              &ldquo;{conference.quote.text}&rdquo;
            </p>
            <p className="text-xs text-cyan-400/80 font-medium mt-1">
              — {conference.quote.author}
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8">
            {conference.description}
          </p>

          {/* Key metadata pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300 mb-10">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-white">{conference.display_dates}</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{conference.institution}, {conference.city}</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>MBBS 1st Year to Interns</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm sm:text-base text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>Register for CATALYST &apos;25</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#workshops"
              className="w-full sm:w-auto px-7 py-4 rounded-full font-semibold text-sm sm:text-base text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-cyan-400" />
              <span>Explore 8 Workshops</span>
            </a>
            <a
              href={conference.announcement_group_whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-full font-semibold text-sm sm:text-base text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/40 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Broadcast</span>
            </a>
          </div>

          {/* Countdown timer card */}
          <div className="max-w-xl mx-auto glass-card rounded-2xl p-4 sm:p-6 mb-12">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>Event Commencement Countdown</span>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#050e1d]/80 rounded-xl p-2.5 sm:p-3 border border-slate-800/80 text-center"
                >
                  <span className="block font-heading text-2xl sm:text-3xl font-black text-white">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Quick Stat Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="glass-card rounded-2xl p-4 border-l-4 border-l-cyan-400">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Stethoscope className="w-4 h-4" />
                <span className="text-xl font-black text-white">8 Workshops</span>
              </div>
              <p className="text-xs text-slate-400">
                Anaesthesia, Surgery, Eye, ECG, ObGyn, Ortho & Biochem
              </p>
            </div>

            <div className="glass-card rounded-2xl p-4 border-l-4 border-l-blue-400">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-xl font-black text-white">5 Competitions</span>
              </div>
              <p className="text-xs text-slate-400">
                Case Files, Inquistador, Hackathon, MedVenture & RickThinking
              </p>
            </div>

            <div className="glass-card rounded-2xl p-4 border-l-4 border-l-emerald-400">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xl font-black text-white">MAFIA Events</span>
              </div>
              <p className="text-xs text-slate-400">
                The Boardroom, Bootcamp & Venture Wars with ₹6k prizes
              </p>
            </div>

            <div className="glass-card rounded-2xl p-4 border-l-4 border-l-amber-400">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Flame className="w-4 h-4" />
                <span className="text-xl font-black text-white">First-Come</span>
              </div>
              <p className="text-xs text-slate-400">
                Strict seat caps on simulations & clinical skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
