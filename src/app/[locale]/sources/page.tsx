import { getTranslations, setRequestLocale } from 'next-intl/server';
import SourcesSection from '@/components/SourcesSection';
import ReferenceLinks from '@/components/ReferenceLinks';
import Footer from '@/components/Footer';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sources' });
  return { title: t('title'), description: t('subtitle'), alternates: { canonical: `/${locale}/sources` } };
}

export default async function SourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('header');
  const footer = await getTranslations('footer');
  const official: Record<string, string> = {
    gov: 'https://www.gov.pl/',
    poland_travel: 'https://www.poland.travel/',
    visitmalopolska: 'https://visitmalopolska.pl/',
    zakopane: 'https://www.zakopane.pl/',
    tpn: 'https://tpn.gov.pl/',
  };
  return (
    <>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <a className="underline" href={`/${locale}`}>{t('backToHome')}</a>
        <SourcesSection />
        <section className="mx-auto max-w-4xl px-4">
          <h2 className="mb-3 text-xl font-semibold">{footer('officialResourcesTitle')}</h2>
          <ul className="space-y-2">
            {Object.entries(official).map(([key, url]) => (
              <li key={key}><a className="underline" href={url}>{footer(`officialLinks.${key}`)}</a></li>
            ))}
          </ul>
        </section>
        <ReferenceLinks locale={locale} />
      </main>
      <Footer />
    </>
  );
}
