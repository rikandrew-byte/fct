import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'OAI-SearchBot'],
        allow: '/',
      }
    ],
    sitemap: 'https://fct.vn/sitemap.xml',
  }
}
