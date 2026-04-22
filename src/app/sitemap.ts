import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fct.vn'
  const locales = ['vi', 'en']
  const routes = ['', '/about', '/news', '/products', '/projects', '/contact', '/expert-ai']

  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach((lang) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return sitemapEntries
}
