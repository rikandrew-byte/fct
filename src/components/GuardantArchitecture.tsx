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
    <div className="w-full max-w-5xl mx-auto py-12 px-4">
      <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 lg:gap-4 justify-between">
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-emerald-400/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* --- STEP 1: Protection Studio (Developer Build) --- */}
        <div className="relative z-10 flex flex-col items-center w-full lg:w-[28%]">
          <div className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col items-center space-y-4 shadow-sm relative group hover:border-emerald-300 transition-colors">
            <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full">
              {isEn ? "Step 1" : "Bước 1"}
            </div>
            
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Laptop className="w-8 h-8" />
            </div>
            
            <div className="text-center">
              <h3 className="text-slate-900 font-bold uppercase tracking-wider text-xs mb-1">
                {isEn ? "Protection Studio" : "Mã hóa ứng dụng"}
              </h3>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                {isEn 
                  ? "Encrypt binary & set licensing restrictions." 
                  : "Mã hóa file thực thi, đóng gói phần mềm và định nghĩa license."}
              </p>
            </div>
          </div>
        </div>

        {/* --- CONNECTOR 1 --- */}
        <div className="relative flex-shrink-0 w-8 lg:w-16 h-8 lg:h-auto flex items-center justify-center">
          <div className="hidden lg:block absolute w-full h-0.5 bg-slate-200 overflow-hidden">
            <motion.div variants={particlesRight} initial="initial" animate="animate" className="h-full w-12 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></motion.div>
          </div>
          <ArrowRight className="text-slate-400 w-5 h-5 lg:block hidden" />
        </div>

        {/* --- STEP 2: Multi-layer Verification (Ecosystem) --- */}
        <div className="relative z-10 w-full lg:w-[36%]">
          <div className="w-full bg-slate-50 border-2 border-emerald-500/20 rounded-[2.5rem] p-6 flex flex-col gap-4 shadow-sm relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
              {isEn ? "Step 2: Dual Verification" : "Bước 2: Xác thực đa hình"}
            </div>

            {/* Hardware Key Check */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:border-emerald-300 transition-colors shadow-sm">
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wide">
                  {isEn ? "Hardware Key (Offline)" : "Khóa cứng (Offline)"}
                </h4>
                <p className="text-slate-500 text-[10px]">Guardant Sign & Chip (Driverless)</p>
              </div>
            </div>

            {/* Cloud/Software License Check */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:border-emerald-300 transition-colors shadow-sm">
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                <Server className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wide">
                  {isEn ? "Cloud/DL Key (Online)" : "Khóa mềm / Cloud (Online)"}
                </h4>
                <p className="text-slate-500 text-[10px]">Guardant Station & Virtualization</p>
              </div>
            </div>

          </div>
        </div>

        {/* --- CONNECTOR 2 --- */}
        <div className="relative flex-shrink-0 w-8 lg:w-16 h-8 lg:h-auto flex items-center justify-center">
          <div className="hidden lg:block absolute w-full h-0.5 bg-slate-200 overflow-hidden">
            <motion.div variants={particlesRight} initial="initial" animate="animate" className="h-full w-12 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></motion.div>
          </div>
          <ArrowRight className="text-slate-400 w-5 h-5 lg:block hidden" />
        </div>

        {/* --- STEP 3: Executable Protection (Runtime) --- */}
        <div className="relative z-10 flex flex-col items-center w-full lg:w-[28%]">
          <div className="w-full bg-[#020617] border border-slate-800 rounded-3xl p-6 flex flex-col items-center space-y-4 shadow-2xl relative overflow-hidden">
            
            {/* Pulsing glow inside step 3 */}
            <div className="absolute inset-0 bg-emerald-500/5 blur-2xl rounded-full"></div>

            <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full">
              {isEn ? "Step 3" : "Bước 3"}
            </div>

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 relative z-10">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="text-center relative z-10">
              <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-1">
                {isEn ? "Active Defense" : "Vận hành an toàn"}
              </h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {isEn 
                  ? "Blocks decompilers, debugging & cracking." 
                  : "Ngăn chặn các công cụ bẻ khóa, phân tích ngược và chạy debug."}
              </p>
            </div>

            {/* Blocked Attack Animation Indicator */}
            <div className="absolute bottom-2 flex gap-1 items-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
              />
              <span className="text-[8px] text-emerald-400 font-mono tracking-widest uppercase">Shield Active</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
