"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldAlert, Cpu, ArrowRight, ShieldCheck } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import { motion } from "framer-motion";

interface HomePageClientProps {
  lang: string;
  dict: any;
}

export default function HomePageClient({ lang, dict }: HomePageClientProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-500 selection:text-white pb-20 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 px-6 min-h-[95vh] flex flex-col items-center justify-center overflow-hidden bg-[#020617]">
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
            className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.2] md:leading-[1] text-white"
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
            className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed tracking-tight"
          >
            {dict.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Trust & Confidentiality Section */}
      <section className="border-b border-white/5 bg-[#020617] py-16 relative overflow-hidden">
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
      <section className="py-24 bg-white">
        <AboutSection lang={lang} dict={dict} />
      </section>

      {/* Bento Box Grid */}
      <section className="max-w-6xl mx-auto px-6 mb-32 pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-sm font-black text-blue-600 tracking-[0.4em] uppercase">{dict.solutions.badge}</h2>
            <h3 className="text-4xl md:text-7xl font-black text-gray-950 tracking-tighter leading-none">
              {dict.solutions.title} <br />
              <span className="text-blue-600">{dict.solutions.subtitle}</span>
            </h3>
          </div>
          <Link href={`/${lang}/news`} className="text-blue-600 font-semibold hover:underline flex items-center gap-2 group text-lg">
            {dict.solutions.newsLink} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 auto-rows-[340px]">

          {/* Card 1: Guardsquare */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.01 }}
            className="md:col-span-2 glass-panel rounded-[3rem] p-12 flex flex-col justify-center relative overflow-hidden group transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] hover:border-blue-400/50"
          >
            <Image
              src="/images/guardsquare-bg.png"
              alt="Guardsquare Security"
              fill
              className="object-cover opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent z-0"></div>
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-colors pointer-events-none"></div>

            <div className="relative z-10 w-16 h-16 rounded-[2rem] bg-white shadow-xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors border border-gray-100">
              <ShieldAlert className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="relative z-10 text-3xl font-black text-gray-950 mb-4 tracking-tighter">{dict.solutions.mobileSecurity.title}</h3>
            <p className="relative z-10 text-gray-500 text-base font-light leading-relaxed max-w-sm">
              {dict.solutions.mobileSecurity.description}
            </p>
          </motion.div>

          {/* Card 2: Thales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -10, scale: 1.01 }}
            className="md:col-span-2 glass-panel rounded-[3rem] p-12 flex flex-col justify-center relative overflow-hidden group transition-all duration-500 hover:shadow-[0_0_50px_rgba(99,102,241,0.15)] hover:border-indigo-400/50"
          >
            <Image
              src="/sentinelLDK1.png"
              alt="Bảo mật Thales"
              fill
              className="object-cover object-top opacity-[0.1] group-hover:opacity-[0.3] transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent z-0"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full group-hover:bg-indigo-500/20 transition-colors pointer-events-none"></div>
            <div className="relative z-10 w-16 h-16 rounded-[2rem] bg-indigo-50/50 backdrop-blur-md flex items-center justify-center mb-8 group-hover:bg-indigo-600 transition-colors border border-indigo-100/50">
              <ShieldCheck className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="relative z-10 text-3xl font-black text-gray-950 mb-4 tracking-tighter">{dict.solutions.licenseManagement.title}</h3>
            <p className="relative z-10 text-gray-500 text-base font-light leading-relaxed max-w-sm">
              {dict.solutions.licenseManagement.description}
            </p>
          </motion.div>

          {/* Card 3: Longmai */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -10, scale: 1.01 }}
            className="md:col-span-2 glass-panel rounded-[3rem] p-12 flex flex-col justify-center relative overflow-hidden group transition-all duration-500 hover:shadow-[0_0_50px_rgba(244,63,94,0.15)] hover:border-rose-400/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent z-0"></div>
            <div className="relative z-10 w-16 h-16 rounded-[2rem] bg-rose-50 flex items-center justify-center mb-8 group-hover:bg-rose-600 transition-colors border border-rose-100">
              <Cpu className="w-8 h-8 text-rose-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="relative z-10 text-3xl font-black text-gray-950 mb-4 tracking-tighter">{dict.solutions.hardwareSecurity.title}</h3>
            <p className="relative z-10 text-gray-500 text-base font-light leading-relaxed max-w-sm">
              {dict.solutions.hardwareSecurity.description}
            </p>
          </motion.div>

          {/* Card 4: FCT Ecosystem Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -10, scale: 1.01 }}
            className="md:col-span-2 relative group"
          >
            <Link
              href={`/${lang}/products`}
              className="w-full h-full bg-gradient-to-br from-blue-700 via-blue-900 to-[#020617] text-white shadow-2xl shadow-blue-500/30 rounded-[3rem] p-12 flex flex-col justify-center items-center text-center transition-all duration-500 relative overflow-hidden border border-white/5"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.3),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 w-24 h-24 rounded-[2.5rem] bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-white/20">
                <ArrowRight className="w-12 h-12 text-white" />
              </div>
              <h3 className="relative z-10 text-3xl font-black tracking-tighter">{dict.solutions.ecosystem.title}</h3>
              <p className="relative z-10 text-blue-100/70 text-base mt-4 font-light max-w-[280px] leading-relaxed">{dict.solutions.ecosystem.description}</p>
            </Link>
          </motion.div>

        </div>
      </section>

      <Testimonials />
    </div>
  );
}
