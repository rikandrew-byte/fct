import { Metadata } from "next";
import newsVi from "@/data/news_vi.json";
import newsEn from "@/data/news_en.json";
import NewsDetailClient from "./NewsDetailClient";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/get-dictionary";
import { PageProps } from "next";
import { i18n } from "@/config/i18n-config";

interface Article {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  link: string;
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
}: PageProps<"/news/[id]">): Promise<Metadata> {
  const { id, lang } = await params;
  const newsData = lang === "en" ? newsEn : newsVi;
  const article = newsData.find((a) => a.id === id);

  if (!article) {
    return {
      title: lang === "en" ? "Article not found" : "Bài viết không tồn tại",
    };
  }

  return {
    title: `${article.title} | FCT Vinh Thinh .,JSC`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
      authors: ["FCT Vinh Thinh .,JSC"],
    },
  };
}

export default async function NewsDetailPage({ 
  params 
}: PageProps<"/news/[id]">) {
  const { id, lang } = await params;
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
