"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  User,
  Key,
  LogOut,
  Search,
  Download,
  Trash2,
  RefreshCw,
  Database,
  Users,
  CreditCard,
  Building,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface RegistrationRecord {
  id: string;
  ticketId: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  yearOfStudy: string;
  delegateType: string;
  selectedEvents: string[];
  amountPayable: number;
  currency: string;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Registrations state
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [loadingRegistrations, setLoadingRegistrations] = useState(false);
  const [storageSource, setStorageSource] = useState<string>("unknown");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "maulanian" | "non-maulanian">("all");

  // Check stored token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("catalyst_admin_token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchRegistrations(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setToken(data.token);
        localStorage.setItem("catalyst_admin_token", data.token);
        setIsAuthenticated(true);
        fetchRegistrations(data.token);
      } else {
        setAuthError(data.error || "Authentication failed. Access restricted to super admin.");
      }
    } catch {
      setAuthError("Failed to connect to authentication server.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("catalyst_admin_token");
    setToken(null);
    setIsAuthenticated(false);
    setRegistrations([]);
    setUsername("");
    setPassword("");
  };

  const fetchRegistrations = async (authToken = token) => {
    if (!authToken) return;
    setLoadingRegistrations(true);
    try {
      const res = await fetch("/api/admin/registrations", {
        headers: { Authorization: `Bearer ${authToken}` },
        cache: "no-store",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRegistrations(data.data || []);
        setStorageSource(data.source || "database");
      }
    } catch (err) {
      console.error("Failed to fetch registrations", err);
    } finally {
      setLoadingRegistrations(false);
    }
  };

  const handleDelete = async (ticketId: string) => {
    if (!confirm(`Are you sure you want to delete registration ${ticketId}?`)) return;

    try {
      const res = await fetch(`/api/admin/registrations?ticketId=${encodeURIComponent(ticketId)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRegistrations((prev) => prev.filter((r) => r.ticketId !== ticketId));
      } else {
        alert(data.error || "Failed to delete registration");
      }
    } catch {
      alert("Error contacting server");
    }
  };

  const exportToCSV = () => {
    if (registrations.length === 0) {
      alert("No registrations to export.");
      return;
    }

    const headers = [
      "Ticket ID",
      "Full Name",
      "Email",
      "Phone",
      "College",
      "Year of Study",
      "Category",
      "Events",
      "Amount (INR)",
      "Status",
      "Created At",
    ];

    const rows = registrations.map((r) => [
      r.ticketId,
      `"${r.fullName.replace(/"/g, '""')}"`,
      r.email,
      r.phone,
      `"${r.college.replace(/"/g, '""')}"`,
      r.yearOfStudy,
      r.delegateType,
      `"${(r.selectedEvents || []).join(", ")}"`,
      r.amountPayable,
      r.status,
      r.createdAt,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `catalyst_2026_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered registrations
  const filteredRegistrations = registrations.filter((r) => {
    const matchesFilter =
      filterType === "all" || r.delegateType === filterType;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.fullName.toLowerCase().includes(q) ||
      r.ticketId.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.phone.includes(q) ||
      r.college.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const totalRevenue = registrations.reduce((acc, curr) => acc + (curr.amountPayable || 0), 0);
  const maulaniansCount = registrations.filter((r) => r.delegateType === "maulanian").length;

  // 1. Render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090a0f] flex items-center justify-center p-4">
        <div className="bg-[#11131c] border border-zinc-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-center mb-6">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 block mb-1">
              Super Admin &amp; Root
            </span>
            <h1 className="text-2xl font-bold text-white">CATALYST 2026 Admin</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Restricted management console for authorized administrators.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-zinc-300 block mb-1 font-medium">Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="divya"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-300 block mb-1 font-medium">Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-black hover:bg-zinc-200 transition-colors disabled:opacity-50 mt-2"
            >
              {isLoggingIn ? "Authenticating..." : "Sign In to Admin Portal"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-zinc-800/80 text-center">
            <Link href="/" className="text-xs text-zinc-400 hover:text-white transition-colors">
              ← Back to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Render Super Admin Dashboard
  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Navbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#11131c] border border-zinc-800 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-white">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white">CATALYST 2026 Control Center</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  Super Admin / Root: divya
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Live registration management &amp; database monitoring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/health"
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-zinc-400" />
              <span>Database Health</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-red-300 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-[#11131c] border border-zinc-800 text-xs">
            <div className="flex items-center gap-2 text-zinc-500 mb-1">
              <Users className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-wider">Total Delegates</span>
            </div>
            <span className="text-2xl font-bold text-white font-mono">{registrations.length}</span>
            <span className="text-[11px] text-zinc-500 block">Registered participants</span>
          </div>

          <div className="p-4 rounded-xl bg-[#11131c] border border-zinc-800 text-xs">
            <div className="flex items-center gap-2 text-zinc-500 mb-1">
              <CreditCard className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-wider">Total Value</span>
            </div>
            <span className="text-2xl font-bold text-white font-mono">₹{totalRevenue}</span>
            <span className="text-[11px] text-zinc-500 block">Calculated registration sum</span>
          </div>

          <div className="p-4 rounded-xl bg-[#11131c] border border-zinc-800 text-xs">
            <div className="flex items-center gap-2 text-zinc-500 mb-1">
              <Building className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-wider">MAMC vs Others</span>
            </div>
            <span className="text-2xl font-bold text-white font-mono">
              {maulaniansCount} / {registrations.length - maulaniansCount}
            </span>
            <span className="text-[11px] text-zinc-500 block">Maulanians / Outstation</span>
          </div>

          <div className="p-4 rounded-xl bg-[#11131c] border border-zinc-800 text-xs">
            <div className="flex items-center gap-2 text-zinc-500 mb-1">
              <Database className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-wider">Database Source</span>
            </div>
            <span className="text-sm font-bold text-emerald-400 capitalize block pt-1 truncate">
              {storageSource === "database" ? "PostgreSQL (Prisma)" : "Memory Fallback"}
            </span>
            <span className="text-[11px] text-zinc-500 block">Storage engine</span>
          </div>
        </div>

        {/* Toolbar: Search, Filter, Export, Refresh */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#11131c] border border-zinc-800 p-3 rounded-xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search delegates by name, ID, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div className="flex items-center gap-1 text-xs">
              {(["all", "maulanian", "non-maulanian"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                    filterType === type
                      ? "bg-zinc-800 text-white font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {type === "all" ? "All Delegates" : type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchRegistrations()}
              disabled={loadingRegistrations}
              className="px-3 py-1.5 rounded-lg text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingRegistrations ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={exportToCSV}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-[#11131c] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/90 text-zinc-400 border-b border-zinc-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Ticket ID</th>
                  <th className="py-3 px-4">Delegate Name</th>
                  <th className="py-3 px-4">Institution &amp; Year</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Events Registered</th>
                  <th className="py-3 px-4">Fee</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Registered At</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-zinc-500">
                      {loadingRegistrations
                        ? "Loading database records..."
                        : "No registration records found."}
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.ticketId} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-white whitespace-nowrap">
                        {reg.ticketId}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-white block">{reg.fullName}</span>
                        <span className="text-[11px] text-zinc-500">{reg.email} • {reg.phone}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="block text-zinc-200">{reg.college}</span>
                        <span className="text-[11px] text-zinc-500">{reg.yearOfStudy}</span>
                      </td>
                      <td className="py-3 px-4 capitalize">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300">
                          {reg.delegateType}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {(reg.selectedEvents || []).map((ev, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-zinc-850 text-[10px] text-zinc-300">
                              {ev}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-white">
                        {reg.amountPayable === 0 ? "FREE" : `₹${reg.amountPayable}`}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                          {reg.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[11px] text-zinc-500 whitespace-nowrap">
                        {new Date(reg.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDelete(reg.ticketId)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
                          title="Delete registration"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
