import { attractions, exploreLabels } from '@/content/explore';
import type { Locale } from '@/i18n/routing';

export default function ExploreLinks({ locale }: { locale: Locale }) {
  const areas = Array.from(new Set(attractions.map(({ area }) => area)));
  return (
    <section id="explore-tatras" className="section-padding scroll-mt-20" style={{ background: 'var(--bg-secondary)' }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="font-display mb-6 text-2xl font-semibold">{exploreLabels[locale].title}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {areas.map((area) => (
            <div key={area} className="rounded-xl border p-5" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <h3 className="mb-3 font-semibold">{area}</h3>
              <ul className="space-y-2">
                {attractions.filter((place) => place.area === area).map((place) => (
                  <li key={place.slug}><a className="underline" href={`/${locale}/explore/${place.slug}`}>{place.name}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
