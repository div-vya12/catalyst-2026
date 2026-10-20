"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LateUpdateBanner } from "@/components/LateUpdateBanner";
import { WorkshopsSection } from "@/components/WorkshopsSection";
import { AcademicEventsSection } from "@/components/AcademicEventsSection";
import { MafiaSection } from "@/components/MafiaSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { AccommodationSection } from "@/components/AccommodationSection";
import { OrganizersSection } from "@/components/OrganizersSection";
import { Footer } from "@/components/Footer";
import { RegisterModal } from "@/components/RegisterModal";

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#03060c] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Navigation Header */}
      <Navbar onOpenRegister={() => setIsRegisterOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenRegister={() => setIsRegisterOpen(true)} />

      {/* Late Breaking Academic Update Banner */}
      <LateUpdateBanner />

      {/* 8 Clinical Workshops */}
      <WorkshopsSection />

      {/* Academic Competitions (MASS) */}
      <AcademicEventsSection />

      {/* MAFIA Business & Innovation Events */}
      <MafiaSection />

      {/* Master 3-Day Schedule */}
      <ScheduleSection />

      {/* Accommodation Information */}
      <AccommodationSection />

      {/* Organizing Societies & Leadership */}
      <OrganizersSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Registration & Payment Preview Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </main>
  );
}
