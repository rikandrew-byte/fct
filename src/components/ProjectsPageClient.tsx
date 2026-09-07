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
import TechGridBackground from "@/components/TechGridBackground";
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
    { label: d.stats.projects || "Dự án triển khai", value: "150+", sub: "Total Deployed" },
    { label: d.stats.partners || "Đối tác Tier-1", value: "40+", sub: "Tier-1 Partners" },
    { label: d.stats.roi || "Tỷ lệ tối ưu", value: "30%", sub: "Efficiency Increase" },
  ];

  return (
    <main className="bg-white min-h-screen">
      {/* Header Area */}
      <div className="relative bg-slate-50 pt-32 pb-20 px-6 overflow-hidden border-b border-slate-200">
        <TechGridBackground />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-5 max-w-3xl">
              <span className="inline-flex items-center gap-2 border border-blue-700 bg-blue-700 text-white text-[10px] font-bold tracking-[0.25em] uppercase px-5 py-1.5 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300 inline-block" />
                {d.badge}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {d.titlePart1} <br />
                <span className="text-blue-700">{d.titlePart2}</span>
              </h1>
              <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed max-w-xl">
                {d.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <section className="relative z-20 -mt-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm"
              >
                <p className="text-3xl md:text-4xl font-black text-slate-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-blue-700 mb-0.5">
                  {stat.label}
                </p>
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="max-w-7xl mx-auto py-14 px-6 bg-white">
        <div className="grid grid-cols-1 gap-8">
          {(Array.isArray(projectsData) ? projectsData : []).map((project, index) => {
            const Icon = iconMap[project.industry] || Shield;
            
            return (
              <article key={project.id} className="bg-white border border-slate-200 rounded-lg p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-sm hover:border-slate-400 transition-colors">
                
                {/* Left Column: Industry & Title */}
                <div className="lg:col-span-12 space-y-4 border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">{d.list.field}</p>
                      <p className="text-sm font-semibold text-slate-700">{project.industry}</p>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-slate-900">
                    {project.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-sm bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Content Sections */}
                <div className="lg:col-span-12 space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg space-y-2">
                        <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
                           <Zap className="w-4 h-4 text-amber-600" /> {d.list.challenge}
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{project.challenge}</p>
                      </div>
                      
                      <div className="bg-white border border-blue-200 p-6 rounded-lg space-y-2">
                        <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                           <Shield className="w-4 h-4" /> {d.list.solution}
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">{project.solution}</p>
                      </div>
                   </div>
                   
                   <div className="p-6 rounded-lg bg-emerald-50/60 border border-emerald-200 flex items-center gap-4">
                      <TrendingUp className="w-8 h-8 text-emerald-700 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 mb-0.5">{d.list.result}</p>
                        <p className="text-base font-semibold text-slate-900 tracking-tight">{project.result}</p>
                      </div>
                   </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14 px-6 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto p-10 md:p-14 bg-slate-900 rounded-lg text-center space-y-6 border border-slate-800 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">{d.cta.title}</h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto font-normal">
            {d.cta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3.5 rounded-sm font-semibold text-sm tracking-wide transition-colors"
            >
              {d.cta.requestConsult}
            </button>
            <a 
              href={`/${lang}/contact`}
              className="border border-slate-700 text-slate-300 hover:text-white px-8 py-3.5 rounded-sm font-semibold text-sm tracking-wide transition-colors"
            >
              {d.cta.downloadProfile}
            </a>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} dict={dict} />
    </main>
  );
}
