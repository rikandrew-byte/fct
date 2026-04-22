import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import AboutPageClient from "@/components/AboutPageClient";
import { Locale } from "@/config/i18n-config";


export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  
  return {
    title: `${dict.navbar.about} | FCT Vĩnh Thịnh`,
    description: dict.aboutPage.hero.description,
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return <AboutPageClient lang={lang} dict={dict} />;
}
