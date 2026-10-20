"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Award,
  Phone,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";

export const MafiaSection: React.FC = () => {
  const { mafia_events } = conferenceData;

  return (
    <section id="mafia" className="py-16 sm:py-20 border-t border-zinc-800/80 bg-[#090a0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="max-w-3xl mb-10 text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
            Finance &amp; Innovation Alliance
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-2 font-heading">
            MAFIA Business Events
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            {mafia_events.intro}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700/80 text-xs font-semibold text-white flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-zinc-400" />
              <span>{mafia_events.prize_note}</span>
            </span>
          </div>
        </div>

        {/* 3 Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {mafia_events.events.map((event) => (
            <div
              key={event.id}
              className="minimal-card rounded-xl p-5 flex flex-col justify-between border border-zinc-800/80 hover:border-zinc-700 transition-colors"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300">
                    MAFIA Flagship
                  </span>
                  <span className="text-[11px]">{event.display_date}</span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-white mb-1">{event.name}</h3>
                <p className="text-xs text-zinc-400 font-medium mb-3">{event.subtitle}</p>

                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {event.description}
                </p>

                {/* Logistics */}
                <div className="space-y-1.5 mb-4 text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/60">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="font-medium text-white">
                    <span>
                      {typeof event.fee === "string"
                        ? `Fee: ${event.fee}`
                        : `Early Bird: ${event.fee.early_bird} | Standard: ${event.fee.later}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                {event.registration_url && (
                  <a
                    href={event.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg text-xs font-semibold text-center text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View on Unstop</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <Link
                  href="/register"
                  className="w-full py-2 rounded-lg text-xs font-semibold text-center bg-white text-black hover:bg-zinc-200 transition-colors block"
                >
                  Register
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* MAFIA General Contacts */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <span className="text-zinc-400">MAFIA Executive Contacts:</span>
          <div className="flex flex-wrap gap-3">
            {mafia_events.contacts.map((c, idx) => (
              <a
                key={idx}
                href={`tel:${c.phone.replace(/\s+/g, "")}`}
                className="text-zinc-300 hover:text-white flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-zinc-500" />
                <span>{c.name}: {c.phone}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
