"use client";

import React, { useState } from "react";
import { Info, X } from "lucide-react";
import { conferenceData } from "@/data/conferenceData";

export const LateUpdateBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const update = conferenceData.registration_info.late_academic_event_update;

  if (dismissed) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 mb-12 relative z-20">
      <div className="rounded-xl bg-zinc-900 border border-zinc-700/80 p-4 text-zinc-300 text-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block mb-0.5">
                Registration Policy Update: {update.applies_to.join(" & ")}
              </span>
              <p className="text-zinc-400 leading-relaxed">
                {update.points.join(" • ")}
              </p>
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-zinc-500 hover:text-white rounded"
            aria-label="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
