"use client";

import React from "react";
import {
  ExternalLink,
  Phone,
  CheckCircle,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";

export const AccommodationSection: React.FC = () => {
  const { accommodation } = conferenceData;

  return (
    <section id="accommodation" className="py-16 sm:py-20 border-t border-zinc-800/80 bg-[#090a0f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="minimal-card rounded-2xl p-6 sm:p-8 border border-zinc-800">
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Outstation Delegates
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight mb-2 font-heading">
              Campus Accommodation
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {accommodation.description}
            </p>
          </div>

          <div className="space-y-2 mb-6 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>Within walking distance of MAMC and Lok Nayak (LNJP) Hospital</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>Allotment strictly on a first-come, first-served basis</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            <a
              href={accommodation.form_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <span>Submit Accommodation Form</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
              <span className="text-zinc-500">Accommodation Leads:</span>
              {accommodation.contacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="hover:text-white flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-zinc-500" />
                  <span>{contact.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
