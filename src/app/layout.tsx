import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CATALYST 2026 | Maulana Azad Medical College (MAMC), New Delhi",
  description:
    "Annual Undergraduate Academic Conference at MAMC New Delhi (18th – 20th November 2026). 8 clinical simulation workshops, academic competitions, and healthcare innovation events for MBBS students across India.",
  keywords: [
    "CATALYST 2026",
    "MAMC",
    "Maulana Azad Medical College",
    "Medical Conference 2026",
    "MBBS",
    "Clinical Workshops",
    "MASS",
    "MAFIA",
  ],
  authors: [{ name: "Scientific Society of MAMC (MASS) & MAFIA" }],
  openGraph: {
    title: "CATALYST 2026 - Annual Undergraduate Academic Conference | MAMC New Delhi",
    description:
      "Learn. Practice. Innovate. MAMC's annual national conference featuring clinical workshops, research presentations, and business challenges (18th – 20th November 2026).",
    siteName: "CATALYST 2026",
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
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased font-sans bg-[#090a0f] text-zinc-100 min-h-screen">
        {children}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
