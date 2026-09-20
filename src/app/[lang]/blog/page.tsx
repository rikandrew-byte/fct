import { Metadata } from "next";
import newsVi from "@/data/news_vi.json";
import newsEn from "@/data/news_en.json";
import BlogList from "./BlogList";
import TechGridBackground from "@/components/TechGridBackground";
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
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-600 selection:text-white">
      {/* ── Hero Section ───────────────────── */}
      <div className="relative bg-slate-900 border-b border-slate-800 pt-36 pb-20 px-6 overflow-hidden">
        <TechGridBackground />

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-4">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 rounded-sm px-3.5 py-1 text-[11px] font-mono font-semibold text-cyan-400 tracking-wider uppercase">
             {lang === 'en' ? 'INSIGHTS & ARTICLES' : 'GÓC NHÌN & BÀI VIẾT'}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 tracking-tight">
            {lang === 'en' ? 'Blog &' : 'Blog &'} <span className="text-cyan-400">{lang === 'en' ? 'Insights' : 'Tin tức'}</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
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
