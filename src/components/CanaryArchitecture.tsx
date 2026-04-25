"use client";

import { motion } from "framer-motion";
import { Factory, Activity, Network, Database, LineChart, Smartphone } from "lucide-react";

interface CanaryArchitectureProps {
  isEn?: boolean;
}

export default function CanaryArchitecture({ isEn = false }: CanaryArchitectureProps) {
  // Data particles animation variants
  const particlesRight = {
    initial: { x: "-100%", opacity: 0 },
    animate: { 
      x: ["-100%", "200%"], 
      opacity: [0, 1, 1, 0],
      transition: { duration: 0.8, repeat: Infinity, ease: "linear" } 
    }
  };

  const particlesDown = {
    initial: { y: "-100%", opacity: 0 },
    animate: { 
      y: ["-100%", "200%"], 
      opacity: [0, 1, 1, 0],
      transition: { duration: 0.8, repeat: Infinity, ease: "linear" } 
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 lg:p-16 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 lg:gap-4 justify-between">
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* --- LAYER 1: OT Source --- */}
        <div className="relative z-10 flex flex-col items-center w-full lg:w-1/4">
          <div className="w-full bg-slate-800/80 border border-slate-700 rounded-3xl p-6 flex flex-col items-center space-y-4 shadow-lg">
            <div className="flex gap-4 text-amber-500">
              <Factory className="w-10 h-10" />
              <Activity className="w-10 h-10" />
            </div>
            <div className="text-center">
              <h3 className="text-white font-black uppercase tracking-widest text-sm mb-1">
                {isEn ? "OT Source" : "Nguồn OT"}
              </h3>
              <p className="text-amber-500/80 text-xs font-mono">MQTT, OPC UA, SQL</p>
            </div>
          </div>
        </div>

        {/* --- CONNECTOR 1 --- */}
        <div className="relative flex-1 min-h-[40px] min-w-[40px] flex items-center justify-center lg:flex-row flex-col">
          {/* Horizontal line (Desktop) */}
          <div className="hidden lg:block absolute w-full h-0.5 bg-slate-800 overflow-hidden">
            <motion.div variants={particlesRight} initial="initial" animate="animate" className="h-full w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></motion.div>
          </div>
          {/* Vertical line (Mobile) */}
          <div className="block lg:hidden absolute h-full w-0.5 bg-slate-800 overflow-hidden">
             <motion.div variants={particlesDown} initial="initial" animate="animate" className="w-full h-24 bg-gradient-to-b from-transparent via-amber-500 to-transparent"></motion.div>
          </div>

          {/* Dots indicating fast data flow */}
          <div className="absolute flex gap-8 lg:flex-row flex-col">
            {[0, 1, 2].map((i) => (
               <motion.div 
                 key={`dot1-${i}`}
                 animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                 transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                 className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b]"
               />
            ))}
          </div>
        </div>

        {/* --- LAYER 2: Core Historian --- */}
        <div className="relative z-10 w-full lg:w-[40%]">
          <div className="w-full bg-slate-800/40 border-2 border-amber-500/30 rounded-[2.5rem] p-6 lg:p-8 flex flex-col gap-4 shadow-[0_0_30px_rgba(245,158,11,0.05)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
              {isEn ? "Canary Core" : "Lõi Canary"}
            </div>
            
            {/* Block 1: Collector */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-4">
              <div className="bg-amber-500/20 p-3 rounded-xl text-amber-500">
                <Network className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{isEn ? "Canary Collector" : "Canary Collector"}</h4>
                <p className="text-slate-400 text-xs mt-0.5">Store & Forward (No Data Loss)</p>
              </div>
            </div>

            {/* Downward Data Flow internally */}
            <div className="h-6 w-full flex justify-center items-center relative overflow-hidden">
               <div className="w-0.5 h-full bg-slate-700"></div>
               <motion.div 
                 animate={{ y: [-10, 20], opacity: [0, 1, 0] }}
                 transition={{ duration: 0.5, repeat: Infinity }}
                 className="absolute w-1.5 h-4 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]"
               />
            </div>

            {/* Block 2: Historian */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-4">
              <div className="bg-amber-500 p-3 rounded-xl text-slate-900">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-amber-400 font-bold text-sm">{isEn ? "Canary Historian" : "Canary Historian"}</h4>
                <p className="text-slate-400 text-xs mt-0.5">1.5M+ Writes/sec, Lossless compression</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- CONNECTOR 2 --- */}
        <div className="relative flex-1 min-h-[40px] min-w-[40px] flex items-center justify-center lg:flex-row flex-col">
          {/* Horizontal line (Desktop) */}
          <div className="hidden lg:block absolute w-full h-0.5 bg-slate-800 overflow-hidden">
            <motion.div variants={particlesRight} initial="initial" animate="animate" className="h-full w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></motion.div>
          </div>
          {/* Vertical line (Mobile) */}
          <div className="block lg:hidden absolute h-full w-0.5 bg-slate-800 overflow-hidden">
             <motion.div variants={particlesDown} initial="initial" animate="animate" className="w-full h-24 bg-gradient-to-b from-transparent via-amber-500 to-transparent"></motion.div>
          </div>
          
          <div className="absolute flex gap-8 lg:flex-row flex-col">
            {[0, 1, 2].map((i) => (
               <motion.div 
                 key={`dot2-${i}`}
                 animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                 transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 + 0.2 }}
                 className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b]"
               />
            ))}
          </div>
        </div>

        {/* --- LAYER 3: Visualization --- */}
        <div className="relative z-10 flex flex-col items-center w-full lg:w-1/4">
          <div className="w-full bg-slate-800/80 border border-slate-700 rounded-3xl p-6 flex flex-col items-center space-y-4 shadow-lg">
            <div className="flex gap-4 text-amber-400">
              <LineChart className="w-10 h-10" />
              <Smartphone className="w-10 h-10" />
            </div>
            <div className="text-center">
              <h3 className="text-white font-black uppercase tracking-widest text-sm mb-1">
                {isEn ? "Visualization" : "Trực quan hóa"}
              </h3>
              <p className="text-amber-500/80 text-xs font-mono">Axiom Dashboards, Web/Mobile</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
