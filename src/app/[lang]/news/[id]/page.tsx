import { Metadata } from "next";
import newsVi from "@/data/news_vi.json";
import newsEn from "@/data/news_en.json";
import NewsDetailClient from "./NewsDetailClient";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/get-dictionary";

import { i18n, Locale } from "@/config/i18n-config";

interface Article {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  link?: string; // Tùy chọn để tránh lỗi build
  image?: string;
  content: string;
}

export async function generateStaticParams() {
  const params: { lang: string; id: string }[] = [];
  
  i18n.locales.forEach((lang) => {
    const newsData = lang === "en" ? newsEn : newsVi;
    newsData.forEach((article) => {
      params.push({ lang, id: article.id });
    });
  });

  return params;
}

export async function generateMetadata({ 
  params 
}: { params: Promise<{ id: string, lang: string }> }): Promise<Metadata> {
  const { id, lang: langRaw } = await params;
  const lang = langRaw as Locale;
  const newsData = lang === "en" ? newsEn : newsVi;
  const article = newsData.find((a) => a.id === id);
  const baseUrl = 'https://fct.vn';

  if (!article) {
    return {
      title: lang === "en" ? "Article not found" : "Bài viết không tồn tại",
    };
  }

  const ogImageUrl = article.image ? `${baseUrl}${article.image}` : `${baseUrl}/og-image.png`;

  return {
    title: `${article.title} | FCT Vinh Thinh .,JSC`,
    description: article.summary,
    alternates: {
      canonical: `${baseUrl}/${lang}/news/${id}`,
      languages: {
        'vi-VN': `${baseUrl}/vi/news/${id}`,
        'en-US': `${baseUrl}/en/news/${id}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `${baseUrl}/${lang}/news/${id}`,
      siteName: 'FCT Vinh Thinh .,JSC',
      locale: lang === 'vi' ? 'vi_VN' : 'en_US',
      type: 'article',
      publishedTime: article.date,
      authors: ['FCT Vinh Thinh .,JSC'],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
      images: [ogImageUrl],
    },
  };
}

export default async function NewsDetailPage({ 
  params 
}: { params: Promise<{ id: string, lang: string }> }) {
  const { id, lang: langRaw } = await params;
  const lang = langRaw as Locale;
  const dict = await getDictionary(lang);
  const newsData = (lang === "en" ? newsEn : newsVi) as Article[];
  const article = newsData.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  // Tìm các bài viết liên quan (cùng category hoặc ngẫu nhiên nếu không đủ)
  const relatedNews = newsData
    .filter((a) => a.id !== id)
    .sort((a, b) => {
        // Ưu tiên cùng category
        if (a.category === article.category && b.category !== article.category) return -1;
        if (a.category !== article.category && b.category === article.category) return 1;
        return 0;
    })
    .slice(0, 3);

  return <NewsDetailClient lang={lang} dict={dict} article={article} relatedNews={relatedNews} />;
}
