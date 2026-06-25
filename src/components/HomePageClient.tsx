"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldAlert, Cpu, ArrowRight, ShieldCheck } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import IntegritySeal from "@/components/IntegritySeal";
import { motion } from "framer-motion";
import NewsSection from "@/components/NewsSection";
import PainPointsSection from "@/components/PainPointsSection";
import TrustMetrics from "@/components/TrustMetrics";
import SecurityComparisonTable from "@/components/SecurityComparisonTable";
import LongmaiSolutionBlock from "@/components/LongmaiSolutionBlock";

interface HomePageClientProps {
  lang: string;
  dict: {
    hero: any;
    trust: any;
    solutions: any;
    homeNews?: any;
    painPoints: any;
    trustMetrics: any;
  };
  latestNews: {
    id: string;
    title: string;
    date: string;
    summary: string;
    category: string;
    image?: string;
  }[];
}

export default function HomePageClient({ lang, dict, latestNews }: HomePageClientProps) {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-500 selection:text-white pb-20 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 pb-10 px-4 sm:px-6 min-h-[85vh] landscape:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
        <NeuralNetworkBackground />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/10 rounded-full blur-[200px] -z-10 animate-pulse"></div>

        <div className="text-center max-w-5xl mx-auto space-y-6 sm:space-y-10 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group relative inline-block"
          >
            <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
            <div className="relative overflow-hidden bg-blue-100 backdrop-blur-xl border border-blue-300 rounded-full px-8 py-2.5 text-[11px] font-black text-blue-700 tracking-[0.3em] shadow-2xl uppercase">
              <span className="relative z-10 font-black">{dict.hero.badge}</span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.15] sm:leading-[1.2] md:leading-[1] text-gray-900"
          >
            {dict.hero.title} <br />
            <span className="relative inline-block pb-4">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                {dict.hero.subtitle}
              </span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-transparent rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base sm:text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed tracking-tight mb-8"
          >
            {dict.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-full shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-105"
            >
              {dict.hero.cta1}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${lang}/whitepaper`}
              className="inline-flex items-center gap-2 border border-blue-400/40 hover:border-blue-400/80 text-blue-600 hover:text-blue-700 font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              {dict.hero.cta2}
            </Link>
          </motion.div>
          
          <div className="pt-8">
            <IntegritySeal />
          </div>
        </div>
      </section>

      {/* Trust & Confidentiality Section */}
      <section className="border-b border-gray-200 bg-white py-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-gray-600 font-medium text-xs md:text-sm tracking-[0.3em] uppercase">
            {dict.trust.sectors.map((sector: string) => (
              <div key={sector} className="hover:text-blue-400 transition-colors cursor-default">{sector}</div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 text-gray-600">
            <div className="h-px w-12 bg-gray-300"></div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] italic text-blue-600">
              {dict.trust.commitment}
            </p>
            <div className="h-px w-12 bg-gray-300"></div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <PainPointsSection dict={dict} />

      {/* Security Comparison Table */}
      <SecurityComparisonTable 
        lang={lang}
        title={dict.securityComparison.title}
        subtitle={dict.securityComparison.subtitle}
        rows={dict.securityComparison.rows}
      />

      {/* Trust Metrics Section */}
      <TrustMetrics dict={dict} />

      {/* Main Content Sections */}
      <section className="section-padding bg-white">
        <AboutSection lang={lang} dict={dict} />
      </section>

      {/* Bento Box Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-16 section-padding">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-4">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-sm font-black text-blue-600 tracking-[0.4em] uppercase block mb-2">{dict.solutions.badge}</span>
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-gray-950 tracking-tighter leading-tight">
              {dict.solutions.title} <br />
              <span className="text-blue-600">{dict.solutions.subtitle}</span>
            </h2>
          </div>

        </div>

        {/* Bento Grid: Thales (col-span-2) + Guardsquare (col-span-2) lớn, Longmai nhỏ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Item 1: Guardsquare — Enterprise Priority, chiếm 2 cột */}
          <Link href={`/${lang}/products/guardsquare`} className="group md:col-span-2">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-blue-50 border border-blue-100 rounded-3xl p-6 sm:p-10 h-full space-y-4 sm:space-y-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-blue-600 group-hover:scale-110 transition-transform duration-500">
                <ShieldAlert className="w-12 h-12 stroke-[1.5px]" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-medium text-blue-500 uppercase tracking-widest">Enterprise Mobile Security</span>
                <h3 className="text-3xl font-black text-gray-950 tracking-tighter group-hover:text-blue-600 transition-colors">{dict.solutions.mobileSecurity.title}</h3>
              </div>
              <p className="text-gray-600 text-base font-light leading-relaxed max-w-lg">
                {dict.solutions.mobileSecurity.description}
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>{lang === "en" ? "Explore solution" : "Khám phá giải pháp"}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.article>
          </Link>

          {/* Item 3: Longmai — Compact, chiếm 1 cột */}
          <Link href={`/${lang}/products/longmai`} className="group md:col-span-1">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-rose-50 border border-rose-100 rounded-3xl p-6 sm:p-8 h-full space-y-4 sm:space-y-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-rose-600 group-hover:scale-110 transition-transform duration-500">
                <Cpu className="w-10 h-10 stroke-[1.5px]" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-medium text-rose-500 uppercase tracking-widest">{lang === "en" ? "Flexible Alternative" : "Giải pháp Linh hoạt"}</span>
                <h3 className="text-xl font-black text-gray-950 tracking-tighter group-hover:text-rose-600 transition-colors">{dict.solutions.hardwareSecurity.title}</h3>
              </div>
              <p className="text-gray-600 text-sm font-light leading-relaxed">
                {dict.solutions.hardwareSecurity.description}
              </p>
              <div className="flex items-center gap-2 text-rose-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>{lang === "en" ? "Learn more" : "Tìm hiểu thêm"}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.article>
          </Link>

          {/* Item 2: Thales — Enterprise Priority, chiếm full width */}
          <Link href={`/${lang}/products/thales-sentinel`} className="group md:col-span-3">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 sm:p-10 space-y-4 sm:space-y-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="text-indigo-600 group-hover:scale-110 transition-transform duration-500 mt-1">
                    <ShieldCheck className="w-12 h-12 stroke-[1.5px]" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-indigo-500 uppercase tracking-widest">Enterprise License Management</span>
                    <h3 className="text-3xl font-black text-gray-950 tracking-tighter group-hover:text-indigo-600 transition-colors">{dict.solutions.licenseManagement.title}</h3>
                    <p className="text-gray-600 text-base font-light leading-relaxed max-w-2xl">
                      {dict.solutions.licenseManagement.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm group-hover:gap-3 transition-all shrink-0">
                  <span>{lang === "en" ? "Explore solution" : "Khám phá giải pháp"}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          </Link>
        </div>
      </section>

      {/* Longmai Solution Block - Alternative Solution */}
      <LongmaiSolutionBlock isEn={lang === "en"} lang={lang} />
      
      {/* ── 3. News Section (Khám phá tin tức) ───────────────────────── */}
      <NewsSection lang={lang} dict={dict} latestNews={latestNews} />

      <Testimonials />
    </main>
  );
}
