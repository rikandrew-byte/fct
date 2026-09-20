"use client";

import { motion } from "framer-motion";
import { Download, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

interface BlogCTAProps {
  lang: string;
  targetFunnel?: "guardsquare" | "thales" | "canary";
}

export default function BlogCTA({ lang, targetFunnel }: BlogCTAProps) {
  const isEn = lang === "en";

  const papers = [
    {
      id: "thales",
      title: "Thales Sentinel",
      desc: isEn ? "Software Monetization Guide" : "S獺ch tr廕疸g: T廙 u h籀a doanh thu ph廕吵 m廙",
      link: `/${lang}/whitepaper`,
      color: "blue"
    },
    {
      id: "guardsquare",
      title: "Guardsquare",
      desc: isEn ? "Mobile Malware Protection" : "S獺ch tr廕疸g: B廕υ m廕負 廙姊g d廙叩g di ?廙g",
      link: `/${lang}/whitepaper-guardsquare`,
      color: "rose"
    },
    {
      id: "canary",
      title: "Canary Labs",
      desc: isEn ? "OT Data Historian Guide" : "S獺ch tr廕疸g: Gi廕ξ ph獺p d廙?li廙 IIoT",
      link: `/${lang}/whitepaper-canary`,
      color: "amber"
    }
  ];

  // Reorder papers to put targetFunnel first if provided
  const sortedPapers = [...papers].sort((a, b) => {
    if (a.id === targetFunnel) return -1;
    if (b.id === targetFunnel) return 1;
    return 0;
  });

  return (
    <div className="mt-14 p-8 md:p-12 bg-slate-900 rounded-lg border border-slate-800 relative overflow-hidden shadow-sm">
      <div className="relative z-10 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-bold text-cyan-400 tracking-[0.25em] uppercase block">
            {isEn ? "Strategic Resources" : "T?i li廙 K廙?thu廕負"}
          </span>
          <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            {isEn ? "Deepen Your " : "N璽ng t廕吮 "}
            <span className="text-cyan-400">
              {isEn ? "Technical Knowledge" : "Ki廕積 th廙妾 Chuy礙n m繫n"}
            </span>
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {isEn 
              ? "Download our expert whitepapers to master the latest security and industrial data technologies."
              : "T廕ξ xu廙g c獺c b廙?t?i li廙 chuy礙n s璽u t廙?chuy礙n gia ?廙?l?m ch廙?c繫ng ngh廙?b廕υ m廕負 v? d廙?li廙 c繫ng nghi廙 m廙 nh廕另."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sortedPapers.map((paper, idx) => {
            const isTargeted = paper.id === targetFunnel;
            return (
              <Link 
                key={idx}
                href={paper.link}
                className={`group relative bg-slate-800/80 border p-5 rounded-lg transition-colors flex flex-col justify-between gap-5 ${
                  isTargeted 
                    ? "border-cyan-500 bg-slate-800" 
                    : "border-slate-700 hover:border-slate-500"
                }`}
              >
                {isTargeted && (
                  <div className="absolute -top-2.5 right-3 bg-cyan-700 text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm z-20">
                    Recommended
                  </div>
                )}
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center bg-slate-700 text-cyan-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base tracking-tight mb-1">{paper.title}</h4>
                    <p className="text-xs text-slate-400 leading-snug">{paper.desc}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1.5">
                    {isEn ? "Download PDF" : "T廕ξ t?i li廙"}
                    <Download className="w-3.5 h-3.5" />
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
