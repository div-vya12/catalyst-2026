import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { conferenceData } from "@/data/conferenceData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CATALYST 2025 | Maulana Azad Medical College (MAMC), New Delhi",
  description:
    "Annual Undergraduate Academic Conference at MAMC featuring 8 hands-on clinical workshops, academic competitions, and MAFIA business events for MBBS students across India. Learn. Practice. Innovate.",
  keywords: [
    "CATALYST 2025",
    "MAMC",
    "Maulana Azad Medical College",
    "Medical Conference",
    "MBBS",
    "Workshops",
    "MASS",
    "MAFIA",
    "Surgical Skills",
    "Anaesthesia",
    "Hackathon",
  ],
  authors: [{ name: "Scientific Society of MAMC (MASS) & MAFIA" }],
  openGraph: {
    title: "CATALYST 2025 - Annual Undergraduate Academic Conference | MAMC New Delhi",
    description:
      "Learn. Practice. Innovate. MAMC's annual conference with hands-on clinical workshops, research presentations, and business challenges.",
    siteName: "CATALYST 2025",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="antialiased font-sans bg-[#03060c] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
