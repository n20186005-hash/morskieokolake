import { getMessages, getTranslations } from 'next-intl/server';

interface HistoryItem {
  year: string;
  title: string;
  text: string;
}

export default async function HistorySection() {
  const t = await getTranslations('history');
  const messages = (await getMessages()) as any;
  const items = (messages?.history?.items ?? []) as HistoryItem[];

  if (items.length === 0) return null;

  return (
    <section id="history" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-4" style={{ background: 'var(--accent)' }} />
        {t.has('subtitle') && (
          <p className="text-base leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
            {t('subtitle')}
          </p>
        )}

        <ol className="relative mt-14 space-y-10">
          <span
            className="absolute left-[17px] top-2 bottom-2 w-px"
            style={{ background: 'var(--border-color)' }}
            aria-hidden
          />
          {items.map((item, i) => (
            <li key={i} className="relative pl-16">
              <span
                className="absolute left-0 top-0.5 inline-flex items-center justify-center h-9 px-3 rounded-full font-display text-xs font-bold whitespace-nowrap"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                {item.year}
              </span>
              <h3
                className="font-display text-xl sm:text-2xl font-semibold mb-2 pt-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
