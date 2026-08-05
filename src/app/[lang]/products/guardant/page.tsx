import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/config/i18n-config";
import GuardantClient from "./GuardantClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const isEn = lang === "en";
  
  return {
    title: isEn ? "Guardant | Software Protection & Licensing Ecosystem" : "Guardant | Hệ sinh thái Bảo vệ Bản quyền & Thương mại hóa Phần mềm",
    description: isEn 
      ? "Premium hardware and software licensing solutions, code protection studio, and central management platform by Guardant." 
      : "Hệ sinh thái bảo vệ bản quyền, cấp phép phần mềm linh hoạt và chống dịch ngược mã nguồn toàn diện của Guardant.",
  };
}

export default async function GuardantPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return <GuardantClient lang={lang} dict={dict} />;
}
