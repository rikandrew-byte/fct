"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldAlert, Cpu, ArrowRight, ShieldCheck } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import IntegritySeal from "@/components/IntegritySeal";
import { motion } from "framer-motion";

interface HomePageClientProps {
  lang: string;
  dict: any;
}

export default function HomePageClient({ lang, dict }: HomePageClientProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-500 selection:text-white pb-20 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 pb-10 px-6 min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#020617]">
        <NeuralNetworkBackground />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/10 rounded-full blur-[200px] -z-10 animate-pulse"></div>

        <div className="text-center max-w-5xl mx-auto space-y-10 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group relative inline-block"
          >
            <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
            <div className="relative overflow-hidden bg-blue-900/30 backdrop-blur-xl border border-blue-400/40 rounded-full px-8 py-2.5 text-[11px] font-black text-blue-200 tracking-[0.3em] shadow-2xl uppercase">
              <span className="relative z-10 font-black">{dict.hero.badge}</span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.2] md:leading-[1] text-white"
          >
            {dict.hero.title} <br />
            <span className="relative inline-block pb-4">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-300 drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]">
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
            className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed tracking-tight mb-8"
          >
            {dict.hero.description}
          </motion.p>
          
          <div className="pt-8">
            <IntegritySeal />
          </div>
        </div>
      </section>

      {/* Trust & Confidentiality Section */}
      <section className="border-b border-white/5 bg-[#020617] py-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-gray-500 font-black text-xs md:text-sm tracking-[0.4em] uppercase opacity-80">
            {dict.trust.sectors.map((sector: string) => (
              <div key={sector} className="hover:text-blue-400 transition-colors cursor-default">{sector}</div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 text-gray-600">
            <div className="h-px w-12 bg-white/10"></div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] italic text-blue-400/80">
              {dict.trust.commitment}
            </p>
            <div className="h-px w-12 bg-white/10"></div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-12 bg-white">
        <AboutSection lang={lang} dict={dict} />
      </section>

      {/* Bento Box Grid */}
      <section className="max-w-6xl mx-auto px-6 mb-16 pt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-sm font-black text-blue-600 tracking-[0.4em] uppercase">{dict.solutions.badge}</h2>
            <h3 className="text-4xl md:text-7xl font-black text-gray-950 tracking-tighter leading-none">
              {dict.solutions.title} <br />
              <span className="text-blue-600">{dict.solutions.subtitle}</span>
            </h3>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Item 1: Guardsquare */}
          <Link href={`/${lang}/products/guardsquare`} className="group">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="text-blue-600 group-hover:scale-110 transition-transform duration-500">
                <ShieldAlert className="w-10 h-10 stroke-[1.5px]" />
              </div>
              <h3 className="text-2xl font-black text-gray-950 tracking-tighter group-hover:text-blue-600 transition-colors">{dict.solutions.mobileSecurity.title}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                {dict.solutions.mobileSecurity.description}
              </p>
            </motion.article>
          </Link>

          {/* Item 2: Thales */}
          <Link href={`/${lang}/products/thales-sentinel`} className="group">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div className="text-indigo-600 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-10 h-10 stroke-[1.5px]" />
              </div>
              <h3 className="text-2xl font-black text-gray-950 tracking-tighter group-hover:text-indigo-600 transition-colors">{dict.solutions.licenseManagement.title}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                {dict.solutions.licenseManagement.description}
              </p>
            </motion.article>
          </Link>

          {/* Item 3: Longmai */}
          <Link href={`/${lang}/products/longmai`} className="group">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="text-rose-600 group-hover:scale-110 transition-transform duration-500">
                <Cpu className="w-10 h-10 stroke-[1.5px]" />
              </div>
              <h3 className="text-2xl font-black text-gray-950 tracking-tighter group-hover:text-rose-600 transition-colors">{dict.solutions.hardwareSecurity.title}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                {dict.solutions.hardwareSecurity.description}
              </p>
            </motion.article>
          </Link>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
