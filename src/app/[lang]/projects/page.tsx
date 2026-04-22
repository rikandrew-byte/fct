import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import ProjectsPageClient from "@/components/ProjectsPageClient";
import projectsVi from "@/data/projects_vi.json";
import projectsEn from "@/data/projects_en.json";
import { Locale } from "@/config/i18n-config";


export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
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

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  const projectsData = lang === "en" ? projectsEn : projectsVi;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": dict.projects.metaTitle,
    "description": dict.projects.description,
    "numberOfItems": projectsData.length,
    "itemListElement": projectsData.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.summary || (typeof project.challenge === 'string' ? project.challenge : project.challenge?.[0]) || ""
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsPageClient lang={lang} dict={dict} projectsData={projectsData} />
    </>
  );
}
