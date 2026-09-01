import { useTranslations, useMessages, useLocale } from 'next-intl';

const EMBED_LANG_MAP: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  pl: 'pl',
  ru: 'ru',
  de: 'de',
};

const MAPS_EMBED_SRC_BASE =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1187136.051942018!2d20.071253!3d49.197141!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47158a5a4fffffff%3A0xa4d48cec50aab839!2sMorskie%20Oko!5e1!3m2!1szh-CN!2s!4v1788250992790!5m2!1szh-CN!2s';

export default function MapEmbed() {
  const t = useTranslations('mapSection');
  const messages = useMessages() as any;
  const locale = useLocale();
  const mapsLink =
    messages?.hero?.mapsLink || 'https://maps.app.goo.gl/EkjxMAqKNf9H8NCb6';
  const embedSrc = MAPS_EMBED_SRC_BASE.split('1szh-CN').join(
    `1s${EMBED_LANG_MAP[locale] || 'en'}`
  );

  return (
    <section
      id="map"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p
          className="mb-2 text-sm leading-relaxed max-w-4xl"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('subtitle')}
        </p>
        {t.has('palenicaInfo') && (
          <p
            className="mb-8 text-sm leading-relaxed max-w-4xl rounded-lg p-4"
            style={{
              color: 'var(--text-secondary)',
              background: 'var(--bg-tertiary)',
              borderLeft: '3px solid var(--accent)',
            }}
          >
            {t('palenicaInfo')}
          </p>
        )}
        {!t.has('palenicaInfo') && <div className="mb-8" />}
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div
          className="map-container relative rounded-xl overflow-hidden shadow-sm"
          style={{ border: '1px solid var(--map-border, var(--border-color))' }}
        >
          <iframe
            src={embedSrc}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Google Maps – Morskie Oko, Dolina Rybiego Potoku, 34-500 Zakopane, Małopolskie Voivodeship, Poland (Tatra National Park)"
          />
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('openMaps')}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
