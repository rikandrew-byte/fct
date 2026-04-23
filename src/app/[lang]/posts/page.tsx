import { Metadata } from "next";
import newsVi from "@/data/news_vi.json";
import newsEn from "@/data/news_en.json";
import NewsList from "./NewsList";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  
  return {
    title: dict.news.metaTitle,
    description: dict.news.metaDescription,
    openGraph: {
      title: dict.news.ogTitle,
      description: dict.news.ogDescription,
      type: "website",
    }
  };
}

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  const newsData = lang === "en" ? newsEn : newsVi;

  // Chuẩn bị dữ liệu Structured Data JSON-LD
  const blogPosts = Array.isArray(newsData) ? newsData.map(item => ({
    "@type": "BlogPosting",
    "headline": item.title,
    "datePublished": item.date,
    "description": item.summary,
    "url": item.link,
    "author": {
      "@type": "Organization",
      "name": "FCT Vinh Thinh .,JSC"
    }
  })) : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": lang === "en" ? "FCT Vinh Thinh Security News" : "Tin tức Bảo mật FCT Vĩnh Thịnh",
    "description": dict.news.description,
    "publisher": {
      "@type": "Organization",
      "name": "FCT Vinh Thinh .,JSC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fct.vn/logo.png"
      }
    },
    "blogPost": blogPosts
  };

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-blue-600 selection:text-white">
      {/* ── Header Section ───────────────────── */}
      <div className="relative bg-[#020617] pt-48 pb-24 px-6 overflow-hidden">
        <NeuralNetworkBackground />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] -z-10 animate-pulse"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-block bg-blue-500/10 border border-blue-400/30 backdrop-blur-md rounded-full px-5 py-2 text-[10px] font-black text-blue-300 tracking-[0.4em] uppercase">
            {dict.news.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            {dict.news.titlePart1} <span className="text-blue-500">{dict.news.titlePart2}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed tracking-tight">
            {dict.news.description}
          </p>
        </div>
      </div>

      {/* Nhúng Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto py-16 px-6">
        <NewsList lang={lang} dict={dict} />
      </div>
    </main>
  );
}
