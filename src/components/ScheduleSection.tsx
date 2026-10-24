"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";

export const ScheduleSection: React.FC = () => {
  const { schedule_overview, registration_info } = conferenceData;
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const currentDay = schedule_overview[selectedDayIndex];

  const filteredEvents = currentDay.events.filter((item) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Workshops") return item.type.includes("Workshop");
    if (selectedFilter === "Academic") return item.type.includes("Academic");
    if (selectedFilter === "MAFIA") return item.type.includes("Finance") || item.type.includes("MAFIA");
    return true;
  });

  return (
    <section id="schedule" className="py-16 sm:py-20 border-t border-zinc-800/80 bg-[#090a0f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-8 text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
            Program Overview
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-2 font-heading">
            Conference Schedule
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            18th, 19th &amp; 20th November 2026 • Maulana Azad Medical College, New Delhi
          </p>
        </div>

        {/* Schedule Advisory Note */}
        <div className="mb-6 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Note on Clashes: </strong>
            {registration_info.notes[1]} {registration_info.notes[2]}
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {schedule_overview.map((day, idx) => (
            <button
              key={day.date}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                selectedDayIndex === idx
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Type Filter Chips */}
        <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1">
          {["All", "Workshops", "Academic", "MAFIA"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedFilter === filter
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Timeline list */}
        <div className="space-y-3">
          {filteredEvents.map((event, index) => (
            <div
              key={index}
              className="minimal-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-3">
                <Clock className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">{event.name}</h4>
                  <span className="text-xs text-zinc-400 font-mono">{event.time}</span>
                </div>
              </div>

              <span className="self-start sm:self-center px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300">
                {event.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
