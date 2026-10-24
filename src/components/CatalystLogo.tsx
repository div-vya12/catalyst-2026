"use client";

import React, { useState } from "react";

interface CatalystLogoProps {
  className?: string;
  size?: number;
}

export const CatalystLogo: React.FC<CatalystLogoProps> = ({ className = "w-8 h-8", size = 32 }) => {
  const [imageError, setImageError] = useState(false);

  // If a user drops logo.png or logo.svg into /public, it automatically displays.
  if (!imageError) {
    return (
      <img
        src="/logo.png"
        alt="CATALYST 2026"
        className={`${className} object-contain rounded-lg`}
        onError={() => setImageError(true)}
      />
    );
  }

  // Stylish SVG Catalyst emblem fallback (Geometric Reaction / Molecular Spark)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="10" fill="#141724" stroke="#27272a" strokeWidth="1.5" />
      {/* Central catalyst spark / crystal */}
      <path
        d="M20 7L24 16L33 20L24 24L20 33L16 24L7 20L16 16L20 7Z"
        fill="url(#catalyst-grad)"
      />
      <circle cx="20" cy="20" r="3" fill="#ffffff" />
      <defs>
        <linearGradient id="catalyst-grad" x1="7" y1="7" x2="33" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#a1a1aa" />
          <stop offset="1" stopColor="#52525b" />
        </linearGradient>
      </defs>
    </svg>
  );
};
