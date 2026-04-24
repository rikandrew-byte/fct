import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/config/i18n-config";
import KnowledgePageClient from "@/components/KnowledgePageClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  
  return {
    title: `${dict.navbar.knowledge} | FCT Vĩnh Thịnh`,
    description: dict.knowledge.hero.description,
    openGraph: {
      title: `${dict.navbar.knowledge} - Chuyên gia bảo vệ bản quyền & an ninh mạng`,
      description: dict.knowledge.hero.description,
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: dict.navbar.knowledge,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.navbar.knowledge} | FCT Vĩnh Thịnh`,
      description: dict.knowledge.hero.description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function KnowledgePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  // FAQ Schema for AI Search Dominance
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": dict.knowledge.faqs.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <KnowledgePageClient lang={lang} dict={dict} />
    </>
  );
}
