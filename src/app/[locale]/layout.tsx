import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const LOCALE_OG_MAP: Record<string, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  pl: 'pl_PL',
  ru: 'ru_RU',
  de: 'de_DE',
};

const LOCALE_HTML_MAP: Record<string, string> = {
  en: 'en',
  zh: 'zh-CN',
  pl: 'pl-PL',
  ru: 'ru-RU',
  de: 'de-DE',
};

const DOMAIN_NAME = 'morskieokolake.com';
const BASE_URL = `https://${DOMAIN_NAME}`;
const HERO_OG_IMAGE = '/gallery/morskie-oko%20(1).jpg';
const ATTRACTION_FULL_NAME = 'Morskie Oko';
const CITY_NAME = 'Zakopane';
const STATE_PROVINCE = 'Małopolskie Voivodeship';
const COUNTRY_NAME = 'Poland';
const MAPS_SHARE_URL = 'https://maps.app.goo.gl/EkjxMAqKNf9H8NCb6';
const GOVT_TOURISM_URL = 'https://www.zakopane.pl/';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const ogLocale = LOCALE_OG_MAP[locale] || 'en_US';
  const canonicalUrl = `${BASE_URL}/${locale}`;
  const ogImageAbsolute = `${BASE_URL}${HERO_OG_IMAGE}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: canonicalUrl,
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/icon.png', sizes: '32x32', type: 'image/png' },
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
    },
    manifest: '/manifest.webmanifest',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#f6efe5' },
      { media: '(prefers-color-scheme: dark)', color: '#1a1814' },
    ],
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      siteName: messages.footer.brandName || 'Morskie Oko · Independent Visitor Guide',
      locale: ogLocale,
      type: 'website',
      url: canonicalUrl,
      images: [
        {
          url: ogImageAbsolute,
          width: 1600,
          height: 900,
          alt: `${ATTRACTION_FULL_NAME} - Main view in ${CITY_NAME}, ${COUNTRY_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [ogImageAbsolute],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages() as any;
  const htmlLang = LOCALE_HTML_MAP[locale] || 'en';

  const faqItems = (messages?.faq?.items || []) as Array<{ question: string; answer: string }>;

  const touristAttraction = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${BASE_URL}/#attraction`,
    name: ATTRACTION_FULL_NAME,
    alternateName: ['Morskie Oko Lake', `${CITY_NAME} ${ATTRACTION_FULL_NAME}`, 'Eye of the Sea Tatra'],
    description: `Comprehensive visitor guide to ${ATTRACTION_FULL_NAME} in ${CITY_NAME}, ${STATE_PROVINCE}, ${COUNTRY_NAME}.`,
    url: BASE_URL,
    image: [
      `${BASE_URL}${HERO_OG_IMAGE}`,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dolina Rybiego Potoku',
      addressLocality: CITY_NAME,
      addressRegion: STATE_PROVINCE,
      postalCode: '34-500',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 49.197141,
      longitude: 20.071253,
    },
    hasMap: MAPS_SHARE_URL,
    sameAs: [
      MAPS_SHARE_URL,
      GOVT_TOURISM_URL,
      'https://tpn.gov.pl/',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '6996',
      bestRating: '5',
      worstRating: '1',
    },
    isAccessibleForFree: false,
    publicAccess: true,
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const GA4_MEASUREMENT_ID = 'G-HXM22WWPKP';

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#f6efe5" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a1814" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Morskie Oko" />
        <meta name="application-name" content="Morskie Oko Guide" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#f6efe5" />
        <link rel="canonical" href={`${BASE_URL}/${locale}`} />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,id){
                function initAnalytics(){
                  if (w['ga-disable-' + id]) return;
                  var script = d.createElement('script');
                  script.async = true;
                  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
                  d.head.appendChild(script);
                  w.dataLayer = w.dataLayer || [];
                  w.gtag = function(){ w.dataLayer.push(arguments); };
                  w.gtag('js', new Date());
                  w.gtag('config', id, { anonymize_ip: true });
                }
                function checkConsent(){
                  try {
                    var prefs = JSON.parse(localStorage.getItem('cookiePrefs') || '{}');
                    if (prefs.analytics) initAnalytics();
                  } catch(e){}
                }
                checkConsent();
                d.addEventListener('consent-updated', checkConsent);
              })(window, document, 'script', 'dataLayer', '${GA4_MEASUREMENT_ID}');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttraction) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
