"use client";

import { motion } from "framer-motion";
import { Smartphone, ShieldAlert, Lock, Zap, Ban } from "lucide-react";

interface GuardsquareArchitectureProps {
  isEn?: boolean;
}

export default function GuardsquareArchitecture({ isEn = false }: GuardsquareArchitectureProps) {
  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-6">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          {isEn ? "Protection Nexus" : "Pháo đài Phòng thủ Guardsquare"}
        </h2>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">
          {isEn 
            ? "Concentric layers of defense blocking reverse engineering and runtime attacks." 
            : "Các lớp khiên đồng tâm ngăn chặn kỹ thuật dịch ngược và tấn công trực tiếp khi ứng dụng đang chạy."}
        </p>
      </div>

      <div className="relative w-full max-w-3xl mx-auto aspect-square md:aspect-video flex items-center justify-center bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-rose-900/5 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.5 }}></div>

        {/* Center: Smartphone */}
        <div className="relative z-30 flex flex-col items-center justify-center">
          <div className="w-24 h-40 bg-slate-900 rounded-[2rem] border-4 border-slate-800 flex items-center justify-center relative shadow-2xl shadow-rose-900/20">
            {/* Screen */}
            <div className="w-[85%] h-[90%] bg-slate-800 rounded-xl flex flex-col items-center justify-center space-y-2 border border-slate-700">
              <Smartphone className="w-8 h-8 text-rose-500" />
              <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
              <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
            </div>
            {/* Notch */}
            <div className="absolute top-1.5 w-8 h-1.5 bg-slate-800 rounded-full"></div>
          </div>
          <div className="absolute -bottom-10 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-slate-700 shadow-xl whitespace-nowrap">
            {isEn ? "Banking App" : "App Ngân Hàng"}
          </div>
        </div>

        {/* Inner Circle: Static Protection */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-64 h-64 md:w-80 md:h-80 border-2 border-rose-500/30 rounded-full border-dashed flex items-center justify-center z-20"
        >
          {/* Orbiting Elements */}
          <div className="absolute -top-4 w-8 h-8 bg-white border-2 border-rose-500 rounded-full flex items-center justify-center shadow-lg text-rose-500 shadow-rose-500/20">
            <Lock className="w-4 h-4" />
          </div>
          <div className="absolute -bottom-4 w-8 h-8 bg-white border-2 border-rose-500 rounded-full flex items-center justify-center shadow-lg text-rose-500 shadow-rose-500/20">
            <Lock className="w-4 h-4" />
          </div>
        </motion.div>
        
        {/* Label for Inner Circle */}
        <div className="absolute z-30 bottom-[20%] md:bottom-[25%] bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
          {isEn ? "Static Shield (Obfuscation)" : "Lớp giáp Tĩnh (Làm rối mã)"}
        </div>

        {/* Outer Circle: Dynamic RASP */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[320px] h-[320px] md:w-[480px] md:h-[480px] border-4 border-rose-600/20 rounded-full flex items-center justify-center z-10 shadow-[inset_0_0_50px_rgba(225,29,72,0.05)]"
        >
          {/* Shield Orbiters */}
          <div className="absolute -left-5 w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.4)] text-white">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="absolute -right-5 w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.4)] text-white">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </motion.div>
        
        {/* Label for Outer Circle */}
        <div className="absolute z-30 top-[15%] md:top-[15%] bg-rose-600 border border-rose-700 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-rose-600/20 whitespace-nowrap">
          {isEn ? "Dynamic RASP (Runtime)" : "Lớp giáp Động RASP"}
        </div>

        {/* Incoming Attacks - Top Left */}
        <motion.div 
          initial={{ x: -150, y: -150, opacity: 0 }}
          animate={{ x: [-150, -60, -100], y: [-150, -60, -150], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", repeatDelay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-[250px] -translate-y-[250px] z-40 text-slate-800"
        >
          <div className="flex flex-col items-center">
            <Zap className="w-8 h-8 fill-amber-400 text-amber-500" />
            <span className="text-[9px] font-black uppercase bg-slate-800 text-white px-2 py-0.5 rounded shadow mt-1">Hooking</span>
          </div>
        </motion.div>

        {/* Bounce Effect marker (Top Left) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", repeatDelay: 1, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -mt-[60px] -ml-[60px] z-40 text-rose-500"
        >
          <Ban className="w-8 h-8" />
        </motion.div>

        {/* Incoming Attacks - Bottom Right */}
        <motion.div 
          initial={{ x: 150, y: 150, opacity: 0 }}
          animate={{ x: [150, 60, 100], y: [150, 60, 150], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", repeatDelay: 0.5 }}
          className="absolute top-1/2 left-1/2 z-40 text-slate-800"
        >
          <div className="flex flex-col items-center">
            <Zap className="w-8 h-8 fill-amber-400 text-amber-500 -rotate-180" />
            <span className="text-[9px] font-black uppercase bg-slate-800 text-white px-2 py-0.5 rounded shadow mt-1">Overlay</span>
          </div>
        </motion.div>

        {/* Bounce Effect marker (Bottom Right) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", repeatDelay: 0.5, delay: 0.7 }}
          className="absolute top-1/2 left-1/2 mt-[60px] ml-[60px] z-40 text-rose-500"
        >
          <Ban className="w-8 h-8" />
        </motion.div>

      </div>
    </div>
  );
}
