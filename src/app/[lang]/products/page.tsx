import { Metadata } from "next";
import ProductList from "./ProductList";
import productsVi from "@/data/products_vi.json";
import productsEn from "@/data/products_en.json";
import TechGridBackground from "@/components/TechGridBackground";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";


export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  
  return {
    title: dict.products.metaTitle,
    description: dict.products.metaDescription,
    openGraph: {
      title: dict.products.ogTitle,
      description: dict.products.ogDescription,
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: dict.products.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.products.metaTitle,
      description: dict.products.metaDescription,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  const productsData = lang === "en" ? productsEn : productsVi;

  // Chuẩn bị dữ liệu Structured Data JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": lang === "en" ? "FCT Vinh Thinh Solutions Catalog" : "Danh mục sản phẩm FCT Vĩnh Thịnh",
    "numberOfItems": productsData.length,
    "itemListElement": productsData.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": p.name,
        "description": p.summary,
        "applicationCategory": "SecurityApplication",
        "operatingSystem": "Cross-platform",
        "url": p.link
      }
    }))
  };

  return (
    <main className="min-h-screen bg-white selection:bg-blue-600 selection:text-white">
      {/* ── Header Section ───────────────────── */}
      <div className="relative bg-slate-50 pt-24 pb-12 px-6 overflow-hidden border-b border-slate-200">
        <TechGridBackground />
        <div className="max-w-6xl mx-auto relative z-10 space-y-5">
          <span className="inline-flex items-center gap-2 border border-blue-700 bg-blue-700 text-white text-[10px] font-bold tracking-[0.25em] uppercase px-5 py-1.5 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-300 inline-block" />
            {dict.products.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
            {dict.products.titlePart1} <span className="text-blue-700">{dict.products.titlePart2}</span>
          </h1>
          <p className="text-slate-500 max-w-2xl text-base leading-relaxed">
            {dict.products.description}
          </p>
        </div>
      </div>

      {/* Nhúng Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto py-16 px-6">
        <ProductList lang={lang} />
      </div>
    </main>
  );
}
