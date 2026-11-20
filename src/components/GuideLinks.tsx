import { guides, labels, topics, type Topic } from '@/content/guides';
import type { Locale } from '@/i18n/routing';

export default function GuideLinks({ locale, current }: { locale: Locale; current?: Topic }) {
  return (
    <section id="visit-guides" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold mb-6">{labels[locale][0]}</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.filter((topic) => topic !== current).map((topic) => {
            const guide = guides[locale][topic];
            return (
              <li key={topic}>
                <a href={`/${locale}/guide/${topic}`} className="block h-full rounded-xl border p-5 hover:underline"
                  style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                  <span className="block font-semibold">{guide.title}</span>
                  <span className="mt-2 block text-sm" style={{ color: 'var(--text-secondary)' }}>{guide.summary}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
