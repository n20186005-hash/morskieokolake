'use client';

import { useTranslations } from 'next-intl';

export default function TicketsSection() {
  const t = useTranslations('tickets');

  return (
    <section
      id="tickets-parking"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {/* Three main price cards: Park ticket / Parking / Carriages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Park Entrance Ticket */}
          <div
            className="rounded-2xl p-6 sm:p-7"
            style={{
              background: 'var(--bg-tertiary)',
              border: '2px solid var(--accent)',
            }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20 12V8H6a2 2 0 0 1 0-4h12v4" />
                  <path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3
                  className="font-display text-xl font-semibold leading-snug mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t('park')}
                </h3>
                <p
                  className="font-bold text-lg leading-relaxed"
                  style={{ color: 'var(--accent)' }}
                >
                  {t('parkPrice')}
                </p>
              </div>
            </div>
            {t.has('parkBuyLink') && (
              <a
                href="https://tpn.pl/en/tickets/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-2 transition-colors"
                style={{ color: 'var(--accent)' }}
              >
                {t('parkBuyLink')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </a>
            )}
          </div>

          {/* Palenica Parking */}
          <div
            className="rounded-2xl p-6 sm:p-7"
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M9 9h2v6H9zM13 9h2v6h-2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3
                  className="font-display text-xl font-semibold leading-snug mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t.has('parkingInfo.palenicaTitle') ? t('parkingInfo.palenicaTitle') : t('parking')}
                </h3>
                <p
                  className="font-bold text-lg leading-relaxed"
                  style={{ color: 'var(--accent)' }}
                >
                  {t.has('parkingInfo.palenicaFees') ? t('parkingInfo.palenicaFees') : t('parkingPrice')}
                </p>
              </div>
            </div>
            {t.has('parkingInfo.palenicaCapacity') && (
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t('parkingInfo.palenicaCapacity')}
              </p>
            )}
          </div>

          {/* Horse Carriages */}
          <div
            className="rounded-2xl p-6 sm:p-7"
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M4 18V9l4-5h4l2 4h4a2 2 0 0 1 2 2v3h2" />
                  <circle cx="7" cy="19" r="2" />
                  <circle cx="17" cy="19" r="2" />
                  <path d="M9 14h7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3
                  className="font-display text-xl font-semibold leading-snug mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t('guided')}
                </h3>
                <p
                  className="font-bold text-lg leading-relaxed"
                  style={{ color: 'var(--accent)' }}
                >
                  {t('guidedPrice')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Parking Reservation Block */}
        {t.has('parkingInfo.title') && (
          <div
            className="rounded-2xl p-6 sm:p-8 mb-8"
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px dashed var(--accent)',
            }}
          >
            <div className="flex items-start gap-3 mb-5">
              <div
                className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3
                className="font-display text-2xl font-semibold leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('parkingInfo.title')}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
              {/* Lysa Polana card */}
              {t.has('parkingInfo.lysaPolanaTitle') && (
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <h4
                    className="font-semibold mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {t('parkingInfo.lysaPolanaTitle')}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {t('parkingInfo.lysaPolanaFees')}
                  </p>
                </div>
              )}

              {/* No-reservation fallback tip */}
              {t.has('parkingInfo.noReservationTip') && (
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--accent)',
                  }}
                >
                  <div className="flex items-start gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {t('parkingInfo.noReservationTip')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Step-by-step reservation */}
            {t.has('parkingInfo.howToBookTitle') && (
              <div>
                <h4
                  className="font-display text-lg font-semibold mb-4 flex items-center gap-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    ✓
                  </span>
                  {t('parkingInfo.howToBookTitle')}
                </h4>

                <ol className="space-y-3">
                  {(() => {
                    const steps: string[] = [];
                    const MAX_STEPS = 10;
                    for (let i = 0; i < MAX_STEPS; i++) {
                      const key = `parkingInfo.howToBookSteps.${i}` as const;
                      if (t.has(key)) steps.push(t(key));
                      else break;
                    }
                    return steps.map((step, idx) => (
                      <li
                        key={idx}
                        className="flex gap-4 rounded-xl p-4"
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                        }}
                      >
                        <span
                          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                          style={{ background: 'var(--accent)' }}
                        >
                          {idx + 1}
                        </span>
                        <p
                          className="pt-1 text-sm sm:text-base leading-relaxed"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {step}
                        </p>
                      </li>
                    ));
                  })()}
                </ol>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
