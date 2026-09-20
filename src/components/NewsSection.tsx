"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";

interface Article {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  image?: string;
}

interface NewsSectionProps {
  lang: string;
  dict: any;
  latestNews: Article[];
}

export default function NewsSection({ lang, dict, latestNews }: NewsSectionProps) {
  const isEn = lang === "en";
  const d = dict.homeNews || {
    badge: isEn ? "Knowledge Hub" : "Khám phá tin tức",
    title: isEn ? "Latest Technical" : "Tin tức",
    subtitle: isEn ? "Insights" : "Công nghệ",
    viewAll: isEn ? "View All Articles" : "Xem tất cả bài viết"
  };

  const safeNews = Array.isArray(latestNews) ? latestNews : [];

  return (
    <section className="py-20 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-cyan-700 tracking-[0.25em] uppercase block">
              {d.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {d.title} <span className="text-cyan-700">{d.subtitle}</span>
            </h2>
          </div>
          
          <div>
            <Link 
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-cyan-700 hover:text-white text-slate-800 rounded-sm font-semibold text-sm border border-slate-200 transition-colors"
            >
              {d.viewAll}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {safeNews.map((article, index) => (
            <article
              key={article.id}
              className="group flex flex-col bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-slate-400 transition-colors shadow-sm"
            >
              {/* Image Area */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image 
                  src={article.image || "/logo.jpg"} 
                  alt={article.title}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${!article.image ? 'p-12 opacity-20' : ''}`}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-white/95 rounded-sm text-[10px] font-bold uppercase tracking-wider text-cyan-700 border border-slate-200 shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-1 space-y-3">
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-cyan-700 transition-colors line-clamp-2">
                  <Link href={`/${lang}/blog/${article.id}`}>
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 flex-1">
                  {article.summary}
                </p>
                
                <div className="pt-2 flex items-center">
                  <Link 
                    href={`/${lang}/blog/${article.id}`}
                    className="text-xs font-semibold uppercase tracking-wider text-slate-900 group-hover:text-cyan-700 flex items-center gap-1.5 transition-colors"
                  >
                    {isEn ? "Read Article" : "Đọc bài viết"}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
