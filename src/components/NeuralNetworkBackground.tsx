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
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      <svg className="w-full h-full">
        {dots.map((dot, i) => (
          <g key={dot.id}>
            {/* Dots */}
            <motion.circle
              cx={`${dot.x}%`}
              cy={`${dot.y}%`}
              r="1.5"
              fill="rgba(59, 130, 246, 0.4)"
              animate={{
                cx: [`${dot.x}%`, `${(dot.x + (Math.random() * 10 - 5)) % 100}%`, `${dot.x}%`],
                cy: [`${dot.y}%`, `${(dot.y + (Math.random() * 10 - 5)) % 100}%`, `${dot.y}%`],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
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
                stroke="rgba(59, 130, 246, 0.15)"
                strokeWidth="0.5"
                animate={{
                  x1: [`${dot.x}%`, `${(dot.x + (Math.random() * 5 - 2.5)) % 100}%`, `${dot.x}%`],
                  y1: [`${dot.y}%`, `${(dot.y + (Math.random() * 5 - 2.5)) % 100}%`, `${dot.y}%`],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </g>
        ))}
      </svg>
      {/* Blurred background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
    </div>
  );
}
