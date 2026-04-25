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
      desc: isEn ? "Software Monetization Guide" : "Sách trắng: Tối ưu hóa doanh thu phần mềm",
      link: `/${lang}/whitepaper`,
      color: "blue"
    },
    {
      id: "guardsquare",
      title: "Guardsquare",
      desc: isEn ? "Mobile Malware Protection" : "Sách trắng: Bảo mật ứng dụng di động",
      link: `/${lang}/whitepaper-guardsquare`,
      color: "rose"
    },
    {
      id: "canary",
      title: "Canary Labs",
      desc: isEn ? "OT Data Historian Guide" : "Sách trắng: Giải pháp dữ liệu IIoT",
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
    <div className="mt-16 p-8 md:p-12 bg-[#020617] rounded-[3rem] border border-blue-500/20 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] -z-10"></div>

      <div className="relative z-10 space-y-8">
        <div className="text-center space-y-4">
          <span className="text-xs font-black text-blue-400 tracking-[0.4em] uppercase block">
            {isEn ? "Strategic Resources" : "Tài liệu Chiến lược"}
          </span>
          <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
            {isEn ? "Deepen Your" : "Nâng tầm"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
              {isEn ? "Technical Knowledge" : "Kiến thức Chuyên môn"}
            </span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            {isEn 
              ? "Download our expert whitepapers to master the latest security and industrial data technologies."
              : "Tải xuống các bộ tài liệu chuyên sâu từ chuyên gia để làm chủ công nghệ bảo mật và dữ liệu công nghiệp mới nhất."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedPapers.map((paper, idx) => {
            const isTargeted = paper.id === targetFunnel;
            return (
              <Link 
                key={idx}
                href={paper.link}
                className={`group relative bg-white/5 border p-6 rounded-3xl transition-all duration-500 flex flex-col justify-between gap-6 ${
                  isTargeted 
                    ? "border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]" 
                    : "border-white/10 hover:bg-white/10 hover:border-blue-500/50"
                }`}
              >
                {isTargeted && (
                  <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg z-20">
                    Recommended
                  </div>
                )}
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${paper.color}-500/20 text-${paper.color}-400 group-hover:scale-110 transition-transform`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg tracking-tight mb-1">{paper.title}</h4>
                    <p className="text-xs text-gray-500 font-medium leading-snug">{paper.desc}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 group-hover:text-blue-300 flex items-center gap-2">
                    {isEn ? "Download Now" : "Tải ngay"}
                    <Download className="w-3 h-3" />
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
