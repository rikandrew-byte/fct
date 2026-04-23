import { MetadataRoute } from 'next'
import newsVi from '@/data/news_vi.json'
import newsEn from '@/data/news_en.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fct.vn'
  const locales = ['vi', 'en']
  
  const staticRoutes = [
    '', 
    '/about', 
    '/posts', 
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

  for (const lang of locales) {
    // 1. Static & Product Main Routes
    for (const route of [...staticRoutes, ...productRoutes]) {
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
    }

    // 2. Dynamic News Articles
    const newsData = lang === 'en' ? newsEn : newsVi
    if (Array.isArray(newsData)) {
      for (const article of newsData) {
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
          url: `${baseUrl}/${lang}/posts/${article.id}`,
          lastModified: lastMod,
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: {
              vi: `${baseUrl}/vi/posts/${article.id}`,
              en: `${baseUrl}/en/posts/${article.id}`,
            },
          },
        })
      }
    }
  }

  return sitemapEntries
}
