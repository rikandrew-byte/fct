"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Share2, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import BlogCTA from "@/components/BlogCTA";

interface Article {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  image?: string;
  content: string;
  target_funnel?: "guardsquare" | "thales" | "canary";
}

interface BlogDetailClientProps {
  lang: string;
  dict: any;
  article: Article;
  relatedNews: Article[];
}

export default function BlogDetailClient({ lang, dict, article, relatedNews }: BlogDetailClientProps) {
  const isEn = lang === "en";

  return (
    <main className="min-h-screen bg-white selection:bg-blue-600 selection:text-white">
      {/* ── Progress Bar ────────────────────── */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[100] origin-left"
        initial={{ scaleX: 0 }}
        style={{ scaleX: 1 }} // Simplified for now
      />

      {/* ── Hero / Header ───────────────────── */}
      <header className="relative pt-44 pb-20 px-6 bg-[#020617] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] -z-10"></div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          <Link 
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-xs font-black uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="w-4 h-4" />
            {isEn ? "Back to Blog" : "Quay lại Blog"}
          </Link>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full">
                {article.category}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {isEn ? "5 min read" : "5 phút đọc"}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]">
              {article.title}
            </h1>
          </div>
        </div>
      </header>

      {/* ── Content Section ─────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Sidebar / Tools */}
            <aside className="lg:col-span-1 hidden lg:block sticky top-32 h-fit space-y-8">
              <div className="flex flex-col gap-4">
                <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-100">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </aside>

            {/* Article Body */}
            <article className="lg:col-span-11 space-y-12">
              {/* Cover Image */}
              <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image 
                  src={article.image || "/logo.jpg"} 
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Markdown Content */}
              <div className="prose prose-lg prose-slate max-w-none 
                prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-900
                prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
                prose-strong:text-slate-900 prose-strong:font-black
                prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50/50 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic
                prose-img:rounded-[2rem] prose-img:shadow-xl prose-img:border prose-img:border-slate-100
                ">
                <ReactMarkdown>{article.content}</ReactMarkdown>
              </div>

              {/* Automatic CTA Section */}
              <BlogCTA lang={lang} targetFunnel={article.target_funnel} />

              {/* Related Articles */}
              <div className="pt-20 border-t border-slate-100 space-y-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
                  {isEn ? "Continue Reading" : "Khám phá thêm"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedNews.map((item) => (
                    <Link key={item.id} href={`/${lang}/blog/${item.id}`} className="group space-y-4">
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                        <Image src={item.image || "/logo.jpg"} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <h4 className="font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
