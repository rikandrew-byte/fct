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
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-black text-blue-600 tracking-[0.4em] uppercase block"
            >
              {d.badge}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-gray-950 tracking-tighter leading-tight"
            >
              {d.title} <br />
              <span className="text-blue-600">{d.subtitle}</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              href={`/${lang}/posts`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-900 rounded-2xl font-bold text-sm transition-all duration-300 group shadow-sm"
            >
              {d.viewAll}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {safeNews.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-100 transition-all duration-500"
            >
              {/* Image Area */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <Image 
                  src={article.image || "/logo.jpg"} 
                  alt={article.title}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-110 ${!article.image ? 'p-12 opacity-20' : ''}`}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex flex-col flex-1 space-y-4">
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-black text-gray-950 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/${lang}/posts/${article.id}`}>
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-3 flex-1">
                  {article.summary}
                </p>
                
                <div className="pt-4 flex items-center">
                  <Link 
                    href={`/${lang}/posts/${article.id}`}
                    className="text-xs font-black uppercase tracking-widest text-gray-900 group-hover:text-blue-600 flex items-center gap-2 transition-colors"
                  >
                    {isEn ? "Read Article" : "Đọc bài viết"}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
