import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://morskieokolake.com';
  // Fixed date keeps the build output deterministic across CI runs.
  const lastModified = new Date('2026-09-01');

  const entries: MetadataRoute.Sitemap = [];

  const pages = [
    '',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-settings'
  ];

  for (const locale of routing.locales) {
    for (const page of pages) {
      const url = `${baseUrl}/${locale}${page}`;
      const languages: Record<string, string> = {
        'x-default': `${baseUrl}/en`,
      };
      for (const other of routing.locales) {
        languages[other] = `${baseUrl}/${other}${page}`;
      }
      entries.push({
        url,
        lastModified,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.4,
        alternates: { languages },
      });
    }
  }

  return entries;
}
