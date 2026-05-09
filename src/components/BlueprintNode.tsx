"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Info } from "lucide-react";

interface BlueprintNodeProps {
  icon: ReactNode;
  title: string;
  description: string;
  info?: string;
  delay?: number;
}

export default function BlueprintNode({ icon, title, description, info, delay = 0 }: BlueprintNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative group w-full"
    >
      {/* Node Content */}
      <div className="military-panel rounded-2xl p-6 relative z-10 transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-xl border border-gray-300 flex items-center justify-center shrink-0 text-blue-600 group-hover:text-blue-700 transition-colors">
            {icon}
          </div>
          <div className="flex-1">
            <h4 className="text-gray-900 font-bold mb-1 tracking-tight flex items-center justify-between">
              {title}
              <Info className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </h4>
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Hover Info Tooltip (Architectural Detail) */}
      {info && (
        <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 translate-y-full w-[110%] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-xl border border-blue-300 p-4 rounded-xl shadow-2xl relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-blue-300 rotate-45"></div>
            <p className="text-blue-700 text-xs font-mono leading-relaxed relative z-10">
               {info}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
