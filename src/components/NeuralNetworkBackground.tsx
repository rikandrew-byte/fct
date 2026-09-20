"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DotData {
  id: number;
  x: number;
  y: number;
  tx: number; // target x
  ty: number; // target y
  dur: number; // duration
  lines: { tx: number; ty: number }[];
}

export default function NeuralNetworkBackground() {
  const [dots, setDots] = useState<DotData[]>([]);

  useEffect(() => {
    const newDots = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      tx: (Math.random() * 8 - 4),
      ty: (Math.random() * 8 - 4),
      dur: 12 + Math.random() * 10,
      lines: Array.from({ length: 2 }).map(() => ({
        tx: (Math.random() * 4 - 2),
        ty: (Math.random() * 4 - 2),
      })),
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-80">
      <svg className="w-full h-full">
        {dots.map((dot, i) => (
          <g key={dot.id} className="opacity-70">
            {/* Dots */}
            <motion.circle
              cx={`${dot.x}%`}
              cy={`${dot.y}%`}
              r="2"
              fill="rgba(59, 130, 246, 0.8)"
              className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
              animate={{
                cx: [`${dot.x}%`, `${(dot.x + dot.tx) % 100}%`, `${dot.x}%`],
                cy: [`${dot.y}%`, `${(dot.y + dot.ty) % 100}%`, `${dot.y}%`],
              }}
              transition={{
                duration: dot.dur,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Lines to 2 closest neighbors */}
            {dots.slice(i + 1, i + 3).map((neighbor, ni) => (
              <motion.line
                key={`${dot.id}-${ni}`}
                x1={`${dot.x}%`}
                y1={`${dot.y}%`}
                x2={`${neighbor.x}%`}
                y2={`${neighbor.y}%`}
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="0.8"
                animate={{
                  x1: [`${dot.x}%`, `${(dot.x + dot.lines[ni].tx) % 100}%`, `${dot.x}%`],
                  y1: [`${dot.y}%`, `${(dot.y + dot.lines[ni].ty) % 100}%`, `${dot.y}%`],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </g>
        ))}
      </svg>
      {/* Blurred background glows - STRONGER */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[140px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] animate-pulse delay-1000"></div>
    </div>
  );
}
