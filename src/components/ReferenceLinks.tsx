import { useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/routing';

export default function ReferenceLinks({ locale }: { locale: Locale }) {
  const sources = useTranslations('sources');
  const footer = useTranslations('footer');
  return (
    <nav className="mx-auto flex max-w-5xl flex-wrap gap-x-5 gap-y-2 px-4 py-6 text-sm">
      <a className="underline" href={`/${locale}/sources`}>{sources('title')}</a>
      <a className="underline" href={`/${locale}/about`}>{footer('about')}</a>
      <a className="underline" href={`/${locale}/privacy-policy`}>{footer('privacy')}</a>
      <a className="underline" href={`/${locale}/terms-of-service`}>{footer('terms')}</a>
      <a className="underline" href={`/${locale}/cookie-settings`}>{footer('cookies')}</a>
    </nav>
  );
}
