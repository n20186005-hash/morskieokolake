import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { accessHub, attractions, attractionMap, exploreLabels, getFacility, park, parkAdmission, parkMap, relatedAttractions, returnPlan, trailUpdates } from '@/content/explore';
import { routing, type Locale } from '@/i18n/routing';

const site = 'https://morskieokolake.com';
type Params = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return attractions.map(({ slug }) => ({ slug }));
}

async function getAttraction(params: Params['params']) {
  const { locale, slug } = await params;
  const place = attractions.find((item) => item.slug === slug);
  if (!place || !routing.locales.includes(locale)) notFound();
  return { locale, place, slug };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, place, slug } = await getAttraction(params);
  const path = `/explore/${slug}`;
  const url = `${site}/${locale}${path}`;
  const languages = Object.fromEntries(routing.locales.map((lang) => [lang, `${site}/${lang}${path}`]));
  const title = place.name;
  const description = place.copy[locale];
  return {
    title,
    description,
    alternates: { canonical: url, languages: { ...languages, 'x-default': `${site}/en${path}` } },
    openGraph: { title, description, url, images: [`/explore-photos/${slug}.webp`], type: 'article' },
    twitter: { card: 'summary_large_image', title, description, images: [`/explore-photos/${slug}.webp`] },
  };
}

export default async function ExplorePage({ params }: Params) {
  const { locale, place, slug } = await getAttraction(params);
  setRequestLocale(locale);
  const t = exploreLabels[locale];
  const facility = getFacility(slug);
  const hub = accessHub(place);
  const related = relatedAttractions(place);
  const route = place.route.join(" → ");

  return (
    <>
      <Header />
      <main>
        <div className="relative isolate overflow-hidden bg-black text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/explore-photos/${slug}.webp`} alt={place.name} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-black/65" />
          <div className="mx-auto max-w-5xl px-4 pb-12 pt-28 sm:px-6 sm:pb-20 sm:pt-36">
            <a href={`/${locale}#explore-tatras`} className="text-sm underline">{t.home}</a>
            <h1 className="font-display mt-4 max-w-3xl text-3xl font-semibold sm:text-5xl">{place.name}</h1>
            <p className="mt-4 max-w-2xl">{place.area} · {place.entry}</p>
            <div className="mt-5 flex flex-wrap gap-5">
              <a className="underline" href={attractionMap(place)}>{t.map}</a>
              <a className="underline" href={trailUpdates}>{t.conditions}</a>
            </div>
          </div>
        </div>
        <article className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
          <section aria-labelledby="about-place">
            <h2 id="about-place" className="font-display mb-2 text-2xl font-semibold">{t.about}</h2>
            <p>{t.park} <a className="underline" href={park}>Tatrzański Park Narodowy</a></p>
            {facility && <p className="mt-2">{t.facility} · <a href={facility.url} className="underline">{facility.name}</a></p>}
            <p className="mt-2 max-w-3xl">{place.history?.[locale] ?? place.context[locale]}</p>
            <a className="mt-2 inline-block underline" href={place.historySource || place.wiki}>{t.placeReference}</a>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{t.basic}</h2>
            <dl className="grid gap-3 sm:grid-cols-3">
              <div><dt className="font-semibold">{t.name}</dt><dd>{place.name}</dd></div>
              <div><dt className="font-semibold">{t.area}</dt><dd>{place.area}</dd></div>
              <div><dt className="font-semibold">{t.approach}</dt><dd>{place.entry}</dd></div>
            </dl>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{t.highlights}</h2>
            <p className="max-w-3xl">{place.copy[locale]}</p>
            {place.history && <p className="mt-3 max-w-3xl">{place.context[locale]}</p>}
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{t.walking}</h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                {t.arrival}{' '}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hub.map)}`} className="underline">{hub.name}</a>
                {hub.name !== place.entry && <> → <a href={parkMap} className="underline">{place.entry}</a></>}
              </li>
              <li><strong>{t.route}</strong><p>{route}</p></li>
              <li>{returnPlan(place, locale)}</li>
              {/* The visitor's destination has its own map link, independent of the trailhead. */}
              <li><a className="underline" href={attractionMap(place)}>{t.map} · {place.name}</a></li>
            </ol>
            {place.area === 'Morskie Oko · Dolina Roztoki' && (
              <a href={`/${locale}/guide/from-zakopane`} className="mt-3 inline-block underline">Zakopane · Palenica Białczańska</a>
            )}
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{t.visit}</h2>
            <p>{t.photoTip}</p>
            <a className="mt-2 inline-block underline" href={place.credit}>{t.file}</a>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{t.faq}</h2>
            <details className="mb-3"><summary>{t.qAccess}</summary><p className="mt-2">{t.aAccess} <a className="underline" href={trailUpdates}>{t.updates}</a></p></details>
            <details className="mb-3"><summary>{t.qRoute}</summary><p className="mt-2">{route} · <a href={parkMap} className="underline">{t.parkMap}</a></p></details>
            <details><summary>{t.qTickets}</summary><p className="mt-2">{t.aTickets} <a className="underline" href={place.area === 'Dolina Chochołowska' && facility ? facility.url : parkAdmission}>{place.area === 'Dolina Chochołowska' && facility ? facility.name : t.admission}</a></p></details>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{t.related}</h2>
            <ul className="list-disc space-y-2 pl-5">
              {related.map((item) => <li key={item.slug}><a className="underline" href={`/${locale}/explore/${item.slug}`}>{item.name}</a></li>)}
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
