"use client";

import React from "react";
import {
  Heart,
  Instagram,
  MessageCircle,
  ExternalLink,
  MapPin,
  Calendar,
  Sparkles,
  ArrowUp,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";

export const Footer: React.FC = () => {
  const { conference } = conferenceData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#03060c] border-t border-slate-800/80 text-slate-400 text-xs relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Quote */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-xl text-white tracking-wider">
                CATALYST <span className="text-cyan-400">2025</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                MAMC
              </span>
            </div>

            <p className="text-xs text-slate-300 italic">
              &ldquo;{conference.quote.text}&rdquo;
              <span className="block text-cyan-400 text-[11px] not-italic mt-1">
                — {conference.quote.author}
              </span>
            </p>

            <div className="space-y-1 text-[11px] text-slate-400">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  {conference.institution}, 2, Bahadur Shah Zafar Marg, New Delhi, Delhi 110002
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{conference.display_dates}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Conference Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#overview" className="hover:text-cyan-400 transition-colors">
                  Overview &amp; Hero
                </a>
              </li>
              <li>
                <a href="#workshops" className="hover:text-cyan-400 transition-colors">
                  8 Clinical Workshops
                </a>
              </li>
              <li>
                <a href="#academic" className="hover:text-cyan-400 transition-colors">
                  Case Files &amp; Inquistador
                </a>
              </li>
              <li>
                <a href="#academic" className="hover:text-cyan-400 transition-colors">
                  Hackathon &amp; MedVenture
                </a>
              </li>
              <li>
                <a href="#mafia" className="hover:text-cyan-400 transition-colors">
                  MAFIA Business Events (₹6k Prizes)
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-cyan-400 transition-colors">
                  Day 1, 2 &amp; 3 Schedule
                </a>
              </li>
              <li>
                <a href="#accommodation" className="hover:text-cyan-400 transition-colors">
                  Accommodation Request
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Societies & Organizers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Organizing Societies
            </h4>
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-white block">
                  Scientific Society of MAMC (MASS)
                </span>
                <a
                  href="https://instagram.com/mamcscisoc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 inline-flex items-center gap-1 mt-0.5"
                >
                  <Instagram className="w-3 h-3" />
                  <span>@mamcscisoc</span>
                </a>
              </div>

              <div>
                <span className="font-semibold text-white block">
                  Finance &amp; Innovation Alliance (MAFIA)
                </span>
                <a
                  href="https://instagram.com/mafia_mamc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 inline-flex items-center gap-1 mt-0.5"
                >
                  <Instagram className="w-3 h-3" />
                  <span>@mafia_mamc</span>
                </a>
              </div>

              <div>
                <a
                  href={conference.announcement_group_whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 text-xs font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Community</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Automation & Deployment */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
              Vercel &amp; Automated Pipeline
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Architected with Next.js 14, React, Tailwind CSS, TypeScript, and Node.js serverless
              endpoints. Automated CI/CD deployment configured for Vercel with zero config.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white text-black">
                <svg className="w-2.5 h-2.5 fill-black" viewBox="0 0 1155 1000">
                  <path d="m577.3 0 577.4 1000H0z" />
                </svg>
                <span>Vercel Automated</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                <span>Node.js / React</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} CATALYST 2025 • Maulana Azad Medical College (MAMC). All
            rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
