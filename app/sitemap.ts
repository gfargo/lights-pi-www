import { MetadataRoute } from 'next'
import { resolveAllFlags } from '@/lib/flags/runtime'
import { getDocs } from '@/lib/wiki'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lights.griffen.codes'
  const flags = await resolveAllFlags()
  const docs = await getDocs()
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: '2025-06-08',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/quick-start`,
      lastModified: '2025-06-01',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hardware`,
      lastModified: '2025-05-15',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: '2025-06-08',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: '2025-04-01',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: '2025-06-08',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/use-cases`,
      lastModified: '2025-05-01',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/comparison`,
      lastModified: '2025-05-01',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: '2025-05-01',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/roadmap`,
      lastModified: '2025-05-15',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: '2025-06-08',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contributing`,
      lastModified: '2025-06-08',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Conditionally add demo if enabled
  if (flags['enable-demo']) {
    routes.push({
      url: `${baseUrl}/demo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  // Conditionally add showcase if enabled
  if (flags['enable-showcase']) {
    routes.push({
      url: `${baseUrl}/showcase`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  // Add all wiki doc pages
  for (const doc of docs) {
    routes.push({
      url: `${baseUrl}/docs/${doc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  return routes
}
