'use client';

import { useTranslations } from 'next-intl';

export default function BasicInfo() {
  const t = useTranslations('basicInfo');

  const fieldKeys = [
    'officialName',
    'type',
    'country',
    'region',
    'city',
    'elevation',
    'area',
    'maxDepth',
    'hikeDistance',
    'roundTrip',
    'ascent',
    'managingBody',
    'googleRating',
    'accessibility',
    'plusCode',
    'coordinates',
  ] as const;

  const fullWidthKeys = new Set(['address', 'lakeAddress']);

  return (
    <section
      id="basic-info"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {fieldKeys
            .filter((k) => t.has(k))
            .map((k) => (
              <InfoCard key={k} title={t(k)} value={t(`${k}Value` as any)} />
            ))}

          {t.has('address') && (
            <div className="md:col-span-2 lg:col-span-3">
              <InfoCard title={t('address')} value={t('addressValue')} />
            </div>
          )}
          {t.has('lakeAddress') && (
            <div className="md:col-span-2 lg:col-span-3">
              <InfoCard title={t('lakeAddress')} value={t('lakeAddressValue')} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: 'var(--bg-tertiary)',
        border: '1px dashed var(--border-color)',
      }}
    >
      <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
        {title}
      </p>
      <p
        className="font-medium text-base sm:text-lg leading-relaxed"
        style={{ color: 'var(--text-primary)' }}
      >
        {value}
      </p>
    </div>
  );
}
