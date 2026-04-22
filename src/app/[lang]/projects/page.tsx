import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import ProjectsPageClient from "@/components/ProjectsPageClient";
import projectsVi from "@/data/projects_vi.json";
import projectsEn from "@/data/projects_en.json";
import { PageProps } from "next";

export async function generateMetadata({ params }: PageProps < "/[lang]/projects" >): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: dict.projects.metaTitle,
    description: dict.projects.metaDescription,
    openGraph: {
      title: dict.projects.ogTitle,
      description: dict.projects.ogDescription,
      type: "website",
    }
  };
}

export default async function ProjectsPage({ params }: PageProps < "/[lang]/projects" >) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const projectsData = lang === "en" ? projectsEn : projectsVi;

  return <ProjectsPageClient lang={lang} dict={dict} projectsData={projectsData} />;
}
