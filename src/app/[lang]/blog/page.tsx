import { Metadata } from "next";
import newsVi from "@/data/news_vi.json";
import newsEn from "@/data/news_en.json";
import BlogList from "./BlogList";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  
  return {
    title: `${lang === 'en' ? 'Blog & Insights' : 'Blog & Tin tức'} | FCT Vĩnh Thịnh`,
    description: dict.news.metaDescription,
    openGraph: {
      title: `${lang === 'en' ? 'Blog & Insights' : 'Blog & Tin tức'} - FCT Vĩnh Thịnh`,
      description: dict.news.ogDescription,
      type: "website",
    }
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  const newsDataRaw = lang === "en" ? newsEn : newsVi;
  const newsData = (newsDataRaw as any).default || newsDataRaw;

  // SEO: Article Schema for Indexing
  const blogPosts = Array.isArray(newsData) ? newsData.map(item => ({
    "@type": "BlogPosting",
    "headline": item.title,
    "datePublished": item.date,
    "description": item.summary,
    "url": `https://fct.vn/${lang}/blog/${item.id}`,
    "author": {
      "@type": "Organization",
      "name": "FCT Vinh Thinh .,JSC"
    }
  })) : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": lang === "en" ? "FCT Vinh Thinh Technical Blog" : "Blog Kỹ thuật FCT Vĩnh Thịnh",
    "description": dict.news.description,
    "publisher": {
      "@type": "Organization",
      "name": "FCT Vinh Thinh .,JSC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fct.vn/logo.jpg"
      }
    },
    "blogPost": blogPosts
  };

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-blue-600 selection:text-white">
      {/* ── Hero Section ───────────────────── */}
      <div className="relative bg-[#020617] pt-48 pb-24 px-6 overflow-hidden">
        <NeuralNetworkBackground />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] -z-10 animate-pulse"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-block bg-blue-500/10 border border-blue-400/30 backdrop-blur-md rounded-full px-5 py-2 text-[10px] font-black text-blue-300 tracking-[0.4em] uppercase">
             {lang === 'en' ? 'INSIGHTS HUB' : 'BLOG CHIẾN LƯỢC'}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            {lang === 'en' ? 'Blog &' : 'Blog &'} <span className="text-blue-500">{lang === 'en' ? 'Insights' : 'Tin tức'}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed tracking-tight">
            {dict.news.description}
          </p>
        </div>
      </div>

      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto py-16 px-6">
        <BlogList lang={lang} dict={dict} />
      </div>
    </main>
  );
}
