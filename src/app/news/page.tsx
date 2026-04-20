import { Metadata } from "next";
import newsData from "@/data/news.json";
import NewsList from "./NewsList";

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
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      {/* Nhúng Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black text-gray-900 tracking-tight">Tin tức và bài viết</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed tracking-tight">
            Cập nhật những thông tin mới nhất về công nghệ, bảo mật và giải pháp hạ tầng từ các đối tác công nghệ hàng đầu thế giới.
          </p>
        </div>

        <NewsList />
      </div>
    </main>
  );
}
