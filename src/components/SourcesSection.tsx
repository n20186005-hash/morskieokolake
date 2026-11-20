import { useTranslations } from 'next-intl';

interface SourceItem {
  label: string;
  url: string;
  description?: string;
}

export default function SourcesSection() {
  const t = useTranslations('sources');
  const items = t.raw('items') as SourceItem[];

  return (
    <section id="sources" className="mx-auto max-w-4xl py-10">
      <h1 className="font-display mb-3 text-3xl font-semibold sm:text-4xl">{t('title')}</h1>
      <p className="mb-6 leading-relaxed">{t('subtitle')}</p>
      <ul className="space-y-4">
        {items.map(({ label, url, description }) => (
          <li key={url} className="rounded-xl border p-5" style={{
            background: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)',
          }}>
            <h2 className="font-display mb-2 text-lg font-semibold">
              <a className="underline" href={url}>{label}</a>
            </h2>
            {description && <p className="leading-relaxed">{description}</p>}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm">{t('note')}</p>
    </section>
  );
}
