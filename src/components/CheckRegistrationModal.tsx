"use client";

import React, { useState } from "react";
import {
  X,
  Search,
  CheckCircle2,
  Calendar,
  Building,
  User,
  Download,
  AlertCircle,
  FileCheck,
} from "lucide-react";

interface CheckRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckRegistrationModal: React.FC<CheckRegistrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/check-registration?query=${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setResult(data.data);
      } else {
        setError(data.error || "No registration found with those details.");
      }
    } catch (err: any) {
      setError("Unable to connect to registration server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#10121a] border border-zinc-800 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative text-zinc-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-xs font-medium text-emerald-400 uppercase tracking-wider">
          <FileCheck className="w-4 h-4" />
          <span>Delegate Portal</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
          Check Existing Registration
        </h3>
        <p className="text-xs text-zinc-400 mb-6">
          Enter your Ticket ID (e.g. CAT26-XXXX), registered email, or mobile number to retrieve your pass status.
        </p>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. CAT26-XXXX or student@mamc.ac.in"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setError(null);
                }}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 disabled:opacity-50"
            >
              {loading ? "Searching..." : "Lookup"}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-red-300 flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="font-mono font-bold text-emerald-400">{result.ticketId}</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                {result.status}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <User className="w-3.5 h-3.5 text-zinc-400" />
                <span>{result.fullName || result.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Building className="w-3.5 h-3.5 text-zinc-500" />
                <span>{result.college} ({result.delegateType || result.category})</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>18th – 20th November 2026</span>
              </div>
            </div>

            {result.selectedEvents && (
              <div className="pt-2 border-t border-zinc-800">
                <span className="text-[11px] text-zinc-500 uppercase tracking-wider block mb-1">
                  Registered Events ({result.selectedEvents.length}):
                </span>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-zinc-300">
                  {result.selectedEvents.map((ev: string, idx: number) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => alert(`Official Delegate Pass for ${result.fullName || result.name} (${result.ticketId}) downloaded.`)}
              className="w-full mt-2 py-2 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Delegate Pass</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
