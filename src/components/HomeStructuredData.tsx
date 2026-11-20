import { getLocale, getMessages, getTranslations } from 'next-intl/server';

const DOMAIN_NAME = 'morskieokolake.com';
const BASE_URL = `https://${DOMAIN_NAME}`;
const HERO_OG_IMAGE = '/gallery/morskie-oko%20(1).jpg';
const ATTRACTION_FULL_NAME = 'Morskie Oko';
const CITY_NAME = 'Zakopane';
const STATE_PROVINCE = 'Małopolskie Voivodeship';
const MAPS_SHARE_URL = 'https://maps.app.goo.gl/EkjxMAqKNf9H8NCb6';
const GOVT_TOURISM_URL = 'https://www.zakopane.pl/';

export default async function HomeStructuredData() {
  const messages = await getMessages();
  const locale = await getLocale();
  const t = await getTranslations('meta');
  const faqItems = (messages?.faq?.items || []) as Array<{ question: string; answer: string }>;

  const touristAttraction = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${BASE_URL}/#attraction`,
    name: ATTRACTION_FULL_NAME,
    description: t('description'),
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
    inLanguage: locale === 'zh' ? 'zh-CN' : locale,
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };


  return (
    <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttraction) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
    </>
  );
}
