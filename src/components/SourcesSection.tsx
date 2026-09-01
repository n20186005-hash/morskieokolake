'use client';

import { useTranslations, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

interface SourceItem {
  label: string;
  url: string;
  description?: string;
  type: 'government' | 'academic' | 'official' | 'park';
}

const TYPE_META: Record<SourceItem['type'], { label: string; color: string }> = {
  government: { label: 'Government', color: '#2a5ca6' },
  academic: { label: 'Academic', color: '#5a5a5a' },
  official: { label: 'Official Tourism', color: '#2d7a4f' },
  park: { label: 'National Park', color: '#7a5a2d' },
};

export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as any;
  const items = (messages?.sources?.items || []) as SourceItem[];

  if (!items || items.length === 0) return null;

  return (
    <section id="sources" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--bg-tertiary)', border: '1px dashed var(--border-color)' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              <path d="M8 7h8" />
              <path d="M8 11h8" />
              <path d="M8 15h4" />
            </svg>
          </div>
          <div className="flex-1">
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              {t.has('title') ? t('title') : 'Sources & Official References'}
            </h2>
            {t.has('subtitle') && (
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {t('subtitle')}
              </p>
            )}
          </div>
        </div>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <ol className="space-y-4">
          {items.map((item, idx) => {
            const meta = TYPE_META[item.type] || TYPE_META.official;
            return (
              <li
                key={idx}
                className="rounded-xl p-5 sm:p-6"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px dashed var(--border-color)',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <span
                    className="flex-shrink-0 inline-flex items-center justify-center rounded-full font-mono text-xs font-semibold"
                    style={{
                      width: 36,
                      height: 36,
                      background: 'var(--bg-primary)',
                      color: 'var(--accent)',
                      border: '1px dashed var(--border-color)',
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span
                        className="text-[10px] uppercase tracking-[0.18em] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: `${meta.color}12`, color: meta.color }}
                      >
                        {meta.label}
                      </span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-lg font-semibold break-all hover:underline"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.label}
                      </a>
                    </div>
                    {item.description && (
                      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                        {item.description}
                      </p>
                    )}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
                      style={{ color: 'var(--accent)' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      {item.url}
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {t.has('note') && (
          <div
            className="mt-10 rounded-xl p-5 sm:p-6"
            style={{
              background: 'var(--bg-tertiary)',
              borderLeft: '3px solid var(--accent)',
            }}
          >
            <p className="text-xs leading-relaxed italic" style={{ color: 'var(--text-muted)' }}>
              {t('note')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
