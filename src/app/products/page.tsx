import { Metadata } from "next";
import ProductList from "./ProductList";
import productsData from "@/data/products.json";

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
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      {/* Nhúng Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-block bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-[10px] font-black text-blue-600 tracking-[0.2em] uppercase shadow-sm">Danh Mục Giải Pháp</div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tighter leading-none">Thiết bị & Giải pháp <br /><span className="text-blue-600">Bảo mật Chính hãng</span></h1>
          <p className="text-gray-500 font-light text-lg md:text-xl max-w-2xl leading-relaxed tracking-tight">Hệ sinh thái công nghệ lõi bảo vệ tài sản doanh nghiệp, được tuyển chọn từ các đối tác hàng đầu thế giới.</p>
        </div>

        <ProductList />
      </div>
    </main>
  );
}
