"use client";

import { motion } from "framer-motion";
import { 
  Laptop, 
  KeyRound, 
  ShieldCheck, 
  ArrowRight,
  Server,
  Ban,
  Zap,
  Lock,
  Cpu
} from "lucide-react";

interface GuardantArchitectureProps {
  isEn?: boolean;
}

export default function GuardantArchitecture({ isEn = false }: GuardantArchitectureProps) {
  // Data flow animations
  const particlesRight = {
    initial: { x: "-100%", opacity: 0 },
    animate: { 
      x: ["-100%", "200%"], 
      opacity: [0, 1, 1, 0],
      transition: { duration: 1.2, repeat: Infinity, ease: "linear" } 
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center gap-6 lg:gap-4 justify-between">
        
        {/* --- STEP 1: Protection Studio (Developer Build) --- */}
        <div className="relative z-10 flex flex-col items-center w-full lg:w-[28%]">
          <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col items-center space-y-3 shadow-xs relative group hover:border-emerald-300 transition-colors">
            <div className="absolute -top-3 left-4 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm">
              {isEn ? "Step 1" : "B廙 1"}
            </div>
            
            <div className="w-12 h-12 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Laptop className="w-6 h-6" />
            </div>
            
            <div className="text-center">
              <h3 className="text-slate-900 font-bold uppercase tracking-wider text-xs mb-1">
                {isEn ? "Protection Studio" : "M瓊 h籀a 廙姊g d廙叩g"}
              </h3>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {isEn 
                  ? "Encrypt binary & set licensing restrictions." 
                  : "M瓊 h籀a file th廙帷 thi, ?籀ng g籀i ph廕吵 m廙 v? ?廙h ngh藺a license."}
              </p>
            </div>
          </div>
        </div>

        {/* --- CONNECTOR 1 --- */}
        <div className="relative flex-shrink-0 w-8 lg:w-12 h-6 lg:h-auto flex items-center justify-center">
          <div className="hidden lg:block absolute w-full h-0.5 bg-slate-200 overflow-hidden">
            <motion.div variants={particlesRight} initial="initial" animate="animate" className="h-full w-12 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></motion.div>
          </div>
          <ArrowRight className="text-slate-400 w-4 h-4 lg:block hidden" />
        </div>

        {/* --- STEP 2: Multi-layer Verification (Ecosystem) --- */}
        <div className="relative z-10 w-full lg:w-[36%]">
          <div className="w-full bg-slate-50 border border-emerald-300 rounded-lg p-5 flex flex-col gap-3 shadow-xs relative">
            <div className="inline-block self-center bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-sm whitespace-nowrap">
              {isEn ? "Step 2: Dual Verification" : "B廙 2: X獺c th廙帷 ?a h穫nh"}
            </div>

            {/* Hardware Key Check */}
            <div className="bg-white border border-slate-200 rounded-md p-3 flex items-center gap-3 hover:border-emerald-300 transition-colors shadow-xs">
              <div className="bg-emerald-50 p-2.5 rounded-sm text-emerald-600">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wide">
                  {isEn ? "Hardware Key (Offline)" : "Kh籀a c廙姊g (Offline)"}
                </h4>
                <p className="text-slate-500 text-[10px]">Guardant Sign & Chip (Driverless)</p>
              </div>
            </div>

            {/* Cloud/Software License Check */}
            <div className="bg-white border border-slate-200 rounded-md p-3 flex items-center gap-3 hover:border-emerald-300 transition-colors shadow-xs">
              <div className="bg-emerald-50 p-2.5 rounded-sm text-emerald-600">
                <Server className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wide">
                  {isEn ? "Cloud/DL Key (Online)" : "Kh籀a m廙 / Cloud (Online)"}
                </h4>
                <p className="text-slate-500 text-[10px]">Guardant Station & Virtualization</p>
              </div>
            </div>

          </div>
        </div>

        {/* --- CONNECTOR 2 --- */}
        <div className="relative flex-shrink-0 w-8 lg:w-12 h-6 lg:h-auto flex items-center justify-center">
          <div className="hidden lg:block absolute w-full h-0.5 bg-slate-200 overflow-hidden">
            <motion.div variants={particlesRight} initial="initial" animate="animate" className="h-full w-12 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></motion.div>
          </div>
          <ArrowRight className="text-slate-400 w-4 h-4 lg:block hidden" />
        </div>

        {/* --- STEP 3: Executable Protection (Runtime) --- */}
        <div className="relative z-10 flex flex-col items-center w-full lg:w-[28%]">
          <div className="w-full bg-slate-900 border border-slate-800 rounded-lg p-5 flex flex-col items-center space-y-3 shadow-md relative overflow-hidden">
            
            <div className="absolute -top-3 left-4 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm">
              {isEn ? "Step 3" : "B廙 3"}
            </div>

            <div className="w-12 h-12 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 relative z-10">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="text-center relative z-10">
              <h3 className="text-slate-50 font-bold uppercase tracking-wider text-xs mb-1">
                {isEn ? "Active Defense" : "V廕要 h?nh an to?n"}
              </h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {isEn 
                  ? "Blocks decompilers, debugging & cracking." 
                  : "Ng?n ch廕搖 c獺c c繫ng c廙?b廕?kh籀a, ph璽n t穩ch ng廙θ v? ch廕『 debug."}
              </p>
            </div>

            {/* Blocked Attack Animation Indicator */}
            <div className="flex gap-1.5 items-center pt-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <span className="text-[9px] text-emerald-400 font-mono tracking-wider uppercase">Shield Active</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
