"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Info,
  CheckCircle,
  Phone,
  Search,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";
import { Workshop } from "@/types/conference";

export const WorkshopsSection: React.FC = () => {
  const { workshops, registration_info } = conferenceData;
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("" );
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
    <section id="workshops" className="py-16 sm:py-20 border-t border-zinc-800/80 bg-[#090a0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="max-w-3xl mb-10 text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
            Clinical Mastery
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-2 font-heading">
            Hands-On Clinical Workshops
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Curated simulation and wet-lab sessions across 7 medical departments at MAMC.
          </p>
        </div>

        {/* Form release schedule notice */}
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 mb-8 text-xs text-zinc-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-white block">
                  Workshop Seat Allocation Rule &amp; Schedule
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  Strict 50 Seats / Workshop
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Every hands-on workshop is strictly limited to 50 delegates and allotted on a first-come, first-served basis.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              {registration_info.workshop_form_release_schedule.slots.map((slot, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                >
                  <strong className="text-white">{slot.form_release_time}</strong>: {slot.workshop_day}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
          {/* Department Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedDept === dept
                    ? "bg-white text-black"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search workshop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWorkshops.map((workshop) => (
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
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-900 border border-zinc-800 text-zinc-400">
                      50 Seats (FCFS)
                    </span>
                  </div>
                  <span className="text-[11px]">{workshop.display_date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-1">{workshop.name}</h3>
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

                {/* Key Skills */}
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
                  <span>Curriculum & Details</span>
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

      {/* Workshop Detailed Syllabus Modal */}
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

            <h3 className="text-xl font-bold text-white mb-1">
              {selectedWorkshopModal.name}
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              {selectedWorkshopModal.subtitle}
            </p>

            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 mb-4 text-xs text-zinc-300 space-y-1">
              <div>
                <strong className="text-white">Venue:</strong> {selectedWorkshopModal.venue}
              </div>
              {selectedWorkshopModal.time && (
                <div>
                  <strong className="text-white">Time:</strong> {selectedWorkshopModal.time}
                </div>
              )}
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Curriculum &amp; Skills Covered:
              </h4>
              <ul className="space-y-1.5">
                {selectedWorkshopModal.whats_in_store.map((item, idx) => (
                  <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Student Contacts */}
            <div className="mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Student Leads
              </h4>
              <div className="flex flex-wrap gap-3">
                {selectedWorkshopModal.contacts.map((contact, idx) => (
                  <a
                    key={idx}
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white"
                  >
                    <Phone className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{contact.name} ({contact.phone})</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Registration CTA */}
            <Link
              href="/register"
              onClick={() => setSelectedWorkshopModal(null)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-center bg-white text-black hover:bg-zinc-200 block transition-colors"
            >
              Proceed to Registration
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};
