"use client";

/**
 * TechGridBackground
 * Replaces the AI-cliché "neural network floating dots" background.
 * Renders a clean technical dot-grid pattern — static, precise, and professional.
 * Used in the Hero Section to convey infrastructure & engineering credibility.
 */
export default function TechGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Dot grid — blueprint / PCB aesthetic */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.18]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#06b6d4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Subtle horizontal rule lines — like a technical schematic */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="h-lines" x="0" y="0" width="100%" height="128" patternUnits="userSpaceOnUse">
            <line x1="0" y1="64" x2="100%" y2="64" stroke="#1e40af" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#h-lines)" />
      </svg>

      {/* Very soft radial fade in center — draws focus, no neon */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(239,246,255,0.85),transparent)]" />
    </div>
  );
}
