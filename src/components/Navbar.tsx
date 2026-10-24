"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { conferenceData } from "@/data/conferenceData";
import { CatalystLogo } from "./CatalystLogo";

interface NavbarProps {
  onOpenCheckRegistration?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCheckRegistration }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Events", href: "#events" },
    { label: "Schedule", href: "#schedule" },
    { label: "Accommodation", href: "#accommodation" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#090a0f]/90 backdrop-blur-md border-b border-zinc-800/80 py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <CatalystLogo className="w-8 h-8 rounded-lg shrink-0" size={32} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base text-white tracking-tight">
                  CATALYST 2026
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 font-medium">
                  MAMC
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                Maulana Azad Medical College, New Delhi
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 text-xs text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-zinc-850 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Primary Action */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenCheckRegistration && (
              <button
                onClick={onOpenCheckRegistration}
                className="px-3 py-1.5 rounded-lg text-xs text-zinc-300 hover:text-white transition-colors"
              >
                Check Registration
              </button>
            )}
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors active:scale-95"
            >
              Register
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/register"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-black"
            >
              Register
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0e1017] border-b border-zinc-800 px-4 py-4 animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-1 text-xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-lg text-zinc-300 hover:bg-zinc-800/80 hover:text-white"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            ))}
            <div className="pt-2 mt-2 border-t border-zinc-800 flex flex-col gap-2">
              {onOpenCheckRegistration && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCheckRegistration();
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-zinc-300 hover:bg-zinc-800/80"
                >
                  Check Existing Registration
                </button>
              )}
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg font-semibold bg-white text-black text-xs"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
