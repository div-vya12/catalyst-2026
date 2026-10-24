"use client";

import React from "react";
import Link from "next/link";
import {
  Instagram,
  Linkedin,
  MessageCircle,
  ExternalLink,
  MapPin,
  Calendar,
  ArrowUp,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";
import { CatalystLogo } from "./CatalystLogo";

export const Footer: React.FC = () => {
  const { conference } = conferenceData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#07080c] border-t border-zinc-800 text-zinc-400 text-xs py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & College */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <CatalystLogo className="w-7 h-7 rounded-lg shrink-0" size={28} />
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base tracking-tight">
                  CATALYST 2026
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 font-medium">
                  MAMC
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed">
              Annual Undergraduate Academic Conference of Maulana Azad Medical College (MAMC), New Delhi.
            </p>

            <div className="space-y-1 text-[11px] text-zinc-500 pt-1">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>2, Bahadur Shah Zafar Marg, New Delhi 110002</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>{conference.display_dates}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#overview" className="hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-white transition-colors">
                  Events (Science &amp; Finance)
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-white transition-colors">
                  Conference Schedule
                </a>
              </li>
              <li>
                <a href="#accommodation" className="hover:text-white transition-colors">
                  Accommodation
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Registration & Delegate Portal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Delegate Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/register" className="text-white hover:underline font-medium">
                  Register for CATALYST 2026 →
                </Link>
              </li>
              <li>
                <a
                  href={conferenceData.accommodation.form_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Accommodation Form
                </a>
              </li>
              <li className="pt-2 border-t border-zinc-850">
                <Link href="/health" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  Database Health Check
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  Super Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Socials, WhatsApp Broadcast & College LinkedIn */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Official Channels &amp; Socials
            </h4>

            {/* Official WhatsApp Announcement Group */}
            <div>
              <a
                href={conference.announcement_group_whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:border-zinc-700 transition-colors text-xs font-medium"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Broadcast</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            </div>

            {/* College LinkedIn */}
            <div>
              <a
                href={conference.institution_linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:border-zinc-700 transition-colors text-xs font-medium"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>MAMC LinkedIn</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            </div>

            {/* Instagram Handles */}
            <div className="pt-1 flex flex-col gap-1.5 text-[11px]">
              <a
                href="https://instagram.com/mamcscisoc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-zinc-400" />
                <span>MASS MAMC: @mamcscisoc</span>
              </a>
              <a
                href="https://instagram.com/mafia_mamc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-zinc-400" />
                <span>MAFIA MAMC: @mafia_mamc</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} CATALYST 2026 • Maulana Azad Medical College (MAMC). All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-zinc-300 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
