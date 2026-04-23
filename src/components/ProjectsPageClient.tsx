"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Zap, 
  TrendingUp, 
  Users, 
  Globe, 
  Lock, 
  Cpu, 
  Database,
  Building2,
  Factory,
  CreditCard,
  Cloud
} from "lucide-react";
import { useState } from "react";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import ContactModal from "@/components/ContactModal";

interface Project {
  id: string;
  title: string;
  industry: string;
  tech: string[];
  challenge: string;
  solution: string;
  result: string;
}

interface ProjectsPageClientProps {
  lang: string;
  dict: any;
  projectsData: Project[];
}

const iconMap: Record<string, any> = {
  "Tài chính - Ngân hàng": CreditCard,
  "Finance & Banking": CreditCard,
  "Viễn thông": Globe,
  "Telecommunications": Globe,
  "Công nghiệp - Sản xuất": Factory,
  "Manufacturing & Industry": Factory,
  "Chính phủ": Building2,
  "Government": Building2,
  "Dữ liệu": Database,
  "Data Centers": Database,
  "Công nghệ": Cpu,
  "Technology": Cpu,
  "Cloud": Cloud,
  "Bảo mật": Lock,
  "Security": Lock
};

export default function ProjectsPageClient({ lang, dict, projectsData }: ProjectsPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const d = dict.projects;

  const stats = [
    { label: d.stats.projects, value: "150+", sub: "Total Deployed" },
    { label: d.stats.partners, value: "40+", sub: "Tier-1 Partners" },
    { label: d.stats.roi, value: "30%", sub: "Efficiency Increase" },
  ];

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Header Area */}
      <div className="relative bg-[#020617] pt-48 pb-32 px-6 overflow-hidden">
        <NeuralNetworkBackground />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-8 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block bg-blue-500/10 border border-blue-400/30 backdrop-blur-md rounded-full px-5 py-2 text-[10px] font-black text-blue-300 tracking-[0.4em] uppercase"
              >
                {d.badge}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]"
              >
                {d.titlePart1} <br />
                <span className="text-blue-500">{d.titlePart2}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed max-w-xl tracking-tight"
              >
                {d.description}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <section className="relative z-20 -mt-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 text-center group hover:border-blue-500 transition-all duration-500 shadow-xl shadow-gray-200/50"
              >
                <p className="text-3xl md:text-5xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {stat.value}
                </p>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-1">
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

      {/* Case Studies Grid */}
      <section className="max-w-7xl mx-auto py-10 px-6 bg-slate-50">
        <div className="grid grid-cols-1 gap-12">
          {projectsData.map((project, index) => {
            const Icon = iconMap[project.industry] || Shield;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group relative"
              >
                <article className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start hover:border-blue-500/20 transition-all duration-500 shadow-2xl shadow-gray-200/40 relative overflow-hidden">
                  
                  {/* Left Column: Industry & Title */}
                  <div className="lg:col-span-12 space-y-6 text-center border-b border-gray-100 pb-8">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="space-y-0.5 text-left">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600/60">{d.list.field}</p>
                        <p className="text-sm font-bold text-gray-700">{project.industry}</p>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h2>
                    
                    <div className="flex flex-wrap justify-center gap-2 pt-4">
                      {project.tech.map((t) => (
                        <span key={t} className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-wider text-gray-600 shadow-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Content Sections */}
                  <div className="lg:col-span-12">
                     <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Architectural Blueprint</p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                        <div className="hidden md:block absolute top-1/2 left-1/2 w-8 h-px bg-gray-200 -translate-x-1/2 -translate-y-1/2"></div>
                        
                        <div className="flex flex-col gap-4 relative">
                          <div className="hidden md:block absolute -right-4 top-1/2 w-4 h-px bg-gray-200 -translate-y-1/2"></div>
                          <div className="bg-slate-50 border border-gray-100 p-6 rounded-2xl space-y-3">
                            <div className="flex items-center gap-3 text-blue-600 font-black text-xs uppercase tracking-widest">
                               <Zap className="w-4 h-4" /> {d.list.challenge}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{project.challenge}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-4 relative">
                          <div className="hidden md:block absolute -left-4 top-1/2 w-4 h-px bg-gray-200 -translate-y-1/2"></div>
                          <div className="bg-white border border-blue-100 p-6 rounded-2xl space-y-3 shadow-lg shadow-blue-500/5">
                            <div className="flex items-center gap-3 text-blue-700 font-black text-xs uppercase tracking-widest">
                               <Shield className="w-4 h-4" /> {d.list.solution}
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{project.solution}</p>
                          </div>
                        </div>
                     </div>
                     
                     <div className="mt-12 p-8 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center gap-6 justify-center">
                        <TrendingUp className="w-10 h-10 text-emerald-600 shrink-0" />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/70 mb-1">{d.list.result}</p>
                          <p className="text-lg font-bold text-gray-900 tracking-tight">{project.result}</p>
                        </div>
                     </div>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-6 relative overflow-hidden">
        <NeuralNetworkBackground />
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
