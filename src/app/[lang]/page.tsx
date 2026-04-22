import { getDictionary } from "@/lib/get-dictionary";
import HomePageClient from "@/components/HomePageClient";
import { Locale } from "@/config/i18n-config";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return <HomePageClient lang={lang} dict={dict} />;
}
