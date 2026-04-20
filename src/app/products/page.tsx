import { Metadata } from "next";
import ProductList from "./ProductList";
import productsData from "@/data/products.json";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";

export const metadata: Metadata = {
  title: "Giải pháp Bảo mật & Quản lý Bản quyền Phần mềm | FCT Vĩnh Thịnh",
  description: "Phân phối chính hãng giải pháp bảo mật Sentinel (Thales), Guardsquare (DexGuard, iXGuard), Canary Labs và Longmai tại Việt Nam. Tư vấn an ninh ứng dụng toàn diện.",
  openGraph: {
    title: "Danh mục Giải pháp Bảo mật Chính hãng - FCT Vĩnh Thịnh",
    description: "Hệ sinh thái thiết bị và phần mềm bảo mật hàng đầu thế giới dành cho doanh nghiệp trong kỷ nguyên số.",
    type: "website",
  }
};

export default function ProductsPage() {
  // Chuẩn bị dữ liệu Structured Data JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Danh mục sản phẩm FCT Vĩnh Thịnh",
    "numberOfItems": productsData.length,
    "itemListElement": productsData.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "SoftwareApplication", // Sử dụng loại phù hợp nhất cho đa số sản phẩm ở đây
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
      {/* ── Header Section - TECH-HEAVY PLUS MODE ───────────────────── */}
      <div className="relative bg-[#020617] pt-48 pb-24 px-6 overflow-hidden">
        <NeuralNetworkBackground />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] -z-10 animate-pulse"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-block bg-blue-500/10 border border-blue-400/30 backdrop-blur-md rounded-full px-5 py-2 text-[10px] font-black text-blue-300 tracking-[0.4em] uppercase">
            Product Solutions
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Thiết bị & <span className="text-blue-500">Giải pháp</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed tracking-tight">
            Hệ sinh thái công nghệ lõi bảo vệ tài sản số, được tuyển chọn từ các đối tác công nghệ bảo mật hàng đầu thế giới.
          </p>
        </div>
      </div>

      {/* Nhúng Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto py-16 px-6">
        <ProductList />
      </div>
    </main>
  );
}
