"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function NeuralNetworkBackground() {
  const [dots, setDots] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const newDots = Array.from({ length: 25 }).map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      id: i,
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
                cx: [`${dot.x}%`, `${(dot.x + (Math.random() * 8 - 4)) % 100}%`, `${dot.x}%`],
                cy: [`${dot.y}%`, `${(dot.y + (Math.random() * 8 - 4)) % 100}%`, `${dot.y}%`],
              }}
              transition={{
                duration: 12 + Math.random() * 10,
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
                  x1: [`${dot.x}%`, `${(dot.x + (Math.random() * 4 - 2)) % 100}%`, `${dot.x}%`],
                  y1: [`${dot.y}%`, `${(dot.y + (Math.random() * 4 - 2)) % 100}%`, `${dot.y}%`],
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
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] animate-pulse delay-1000"></div>
    </div>
  );
}
