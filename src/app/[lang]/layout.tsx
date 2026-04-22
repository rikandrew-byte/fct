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

export const metadata: Metadata = {
  title: {
    default: "FCT Vinh Thinh .,JSC | Chuyên gia Bảo mật & Giải pháp Công nghệ Lõi",
    template: "%s | FCT Vinh Thinh .,JSC"
  },
  description: "FCT Vĩnh Thịnh — Đối tác phân phối chính thức giải pháp bảo mật từ Thales, Guardsquare, Canary Labs tại Việt Nam. Hơn 10 năm kinh nghiệm kiến tạo hạ tầng số an toàn.",
  keywords: ["bảo mật phần mềm", "bản quyền phần mềm", "Sentinel LDK", "Guardsquare", "DexGuard", "iXGuard", "xác thực 2 lớp", "FCT Vĩnh Thịnh"],
  openGraph: {
    title: "FCT Vinh Thinh .,JSC | Chuyên gia Bảo mật & Giải pháp Công nghệ Lõi",
    description: "Kiến tạo hạ tầng số an toàn với các giải pháp bảo mật và công nghệ hàng đầu thế giới.",
    url: "https://fct.vn",
    siteName: "FCT Vĩnh Thịnh",
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
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
