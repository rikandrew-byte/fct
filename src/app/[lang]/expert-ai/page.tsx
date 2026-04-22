import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import AIExpertClient from "@/components/AIExpertClient";
import { Locale } from "@/config/i18n-config";

export const metadata: Metadata = {
  title: "AI Technical Expert Demo | FCT Vinh Thinh JSC",
  description: "Internal preview of FCT's grounded AI assistant for software protection and industrial data.",
};

export default async function AIExpertPage({ 
  params 
}: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return <AIExpertClient lang={lang} dict={dict} />;
}
