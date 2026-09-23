"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Share2, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import BlogCTA from "@/components/BlogCTA";
import TechGridBackground from "@/components/TechGridBackground";

interface Article {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  image?: string;
  content: string;
  target_funnel?: "guardsquare" | "thales" | "canary" | "guardant" | "longmai";
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
    <main className="min-h-screen bg-white selection:bg-cyan-600 selection:text-white">
      {/* ── Progress Bar ────────────────────── */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-600 z-[100] origin-left"
        initial={{ scaleX: 0 }}
        style={{ scaleX: 1 }} // Simplified for now
      />

      {/* ── Hero / Header ───────────────────── */}
      <header className="relative pt-36 pb-16 px-6 bg-slate-900 border-b border-slate-800 overflow-hidden">
        <TechGridBackground />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <Link 
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-xs font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            {isEn ? "Back to Blog" : "Quay lại Blog"}
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span className="bg-cyan-600 text-white px-3 py-1 rounded-sm text-[11px]">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-slate-300">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-slate-300">
                <Clock className="w-3.5 h-3.5" />
                {isEn ? "5 min read" : "5 phút đọc"}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-50 tracking-tight leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </header>

      {/* ── Content Section ─────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar / Tools */}
            <aside className="lg:col-span-1 hidden lg:block sticky top-32 h-fit space-y-8">
              <div className="flex flex-col gap-4">
                <button className="w-10 h-10 rounded-sm bg-slate-50 flex items-center justify-center text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 transition-all border border-slate-200" title={isEn ? "Share" : "Chia sẻ"}>
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </aside>

            {/* Article Body */}
            <article className="lg:col-span-11 space-y-10">
              {/* Cover Image */}
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image 
                  src={article.image || "/logo.jpg"} 
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Markdown Content */}
              <div className="article-prose text-slate-700">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-14 mb-6 tracking-tight leading-tight">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <div className="mt-14 mb-6 pt-6 border-t border-slate-200">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                          {children}
                        </h2>
                      </div>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4 tracking-tight leading-snug">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-lg md:text-xl font-bold text-slate-900 mt-8 mb-3 tracking-tight">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-slate-700 text-base md:text-lg leading-[1.9] mb-6 font-normal">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="space-y-4 my-6 pl-6 list-disc marker:text-cyan-600 text-slate-700 text-base md:text-lg leading-[1.85]">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="space-y-4 my-6 pl-6 list-decimal marker:text-cyan-600 marker:font-bold text-slate-700 text-base md:text-lg leading-[1.85]">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="pl-1 leading-[1.85]">
                        {children}
                      </li>
                    ),
                    hr: () => (
                      <hr className="my-12 border-0 h-px bg-slate-200" />
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="my-8 pl-6 py-4 border-l-4 border-cyan-500 bg-slate-50/80 rounded-r-lg text-slate-800 text-base md:text-lg italic leading-[1.85]">
                        {children}
                      </blockquote>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-slate-900">
                        {children}
                      </strong>
                    ),
                    a: ({ children, href }) => (
                      <a href={href} className="text-cyan-600 hover:text-cyan-700 underline underline-offset-4 font-medium transition-colors" target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>

              {/* Automatic CTA Section */}
              <BlogCTA lang={lang} targetFunnel={article.target_funnel} />

              {/* Related Articles */}
              <div className="pt-16 border-t border-slate-200 space-y-8">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {isEn ? "Related Articles" : "Khám phá thêm"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedNews.map((item) => (
                    <Link key={item.id} href={`/${lang}/blog/${item.id}`} className="group space-y-3">
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                        <Image src={item.image || "/logo.jpg"} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <h4 className="font-semibold text-slate-900 text-sm leading-snug group-hover:text-cyan-600 transition-colors line-clamp-2">
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
