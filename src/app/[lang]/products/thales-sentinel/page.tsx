import { Metadata } from "next";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import ThalesSentinelClient from "./ThalesSentinelClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const isEn = lang === "en";

  return {
    title: isEn ? "Thales Sentinel - Military-Grade Software Protection" : "Thales Sentinel - Bảo vệ Bản quyền Phần mềm Cấp độ Quân sự",
    description: isEn 
      ? "Secure your software revenue with Thales Sentinel HL, SL, and Cloud. Integrated security solutions by FCT Vinh Thinh." 
      : "Bảo vệ kho báu trí tuệ với Thales Sentinel HL, SL và Cloud. Giải pháp bảo mật tích hợp bởi FCT Vĩnh Thịnh.",
    openGraph: {
      images: ["/images/products/thales-sentinel-og.jpg"],
    },
  };
}

export default async function ThalesSentinelPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return <ThalesSentinelClient lang={lang} dict={dict} />;
}
