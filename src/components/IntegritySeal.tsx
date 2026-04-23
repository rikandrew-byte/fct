"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock } from "lucide-react";

export default function IntegritySeal() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-3 brushed-aluminum px-6 py-3 rounded-full border border-slate-400 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all cursor-default"
    >
      <div className="relative flex items-center justify-center">
        <ShieldCheck className="w-6 h-6 text-slate-800 relative z-10" />
        <div className="absolute inset-0 bg-blue-400/30 blur-md rounded-full -z-0"></div>
      </div>
      
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">
          Seal of Integrity
        </span>
        <span className="text-xs font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-emerald-600" />
          100% NDA PROTECTED
        </span>
      </div>
    </motion.div>
  );
}
