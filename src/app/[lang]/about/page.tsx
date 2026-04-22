import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import AboutPageClient from "@/components/AboutPageClient";
import { Locale } from "@/config/i18n-config";


export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  
  return {
    title: `${dict.navbar.about} | FCT Vĩnh Thịnh`,
    description: dict.aboutPage.hero.description,
    openGraph: {
      title: `${dict.navbar.about} | FCT Vĩnh Thịnh`,
      description: dict.aboutPage.hero.description,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: dict.navbar.about,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.navbar.about} | FCT Vĩnh Thịnh`,
      description: dict.aboutPage.hero.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `${dict.navbar.about} | FCT Vinh Thinh JSC`,
    "description": dict.aboutPage.hero.description,
    "publisher": {
      "@type": "Organization",
      "name": "FCT Vinh Thinh JSC"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPageClient lang={lang} dict={dict} />
    </>
  );
}
