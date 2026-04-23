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
  ogImage?: string;
  content: string;
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  
  for (const lang of i18n.locales) {
    const newsDataRaw = lang === "en" ? newsEn : newsVi;
    const newsData = (newsDataRaw as any).default || newsDataRaw;
    if (Array.isArray(newsData)) {
      for (const article of newsData) {
        params.push({ lang, slug: article.id });
      }
    }
  }

  return params;
}

export async function generateMetadata({ 
  params 
}: { params: Promise<{ slug: string, lang: string }> }): Promise<Metadata> {
  const { slug, lang: langRaw } = await params;
  const lang = langRaw as Locale;
  const newsDataRaw = lang === "en" ? newsEn : newsVi;
  const newsData = (newsDataRaw as any).default || newsDataRaw;
  
  if (!Array.isArray(newsData)) {
    return { title: "FCT Vinh Thinh .,JSC" };
  }

  const article = newsData.find((a) => a.id === slug);
  const baseUrl = 'https://fct.vn';

  if (!article) {
    return {
      title: lang === "en" ? "Article not found" : "Bài viết không tồn tại",
    };
  }

  // CƠ CHẾ DYNAMIC METADATA & FALLBACK
  const ogImageUrl = article.ogImage 
    ? `${baseUrl}${article.ogImage}` 
    : article.image 
      ? `${baseUrl}${article.image}` 
      : `${baseUrl}/logo.webp`;

  return {
    title: `${article.title} | FCT Vinh Thinh .,JSC`,
    description: article.summary,
    alternates: {
      canonical: `${baseUrl}/${lang}/posts/${slug}`,
      languages: {
        'vi-VN': `${baseUrl}/vi/posts/${slug}`,
        'en-US': `${baseUrl}/en/posts/${slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `${baseUrl}/${lang}/posts/${slug}`,
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
}: { params: Promise<{ slug: string, lang: string }> }) {
  const { slug, lang: langRaw } = await params;
  const lang = langRaw as Locale;
  const dict = await getDictionary(lang);
  const newsDataRaw = lang === "en" ? newsEn : newsVi;
  const newsData = ((newsDataRaw as any).default || newsDataRaw) as Article[];

  if (!Array.isArray(newsData)) {
    notFound();
  }

  const article = newsData.find((a) => a.id === slug);

  if (!article) {
    notFound();
  }

  // Tìm các bài viết liên quan
  const relatedNews = newsData
    .filter((a) => a.id !== slug)
    .sort((a, b) => {
        if (a.category === article.category && b.category !== article.category) return -1;
        if (a.category !== article.category && b.category === article.category) return 1;
        return 0;
    })
    .slice(0, 3);

  return <NewsDetailClient lang={lang} dict={dict} article={article} relatedNews={relatedNews} />;
}
