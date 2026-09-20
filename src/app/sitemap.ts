import { MetadataRoute } from 'next'
import newsVi from '@/data/news_vi.json'
import newsEn from '@/data/news_en.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fct.vn'
  const locales = ['vi', 'en']
  
  const staticRoutes = [
    '', 
    '/about', 
    '/blog', 
    '/products', 
    '/projects', 
    '/contact', 
    '/resources',
    '/whitepaper',
    '/whitepaper-canary',
    '/whitepaper-guardsquare',
    '/expert-ai',
    '/privacy',
    '/terms'
  ]

  const productRoutes = [
    '/products/thales-sentinel',
    '/products/guardsquare',
    '/products/canary-labs',
    '/products/longmai',
    '/products/guardant'
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  for (const lang of locales) {
    // 1. Static & Product Main Routes
    for (const route of [...staticRoutes, ...productRoutes]) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : (route.startsWith('/products/') ? 0.9 : 0.8),
        alternates: {
          languages: {
            vi: `${baseUrl}/vi${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      })
    }

    // 2. Dynamic News Articles
    const newsDataRaw = lang === 'en' ? newsEn : newsVi
    const newsData = (newsDataRaw as any).default || newsDataRaw
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
          url: `${baseUrl}/${lang}/blog/${article.id}`,
          lastModified: lastMod,
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: {
              vi: `${baseUrl}/vi/blog/${article.id}`,
              en: `${baseUrl}/en/blog/${article.id}`,
            },
          },
        })
      }
    }
  }

  return sitemapEntries
}
