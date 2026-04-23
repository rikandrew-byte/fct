"use client";

import { motion } from "framer-motion";

interface SkeletonLoaderProps {
  className?: string;
  type?: "card" | "text" | "avatar";
}

export default function SkeletonLoader({ className = "", type = "text" }: SkeletonLoaderProps) {
  if (type === "card") {
    return (
      <div className={`military-panel rounded-2xl p-6 overflow-hidden relative ${className}`}>
        {/* Shimmer Effect overlay */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-shimmer z-10" />
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-slate-800 animate-pulse-slow" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-slate-800 rounded w-1/3 animate-pulse-slow" />
            <div className="h-3 bg-slate-800/50 rounded w-1/4 animate-pulse-slow" />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="h-3 bg-slate-800 rounded w-full animate-pulse-slow delay-75" />
          <div className="h-3 bg-slate-800 rounded w-5/6 animate-pulse-slow delay-100" />
          <div className="h-3 bg-slate-800 rounded w-4/6 animate-pulse-slow delay-150" />
        </div>
      </div>
    );
  }

  if (type === "avatar") {
    return (
      <div className={`w-12 h-12 rounded-full bg-slate-800 animate-pulse-slow relative overflow-hidden ${className}`}>
         <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-shimmer" />
      </div>
    );
  }

  // Default: text
  return (
    <div className={`h-4 bg-slate-800 rounded w-full animate-pulse-slow relative overflow-hidden ${className}`}>
       <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-shimmer" />
    </div>
  );
}
