import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import AboutPageClient from "@/components/AboutPageClient";
import { PageProps } from "next";

export async function generateMetadata({ params }: PageProps < "/[lang]/about" >): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: `${dict.navbar.about} | FCT Vĩnh Thịnh`,
    description: dict.aboutPage.hero.description,
  };
}

export default async function AboutPage({ params }: PageProps < "/[lang]/about" >) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <AboutPageClient lang={lang} dict={dict} />;
}
