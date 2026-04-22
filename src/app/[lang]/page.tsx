import { getDictionary } from "@/lib/get-dictionary";
import HomePageClient from "@/components/HomePageClient";
import { Locale } from "@/config/i18n-config";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "FCT Vinh Thinh JSC",
    "alternateName": "Công ty Cổ phần Công nghệ FCT Vĩnh Thịnh",
    "url": "https://fct.vn",
    "logo": "https://fct.vn/logo.png",
    "image": "https://fct.vn/og-image.png",
    "description": dict.hero.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "80/12/32 đường Ngô Chí Quốc, P. Bình Chiểu (Phú Cường)",
      "addressLocality": "TP. Thủ Đức",
      "addressRegion": "TP. Hồ Chí Minh",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 10.880,
      "longitude": 106.720
    },
    "telephone": "+84-983-027-776",
    "email": "andrew@fct.vn",
    "areaServed": {
      "@type": "Country",
      "name": "Vietnam"
    },
    "sameAs": [
      "https://facebook.com/fctvinhthinh",
      "https://linkedin.com/company/fctvinhthinh"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-983-027-776",
      "contactType": "technical support",
      "areaServed": "VN",
      "availableLanguage": ["Vietnamese", "English"]
    },
    "openingHours": "Mo-Fr 08:30-17:30"
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
