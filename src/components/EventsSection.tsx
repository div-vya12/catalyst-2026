"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  Lightbulb,
  CheckCircle,
  ChevronRight,
  Info,
  Search,
  Sparkles,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";
import { Workshop, AcademicEvent } from "@/types/conference";

export const EventsSection: React.FC = () => {
  const { workshops, academic_events, mafia_events } = conferenceData;

  // Top-level society filter: "science" | "finance"
  const [activeSociety, setActiveSociety] = useState<"science" | "finance">("science");

  // Sub-classification filters
  const [scienceSubcategory, setScienceSubcategory] = useState<"all" | "workshops" | "academic">("all");
  const [financeSubcategory, setFinanceSubcategory] = useState<"all" | "workshops" | "competitions">("all");

  // Modals for detailed guidelines
  const [selectedWorkshopModal, setSelectedWorkshopModal] = useState<Workshop | null>(null);
  const [selectedAcademicModal, setSelectedAcademicModal] = useState<AcademicEvent | null>(null);
  const [selectedMafiaModal, setSelectedMafiaModal] = useState<any | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Science Society Events:
  // 1. Workshops (all 8 clinical workshops)
  const scienceWorkshops = workshops.filter((w) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      w.name.toLowerCase().includes(q) ||
      w.subtitle.toLowerCase().includes(q) ||
      w.department.toLowerCase().includes(q) ||
      w.description.toLowerCase().includes(q)
    );
  });

  // 2. Academic Events (Case Files, Inquistador, MedVenture, RickThinking Reviews)
  const scienceAcademicEvents = academic_events.filter((e) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.subtitle.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
    );
  });

  // Finance Society Events (MAFIA):
  // 1. Workshops: AI in Medicine, Prompt Engineering
  const financeWorkshops = mafia_events.events.filter(
    (e) => e.id === "ai-in-medicine" || e.id === "prompt-engineering"
  ).filter((e) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.subtitle.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
    );
  });

  // 2. Competitions: Model NITI Aayog, Guesstimate, Hackathon
  const financeCompetitions = mafia_events.events.filter(
    (e) => e.id === "model-niti-aayog" || e.id === "guesstimate" || e.id === "hackathon"
  ).filter((e) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.subtitle.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
    );
  });

  return (
    <section id="events" className="py-16 sm:py-24 border-t border-zinc-800/80 bg-[#090a0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Section Heading - Clean, no short descriptive phrase underneath */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-heading">
              Events
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search all events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>
        </div>

        {/* Top-Level Society Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800 max-w-md mb-8">
          <button
            onClick={() => setActiveSociety("science")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSociety === "science"
                ? "bg-white text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Science Society (MASS)
          </button>
          <button
            onClick={() => setActiveSociety("finance")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSociety === "finance"
                ? "bg-white text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Finance Society (MAFIA)
          </button>
        </div>

        {/* ======================================================== */}
        {/* SOCIETY 1: SCIENCE SOCIETY (MASS)                        */}
        {/* ======================================================== */}
        {activeSociety === "science" && (
          <div className="space-y-12 animate-in fade-in duration-200">
            {/* Sub-classification Filter Tabs */}
            <div className="flex items-center gap-2 pb-2">
              <button
                onClick={() => setScienceSubcategory("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  scienceSubcategory === "all"
                    ? "bg-zinc-800 text-white"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                All Science Events ({scienceWorkshops.length + scienceAcademicEvents.length})
              </button>
              <button
                onClick={() => setScienceSubcategory("workshops")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  scienceSubcategory === "workshops"
                    ? "bg-zinc-800 text-white"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                Workshops ({scienceWorkshops.length})
              </button>
              <button
                onClick={() => setScienceSubcategory("academic")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  scienceSubcategory === "academic"
                    ? "bg-zinc-800 text-white"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                Academic Events ({scienceAcademicEvents.length})
              </button>
            </div>

            {/* Sub-classification 1: Workshops */}
            {(scienceSubcategory === "all" || scienceSubcategory === "workshops") && (
              <div className="space-y-6">
                <div className="border-b border-zinc-800 pb-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Workshops
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {scienceWorkshops.map((workshop) => (
                    <div
                      key={workshop.id}
                      className="minimal-card rounded-xl p-5 flex flex-col justify-between border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                    >
                      <div>
                        {/* Department & Date */}
                        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300">
                              {workshop.department}
                            </span>
                            {workshop.fee && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                                {typeof workshop.fee === "string" ? workshop.fee : `₹${workshop.price}`}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px]">{workshop.display_date}</span>
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-bold text-white mb-1">{workshop.name}</h4>
                        <p className="text-xs text-zinc-400 font-medium mb-3 line-clamp-1">
                          {workshop.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-xs text-zinc-300 leading-relaxed mb-4 line-clamp-3">
                          {workshop.description}
                        </p>

                        {/* Logistics */}
                        <div className="space-y-1.5 mb-4 text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/60">
                          {workshop.time && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                              <span>{workshop.time}</span>
                            </div>
                          )}
                          <div className="flex items-start gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{workshop.venue}</span>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="mb-4">
                          <ul className="space-y-1">
                            {workshop.whats_in_store.slice(0, 3).map((item, idx) => (
                              <li key={idx} className="text-xs text-zinc-300 flex items-start gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                        <button
                          onClick={() => setSelectedWorkshopModal(workshop)}
                          className="w-full py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Curriculum &amp; Details</span>
                        </button>

                        <Link
                          href="/register"
                          className="w-full py-2 rounded-lg text-xs font-semibold text-center bg-white text-black hover:bg-zinc-200 transition-colors block"
                        >
                          Register for this Workshop
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-classification 2: Academic Events */}
            {(scienceSubcategory === "all" || scienceSubcategory === "academic") && (
              <div className="space-y-6 pt-4">
                <div className="border-b border-zinc-800 pb-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Academic Events
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {scienceAcademicEvents.map((event) => (
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
                        <h4 className="text-lg font-bold text-white mb-1">{event.name}</h4>
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
                          {event.time && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                              <span>{event.time}</span>
                            </div>
                          )}
                          {event.venue && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                              <span className="line-clamp-1">{event.venue}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                        <button
                          onClick={() => setSelectedAcademicModal(event)}
                          className="w-full py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Format &amp; Guidelines</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <Link
                          href="/register"
                          className="w-full py-2 rounded-lg text-xs font-semibold text-center bg-white text-black hover:bg-zinc-200 transition-colors block"
                        >
                          Register for this Event
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SOCIETY 2: FINANCE SOCIETY (MAFIA)                       */}
        {/* ======================================================== */}
        {activeSociety === "finance" && (
          <div className="space-y-12 animate-in fade-in duration-200">
            {/* Sub-classification Filter Tabs */}
            <div className="flex items-center gap-2 pb-2">
              <button
                onClick={() => setFinanceSubcategory("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  financeSubcategory === "all"
                    ? "bg-zinc-800 text-white"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                All Finance Events ({financeWorkshops.length + financeCompetitions.length})
              </button>
              <button
                onClick={() => setFinanceSubcategory("workshops")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  financeSubcategory === "workshops"
                    ? "bg-zinc-800 text-white"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                Workshops ({financeWorkshops.length})
              </button>
              <button
                onClick={() => setFinanceSubcategory("competitions")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  financeSubcategory === "competitions"
                    ? "bg-zinc-800 text-white"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                Competitions ({financeCompetitions.length})
              </button>
            </div>

            {/* Sub-classification 1: Workshops (AI in Medicine, Prompt Engineering) */}
            {(financeSubcategory === "all" || financeSubcategory === "workshops") && (
              <div className="space-y-6">
                <div className="border-b border-zinc-800 pb-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Workshops
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {financeWorkshops.map((event) => (
                    <div
                      key={event.id}
                      className="minimal-card rounded-xl p-5 flex flex-col justify-between border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300">
                              MAFIA Workshop
                            </span>
                            {event.fee && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                                {typeof event.fee === "string" ? event.fee : `₹${event.price}`}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px]">{event.display_date}</span>
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-bold text-white mb-1">{event.name}</h4>
                        <p className="text-xs text-zinc-400 font-medium mb-3">{event.subtitle}</p>

                        {/* Description */}
                        <p className="text-xs text-zinc-300 leading-relaxed mb-4 line-clamp-3">
                          {event.description}
                        </p>

                        {/* Logistics */}
                        <div className="space-y-1.5 mb-4 text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/60">
                          {event.time && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                              <span>{event.time}</span>
                            </div>
                          )}
                          <div className="flex items-start gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{event.venue}</span>
                          </div>
                        </div>

                        {/* Highlights */}
                        {event.highlights && (
                          <div className="mb-4">
                            <ul className="space-y-1">
                              {event.highlights.slice(0, 3).map((item: string, idx: number) => (
                                <li key={idx} className="text-xs text-zinc-300 flex items-start gap-1.5">
                                  <CheckCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                        <button
                          onClick={() => setSelectedMafiaModal(event)}
                          className="w-full py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Curriculum &amp; Details</span>
                        </button>

                        <Link
                          href="/register"
                          className="w-full py-2 rounded-lg text-xs font-semibold text-center bg-white text-black hover:bg-zinc-200 transition-colors block"
                        >
                          Register for this Workshop
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-classification 2: Competitions (Model NITI Aayog, Guesstimate, Hackathon) */}
            {(financeSubcategory === "all" || financeSubcategory === "competitions") && (
              <div className="space-y-6 pt-4">
                <div className="border-b border-zinc-800 pb-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Competitions
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {financeCompetitions.map((event) => (
                    <div
                      key={event.id}
                      className="minimal-card rounded-xl p-5 flex flex-col justify-between border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300">
                            MAFIA Competition
                          </span>
                          <span className="text-[11px]">{event.display_date}</span>
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-bold text-white mb-1">{event.name}</h4>
                        <p className="text-xs text-zinc-400 font-medium mb-3">{event.subtitle}</p>

                        {/* Description */}
                        <p className="text-xs text-zinc-300 leading-relaxed mb-4 line-clamp-3">
                          {event.description}
                        </p>

                        {/* Logistics */}
                        <div className="space-y-1.5 mb-4 text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/60">
                          {event.time && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                              <span>{event.time}</span>
                            </div>
                          )}
                          <div className="flex items-start gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{event.venue}</span>
                          </div>
                        </div>

                        {/* Highlights */}
                        {event.highlights && (
                          <div className="mb-4">
                            <ul className="space-y-1">
                              {event.highlights.slice(0, 3).map((item: string, idx: number) => (
                                <li key={idx} className="text-xs text-zinc-300 flex items-start gap-1.5">
                                  <CheckCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                        <button
                          onClick={() => setSelectedMafiaModal(event)}
                          className="w-full py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Format &amp; Guidelines</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <Link
                          href="/register"
                          className="w-full py-2 rounded-lg text-xs font-semibold text-center bg-white text-black hover:bg-zinc-200 transition-colors block"
                        >
                          Register for this Event
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Workshop Details Modal */}
      {selectedWorkshopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#10121a] border border-zinc-800 rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl relative text-zinc-200">
            <button
              onClick={() => setSelectedWorkshopModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300">
                {selectedWorkshopModal.department}
              </span>
              <span className="text-xs text-zinc-400">{selectedWorkshopModal.display_date}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{selectedWorkshopModal.name}</h3>
            <p className="text-xs text-zinc-400 mb-4">{selectedWorkshopModal.subtitle}</p>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-zinc-300 block mb-1">About the Workshop</span>
                <p className="text-zinc-400 leading-relaxed">{selectedWorkshopModal.description}</p>
              </div>

              <div>
                <span className="font-semibold text-zinc-300 block mb-1">Curriculum &amp; Skills Covered</span>
                <ul className="space-y-1.5">
                  {selectedWorkshopModal.whats_in_store.map((item, i) => (
                    <li key={i} className="text-zinc-300 flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-zinc-900 rounded-lg text-[11px]">
                <div>
                  <span className="text-zinc-500 block">Date &amp; Time</span>
                  <span className="text-zinc-200 font-medium">
                    {selectedWorkshopModal.time || selectedWorkshopModal.display_date}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Venue</span>
                  <span className="text-zinc-200 font-medium">{selectedWorkshopModal.venue}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Fee</span>
                  <span className="text-emerald-400 font-bold">
                    {typeof selectedWorkshopModal.fee === "string"
                      ? selectedWorkshopModal.fee
                      : selectedWorkshopModal.price
                      ? `₹${selectedWorkshopModal.price}`
                      : "Included"}
                  </span>
                </div>
              </div>

              {selectedWorkshopModal.contacts && selectedWorkshopModal.contacts.length > 0 && (
                <div className="pt-2 border-t border-zinc-800 text-[11px]">
                  <span className="text-zinc-400 block mb-1">Student Coordinators</span>
                  <div className="flex flex-wrap gap-3">
                    {selectedWorkshopModal.contacts.map((c, i) => (
                      <span key={i} className="text-zinc-300">
                        {c.name}: {c.phone}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end gap-2">
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Academic Event Details Modal */}
      {selectedAcademicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#10121a] border border-zinc-800 rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl relative text-zinc-200">
            <button
              onClick={() => setSelectedAcademicModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300">
                {selectedAcademicModal.organizer}
              </span>
              <span className="text-xs text-zinc-400">
                {selectedAcademicModal.display_date || selectedAcademicModal.display_deadline}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{selectedAcademicModal.name}</h3>
            <p className="text-xs text-zinc-400 mb-4">{selectedAcademicModal.subtitle}</p>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-zinc-300 block mb-1">Overview</span>
                <p className="text-zinc-400 leading-relaxed">{selectedAcademicModal.description}</p>
              </div>

              {selectedAcademicModal.rounds && (
                <div>
                  <span className="font-semibold text-zinc-300 block mb-2">Competition Rounds</span>
                  <div className="space-y-2">
                    {selectedAcademicModal.rounds.map((r, i) => (
                      <div key={i} className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                        <span className="font-bold text-white block">
                          Round {r.round}: {r.name} ({r.mode})
                        </span>
                        {r.description && (
                          <p className="text-zinc-400 text-[11px] mt-1">{r.description}</p>
                        )}
                        {r.display_deadline && (
                          <span className="text-[10px] text-zinc-500 block mt-1">
                            Deadline: {r.display_deadline}
                          </span>
                        )}
                        {r.display_date && (
                          <span className="text-[10px] text-zinc-500 block mt-1">
                            Date: {r.display_date} {r.time ? `• ${r.time}` : ""}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedAcademicModal.highlights && (
                <div>
                  <span className="font-semibold text-zinc-300 block mb-1">Highlights</span>
                  <ul className="space-y-1">
                    {selectedAcademicModal.highlights.map((h, i) => (
                      <li key={i} className="text-zinc-300 flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedAcademicModal.contacts && selectedAcademicModal.contacts.length > 0 && (
                <div className="pt-2 border-t border-zinc-800 text-[11px]">
                  <span className="text-zinc-400 block mb-1">Event Coordinators</span>
                  <div className="flex flex-wrap gap-3">
                    {selectedAcademicModal.contacts.map((c, i) => (
                      <span key={i} className="text-zinc-300">
                        {c.name}: {c.phone}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end gap-2">
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Finance Event Details Modal */}
      {selectedMafiaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#10121a] border border-zinc-800 rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl relative text-zinc-200">
            <button
              onClick={() => setSelectedMafiaModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300">
                MAFIA Event
              </span>
              <span className="text-xs text-zinc-400">{selectedMafiaModal.display_date}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{selectedMafiaModal.name}</h3>
            <p className="text-xs text-zinc-400 mb-4">{selectedMafiaModal.subtitle}</p>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-zinc-300 block mb-1">Overview</span>
                <p className="text-zinc-400 leading-relaxed">{selectedMafiaModal.description}</p>
              </div>

              {selectedMafiaModal.highlights && (
                <div>
                  <span className="font-semibold text-zinc-300 block mb-1">Key Modules &amp; Format</span>
                  <ul className="space-y-1.5">
                    {selectedMafiaModal.highlights.map((h: string, i: number) => (
                      <li key={i} className="text-zinc-300 flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 p-3 bg-zinc-900 rounded-lg text-[11px]">
                <div>
                  <span className="text-zinc-500 block">Date &amp; Time</span>
                  <span className="text-zinc-200 font-medium">
                    {selectedMafiaModal.display_date} • {selectedMafiaModal.time}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Venue</span>
                  <span className="text-zinc-200 font-medium">{selectedMafiaModal.venue}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Fee</span>
                  <span className="text-emerald-400 font-bold">
                    {typeof selectedMafiaModal.fee === "string"
                      ? selectedMafiaModal.fee
                      : selectedMafiaModal.price
                      ? `₹${selectedMafiaModal.price}`
                      : "Included"}
                  </span>
                </div>
              </div>

              {selectedMafiaModal.contacts && selectedMafiaModal.contacts.length > 0 && (
                <div className="pt-2 border-t border-zinc-800 text-[11px]">
                  <span className="text-zinc-400 block mb-1">Coordinators</span>
                  <div className="flex flex-wrap gap-3">
                    {selectedMafiaModal.contacts.map((c: any, i: number) => (
                      <span key={i} className="text-zinc-300">
                        {c.name}: {c.phone}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end gap-2">
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
