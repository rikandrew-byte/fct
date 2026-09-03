"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldAlert, Cpu, ArrowRight, ShieldCheck } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import TechGridBackground from "@/components/TechGridBackground";
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
    securityComparison: any;
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
      <section className="relative pt-20 md:pt-28 pb-16 px-4 sm:px-6 min-h-[82vh] flex flex-col items-center justify-center overflow-hidden bg-slate-50">
        <TechGridBackground />

        <div className="text-center max-w-5xl mx-auto space-y-8 z-10 relative">
          {/* Badge — B2B Enterprise style: solid, no shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 border border-blue-700 bg-blue-700 text-white text-[10px] font-bold tracking-[0.25em] uppercase px-5 py-1.5 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 inline-block" />
              {dict.hero.badge}
            </span>
          </motion.div>

          {/* Headline — solid, high-contrast, no gradient glow */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.08] text-slate-900"
          >
            {dict.hero.title}
            <br />
            <span className="text-blue-700">{dict.hero.subtitle}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            {dict.hero.description}
          </motion.p>

          {/* CTA Buttons — solid, professional */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm tracking-wide px-8 py-3.5 rounded-sm transition-colors duration-200"
            >
              {dict.hero.cta1}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`/${lang}/whitepaper`}
              className="inline-flex items-center gap-2 border border-slate-300 hover:border-blue-700 hover:text-blue-700 text-slate-700 font-semibold text-sm tracking-wide px-8 py-3.5 rounded-sm bg-white transition-colors duration-200"
            >
              {dict.hero.cta2}
            </a>
          </motion.div>

          {/* Integrity Seal */}
          <div className="pt-4">
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

      {/* Solutions Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-16 section-padding">
        {/* Header */}
        <div className="mb-10 sm:mb-14 border-b border-slate-200 pb-8">
          <span className="text-[11px] font-bold text-blue-700 tracking-[0.3em] uppercase block mb-3">{dict.solutions.badge}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
            {dict.solutions.title}{" "}
            <span className="text-blue-700">{dict.solutions.subtitle}</span>
          </h2>
        </div>

        {/* Solution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: Guardsquare */}
          <Link href={`/${lang}/products/guardsquare`} className="group md:col-span-2">
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 hover:border-blue-700 rounded-lg p-7 sm:p-9 h-full flex flex-col gap-5 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-sm uppercase tracking-widest">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Enterprise Mobile Security
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guardsquare</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {dict.solutions.mobileSecurity.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">
                {dict.solutions.mobileSecurity.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {["DexGuard", "iXGuard", "Android & iOS", "RASP", "ProGuard"].map(tag => (
                  <span key={tag} className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-blue-700 font-semibold text-sm group-hover:gap-3 transition-all">
                <span>{lang === "en" ? "Explore solution" : "Khám phá giải pháp"}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.article>
          </Link>

          {/* Card 2: Longmai */}
          <Link href={`/${lang}/products/longmai`} className="group md:col-span-1">
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-slate-200 hover:border-slate-700 rounded-lg p-7 h-full flex flex-col gap-5 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-sm uppercase tracking-widest">
                  <Cpu className="w-3.5 h-3.5" />
                  {lang === "en" ? "Hardware Security" : "Bảo mật Cứng"}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Longmai</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                {dict.solutions.hardwareSecurity.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">
                {dict.solutions.hardwareSecurity.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {["Smart X1", "Smart X3", "3DES", "FIPS 140-2"].map(tag => (
                  <span key={tag} className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-sm group-hover:gap-3 transition-all">
                <span>{lang === "en" ? "Learn more" : "Tìm hiểu thêm"}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.article>
          </Link>

          {/* Card 3: Thales Sentinel — full width, dark */}
          <Link href={`/${lang}/products/thales-sentinel`} className="group md:col-span-3">
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-slate-900 border border-slate-800 hover:border-blue-500 rounded-lg p-7 sm:p-9 transition-colors duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex flex-col md:flex-row items-start gap-6 flex-1">
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-300 bg-blue-950 border border-blue-800 px-2.5 py-1 rounded-sm uppercase tracking-widest">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Enterprise License Management
                    </span>
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {dict.solutions.licenseManagement.title}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden md:block">Thales Sentinel</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                      {dict.solutions.licenseManagement.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {["Sentinel LDK", "Sentinel RMS", "HSM", "FIPS 140-2 L3", "CC EAL4+", "AES-256"].map(tag => (
                        <span key={tag} className="text-[10px] font-semibold text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-sm">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all shrink-0">
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
