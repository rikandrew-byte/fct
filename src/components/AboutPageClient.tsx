"use client";

import Link from "next/link";
import {
  Shield,
  Award,
  Globe,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Building2,
  PackageCheck,
  HeartHandshake,
  ExternalLink,
  Users,
} from "lucide-react";
import { partners } from "@/data/partners";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import { motion } from "framer-motion";

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

interface Stat {
  value: string;
  label: string;
}

interface ValueItem {
  title: string;
  desc: string;
}

interface AboutPageClientProps {
  lang: string;
  dict: any;
}

const valueIcons = [Shield, HeartHandshake, PackageCheck, Globe];
const valueColors = [
  "bg-blue-50 text-blue-800",
  "bg-sky-50 text-sky-600",
  "bg-amber-50 text-amber-600",
  "bg-emerald-50 text-emerald-600",
];

export default function AboutPageClient({ lang, dict }: AboutPageClientProps) {
  const d = dict.aboutPage;

  return (
    <main className="min-h-screen selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-22 pb-16 px-6 min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-[#020617]">
        <NeuralNetworkBackground />
        
        {/* Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600/10 rounded-full blur-[180px] -z-10 animate-pulse"></div>

        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="flex flex-col lg:flex-row gap-16 items-center justify-between">
            {/* Text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 space-y-10"
            >
              <div className="inline-block bg-blue-500/10 border border-blue-400/30 backdrop-blur-md rounded-full px-5 py-2 text-[11px] font-black text-blue-300 tracking-[0.4em] uppercase shadow-2xl">
                {d.hero.badge}
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
                {d.hero.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-300 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  {d.hero.subtitle}
                </span>
              </h1>
              <p className="text-gray-300 text-xl font-light leading-relaxed max-w-xl tracking-tight">
                {d.hero.description}
              </p>
              <div className="flex flex-wrap gap-5 pt-6">
                <Link
                  href={`/${lang}/products`}
                  className="group inline-flex items-center gap-4 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm tracking-tight hover:bg-blue-700 transition-all duration-500 shadow-2xl shadow-blue-500/40"
                >
                  {d.hero.ctaProducts} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black text-sm tracking-tight hover:bg-white/10 transition-all duration-500"
                >
                  {d.hero.ctaExperts}
                </Link>
              </div>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-5 shrink-0 w-full lg:w-auto">
              {d.stats.map((s: Stat) => (
                <div
                  key={s.label}
                  className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 text-center group hover:border-blue-500/50 transition-colors duration-500 shadow-2xl"
                >
                  <p className="text-5xl font-black text-white mb-2 tracking-tighter group-hover:text-blue-400 transition-colors">{s.value}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Giới thiệu ──────────────────────────────────────────────── */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              {d.intro.badge}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight max-w-3xl">
            {d.intro.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-gray-600 text-base leading-relaxed font-light">
            <div className="space-y-5">
              <p dangerouslySetInnerHTML={{ __html: d.intro.content1 }} />
              <p>{d.intro.content2}</p>
            </div>
            <div className="space-y-5">
              <p dangerouslySetInnerHTML={{ __html: d.intro.content3 }} />
              <p>{d.intro.content4}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Giá trị cốt lõi ─────────────────────────────────────────── */}
      <section className="bg-slate-50 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              {d.values.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              {d.values.title}
            </h2>
            <p className="text-gray-500 font-light text-lg max-w-2xl mx-auto">
              {d.values.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {d.values.items.map((v: ValueItem, idx: number) => {
              const Icon = valueIcons[idx] || Shield;
              return (
                <div
                  key={v.title}
                  className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 flex gap-6"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${valueColors[idx]}`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-gray-900">{v.title}</h3>
                    <p className="text-gray-500 font-light text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Lĩnh vực chuyên môn ──────────────────────────────────────── */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                {d.expertise.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                {d.expertise.title}
              </h2>
              <p className="text-gray-500 font-light leading-relaxed">
                {d.expertise.description}
              </p>
            </div>
            <ul className="space-y-4">
              {d.expertise.list.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              {d.journey.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              {d.journey.title}
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-blue-100 md:left-1/2" />

            <div className="space-y-10">
              {d.journey.milestones.map((m: Milestone, idx: number) => (
                <div
                  key={m.year}
                  className={`relative flex gap-8 items-start ${
                    idx % 2 === 0
                      ? "md:flex-row text-left"
                      : "md:flex-row-reverse text-left md:text-right"
                  }`}
                >
                  {/* Year bubble */}
                  <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-800 text-white font-black text-sm shadow-lg shadow-blue-800/20 ml-0.5 md:ml-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0">
                    {m.year.slice(2)}
                  </div>

                  {/* Content card */}
                  <div
                    className={`flex-1 ml-6 md:ml-0 ${
                      idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm inline-block w-full md:max-w-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                          {m.year}
                        </span>
                        <h3 className="font-black text-gray-900">{m.title}</h3>
                      </div>
                      <p className="text-gray-500 font-light text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Đối tác chiến lược ───────────────────────────────────────── */}
      <section className="bg-white py-12 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                {d.partners.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                {d.partners.title}
              </h2>
              <p className="text-gray-500 font-light text-lg max-w-2xl">
                {d.partners.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 group flex flex-col"
                >
                  <div className={`h-1.5 w-full ${p.accentBar}`} />
                  <div className="p-8 flex flex-col flex-1 gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${p.iconBg}`}
                        >
                          <Icon className={`w-7 h-7 ${p.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-gray-900 leading-tight">
                            {p.name}
                          </h3>
                          <p className="text-xs text-gray-400 font-light">{p.fullName}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shrink-0 ${p.badgeBg}`}
                      >
                        {p.tier}
                      </span>
                    </div>
                    {/* Note: Partner descriptions are usually fixed brand names or already in a multi-lang structure if needed */}
                    <p className="text-gray-600 text-sm leading-relaxed font-light flex-1">
                      {p.description}
                    </p>
                    <div className="pt-5 border-t border-gray-50 flex items-center justify-between">
                      <Link
                        href={`/${lang}/products`}
                        className={`inline-flex items-center gap-2 text-sm font-bold transition-all px-3 py-2 rounded-xl ${p.btnColor}`}
                      >
                        {d.partners.viewProducts}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        Website <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Liên hệ ─────────────────────────────────────────────── */}
      <section className="bg-gray-950 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {d.cta.title}
          </h2>
          <p className="text-gray-400 font-light text-lg max-w-xl mx-auto">
            {d.cta.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0983027776"
              id="about-contact-call"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              <Phone className="w-5 h-5" />
              0983 027 776
            </a>
            <a
              href="mailto:andrew@fct.vn"
              id="about-contact-email"
              className="flex items-center justify-center gap-2 bg-gray-800 text-gray-200 border border-gray-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-700 hover:text-white transition-all"
            >
              <Mail className="w-5 h-5" />
              andrew@fct.vn
            </a>
            <Link
              href={`/${lang}/products`}
              id="about-view-products"
              className="flex items-center justify-center gap-2 bg-gray-800 text-gray-200 border border-gray-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-700 hover:text-white transition-all"
            >
              <Award className="w-5 h-5" />
              {d.partners.viewProducts}
            </Link>
          </div>

          {/* Contact info */}
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-500">
            <span className="flex items-center gap-2 justify-center">
              <MapPin className="w-4 h-4" />
              {dict.footer.hqAddress}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
