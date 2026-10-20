"use client";

import React, { useState } from "react";
import {
  Stethoscope,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Info,
  CheckCircle,
  Phone,
  AlertCircle,
  Search,
  Filter,
  UserCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";
import { Workshop } from "@/types/conference";

export const WorkshopsSection: React.FC = () => {
  const { workshops, registration_info } = conferenceData;
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedWorkshopModal, setSelectedWorkshopModal] = useState<Workshop | null>(null);

  const departments = ["All", ...Array.from(new Set(workshops.map((w) => w.department)))];

  const filteredWorkshops = workshops.filter((w) => {
    const matchesDept = selectedDept === "All" || w.department === selectedDept;
    const matchesSearch =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <section id="workshops" className="py-20 relative bg-[#040914]">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinical & Simulation Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight mb-4">
            Hands-On Clinical <span className="text-cyan-400">Workshops</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Curated by MAMC clinical departments for undergraduate medicos. Master CPR, surgical
            knots, eye surgery, ECG reading, trauma immobilisation, and molecular diagnostics.
          </p>
        </div>

        {/* Release schedule notice card */}
        <div className="glass-card rounded-2xl p-5 mb-10 border-cyan-500/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-1">
                <Clock className="w-4 h-4" />
                <span>Workshop Form Release Timings (15th November 2025)</span>
              </div>
              <p className="text-xs text-slate-400">
                Seats are strictly limited and allotted on a first-come, first-served basis.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              {registration_info.workshop_form_release_schedule.slots.map((slot, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/20 text-slate-200 flex items-center gap-1.5"
                >
                  <span className="font-semibold text-cyan-300">{slot.form_release_time}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-300">{slot.workshop_day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Department Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDept === dept
                    ? "bg-cyan-400 text-black shadow-md shadow-cyan-400/30"
                    : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search workshop or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((workshop) => (
            <div
              key={workshop.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between glass-card-interactive group border border-slate-800/80 hover:border-cyan-500/40 relative"
            >
              <div>
                {/* Department tag & Date */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                    {workshop.department}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{workshop.display_date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black font-heading text-white group-hover:text-cyan-300 transition-colors mb-1">
                  {workshop.name}
                </h3>
                <p className="text-xs font-medium text-slate-400 mb-3 line-clamp-1">
                  {workshop.subtitle}
                </p>

                {/* Tagline */}
                <p className="text-xs italic text-cyan-400/90 font-medium mb-3">
                  &ldquo;{workshop.tagline}&rdquo;
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {workshop.description}
                </p>

                {/* Venue & Time badges */}
                <div className="space-y-1.5 mb-4 text-xs text-slate-300 bg-black/25 p-3 rounded-xl border border-slate-800/60">
                  {workshop.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{workshop.time}</span>
                    </div>
                  )}
                  {workshop.sessions && (
                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white">Sessions: </span>
                        {workshop.sessions.map((s, idx) => (
                          <span key={idx} className="block text-[11px] text-slate-300">
                            {s.date}: {s.time}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{workshop.venue}</span>
                  </div>
                </div>

                {/* Highlights preview */}
                <div className="mb-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Highlights:
                  </p>
                  <ul className="space-y-1">
                    {workshop.whats_in_store.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                    {workshop.whats_in_store.length > 3 && (
                      <li className="text-[11px] text-cyan-400/90 font-medium pl-5">
                        +{workshop.whats_in_store.length - 3} more modules
                      </li>
                    )}
                  </ul>
                </div>

                {/* Fee rule badge if exists */}
                {workshop.fee && (
                  <div className="mb-4 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300">
                    <span className="font-bold text-emerald-400">Fee Special: </span>
                    {workshop.fee.free_condition} ({workshop.fee.paid_condition})
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <button
                  onClick={() => setSelectedWorkshopModal(workshop)}
                  className="w-full py-2 rounded-xl text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-500/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>View Full Curriculum & Contacts</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={workshop.registration.maulanian_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-2 rounded-xl text-[11px] font-bold text-center text-cyan-400 hover:text-white bg-[#0b1d3a] hover:bg-cyan-600 border border-cyan-500/30 transition-all flex items-center justify-center gap-1"
                  >
                    <span>MAMC Students</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={workshop.registration.non_maulanian_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-2 rounded-xl text-[11px] font-bold text-center text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-1"
                  >
                    <span>Non-Maulanians</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop Detailed Syllabus Modal */}
      {selectedWorkshopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#071328] border border-cyan-500/40 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedWorkshopModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                {selectedWorkshopModal.department}
              </span>
              <span className="text-xs text-slate-400">{selectedWorkshopModal.display_date}</span>
            </div>

            <h3 className="text-2xl font-black font-heading text-white mb-1">
              {selectedWorkshopModal.name}
            </h3>
            <p className="text-sm text-cyan-300 font-medium mb-4">
              {selectedWorkshopModal.subtitle}
            </p>

            <div className="p-3 bg-black/40 rounded-xl border border-slate-800 mb-5 text-xs text-slate-300 space-y-1">
              <div>
                <strong className="text-white">Venue:</strong> {selectedWorkshopModal.venue}
              </div>
              {selectedWorkshopModal.time && (
                <div>
                  <strong className="text-white">Timing:</strong> {selectedWorkshopModal.time}
                </div>
              )}
              {selectedWorkshopModal.registration.form_release && (
                <div>
                  <strong className="text-white">Form Release:</strong>{" "}
                  {selectedWorkshopModal.registration.form_release}
                </div>
              )}
            </div>

            <div className="mb-5">
              <h4 className="text-sm font-bold text-white mb-2">About Workshop</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedWorkshopModal.description}
              </p>
            </div>

            <div className="mb-5">
              <h4 className="text-sm font-bold text-white mb-2">Detailed Curriculum & Skills:</h4>
              <ul className="space-y-2">
                {selectedWorkshopModal.whats_in_store.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* If orthopedic special detailed format exists */}
            {selectedWorkshopModal.detailed_format && (
              <div className="mb-5 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30">
                <h4 className="text-sm font-bold text-cyan-400 mb-2">
                  Special Orthopaedic Format ({selectedWorkshopModal.detailed_format.total_slots} Slots)
                </h4>
                <div className="mb-3">
                  <p className="text-xs font-semibold text-slate-200 mb-1">
                    Slot 1: Demonstration & Expert Sessions:
                  </p>
                  <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
                    {selectedWorkshopModal.detailed_format.slot_1_demonstration_and_expert_sessions.map(
                      (item, idx) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200 mb-1">Hands-on Practical Training:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                    <div className="p-2 rounded bg-black/40 border border-slate-800">
                      <strong className="text-cyan-300 block mb-1">Group 1:</strong>
                      {selectedWorkshopModal.detailed_format.hands_on_sessions.group_1.map((g, idx) => (
                        <div key={idx}>• {g}</div>
                      ))}
                    </div>
                    <div className="p-2 rounded bg-black/40 border border-slate-800">
                      <strong className="text-cyan-300 block mb-1">Group 2:</strong>
                      {selectedWorkshopModal.detailed_format.hands_on_sessions.group_2.map((g, idx) => (
                        <div key={idx}>• {g}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contacts */}
            <div className="mb-6 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Student Coordinators
              </h4>
              <div className="flex flex-wrap gap-4">
                {selectedWorkshopModal.contacts.map((contact, idx) => (
                  <a
                    key={idx}
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>
                      {contact.name} ({contact.phone})
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={selectedWorkshopModal.registration.maulanian_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 py-2.5 rounded-xl text-xs font-bold text-center bg-cyan-400 text-black hover:bg-cyan-300 transition-colors"
              >
                MAMC Student Registration Link
              </a>
              <a
                href={selectedWorkshopModal.registration.non_maulanian_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 py-2.5 rounded-xl text-xs font-bold text-center bg-slate-800 text-white hover:bg-slate-700 transition-colors"
              >
                Non-Maulanian Registration Link
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
