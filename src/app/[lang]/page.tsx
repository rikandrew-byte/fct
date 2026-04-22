import { getDictionary } from "@/lib/get-dictionary";
import HomePageClient from "@/components/HomePageClient";
import type { PageProps } from "next";

export default async function Home({ params }: PageProps < "/[lang]" >) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <HomePageClient lang={lang} dict={dict} />;
}
