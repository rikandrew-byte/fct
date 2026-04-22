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
import NeuralNetworkBackground from "./NeuralNetworkBackground";
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = d.faqs.filter((faq: FAQItem) => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen selection:bg-blue-600 selection:text-white overflow-x-hidden">
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
            {d.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none"
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
              placeholder={lang === 'vi' ? 'Tìm kiếm câu hỏi...' : 'Search questions...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-full py-5 pl-16 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-light"
            />
          </motion.div>
        </div>
      </section>

      {/* ── FAQ Section ────────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
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
                  className={`border rounded-3xl overflow-hidden transition-all duration-500 ${
                    isOpen 
                      ? "border-blue-200 bg-blue-50/30 shadow-xl shadow-blue-500/5" 
                      : "border-gray-100 hover:border-blue-100 hover:bg-gray-50/50"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-8 text-left group"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className={`text-lg md:text-xl font-black tracking-tight leading-snug ${
                        isOpen ? "text-gray-900" : "text-gray-700"
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform duration-500 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
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
                          <p className="text-gray-600 text-lg font-light leading-relaxed">
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
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <HelpCircle className="w-8 h-8" />
                </div>
                <p className="text-gray-500 font-light italic">
                  {lang === 'vi' ? 'Không tìm thấy kết quả phù hợp...' : 'No matching results found...'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="bg-gray-950 py-24 px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <div className="inline-flex items-center gap-2 text-blue-400 bg-blue-400/10 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <MessageSquare className="w-4 h-4" />
            {d.cta.title}
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            {d.cta.title}
          </h2>
          
          <p className="text-gray-400 font-light text-lg md:text-xl max-w-xl mx-auto">
            {d.cta.description}
          </p>

          <Link
            href={`/${lang}/contact`}
            className="group inline-flex items-center gap-4 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-blue-700 transition-all duration-500 shadow-2xl shadow-blue-500/40"
          >
            {d.cta.button}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
