import { Metadata } from "next";
import newsVi from "@/data/news_vi.json";
import newsEn from "@/data/news_en.json";
import BlogDetailClient from "./BlogDetailClient";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/get-dictionary";
import { i18n, Locale } from "@/config/i18n-config";

interface Article {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  link?: string;
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string, lang: string }> }): Promise<Metadata> {
  const { slug, lang: langRaw } = await params;
  const lang = langRaw as Locale;
  const newsDataRaw = lang === "en" ? newsEn : newsVi;
  const newsData = (newsDataRaw as any).default || newsDataRaw;
  
  if (!Array.isArray(newsData)) return {};
  const article = newsData.find((a) => a.id === slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `https://fct.vn/${lang}/blog/${slug}`,
      type: 'article',
      images: [
        {
          url: article.image || '/og-image.jpg', 
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function BlogDetailPage({ 
  params 
}: { params: Promise<{ slug: string, lang: string }> }) {
  const { slug, lang: langRaw } = await params;
  const lang = langRaw as Locale;
  const dict = await getDictionary(lang);
  const newsDataRaw = lang === "en" ? newsEn : newsVi;
  const newsData = ((newsDataRaw as any).default || newsDataRaw) as Article[];

  if (!Array.isArray(newsData)) notFound();
  const article = newsData.find((a) => a.id === slug);
  if (!article) notFound();

  const relatedNews = newsData
    .filter((a) => a.id !== slug)
    .sort((a, b) => {
        if (a.category === article.category && b.category !== article.category) return -1;
        if (a.category !== article.category && b.category === article.category) return 1;
        return 0;
    })
    .slice(0, 3);

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": [article.image || "https://fct.vn/logo.jpg"],
    "datePublished": article.date,
    "author": [{
        "@type": "Organization",
        "name": "FCT Vinh Thinh .,JSC",
        "url": "https://fct.vn"
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogDetailClient lang={lang} dict={dict} article={article} relatedNews={relatedNews} />
    </>
  );
}
