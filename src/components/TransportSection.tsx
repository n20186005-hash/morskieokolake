'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

export default function TransportSection() {
  const t = useTranslations('transport');

  type TransportDef = { key: string; icon: ReactNode };
  const transportOptions: TransportDef[] = [
    {
      key: 'fromCenter',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="3" width="16" height="16" rx="2" />
          <path d="M4 11h16" />
          <circle cx="8" cy="15" r="1" />
          <circle cx="16" cy="15" r="1" />
        </svg>
      ),
    },
    {
      key: 'fromStation',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
          <circle cx="6.5" cy="16.5" r="2.5" />
          <circle cx="16.5" cy="16.5" r="2.5" />
        </svg>
      ),
    },
    {
      key: 'trainInfo',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="3" width="16" height="16" rx="2" />
          <path d="M4 11h16" />
          <path d="M8 19l-2 3" />
          <path d="M16 19l2 3" />
          <circle cx="8" cy="15" r="1" />
          <circle cx="16" cy="15" r="1" />
        </svg>
      ),
    },
    {
      key: 'fromAirport',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21.5 4c0 0-2 .5-3.5 2L14.5 9.5l-8.2-1.8c-.8-.2-1.6.3-1.8 1.1-.2.8.3 1.6 1.1 1.8l6.3 1.4-3.4 3.4-2.8-.7c-.6-.2-1.2.1-1.4.7-.2.6.1 1.2.7 1.4l3.5.9 1.4 3.5c.2.6.8.9 1.4.7.6-.2.9-.8.7-1.4l-.7-2.8 3.4-3.4 1.4 6.3c.2.8 1 1.3 1.8 1.1.8-.2 1.3-1 1.1-1.8z" />
        </svg>
      ),
    },
    {
      key: 'publicTransport',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      ),
    },
    {
      key: 'walking',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="13" cy="4" r="2" />
          <path d="M8 22l2-7-2-3 3-4 2 4h2l1 5 2 3" />
          <path d="M6 12l2 2" />
        </svg>
      ),
    },
    {
      key: 'driving',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 18V9l4-5h4l2 4h4a2 2 0 0 1 2 2v3h2" />
          <circle cx="7" cy="19" r="2" />
          <circle cx="17" cy="19" r="2" />
          <path d="M9 14h7" />
        </svg>
      ),
    },
  ];

  const visibleOptions = transportOptions.filter((o) => t.has(o.key));

  return (
    <section id="transport" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleOptions.map((option) => (
            <TransportCard
              key={option.key}
              icon={option.icon}
              title={t(option.key as any)}
              description={t(`${option.key}Desc` as any)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TransportCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="rounded-xl p-5 sm:p-6 flex gap-4 h-full"
      style={{
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-color)',
      }}
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: 'var(--accent)', color: 'white' }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3
          className="font-semibold mb-2 leading-snug"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
