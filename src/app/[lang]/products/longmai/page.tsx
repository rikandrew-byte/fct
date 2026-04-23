import { Metadata } from "next";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import LongmaiClient from "./LongmaiClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const isEn = lang === "en";

  return {
    title: isEn ? "Longmai - The Hardware Fortress" : "Longmai - Pháo đài Phần cứng",
    description: isEn 
      ? "Secure 2FA authentication, digital signatures, and hardware-level encryption with Longmai SmartX tokens." 
      : "Xác thực 2 lớp (2FA), chữ ký số và mã hóa cấp độ phần cứng an toàn tuyệt đối với token Longmai SmartX.",
    openGraph: {
      title: isEn ? "Longmai Hardware Security - FCT Vinh Thinh" : "Bảo mật phần cứng Longmai - FCT Vĩnh Thịnh",
      images: ["/images/products/longmai-smartx3.png"],
    },
  };
}

export default async function LongmaiPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return <LongmaiClient lang={lang} dict={dict} />;
}
