import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/config/i18n-config";
import CanaryLabsClient from "./CanaryLabsClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  
  return {
    title: "Canary Labs | Industrial Data Historian & IIoT Solutions",
    description: "Enterprise-grade industrial data historian for smart factories and IIoT digital transformation.",
  };
}

export default async function CanaryLabsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return <CanaryLabsClient lang={lang} dict={dict} />;
}
