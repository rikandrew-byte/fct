import { Metadata } from "next";
import newsData from "@/data/news.json";
import NewsList from "./NewsList";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";

export const metadata: Metadata = {
  title: "Tin tức & Bài viết Bảo mật | FCT Vinh Thinh .,JSC",
  description: "Cập nhật những thông tin mới nhất về công nghệ bảo mật, giải pháp bản quyền phần mềm và xu hướng hạ tầng IT từ các chuyên gia FCT Vĩnh Thịnh.",
  openGraph: {
    title: "Tin tức bảo mật & công nghệ - FCT Vĩnh Thịnh",
    description: "Kho tàng kiến thức công nghệ và các giải pháp an ninh mạng hàng đầu thế giới được chia sẻ bởi FCT Vĩnh Thịnh.",
    type: "website",
  },
};

export default function NewsPage() {
  // Chuẩn bị dữ liệu Structured Data JSON-LD cho AI Search
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Tin tức Bảo mật FCT Vĩnh Thịnh",
    "description": "Cập nhật thông tin về công nghệ bảo mật, giải pháp Sentinel, Guardsquare và Canary Labs.",
    "publisher": {
      "@type": "Organization",
      "name": "FCT Vinh Thinh .,JSC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fct.vn/logo.png" // Giả định logo khả dụng tại URL này
      }
    },
    "blogPost": newsData.map(item => ({
      "@type": "BlogPosting",
      "headline": item.title,
      "datePublished": item.date,
      "description": item.summary,
      "url": item.link,
      "author": {
        "@type": "Organization",
        "name": "FCT Vinh Thinh .,JSC"
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
            Knowledge Base
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Tin tức & <span className="text-blue-500">Bài viết</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed tracking-tight">
            Cập nhật những thông tin mới nhất về công nghệ bảo mật và giải pháp hạ tầng từ các chuyên gia hàng đầu thế giới.
          </p>
        </div>
      </div>

      {/* Nhúng Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto py-16 px-6">
        <NewsList />
      </div>
    </main>
  );
}
