import { Metadata } from "next";
import ProductList from "./ProductList";
import productsVi from "@/data/products_vi.json";
import productsEn from "@/data/products_en.json";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import { getDictionary } from "@/lib/get-dictionary";
import { PageProps } from "next";

export async function generateMetadata({ params }: PageProps < "/[lang]/products" >): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: dict.products.metaTitle,
    description: dict.products.metaDescription,
    openGraph: {
      title: dict.products.ogTitle,
      description: dict.products.ogDescription,
      type: "website",
    }
  };
}

export default async function ProductsPage({ params }: PageProps < "/[lang]/products" >) {
  const { lang } = await params;
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
    <main className="min-h-screen bg-slate-50 selection:bg-blue-600 selection:text-white">
      {/* ── Header Section ───────────────────── */}
      <div className="relative bg-[#020617] pt-48 pb-24 px-6 overflow-hidden">
        <NeuralNetworkBackground />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] -z-10 animate-pulse"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-block bg-blue-500/10 border border-blue-400/30 backdrop-blur-md rounded-full px-5 py-2 text-[10px] font-black text-blue-300 tracking-[0.4em] uppercase">
            {dict.products.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            {dict.products.titlePart1} <span className="text-blue-500">{dict.products.titlePart2}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed tracking-tight">
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
