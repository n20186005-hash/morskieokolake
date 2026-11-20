import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'zh', 'pl', 'ru', 'de'],
  defaultLocale: 'en',
  localePrefix: {
    mode: 'always',
  },
  pathnames: {
    '/': '/',
    '/guide/parking': '/guide/parking',
    '/guide/tickets': '/guide/tickets',
    '/guide/from-zakopane': '/guide/from-zakopane',
    '/guide/mickiewicz-waterfalls': '/guide/mickiewicz-waterfalls',
    '/guide/wlosienica': '/guide/wlosienica',
    '/explore/[slug]': '/explore/[slug]',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
    '/sources': '/sources',
    '/about': '/about',
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
