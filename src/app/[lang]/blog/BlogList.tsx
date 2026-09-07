"use client";

import { useState, useMemo } from "react";
import { Search, ArrowRight, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import newsVi from "@/data/news_vi.json";
import newsEn from "@/data/news_en.json";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  link: string;
  image?: string;
  content: string;
}

interface BlogListProps {
  lang: string;
  dict: any;
}

export default function BlogList({ lang, dict }: BlogListProps) {
  const isEn = lang === "en";
  const rawDataRaw = isEn ? newsEn : newsVi;
  const rawData = (rawDataRaw as any).default || rawDataRaw;
  const newsData = (Array.isArray(rawData) ? rawData : []) as NewsItem[];
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const allCategoryLabel = isEn ? "All" : "Tất cả";
  const [selectedCategory, setSelectedCategory] = useState(allCategoryLabel);

  const categories = useMemo(() => {
    return [allCategoryLabel, ...Array.from(new Set(newsData.map((item) => item.category)))];
  }, [newsData, allCategoryLabel]);

  const filteredNews = useMemo(() => {
    return newsData.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === allCategoryLabel || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [newsData, searchQuery, selectedCategory, allCategoryLabel]);

  const d = dict.news.list;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm sticky top-24 z-20">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder={d.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all font-sans"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-sm text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? "bg-blue-600 text-white" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <article key={item.id} className="bg-white rounded-lg border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-300 group overflow-hidden flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <Link href={`/${lang}/blog/${item.id}`}>
                  <Image 
                    src={item.image || "/logo.jpg"} 
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              </div>

              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-sm font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                </div>
                
                <div className="flex-grow space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    <Link href={`/${lang}/blog/${item.id}`}>
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <Link
                    href={`/${lang}/blog/${item.id}`}
                    className="text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors flex items-center gap-1.5"
                  >
                    {d.readMore}
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-sm flex items-center justify-center mx-auto mb-4 border border-slate-200">
            <Search className="w-6 h-6" />
          </div>
          <p className="text-slate-600 text-base">{d.noResults}</p>
        </div>
      )}
    </div>
  );
}
