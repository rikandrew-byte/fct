"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Share2, MessageSquare, ExternalLink, Globe } from "lucide-react";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import { motion } from "framer-motion";

import TableOfContents from "@/components/TableOfContents";

interface FAQ {
  question: string;
  answer: string;
}

interface Article {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  link: string;
  content: string;
  faqs?: FAQ[]; // Thêm trường FAQ để AI-Ready
}

interface NewsDetailClientProps {
  lang: string;
  dict: any;
  article: Article;
  relatedNews: Article[];
}

export default function NewsDetailClient({ 
  lang,
  dict,
  article, 
  relatedNews 
}: NewsDetailClientProps) {
  const d = dict.newsDetail;
  const commonDict = dict.common;

  // Logic render nội dung nâng cao (Hỗ trợ Heading, Image, List)
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={index} />;

      // 1. Nhận diện Hình ảnh (Format: ![Alt Text](url))
      const imgMatch = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
      if (imgMatch) {
        return (
          <div key={index} className="my-12 space-y-3">
            <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-gray-100 shadow-2xl">
              <Image 
                src={imgMatch[2]} 
                alt={imgMatch[1]} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <p className="text-center text-xs font-bold text-gray-400 italic uppercase tracking-widest">
              {imgMatch[1]}
            </p>
          </div>
        );
      }

      // 2. Nhận diện Tiêu đề (AI-Ready Headings)
      const isHeader = 
        (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length < 100) || 
        /^\d+\.\s/.test(trimmed) || 
        (trimmed.endsWith('?') && trimmed.length < 80) || 
        (trimmed.endsWith(':') && trimmed.length < 80);

      if (isHeader) {
        return (
          <h3 
            key={index} 
            id={`heading-${index}`}
            className="text-2xl md:text-3xl font-black text-gray-950 pt-10 pb-4 scroll-mt-32 tracking-tight"
          >
            {trimmed.replace(/\*\*/g, '')}
          </h3>
        );
      }

      // 3. Nhận diện Danh sách
      if (trimmed.startsWith('- ')) {
        return (
          <li key={index} className="ml-6 text-gray-700 font-light text-lg md:text-xl list-disc mb-2">
            {trimmed.substring(2)}
          </li>
        );
      }

      // 4. Nhận diện Blockquote (Trích dẫn Quản lý)
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={index} className="my-10 pl-8 border-l-4 border-blue-600 italic">
            <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {trimmed.substring(2)}
            </p>
          </blockquote>
        );
      }

      // 5. Render Paragraph thường
      return (
        <p key={index} className="text-gray-700 font-light leading-relaxed text-lg md:text-xl mb-6">
          {line}
        </p>
      );
    });
  };

  // Tạo FAQ Schema nếu có dữ liệu
  const faqSchema = article.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <main className="min-h-screen bg-white selection:bg-blue-600 selection:text-white">
      {/* Nhúng FAQ Schema cho AI */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      
      {/* ── Header Section ───────────────────── */}
      <section className="relative pt-24 pb-10 px-6 overflow-hidden bg-[#020617]">
        <NeuralNetworkBackground />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] -z-10 animate-pulse"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link 
            href={`/${lang}/news`} 
            className="inline-flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest mb-8 hover:text-blue-300 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {d.backToNews}
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em]">
              <span className="text-blue-500 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/30">
                {article.category}
              </span>
              <span className="text-gray-500 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-200 tracking-tighter leading-[1.1]">
              {article.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── Content Section ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto py-20 px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            <article className="prose prose-lg prose-slate max-w-none">
              <div className="space-y-6">
                {renderContent(article.content)}
              </div>
            </article>

            {/* Source Reference & Tags */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-400 italic">{d.source}:</span>
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline"
                >
                  fct.vn <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Globe className="w-4 h-4 text-[#0077b5]" />
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-20 p-10 bg-gradient-to-br from-blue-900 to-[#020617] rounded-[3rem] text-slate-200 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl font-black tracking-tighter">{d.cta.title}</h3>
                <p className="text-blue-100/70 font-light max-w-xl">
                  {d.cta.description}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href={`/${lang}/contact`} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-xl shadow-blue-500/20">
                    {d.cta.contactNow}
                  </Link>
                  <a href="tel:0983027776" className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-colors">
                    <MessageSquare className="w-5 h-5" /> {d.cta.chatConsult}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Related News & TOC */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Table of Contents */}
            <div className="sticky top-32 space-y-12">
              <TableOfContents content={article.content} />

              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">{d.relatedArticles}</h3>
                <div className="space-y-8">
                  {relatedNews.map((news) => (
                    <Link 
                      key={news.id} 
                      href={`/${lang}/news/${news.id}`}
                      className="group block space-y-3"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-500 transition-colors">
                        {news.category} — {news.date}
                      </span>
                      <h4 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                        {news.title}
                      </h4>
                      <div className="h-px w-full bg-gray-100"></div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Solution Promotion Card */}
              <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-gray-100 space-y-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Tag className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight">{d.promo.title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {d.promo.description}
                </p>
                <Link href={`/${lang}/products`} className="inline-flex items-center gap-2 font-bold text-blue-600 hover:gap-3 transition-all">
                  {d.promo.viewCatalog} <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </main>
  );
}
