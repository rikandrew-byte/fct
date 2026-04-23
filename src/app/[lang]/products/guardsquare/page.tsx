import { Metadata } from "next";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import GuardsquareClient from "./GuardsquareClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const isEn = lang === "en";

  return {
    title: isEn ? "Guardsquare - The Invisible Shield" : "Guardsquare - Tấm Khiên Vô Hình",
    description: isEn 
      ? "Multi-layered mobile app security with DexGuard and iXGuard. Prevent reverse engineering, tampering, and attacks." 
      : "Bảo mật ứng dụng di động đa tầng với DexGuard và iXGuard. Ngăn chặn dịch ngược mã, can thiệp và tấn công.",
    openGraph: {
      title: isEn ? "Guardsquare Security - FCT Vinh Thinh" : "Giải pháp bảo mật Guardsquare - FCT Vĩnh Thịnh",
      images: ["/images/products/dexguard.png"],
    },
  };
}

export default async function GuardsquarePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return <GuardsquareClient lang={lang} dict={dict} />;
}
