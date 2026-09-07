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
  MessageSquare 
} from "lucide-react";
import TechGridBackground from "./TechGridBackground";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

interface KnowledgePageClientProps {
  lang: string;
  dict: any;
}

const icons = [Cpu, ShieldCheck, Database, Lock, Zap, Cpu];

export default function KnowledgePageClient({ lang, dict }: KnowledgePageClientProps) {
  const d = dict.knowledge;
  const isEn = lang === "en";
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = d.faqs.filter((faq: FAQItem) => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen selection:bg-blue-600 selection:text-white overflow-x-hidden bg-white">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-slate-50 border-b border-slate-200">
        <TechGridBackground />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-2 border border-blue-700 bg-blue-700 text-white text-[10px] font-bold tracking-[0.25em] uppercase px-5 py-1.5 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-300 inline-block" />
            {d.hero.badge}
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {d.hero.title} <span className="text-blue-700">{d.hero.subtitle}</span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            {d.hero.description}
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mt-8">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder={lang === 'vi' ? 'Tìm kiếm câu hỏi chuyên môn...' : 'Search technical questions...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-sm py-3.5 pl-12 pr-4 text-slate-900 focus:outline-none focus:border-blue-700 transition-colors text-sm shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ Section ────────────────────────────────────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-3">
            {filteredFaqs.map((faq: FAQItem, idx: number) => {
              const Icon = icons[idx % icons.length];
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className={`border rounded-lg overflow-hidden transition-colors ${
                    isOpen 
                      ? "border-blue-300 bg-blue-50/20" 
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className={`text-base md:text-lg font-bold tracking-tight ${
                        isOpen ? "text-slate-900" : "text-slate-700"
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-700" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pl-20">
                          <div className="w-full h-px bg-slate-200 mb-4" />
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 bg-slate-100 rounded-sm flex items-center justify-center mx-auto text-slate-400">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <p className="text-slate-500 text-sm">
                  {lang === 'vi' ? 'Không tìm thấy câu hỏi phù hợp...' : 'No matching results found...'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto p-10 md:p-14 bg-slate-900 rounded-lg text-center space-y-6 border border-slate-800 shadow-sm">
          <span className="inline-flex items-center gap-1.5 text-blue-300 bg-blue-950 border border-blue-800 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5" />
            {d.cta.title}
          </span>
          
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
            {d.cta.title}
          </h2>
          
          <p className="text-slate-400 text-base max-w-xl mx-auto font-normal">
            {d.cta.description}
          </p>

          <div className="pt-2">
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-8 py-3.5 rounded-sm font-semibold text-sm tracking-wide transition-colors"
            >
              <span>{d.cta.button}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
    </main>
  );
}
