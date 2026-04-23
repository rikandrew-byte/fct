"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Database, Cpu, Lock, Zap, Target, TrendingUp } from "lucide-react";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import ContactModal from "@/components/ContactModal";
import BlueprintNode from "@/components/BlueprintNode";

interface Project {
  id: string;
  title: string;
  persona: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  impact: string;
  tech: string[];
}

interface ProjectsPageClientProps {
  lang: string;
  dict: any;
  projectsData: Project[];
}

const iconMap: Record<string, any> = {
  // Vietnamese keys
  "Tài chính - Ngân hàng": Shield,
  "Năng lượng & Hạ tầng": Database,
  "Sản xuất Công nghệ cao": Cpu,
  "Chuỗi cung ứng & CNTT": Lock,
  // English keys
  "Banking & Finance": Shield,
  "Energy & Infrastructure": Database,
  "High-Tech Manufacturing": Cpu,
  "Supply Chain & IT": Lock,
};

export default function ProjectsPageClient({ lang, dict, projectsData }: ProjectsPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const d = dict.projects;
  const isEn = lang === "en";

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-600 selection:text-white">
      {/* ── Hero Section ───────────────────────────────────────────── */}
      <section className="relative pt-12 pb-6 px-6 overflow-hidden">
        <NeuralNetworkBackground />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[180px] -z-10"></div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-500 font-black text-xs uppercase tracking-[0.4em] mb-4 block">
              {d.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
              {d.titlePart1} <span className="text-blue-500">{d.titlePart2}</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              {d.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Quantifiable Metrics (Achievements) ───────────────────── */}
      <section className="relative z-10 -mt-12 mb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {d.stats.map((stat: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#020617]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 text-center group hover:border-blue-500/50 transition-all duration-500"
              >
                <p className="text-3xl md:text-5xl font-black text-slate-200 mb-2 group-hover:text-blue-400 transition-colors">
                  {stat.value}
                </p>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-1">
                  {stat.label}
                </p>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Studies Grid ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto py-10 px-6">
        <div className="grid grid-cols-1 gap-12">
          {projectsData.map((project, index) => {
            const Icon = iconMap[project.industry] || Shield;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Background Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                
                <article className="bg-[#020617]/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start hover:border-blue-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden">
                  {/* Subtle inner glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors"></div>
                  
                  {/* Left Column: Industry & Title */}
                  <div className="lg:col-span-12 space-y-6 text-center border-b border-white/10 pb-8">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-500" />
                      </div>
                      <div className="space-y-0.5 text-left">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/60">{d.list.field}</p>
                        <p className="text-sm font-bold text-gray-300">{project.industry}</p>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h2>
                    
                    <div className="flex flex-wrap justify-center gap-2 pt-4">
                      {project.tech.map((t) => (
                        <span key={t} className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-black uppercase tracking-wider text-slate-300 shadow-inner">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Content Sections - Architectural Blueprint */}
                  <div className="lg:col-span-12">
                     <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-8">Architectural Blueprint</p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-1/2 w-8 h-px bg-slate-700 -translate-x-1/2 -translate-y-1/2"></div>
                        
                        <div className="flex flex-col gap-4 relative">
                          <div className="hidden md:block absolute -right-4 top-1/2 w-4 h-px bg-slate-700 -translate-y-1/2"></div>
                          <BlueprintNode 
                            icon={<Zap />}
                            title={d.list.challenge}
                            description={project.challenge}
                            delay={index * 0.1}
                          />
                        </div>
                        
                        <div className="flex flex-col gap-4 relative">
                          <div className="hidden md:block absolute -left-4 top-1/2 w-4 h-px bg-slate-700 -translate-y-1/2"></div>
                          <BlueprintNode 
                            icon={<Shield />}
                            title={d.list.solution}
                            description={project.solution}
                            delay={index * 0.1 + 0.1}
                          />
                        </div>
                     </div>
                     
                     <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-900/20 to-slate-900 border border-blue-500/20 flex items-center gap-6 justify-center">
                        <TrendingUp className="w-10 h-10 text-emerald-400 shrink-0" />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/70 mb-1">{d.list.result}</p>
                          <p className="text-lg font-bold text-slate-200 tracking-tight">{project.result}</p>
                        </div>
                     </div>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Call to Action ────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-blue-600 to-blue-900 rounded-[3.5rem] text-center space-y-8 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <h2 className="text-4xl font-black tracking-tighter text-slate-200">{d.cta.title}</h2>
          <p className="text-blue-100 opacity-80 font-light text-lg">
            {d.cta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-blue-950 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:bg-blue-50 transition-all shadow-xl"
            >
              {d.cta.requestConsult}
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
              {d.cta.downloadProfile}
            </button>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} dict={dict} />
    </main>
  );
}
