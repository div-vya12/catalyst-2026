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
  Layers,
  Wrench,
  HelpCircle,
  ExternalLink,
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
    detectedVariable?: string;
    connectionTarget?: string;
    urlConfigured?: boolean;
    tablesInitialized?: boolean;
    errorName?: string;
    errorCode?: string;
    recommendation?: string;
  };
}

export default function HealthPage() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializingTables, setInitializingTables] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setActionMessage(null);
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      const data = await res.json();
      setHealth(data);
    } catch (err: any) {
      setHealth({
        status: "error",
        mode: "unreachable",
        message: err?.message || "Failed to contact /api/health endpoint.",
        latencyMs: 0,
        totalRegistrations: 0,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInitTables = async () => {
    setInitializingTables(true);
    setActionMessage(null);
    try {
      const res = await fetch("/api/health", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setActionMessage("Tables created successfully! Refreshing status...");
        fetchHealth();
      } else {
        setActionMessage(data.error || "Failed to auto-create tables.");
      }
    } catch (err: any) {
      setActionMessage("Error sending table initialization request.");
    } finally {
      setInitializingTables(false);
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
          <span>PostgreSQL Active</span>
        </div>
      );
    }
    if (health.status === "degraded") {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold">
          <AlertTriangle className="w-4 h-4" />
          <span>Active (Memory Fallback)</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-semibold">
        <XCircle className="w-4 h-4" />
        <span>Database Unreachable</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
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
                Real-Time Diagnostics
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Database Health Check
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
            <div
              className={`p-4 rounded-xl border mb-6 text-xs leading-relaxed ${
                health.status === "healthy"
                  ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
                  : health.status === "degraded"
                  ? "bg-amber-950/20 border-amber-500/30 text-amber-200"
                  : "bg-red-950/30 border-red-500/30 text-red-200"
              }`}
            >
              <span className="font-semibold block mb-0.5">Status Summary:</span>
              <p>{health.message}</p>
              {health.details?.recommendation && (
                <div className="mt-2 pt-2 border-t border-current/20 font-medium">
                  <strong>Recommendation: </strong>
                  {health.details.recommendation}
                </div>
              )}
            </div>
          )}

          {actionMessage && (
            <div className="p-3.5 rounded-xl bg-zinc-800 border border-zinc-700 mb-6 text-xs text-white">
              {actionMessage}
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
                {health?.mode?.replace("_", " ") || "Detecting..."}
              </span>
              <span className="text-[11px] text-zinc-500 block truncate">
                {health?.details?.detectedVariable
                  ? `Config: ${health.details.detectedVariable}`
                  : health?.mode === "postgresql"
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

          {/* Troubleshooting Guide Box if not healthy */}
          {health && health.status !== "healthy" && (
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 mb-6 text-xs space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Why is the database unreachable or degraded?</span>
              </div>

              <div className="space-y-2 text-zinc-400 leading-relaxed">
                <div>
                  <strong className="text-zinc-200">1. Vercel Postgres not yet linked:</strong>
                  <p className="text-[11px]">
                    If deployed on Vercel, go to your project in the Vercel Dashboard → click <strong>Storage</strong> → click <strong>Create Database</strong> → choose <strong>Postgres</strong> → click <strong>Connect to Project</strong>.
                  </p>
                </div>

                <div>
                  <strong className="text-zinc-200">2. Missing Table in Database:</strong>
                  <p className="text-[11px]">
                    If Postgres is already connected, click the button below to initialize the <code className="text-zinc-200">Registration</code> table.
                  </p>
                </div>
              </div>

              <button
                onClick={handleInitTables}
                disabled={initializingTables}
                className="w-full py-2.5 rounded-lg font-semibold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Wrench className={`w-3.5 h-3.5 ${initializingTables ? "animate-spin" : ""}`} />
                <span>{initializingTables ? "Creating Tables..." : "Initialize Database Tables (1-Click)"}</span>
              </button>
            </div>
          )}

          {/* Actions Bar */}
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
