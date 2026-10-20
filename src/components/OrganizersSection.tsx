"use client";

import React from "react";
import {
  Users,
  Instagram,
  Phone,
  MessageCircle,
  ExternalLink,
  Shield,
  Building2,
} from "lucide-react";
import { conferenceData } from "@/data/conferenceData";

export const OrganizersSection: React.FC = () => {
  const { conference } = conferenceData;

  return (
    <section id="contacts" className="py-20 relative bg-[#040812]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Organizing Committees</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight mb-4">
            Connect With the <span className="text-cyan-400">Organizers</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Brought to you by the collaborative efforts of the Scientific Society (MASS) and the
            Finance & Innovation Alliance (MAFIA) of Maulana Azad Medical College.
          </p>
        </div>

        {/* 2 Society Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* MASS Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-lg text-xs font-black tracking-wider uppercase bg-blue-950/90 text-blue-400 border border-blue-500/30">
                  Academic & Clinical Body
                </span>
                <a
                  href="https://instagram.com/mamcscisoc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-pink-400 hover:text-pink-300"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@mamcscisoc</span>
                </a>
              </div>

              <h3 className="text-2xl font-black font-heading text-white mb-2">
                Scientific Society of MAMC (MASS)
              </h3>
              <p className="text-xs text-slate-300 mb-6">
                Leading medical research, simulation workshops, and academic conferences at Maulana Azad
                Medical College.
              </p>

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                General Student Secretaries & Leads:
              </h4>
              <div className="space-y-2.5">
                {conference.general_contacts.MASS.map((person, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs"
                  >
                    <span className="font-semibold text-white">{person.name}</span>
                    <a
                      href={`tel:${person.phone.replace(/\s+/g, "")}`}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{person.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <span className="text-[11px] text-slate-400">
                Inquiries for Case Files, Inquistador, Hackathon & Workshops
              </span>
            </div>
          </div>

          {/* MAFIA Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-lg text-xs font-black tracking-wider uppercase bg-emerald-950/90 text-emerald-400 border border-emerald-500/30">
                  Business & Innovation Body
                </span>
                <a
                  href="https://instagram.com/mafia_mamc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-pink-400 hover:text-pink-300"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@mafia_mamc</span>
                </a>
              </div>

              <h3 className="text-2xl font-black font-heading text-white mb-2">
                Maulana Azad Finance & Innovation Alliance (MAFIA)
              </h3>
              <p className="text-xs text-slate-300 mb-6">
                Fostering med-tech entrepreneurship, financial intelligence, and startup incubations for
                Indian medical students.
              </p>

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                General Leads & Coordinators:
              </h4>
              <div className="space-y-2.5">
                {conference.general_contacts.MAFIA.map((person, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs"
                  >
                    <span className="font-semibold text-white">{person.name}</span>
                    <a
                      href={`tel:${person.phone.replace(/\s+/g, "")}`}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{person.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <span className="text-[11px] text-slate-400">
                Inquiries for The Boardroom, Bootcamp & Venture Wars
              </span>
            </div>
          </div>
        </div>

        {/* WhatsApp Announcement Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-0.5">
                Join the Official WhatsApp Announcement Group
              </h3>
              <p className="text-xs text-slate-300">
                Get real-time updates on form openings, slot releases, results, and round schedules.
              </p>
            </div>
          </div>

          <a
            href={conference.announcement_group_whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-3 rounded-full text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-emerald-500/20"
          >
            <span>Join Broadcast Group</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
