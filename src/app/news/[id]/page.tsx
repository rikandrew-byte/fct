import { Metadata } from "next";
import newsData from "@/data/news.json";
import NewsDetailClient from "./NewsDetailClient";
import { notFound } from "next/navigation";

interface Article {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  link: string;
  content: string;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const article = newsData.find((a) => a.id === id);

  if (!article) {
    return {
      title: "Bài viết không tồn tại",
    };
  }

  return {
    title: `${article.title} | FCT Vinh Thinh .,JSC`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
      authors: ["FCT Vinh Thinh .,JSC"],
    },
  };
}

export default async function NewsDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const article = (newsData as Article[]).find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  // Tìm các bài viết liên quan (cùng category hoặc ngẫu nhiên nếu không đủ)
  const relatedNews = (newsData as Article[])
    .filter((a) => a.id !== id)
    .sort((a, b) => {
        // Ưu tiên cùng category
        if (a.category === article.category && b.category !== article.category) return -1;
        if (a.category !== article.category && b.category === article.category) return 1;
        return 0;
    })
    .slice(0, 3);

  return <NewsDetailClient article={article} relatedNews={relatedNews} />;
}
