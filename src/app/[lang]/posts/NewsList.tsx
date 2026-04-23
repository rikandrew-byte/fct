"use client";

import { useState, useMemo } from "react";
import { Search, ArrowRight, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import newsVi from "@/data/news_vi.json";
import newsEn from "@/data/news_en.json";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  link: string;
  content: string;
}

interface NewsListProps {
  lang: string;
  dict: any;
}

export default function NewsList({ lang, dict }: NewsListProps) {
  const isEn = lang === "en";
  const newsData = (isEn ? newsEn : newsVi) as NewsItem[];
  const [searchQuery, setSearchQuery] = useState("");
  
  const allCategoryLabel = isEn ? "All" : "T廕另 c廕?;
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
    <div className="space-y-12">
      {/* Search and Category Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-4 rounded-3xl border border-gray-100 shadow-sm sticky top-24 z-20">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder={d.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-light"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <article key={item.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 group overflow-hidden flex flex-col">
              <div className="p-8 flex flex-col flex-grow space-y-6">
                <div className="flex justify-between items-center text-xs font-medium uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                    <Tag className="w-3.5 h-3.5" />
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                </div>
                
                <div className="flex-grow space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                  <Link
                    href={`/${lang}/posts/${item.id}`}
                    className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    {d.readMore}
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <p className="text-gray-500 font-light text-lg">{d.noResults}</p>
          <button 
            onClick={() => {setSearchQuery(""); setSelectedCategory(allCategoryLabel);}}
            className="text-blue-600 font-semibold hover:underline"
          >
            {d.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
}
