import { MetadataRoute } from 'next'
import newsVi from '@/data/news_vi.json'
import newsEn from '@/data/news_en.json'
import projectsVi from '@/data/projects_vi.json'
import projectsEn from '@/data/projects_en.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fct.vn'
  const locales = ['vi', 'en']
  
  const staticRoutes = [
    '', 
    '/about', 
    '/news', 
    '/products', 
    '/projects', 
    '/contact', 
    '/knowledge', 
    '/expert-ai',
    '/privacy',
    '/terms'
  ]

  const productRoutes = [
    '/products/thales-sentinel',
    '/products/guardsquare',
    '/products/canary-labs',
    '/products/longmai'
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach((lang) => {
    // 1. Static & Product Main Routes
    [...staticRoutes, ...productRoutes].forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            vi: `${baseUrl}/vi${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      })
    })

    // 2. Dynamic News Articles
    const newsData = lang === 'en' ? newsEn : newsVi
    newsData.forEach((article) => {
      // Safe Date Parsing
      let lastMod = new Date();
      if (article.date) {
        const parts = article.date.split('/');
        if (parts.length === 3) {
          const dateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
          const d = new Date(dateStr);
          if (!isNaN(d.getTime())) lastMod = d;
        } else {
          const d = new Date(article.date);
          if (!isNaN(d.getTime())) lastMod = d;
        }
      }

      sitemapEntries.push({
        url: `${baseUrl}/${lang}/news/${article.id}`,
        lastModified: lastMod,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            vi: `${baseUrl}/vi/news/${article.id}`,
            en: `${baseUrl}/en/news/${article.id}`,
          },
        },
      })
    })

    // 3. Dynamic Projects (if any specific detail pages exist, currently mapped to main solutions)
    // Note: Projects currently render on a single page with filter, 
    // but if we add detail pages later, we should add them here.
  })

  return sitemapEntries
}
