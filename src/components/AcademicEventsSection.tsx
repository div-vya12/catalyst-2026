"use client";

import React, { useState } from "react";
import {
  Award,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  FileText,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Phone,
  Sparkles,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";
import { AcademicEvent } from "@/types/conference";

export const AcademicEventsSection: React.FC = () => {
  const { academic_events } = conferenceData;
  const [selectedEventModal, setSelectedEventModal] = useState<AcademicEvent | null>(null);

  return (
    <section id="academic" className="py-20 relative bg-[#060c19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Academic Competitions (MASS)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight mb-4">
            Research, Ideation & <span className="text-blue-400">Game Shows</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Open to all MBBS students from 1st year to interns across India. Present clinical cases,
            defend oral research papers, build healthcare hackathon prototypes, or conquer the ER game show.
          </p>
        </div>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {academic_events.map((event) => (
            <div
              key={event.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between glass-card-interactive border border-slate-800/80 hover:border-blue-400/40 group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-blue-950/90 text-blue-300 border border-blue-500/30">
                    {event.organizer}
                  </span>
                  {event.display_date ? (
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-blue-400" />
                      {event.display_date}
                    </span>
                  ) : event.display_deadline ? (
                    <span className="text-xs text-amber-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      Due {event.display_deadline}
                    </span>
                  ) : null}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black font-heading text-white group-hover:text-blue-300 transition-colors mb-1">
                  {event.name}
                </h3>
                <p className="text-xs font-medium text-cyan-400 mb-2">{event.subtitle}</p>

                {/* Tagline */}
                <p className="text-xs italic text-slate-300 mb-3 font-light">
                  &ldquo;{event.tagline}&rdquo;
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {event.description}
                </p>

                {/* Highlight badges / format */}
                <div className="space-y-2 mb-4 bg-black/25 p-3 rounded-xl border border-slate-800/60 text-xs">
                  {event.rounds && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>
                        <strong className="text-white">Format:</strong> {event.format} (Online Screening + Offline Presentation)
                      </span>
                    </div>
                  )}

                  {event.tracks && (
                    <div className="flex items-start gap-2 text-slate-300">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">3 Innovation Tracks:</strong>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Climate, HIV/Infection Resilience & Rapid Response
                        </div>
                      </div>
                    </div>
                  )}

                  {event.prizes && (
                    <div className="flex items-center gap-2 text-emerald-300">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="font-semibold">{event.prizes}</span>
                    </div>
                  )}

                  {event.fee && (
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-300">
                      <CheckCircle2 className="w-3 h-3 text-amber-400" />
                      <span>
                        MAMC: {event.fee.maulanians} | Others: {event.fee.non_maulanians}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <button
                  onClick={() => setSelectedEventModal(event)}
                  className="w-full py-2 rounded-xl text-xs font-semibold text-blue-300 hover:text-white bg-blue-950/40 hover:bg-blue-900/40 border border-blue-500/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Rules & Guidelines</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {event.problem_statement_url && (
                  <a
                    href={event.problem_statement_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-950/30 hover:bg-amber-900/30 border border-amber-500/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Download Problem Statements Doc</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {event.registration_url && (
                  <a
                    href={event.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-center text-black bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-300 hover:to-cyan-300 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Submit & Register Online</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Event Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#071328] border border-blue-500/40 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              ✕
            </button>

            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-blue-950 text-blue-300 border border-blue-500/30 inline-block mb-2">
              {selectedEventModal.organizer} Competition
            </span>

            <h3 className="text-2xl font-black font-heading text-white mb-1">
              {selectedEventModal.name}
            </h3>
            <p className="text-sm text-blue-300 font-medium mb-4">
              {selectedEventModal.subtitle}
            </p>

            <div className="mb-4 text-xs text-slate-300 leading-relaxed">
              {selectedEventModal.description}
            </div>

            {/* Rounds details if applicable */}
            {selectedEventModal.rounds && (
              <div className="space-y-4 mb-5">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Competition Rounds:
                </h4>
                {selectedEventModal.rounds.map((r) => (
                  <div
                    key={r.round}
                    className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-blue-300">
                        Round {r.round}: {r.name}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-slate-700">
                        {r.mode}
                      </span>
                    </div>

                    {r.display_deadline && (
                      <p className="text-xs text-amber-300 mb-1.5">
                        Submission Deadline: {r.display_deadline}
                      </p>
                    )}
                    {r.display_date && (
                      <p className="text-xs text-cyan-300 mb-1.5">
                        Presentation Date: {r.display_date} ({r.time})
                      </p>
                    )}

                    {r.abstract_specifications && (
                      <div className="text-xs text-slate-300 mt-2 space-y-1">
                        <p className="font-semibold text-white">
                          Word Limit: {r.abstract_specifications.word_limit}
                        </p>
                        {r.abstract_specifications.required_headings && (
                          <div>
                            <span className="text-slate-400">Headings: </span>
                            {r.abstract_specifications.required_headings.join(", ")}
                          </div>
                        )}
                      </div>
                    )}

                    {r.rules && (
                      <div className="mt-2 pt-2 border-t border-slate-800">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Key Rules:
                        </span>
                        <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                          {r.rules.map((rule, idx) => (
                            <li key={idx}>{rule}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tracks if hackathon */}
            {selectedEventModal.tracks && (
              <div className="space-y-3 mb-5">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Hackathon Challenge Tracks:
                </h4>
                {selectedEventModal.tracks.map((track, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <h5 className="text-xs font-bold text-cyan-400 mb-1">{track.name}</h5>
                    <p className="text-xs text-slate-300">{track.prompt}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights if medventure / rickthinking */}
            {selectedEventModal.highlights && (
              <div className="mb-5">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Event Highlights:
                </h4>
                <ul className="space-y-1.5">
                  {selectedEventModal.highlights.map((h, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contacts */}
            <div className="mb-6 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Event Coordinators
              </h4>
              <div className="flex flex-wrap gap-4">
                {selectedEventModal.contacts.map((contact, idx) => (
                  <a
                    key={idx}
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-1.5 text-xs text-blue-300 hover:text-blue-200"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>
                      {contact.name} ({contact.phone})
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Action */}
            {selectedEventModal.registration_url && (
              <a
                href={selectedEventModal.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-sm font-bold text-center text-black bg-cyan-400 hover:bg-cyan-300 block transition-colors shadow-lg shadow-cyan-500/20"
              >
                Proceed to Google Registration Form
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
