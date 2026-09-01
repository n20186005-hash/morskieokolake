'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

const AMENITY_KEYS = [
  'toilets',
  'parking',
  'food',
  'accommodation',
  'shopping',
  'fuelCharging',
  'atm',
  'medical',
] as const;

type AmenityKey = (typeof AMENITY_KEYS)[number];

const ICONS: Record<AmenityKey, ReactNode> = {
  toilets: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4v16" />
      <path d="M10 4v16" />
      <path d="M4 10h6" />
      <path d="M4 18h6" />
      <path d="M15 4c-1.5 0-2.5 1.2-2.5 3 0 .6.2 1.1.6 1.6L11 20h8l-2.1-11.4c.4-.5.6-1 .6-1.6 0-1.8-1-3-2.5-3Z" />
    </svg>
  ),
  parking: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M9 7v10" />
      <path d="M9 7h3.5a3.5 3.5 0 1 1 0 7H9" />
    </svg>
  ),
  food: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2v7a3 3 0 0 0 6 0V2" />
      <path d="M9 2v20" />
      <path d="M15 2c-2 0-3 2-3 5s1 5 3 5v10" />
      <path d="M19 2c2 0 3 2 3 5s-1 5-3 5v10" />
    </svg>
  ),
  accommodation: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21V10l9-7 9 7v11" />
      <path d="M9 21V12h6v9" />
      <circle cx="12" cy="7" r="1" />
    </svg>
  ),
  shopping: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6h15l-1.5 9h-12Z" />
      <path d="M6 6 5 2H2" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  ),
  fuelCharging: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="11" height="15" rx="1" />
      <path d="M3 11h11" />
      <path d="M14 9h4a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1h-1" />
      <path d="M18 11V7l-2-2" />
      <path d="M7 14v5" />
      <path d="M7 14h3l-3 5h3" />
    </svg>
  ),
  atm: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <rect x="8" y="7" width="8" height="5" rx="1" />
      <path d="M8 16h3" />
      <path d="M8 19h5" />
    </svg>
  ),
  medical: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  ),
};

export default function AmenitiesSection() {
  const t = useTranslations('amenities');

  return (
    <section id="amenities" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t.has('title') ? t('title') : 'Amenities & Visitor Infrastructure'}
        </h2>
        <div className="w-12 h-0.5 mb-4" style={{ background: 'var(--accent)' }} />
        {t.has('intro') && (
          <p
            className="text-base leading-relaxed mb-10 max-w-3xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t('intro')}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {AMENITY_KEYS.filter((k) => t.has(`${k}.title`) && t.has(`${k}.desc`)).map((k) => (
            <div
              key={k}
              className="rounded-xl p-6 flex flex-col"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px dashed var(--border-color)',
              }}
            >
              <div
                className="flex items-center gap-3 mb-4"
                style={{ color: 'var(--accent)' }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--bg-primary)' }}
                >
                  {ICONS[k]}
                </div>
                <h3
                  className="text-sm uppercase tracking-[0.18em] font-semibold leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t(`${k}.title`)}
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t(`${k}.desc`)}
              </p>
              {t.has(`${k}.tip`) && (
                <div
                  className="mt-4 pt-4 flex items-start gap-3"
                  style={{ borderTop: '1px dashed var(--border-color)' }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    className="flex-shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {t(`${k}.tip`)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
