"use client";

import React from "react";
import {
  Hotel,
  MapPin,
  ExternalLink,
  Phone,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";

export const AccommodationSection: React.FC = () => {
  const { accommodation } = conferenceData;

  return (
    <section id="accommodation" className="py-20 relative bg-[#050b17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-cyan-500/30 overflow-hidden relative">
          {/* Background decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                <Hotel className="w-3.5 h-3.5" />
                <span>Outstation Delegates Facility</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight">
                Campus <span className="text-cyan-400">Accommodation</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {accommodation.description}
              </p>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Within walking distance of both MAMC and Lok Nayak (LNJP) Hospital</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Rooms allotted strictly on a first-come, first-served basis</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Convenient check-in for delegates traveling from across India</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={accommodation.form_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-sm text-black bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-black" />
                  <span>Submit Accommodation Request</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Coordinators Box */}
            <div className="lg:col-span-5 bg-[#09152b]/90 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Accommodation Helpdesk</span>
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Have special queries or room sharing requests? Reach out to student leads:
              </p>

              <div className="space-y-3">
                {accommodation.contacts.map((contact, idx) => (
                  <a
                    key={idx}
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all text-xs group"
                  >
                    <div>
                      <span className="font-semibold text-white block group-hover:text-cyan-300">
                        {contact.name}
                      </span>
                      <span className="text-slate-400">{contact.phone}</span>
                    </div>
                    <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
