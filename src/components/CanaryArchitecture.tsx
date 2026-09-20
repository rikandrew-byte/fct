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
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg p-6 md:p-8 lg:p-10 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center gap-6 lg:gap-4 justify-between">
        
        {/* --- LAYER 1: OT Source --- */}
        <div className="relative z-10 flex flex-col items-center w-full lg:w-1/4">
          <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col items-center space-y-3 shadow-xs">
            <div className="flex gap-3 text-amber-500">
              <Factory className="w-8 h-8" />
              <Activity className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h3 className="text-slate-900 font-semibold uppercase tracking-wider text-xs mb-1">
                {isEn ? "OT Source" : "Ngu廙 OT"}
              </h3>
              <p className="text-amber-700 text-xs font-mono">MQTT, OPC UA, SQL</p>
            </div>
          </div>
        </div>

        {/* --- CONNECTOR 1 --- */}
        <div className="relative flex-1 min-h-[50px] lg:min-h-[40px] w-full lg:w-auto flex items-center justify-center lg:flex-row flex-col">
          {/* Horizontal line (Desktop) */}
          <div className="hidden lg:block absolute w-full h-0.5 bg-slate-200 overflow-hidden">
            <motion.div variants={particlesRight} initial="initial" animate="animate" className="h-full w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></motion.div>
          </div>
          {/* Vertical line (Mobile) */}
          <div className="block lg:hidden absolute h-full w-0.5 bg-slate-200 overflow-hidden">
             <motion.div variants={particlesDown} initial="initial" animate="animate" className="w-full h-24 bg-gradient-to-b from-transparent via-amber-400 to-transparent"></motion.div>
          </div>

          {/* Dots indicating fast data flow */}
          <div className="absolute flex gap-4 lg:gap-8 flex-col lg:flex-row">
            {[0, 1, 2].map((i) => (
               <motion.div 
                 key={`dot1-${i}`}
                 animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                 transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                 className="w-2 h-2 rounded-full bg-amber-500"
               />
            ))}
          </div>
        </div>

        {/* --- LAYER 2: Core Historian --- */}
        <div className="relative z-10 w-full lg:w-[40%]">
          <div className="w-full bg-slate-50 border border-amber-300 rounded-lg p-5 lg:p-6 flex flex-col gap-3 shadow-xs">
            <div className="inline-block self-center bg-amber-600 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-0.5 rounded-sm">
              {isEn ? "Canary Core" : "L繭i Canary"}
            </div>
            
            {/* Block 1: Collector */}
            <div className="bg-white border border-slate-200 rounded-md p-3.5 flex items-center gap-3.5 shadow-xs">
              <div className="bg-amber-50 p-2.5 rounded-sm text-amber-600 border border-amber-200">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-slate-900 font-semibold text-sm">{isEn ? "Canary Collector" : "Canary Collector"}</h4>
                <p className="text-slate-500 text-xs mt-0.5">Store & Forward (No Data Loss)</p>
              </div>
            </div>

            {/* Downward Data Flow internally */}
            <div className="h-4 w-full flex justify-center items-center relative overflow-hidden">
               <div className="w-0.5 h-full bg-slate-200"></div>
               <motion.div 
                 animate={{ y: [-10, 20], opacity: [0, 1, 0] }}
                 transition={{ duration: 0.5, repeat: Infinity }}
                 className="absolute w-1.5 h-3 bg-amber-500 rounded-full"
               />
            </div>

            {/* Block 2: Historian */}
            <div className="bg-white border border-amber-300 rounded-md p-3.5 flex items-center gap-3.5 shadow-xs">
              <div className="bg-amber-500 p-2.5 rounded-sm text-white">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-amber-700 font-semibold text-sm">{isEn ? "Canary Historian" : "Canary Historian"}</h4>
                <p className="text-slate-500 text-xs mt-0.5">1.5M+ Writes/sec, Lossless compression</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- CONNECTOR 2 --- */}
        <div className="relative flex-1 min-h-[50px] lg:min-h-[40px] w-full lg:w-auto flex items-center justify-center lg:flex-row flex-col">
          {/* Horizontal line (Desktop) */}
          <div className="hidden lg:block absolute w-full h-0.5 bg-slate-200 overflow-hidden">
            <motion.div variants={particlesRight} initial="initial" animate="animate" className="h-full w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></motion.div>
          </div>
          {/* Vertical line (Mobile) */}
          <div className="block lg:hidden absolute h-full w-0.5 bg-slate-200 overflow-hidden">
             <motion.div variants={particlesDown} initial="initial" animate="animate" className="w-full h-24 bg-gradient-to-b from-transparent via-amber-400 to-transparent"></motion.div>
          </div>
          
          <div className="absolute flex gap-4 lg:gap-8 flex-col lg:flex-row">
            {[0, 1, 2].map((i) => (
               <motion.div 
                 key={`dot2-${i}`}
                 animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                 transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 + 0.2 }}
                 className="w-2 h-2 rounded-full bg-amber-500"
               />
            ))}
          </div>
        </div>

        {/* --- LAYER 3: Visualization --- */}
        <div className="relative z-10 flex flex-col items-center w-full lg:w-1/4">
          <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col items-center space-y-3 shadow-xs">
            <div className="flex gap-3 text-amber-500">
              <LineChart className="w-8 h-8" />
              <Smartphone className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h3 className="text-slate-900 font-semibold uppercase tracking-wider text-xs mb-1">
                {isEn ? "Visualization" : "Tr廙帷 quan h籀a"}
              </h3>
              <p className="text-amber-700 text-xs font-mono">Axiom Dashboards, Web/Mobile</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
