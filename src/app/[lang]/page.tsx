import { getDictionary } from "@/lib/get-dictionary";
import HomePageClient from "@/components/HomePageClient";
import { Locale } from "@/config/i18n-config";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FCT Vinh Thinh JSC",
    "url": "https://fct.vn",
    "logo": "https://fct.vn/logo.png",
    "description": dict.hero.description,
    "sameAs": [
      "https://facebook.com/fctvinhthinh",
      "https://linkedin.com/company/fctvinhthinh"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-983-027-776",
      "contactType": "technical support"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient lang={lang} dict={dict} />
    </>
  );
}
