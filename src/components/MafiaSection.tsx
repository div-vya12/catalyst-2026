"use client";

import React from "react";
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  Users,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Flame,
  Award,
  Phone,
  Instagram,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";

export const MafiaSection: React.FC = () => {
  const { mafia_events } = conferenceData;

  return (
    <section id="mafia" className="py-20 relative bg-[#040813]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Healthcare Finance & Entrepreneurship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight mb-4">
            MAFIA <span className="text-emerald-400">Business & Strategy</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-4">
            {mafia_events.intro}
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-lg shadow-emerald-950/40">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>{mafia_events.prize_note}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{mafia_events.spots_note}</span>
            </span>
            <a
              href={`https://instagram.com/${mafia_events.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pink-950/40 text-pink-300 border border-pink-500/30 hover:bg-pink-900/40 transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{mafia_events.instagram}</span>
            </a>
          </div>
        </div>

        {/* 3 Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mafia_events.events.map((event) => (
            <div
              key={event.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between glass-card-interactive border border-slate-800/80 hover:border-emerald-500/40 group relative"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                    MAFIA Flagship
                  </span>
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    <span>{event.display_date}</span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-2xl font-black font-heading text-white group-hover:text-emerald-300 transition-colors mb-1">
                  {event.name}
                </h3>
                <p className="text-xs font-medium text-emerald-400/90 mb-3">
                  {event.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {event.description}
                </p>

                {/* Event Logistics */}
                <div className="space-y-1.5 mb-4 text-xs bg-black/25 p-3 rounded-xl border border-slate-800/60 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-emerald-300">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {typeof event.fee === "string"
                        ? `Registration Fee: ${event.fee}`
                        : `Fee: Early Bird ${event.fee.early_bird} | Standard ${event.fee.later}`}
                    </span>
                  </div>
                </div>

                {/* Highlights if exists */}
                {event.highlights && (
                  <div className="mb-4">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      War Highlights:
                    </p>
                    <ul className="space-y-1">
                      {event.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <span className="text-emerald-400">⚡</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                {event.registration_url && (
                  <a
                    href={event.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <span>Register on Unstop</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {event.registration_urls && (
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={event.registration_urls.undergraduates}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2 rounded-xl text-[11px] font-bold text-center text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 transition-all flex items-center justify-center gap-1"
                    >
                      <span>MBBS (UG) Form</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={event.registration_urls.postgraduates}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2 rounded-xl text-[11px] font-bold text-center text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-1"
                    >
                      <span>MD/MS (PG) Form</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* MAFIA General Contacts */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-emerald-500/20">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              MAFIA Executive Leads
            </h4>
            <p className="text-xs text-slate-300">
              For event queries, team queries, or registration support:
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {mafia_events.contacts.map((c, idx) => (
              <a
                key={idx}
                href={`tel:${c.phone.replace(/\s+/g, "")}`}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>
                  {c.name}: {c.phone}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
