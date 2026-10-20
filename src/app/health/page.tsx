"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Database,
  Activity,
  Clock,
  Server,
  Layers,
} from "lucide-react";

interface HealthData {
  status: "healthy" | "degraded" | "error";
  mode: string;
  message: string;
  latencyMs: number;
  totalRegistrations: number;
  timestamp: string;
  details?: {
    configured: boolean;
    driver: string;
  };
}

export default function HealthPage() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      const data = await res.json();
      setHealth(data);
    } catch (err: any) {
      setError(err?.message || "Failed to reach health endpoint.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const getStatusBadge = () => {
    if (!health) return null;
    if (health.status === "healthy") {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Operational &amp; Connected</span>
        </div>
      );
    }
    if (health.status === "degraded") {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold">
          <AlertTriangle className="w-4 h-4" />
          <span>Fallback Memory Mode</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-semibold">
        <XCircle className="w-4 h-4" />
        <span>Database Disconnected</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to CATALYST 2026 Home</span>
        </Link>

        {/* Main Health Card */}
        <div className="bg-[#11131c] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
                System Diagnostics
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Database Health
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {getStatusBadge()}
              <button
                onClick={fetchHealth}
                disabled={loading}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
                title="Refresh diagnostics"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* Diagnostic Message */}
          {health && (
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 mb-6 text-xs leading-relaxed text-zinc-300">
              <span className="font-semibold text-white block mb-0.5">Status Summary</span>
              {health.message}
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 mb-6 text-xs text-red-300">
              {error}
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs space-y-1">
              <div className="flex items-center gap-2 text-zinc-500">
                <Database className="w-4 h-4" />
                <span className="uppercase tracking-wider font-semibold">Active Storage Driver</span>
              </div>
              <span className="text-lg font-bold text-white block capitalize">
                {health?.mode || "Detecting..."}
              </span>
              <span className="text-[11px] text-zinc-500">
                {health?.mode === "postgresql"
                  ? "Connected to remote PostgreSQL instance"
                  : "Local memory cache active"}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs space-y-1">
              <div className="flex items-center gap-2 text-zinc-500">
                <Activity className="w-4 h-4" />
                <span className="uppercase tracking-wider font-semibold">Query Latency</span>
              </div>
              <span className="text-lg font-bold text-white block font-mono">
                {health ? `${health.latencyMs} ms` : "..."}
              </span>
              <span className="text-[11px] text-zinc-500">Round-trip database ping time</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs space-y-1">
              <div className="flex items-center gap-2 text-zinc-500">
                <Layers className="w-4 h-4" />
                <span className="uppercase tracking-wider font-semibold">Stored Registrations</span>
              </div>
              <span className="text-lg font-bold text-white block font-mono">
                {health ? health.totalRegistrations : "..."}
              </span>
              <span className="text-[11px] text-zinc-500">Total delegates currently recorded</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs space-y-1">
              <div className="flex items-center gap-2 text-zinc-500">
                <Clock className="w-4 h-4" />
                <span className="uppercase tracking-wider font-semibold">Diagnostic Timestamp</span>
              </div>
              <span className="text-xs font-mono text-zinc-300 block truncate">
                {health?.timestamp || "..."}
              </span>
              <span className="text-[11px] text-zinc-500">ISO-8601 server clock</span>
            </div>
          </div>

          {/* Quick Actions & Admin link */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <Link
              href="/admin"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Go to Admin Control Panel →
            </Link>

            <button
              onClick={fetchHealth}
              disabled={loading}
              className="px-4 py-2 rounded-lg font-semibold bg-white text-black hover:bg-zinc-200 transition-colors disabled:opacity-50 text-xs flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Ping Database Again</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
