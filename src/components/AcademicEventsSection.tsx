"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ExternalLink,
  FileText,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Phone,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";
import { AcademicEvent } from "@/types/conference";

export const AcademicEventsSection: React.FC = () => {
  const { academic_events } = conferenceData;
  const [selectedEventModal, setSelectedEventModal] = useState<AcademicEvent | null>(null);

  return (
    <section id="academic" className="py-16 sm:py-20 border-t border-zinc-800/80 bg-[#090a0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="max-w-3xl mb-10 text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
            Academic Competitions
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-2 font-heading">
            Scientific Society of MAMC (MASS)
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Research paper defenses, clinical case presentations, 3-track hackathon, and clinical game shows.
          </p>
        </div>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {academic_events.map((event) => (
            <div
              key={event.id}
              className="minimal-card rounded-xl p-5 flex flex-col justify-between border border-zinc-800/80 hover:border-zinc-700 transition-colors"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300">
                    {event.organizer}
                  </span>
                  {event.display_date ? (
                    <span className="text-[11px]">{event.display_date}</span>
                  ) : event.display_deadline ? (
                    <span className="text-[11px] text-zinc-300">Due: {event.display_deadline}</span>
                  ) : null}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-1">{event.name}</h3>
                <p className="text-xs text-zinc-400 font-medium mb-3">{event.subtitle}</p>

                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed mb-4 line-clamp-3">
                  {event.description}
                </p>

                {/* Logistics Badges */}
                <div className="space-y-1.5 mb-4 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/60 text-xs text-zinc-400">
                  {event.format && (
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span>{event.format}</span>
                    </div>
                  )}

                  {event.tracks && (
                    <div className="flex items-start gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                      <span>3 Tracks: Climate, Infection/HIV &amp; Rapid Response</span>
                    </div>
                  )}

                  {event.fee && (
                    <div className="flex items-center gap-1.5 text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>MAMC: {event.fee.maulanians} | Others: {event.fee.non_maulanians}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                <button
                  onClick={() => setSelectedEventModal(event)}
                  className="w-full py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Format &amp; Guidelines</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {event.problem_statement_url && (
                  <a
                    href={event.problem_statement_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg text-xs font-medium text-center text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Download Problem Statements</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <Link
                  href="/register"
                  className="w-full py-2 rounded-lg text-xs font-semibold text-center bg-white text-black hover:bg-zinc-200 transition-colors block"
                >
                  Register Online
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Event Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#10121a] border border-zinc-800 rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl relative text-zinc-200">
            <button
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              ✕
            </button>

            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300 mb-2 inline-block">
              {selectedEventModal.organizer} Competition
            </span>

            <h3 className="text-xl font-bold text-white mb-1">
              {selectedEventModal.name}
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              {selectedEventModal.subtitle}
            </p>

            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              {selectedEventModal.description}
            </p>

            {/* Rounds */}
            {selectedEventModal.rounds && (
              <div className="space-y-3 mb-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Competition Structure:
                </h4>
                {selectedEventModal.rounds.map((r) => (
                  <div key={r.round} className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white">Round {r.round}: {r.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">{r.mode}</span>
                    </div>
                    {r.display_deadline && (
                      <p className="text-zinc-400">Submission: {r.display_deadline}</p>
                    )}
                    {r.display_date && (
                      <p className="text-zinc-400">Presentation: {r.display_date} ({r.time})</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Contacts */}
            <div className="mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Event Leads
              </h4>
              <div className="flex flex-wrap gap-3">
                {selectedEventModal.contacts.map((contact, idx) => (
                  <a
                    key={idx}
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-1 text-xs text-zinc-300 hover:text-white"
                  >
                    <Phone className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{contact.name} ({contact.phone})</span>
                  </a>
                ))}
              </div>
            </div>

            <Link
              href="/register"
              onClick={() => setSelectedEventModal(null)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-center bg-white text-black hover:bg-zinc-200 block transition-colors"
            >
              Register for this Competition
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};
