"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock } from "lucide-react";

/**
 * IntegritySeal
 * A compact certification badge for the Hero section.
 * Styled as a clean, flat B2B credential badge ??no glow, no blur, just authority.
 */
export default function IntegritySeal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="inline-flex items-center gap-3 bg-white border border-slate-200 px-5 py-2.5 rounded-sm shadow-sm cursor-default"
    >
      <ShieldCheck className="w-5 h-5 text-cyan-700 shrink-0" />

      <div className="flex flex-col text-left leading-tight">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Certified Security
        </span>
        <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mt-0.5">
          <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
          FIPS 140-2 L3 &amp; CC EAL4+
        </span>
      </div>
    </motion.div>
  );
}
