"use client";

import React, { useState } from "react";
import { AlertTriangle, Bell, CheckCircle2, ChevronRight, X } from "lucide-react";
import { conferenceData } from "@/data/conferenceData";

export const LateUpdateBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const update = conferenceData.registration_info.late_academic_event_update;

  if (dismissed) return null;

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12">
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/40 p-4 sm:p-5 backdrop-blur-md shadow-xl shadow-amber-950/20">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-400 text-black">
                Special Update
              </span>
              <h2 className="text-sm sm:text-base font-bold text-amber-200">
                Academic Event Registration Policy: {update.applies_to.join(" & ")}
              </h2>
              <span className="text-xs text-amber-300/70 ml-auto hidden md:inline-block">
                Updated: {update.date_of_update}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 text-xs text-slate-300">
              {update.points.map((point, index) => (
                <div key={index} className="flex items-start gap-2 bg-black/20 p-2 rounded-lg border border-amber-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 shrink-0"
            title="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
