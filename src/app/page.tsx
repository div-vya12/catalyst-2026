"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { EventsSection } from "@/components/EventsSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { AccommodationSection } from "@/components/AccommodationSection";
import { Footer } from "@/components/Footer";
import { CheckRegistrationModal } from "@/components/CheckRegistrationModal";

export default function Home() {
  const [isCheckRegOpen, setIsCheckRegOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#090a0f] text-zinc-100 selection:bg-white selection:text-black">
      {/* Navbar with minimal design and primary Register link */}
      <Navbar onOpenCheckRegistration={() => setIsCheckRegOpen(true)} />

      {/* Hero with interactive touch/cursor canvas and big stylized title */}
      <Hero onOpenCheckRegistration={() => setIsCheckRegOpen(true)} />

      {/* Unified Pre-Classified Events Section */}
      <EventsSection />

      {/* Conference Schedule (18th – 20th November 2026) */}
      <ScheduleSection />

      {/* Campus Accommodation */}
      <AccommodationSection />

      {/* Minimal Footer with WhatsApp broadcast, Instagram handles, and MAMC LinkedIn */}
      <Footer />

      {/* Check Existing Registration Lookup Modal */}
      <CheckRegistrationModal
        isOpen={isCheckRegOpen}
        onClose={() => setIsCheckRegOpen(false)}
      />
    </main>
  );
}
