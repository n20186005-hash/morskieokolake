import { getTranslations, setRequestLocale } from 'next-intl/server';
import Footer from '@/components/Footer';
import ReferenceLinks from '@/components/ReferenceLinks';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'footer' });
  return { title: t('about'), alternates: { canonical: `/${locale}/about` } };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('footer');
  const header = await getTranslations('header');
  return (
    <>
      <main className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6">
        <a className="underline" href={`/${locale}`}>{header('backToHome')}</a>
        <h1 className="font-display text-3xl font-semibold">{t('about')}</h1>
        <p>{t('brandName')} · {t('brandSubtitle')}</p>
        <p>{t('disclaimer')}</p>
        <section id="photo-credits" className="space-y-3">
          <h2 className="font-display text-2xl font-semibold">{t('photoCredits')}</h2>
          <p>{t('imageCopyright')}</p>
        </section>
        <ReferenceLinks locale={locale} />
      </main>
      <Footer />
    </>
  );
}
