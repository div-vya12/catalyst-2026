"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Filter,
  AlertTriangle,
  Stethoscope,
  Award,
  TrendingUp,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";
import { ScheduleItem } from "@/types/conference";

export const ScheduleSection: React.FC = () => {
  const { schedule_overview, registration_info } = conferenceData;
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const currentDay = schedule_overview[selectedDayIndex];

  const filteredEvents = currentDay.events.filter((item) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Workshops") return item.type === "Workshop";
    if (selectedFilter === "Academic") return item.type === "Academic Event";
    if (selectedFilter === "MAFIA") return item.type === "MAFIA Event";
    return true;
  });

  const getTypeBadge = (type: ScheduleItem["type"]) => {
    switch (type) {
      case "Workshop":
        return {
          icon: <Stethoscope className="w-3.5 h-3.5" />,
          classes: "bg-cyan-950/80 text-cyan-400 border-cyan-500/30",
        };
      case "Academic Event":
        return {
          icon: <Award className="w-3.5 h-3.5" />,
          classes: "bg-blue-950/80 text-blue-400 border-blue-500/30",
        };
      case "MAFIA Event":
        return {
          icon: <TrendingUp className="w-3.5 h-3.5" />,
          classes: "bg-emerald-950/80 text-emerald-400 border-emerald-500/30",
        };
    }
  };

  return (
    <section id="schedule" className="py-20 relative bg-[#060d1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Master Conference Itinerary</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight mb-4">
            Conference <span className="text-cyan-400">Schedule</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Detailed 3-day breakdown of all surgical simulations, poster defenses, hackathon pitches,
            and business wars at MAMC.
          </p>
        </div>

        {/* Overlap & clash warning note */}
        <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-300">Schedule Advisory: </span>
            <span>{registration_info.notes[1]} </span>
            <span className="text-slate-400">{registration_info.notes[2]}</span>
          </div>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {schedule_overview.map((day, idx) => (
            <button
              key={day.date}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2.5 ${
                selectedDayIndex === idx
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg shadow-cyan-500/25 scale-105"
                  : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{day.label}</span>
            </button>
          ))}
        </div>

        {/* Type Filter Chips */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {["All", "Workshops", "Academic", "MAFIA"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedFilter === filter
                  ? "bg-white text-black"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Timeline list */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No events found for the selected filter on this day.
            </div>
          ) : (
            filteredEvents.map((event, index) => {
              const badge = getTypeBadge(event.type);
              return (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-800/80 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-0.5">{event.name}</h4>
                      <p className="text-xs text-cyan-300 font-medium">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.classes}`}
                    >
                      {badge.icon}
                      <span>{event.type}</span>
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
