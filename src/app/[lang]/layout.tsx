import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { i18n } from "@/config/i18n-config";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import React from "react";
import { AssistantProvider } from "@/context/AssistantContext";
import GlobalAssistantWrapper from "@/components/GlobalAssistantWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  const baseUrl = "https://fct.vn";
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'FCT Vĩnh Thịnh - Giải pháp Bảo mật & Dữ liệu',
      template: `%s | FCT Vinh Thinh .,JSC`
    },
    description: 'Chuyên gia cung cấp giải pháp Canary Historian, Thales, Guardsquare và Longmai.',
    keywords: dict.common.keywords,
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        "vi-VN": `${baseUrl}/vi`,
        "en-US": `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: dict.common.metaTitle,
      description: dict.common.metaDescription,
      url: `${baseUrl}/${lang}`,
      siteName: "FCT Vĩnh Thịnh",
      images: [
        {
          url: "https://fct.vn/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "FCT Vinh Thinh - Leading Security Solutions",
        },
      ],
      locale: lang === "vi" ? "vi_VN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.common.metaTitle,
      description: dict.common.metaDescription,
      images: ["https://fct.vn/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FCT Vinh Thinh .,JSC",
    "alternateName": "Công ty Cổ phần Công nghệ FCT Vĩnh Thịnh",
    "url": "https://fct.vn",
    "logo": "https://fct.vn/logo.png",
    "description": lang === 'vi' 
      ? "Nhà phân phối & đối tác giải pháp bảo mật phần mềm, bản quyền, xác thực số và hệ thống dữ liệu công nghiệp tại Việt Nam: Thales Sentinel, Guardsquare, Canary Labs, Longmai, Guardant."
      : "Authorized distributor and solution partner for software protection, licensing, digital authentication and industrial data historian in Vietnam.",
    "email": "fct.vinhthinh@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tầng 3, Tòa nhà Ngôi Sao, 15 Nguyễn Cảnh Dị, Đại Kim",
      "addressLocality": "Hoàng Mai",
      "addressRegion": "Hà Nội",
      "postalCode": "100000",
      "addressCountry": "VN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-983-027-776",
      "contactType": "sales",
      "areaServed": "VN",
      "availableLanguage": ["Vietnamese", "English"]
    },
    "sameAs": [
      "https://cpl.thalesgroup.com",
      "https://www.guardsquare.com",
      "https://www.canarylabs.com",
      "https://www.longmai.net",
      "https://www.guardant.com"
    ],
    "knowsAbout": [
      "Software Monetization & Licensing (Thales Sentinel LDK, RMS, EMS)",
      "Mobile & Web App Security (Guardsquare DexGuard, iXGuard, AppSweep)",
      "Industrial Time-Series Data Historian (Canary Labs SCADA / IIoT)",
      "Digital Signature & PKI Token (mToken CryptoID, FIPS 140-2 Level 3)",
      "Dongle Software Protection (Guardant Code, Sign, Time)"
    ]
  };

  return (
    <html
      lang={lang}
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <AssistantProvider>
          <Navbar lang={lang} dict={dict} />
          {children}
          <Footer lang={lang} dict={dict} />
          <GlobalAssistantWrapper lang={lang} dict={dict} />
        </AssistantProvider>
      </body>
    </html>
  );
}
