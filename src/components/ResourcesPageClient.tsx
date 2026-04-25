"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Database,
  Lock,
  MessageSquare,
  BookOpen,
  FileText
} from "lucide-react";
import NeuralNetworkBackground from "./NeuralNetworkBackground";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

interface ResourcesPageClientProps {
  lang: string;
  dict: any;
}

const icons = [Cpu, ShieldCheck, Database, Lock, Zap, Cpu];

export default function ResourcesPageClient({ lang, dict }: ResourcesPageClientProps) {
  const d = dict.knowledge;
  const isEn = lang === "en";
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = d.faqs.filter((faq: FAQItem) => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen selection:bg-blue-600 selection:text-white overflow-x-hidden bg-slate-50">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-44 pb-20 px-6 overflow-hidden bg-[#020617]">
        <NeuralNetworkBackground />
        
        {/* Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] -z-10"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-blue-500/10 border border-blue-400/30 backdrop-blur-md rounded-full px-5 py-2 text-[11px] font-black text-blue-300 tracking-[0.4em] uppercase shadow-2xl"
          >
            {dict.navbar.resources || (isEn ? "Resources & FAQ" : "Tài liệu & Hỏi đáp")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-200 tracking-tight leading-none"
          >
            {d.hero.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-300 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              {d.hero.subtitle}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
          >
            {d.hero.description}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl mx-auto relative mt-12"
          >
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder={isEn ? 'Search questions...' : 'Tìm kiếm câu hỏi...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-full py-5 pl-16 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-light"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Main Content Area ────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 relative items-start">
          
          {/* Left Column: FAQs */}
          <div className="flex-1 w-full">
            <div className="space-y-4">
              {filteredFaqs.map((faq: FAQItem, idx: number) => {
                const Icon = icons[idx % icons.length];
                const isOpen = openIndex === idx;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`border rounded-3xl overflow-hidden transition-all duration-500 bg-white ${
                      isOpen 
                        ? "border-blue-200 bg-blue-50/30 shadow-xl shadow-blue-500/5" 
                        : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-8 text-left group"
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                          isOpen ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className={`text-lg md:text-xl font-black tracking-tight leading-snug ${
                          isOpen ? "text-slate-900" : "text-slate-700"
                        }`}>
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown className={`w-6 h-6 text-slate-400 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          <div className="px-8 pb-8 pl-[104px]">
                            <div className="w-full h-px bg-blue-100 mb-6 opacity-30" />
                            <p className="text-slate-600 text-lg font-medium leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <p className="text-slate-500 font-medium italic">
                    {isEn ? 'No matching results found...' : 'Không tìm thấy kết quả phù hợp...'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right/Bottom Column: Sticky Whitepaper Ribbon */}
          <div className="w-full lg:w-80 shrink-0 order-first lg:order-last mb-8 lg:mb-0">
            <div className="lg:sticky lg:top-32 group">
               {/* Ribbon Container */}
               <div className="relative bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl shadow-blue-900/5 transition-all duration-500 hover:shadow-blue-500/10 hover:border-blue-200 overflow-hidden">
                  
                  {/* Decorative book edge */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-600 to-blue-400 rounded-l-3xl"></div>
                  
                  <div className="pl-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                        {isEn ? "Whitepapers" : "Thư viện Sách trắng"}
                      </h4>
                    </div>

                    <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">
                       {isEn 
                         ? "Unlock deep technical insights with our exclusive whitepaper collection."
                         : "Khám phá các tài liệu kỹ thuật chuyên sâu độc quyền dành cho doanh nghiệp."}
                    </p>

                    <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 snap-x hide-scrollbar">
                       {/* Link 1: Thales */}
                       <Link href={`/${lang}/whitepaper`} className="flex-shrink-0 w-[260px] lg:w-auto flex flex-col p-3 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors group/item snap-start">
                          <span className="text-xs font-black uppercase text-blue-600 mb-1 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" /> Thales Sentinel
                          </span>
                          <span className="text-sm text-slate-700 font-semibold group-hover/item:text-blue-900 transition-colors">
                            {isEn ? "Software Monetization Guide" : "Tối đa hóa doanh thu phần mềm"}
                          </span>
                       </Link>

                       {/* Link 2: Guardsquare */}
                       <Link href={`/${lang}/whitepaper-guardsquare`} className="flex-shrink-0 w-[260px] lg:w-auto flex flex-col p-3 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-rose-50 hover:border-rose-200 transition-colors group/item snap-start">
                          <span className="text-xs font-black uppercase text-rose-600 mb-1 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" /> Guardsquare
                          </span>
                          <span className="text-sm text-slate-700 font-semibold group-hover/item:text-rose-900 transition-colors">
                            {isEn ? "Defeat Mobile Malware" : "Đánh bại Mã độc & Overlay"}
                          </span>
                       </Link>

                       {/* Link 3: Canary */}
                       <Link href={`/${lang}/whitepaper-canary`} className="flex-shrink-0 w-[260px] lg:w-auto flex flex-col p-3 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-amber-50 hover:border-amber-200 transition-colors group/item snap-start">
                          <span className="text-xs font-black uppercase text-amber-600 mb-1 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" /> Canary Historian
                          </span>
                          <span className="text-sm text-slate-700 font-semibold group-hover/item:text-amber-900 transition-colors">
                            {isEn ? "Visualize Millions of OT Data" : "Tối ưu hóa Dữ liệu Vận hành"}
                          </span>
                       </Link>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#020617] py-12 px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <div className="inline-flex items-center gap-2 text-blue-400 bg-blue-400/10 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <MessageSquare className="w-4 h-4" />
            {d.cta.title}
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-slate-200 tracking-tight">
            {d.cta.title}
          </h2>
          
          <p className="text-gray-400 font-light text-lg md:text-xl max-w-xl mx-auto">
            {d.cta.description}
          </p>

          <Link
            href={`/${lang}/contact`}
            className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-6 rounded-2xl font-black text-sm tracking-[0.2em] uppercase hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <span className="relative z-10 flex items-center gap-3">
              {d.cta.button}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
