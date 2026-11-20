import { lodging, publicTransport, visitDetails, visitLabels } from '@/content/explore-visit';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { accessHub, attractions, attractionMap, exploreLabels, getFacility, park, parkMap, relatedAttractions, returnPlan, trailUpdates } from '@/content/explore';
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
  const v = visitLabels[locale];
  const visit = visitDetails(place, locale);
  const destination = attractionMap(place);

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
            <p className="mt-2 max-w-2xl text-sm">{visit.access}</p>
            <div className="mt-5 flex flex-wrap gap-5">
              <a className="underline" href={attractionMap(place)}>{t.map}</a>
              <a className="underline" href={trailUpdates}>{t.conditions}</a>
              <a className="underline" href="#visitor-reviews">{v.reviews}</a>
            </div>
          </div>
        </div>
        <article className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{v.intro}</h2>
            <p className="max-w-3xl">{place.copy[locale]}</p>
            <h3 className="mt-4 font-semibold">{v.tips}</h3>
            <p className="max-w-3xl">{returnPlan(place, locale)}</p>
          </section>
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
              <div><dt className="font-semibold">{t.facility}</dt><dd>{facility?.name ?? 'Tatrzański Park Narodowy'}</dd></div>
              <div><dt className="font-semibold">{v.hours}</dt><dd>{visit.access}</dd></div>
              <div><dt className="font-semibold">{v.prices}</dt><dd>{visit.fee}</dd></div>
            </dl>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{v.hours}</h2>
            <p>{visit.access}</p>
            <a href={visit.hoursUrl ?? trailUpdates} className="mt-2 inline-block underline">{v.accessLink}</a>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{v.prices}</h2>
            <p>{visit.fee}</p>
            <a href={visit.admissionUrl} className="mt-2 inline-block underline">{v.ticketLink}</a>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{t.walking}</h2>
            <p>{t.arrival}{' '}
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hub.map)}`} className="underline">{hub.name}</a>
              {hub.name !== place.entry && <> → <a href={parkMap} className="underline">{place.entry}</a></>}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li><a href={publicTransport} className="underline">{v.transit}</a></li>
              {place.area === 'Morskie Oko · Dolina Roztoki' && (
                <li><a href={`/${locale}/guide/from-zakopane`} className="underline">Zakopane · Palenica Białczańska</a></li>
              )}
            </ul>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{t.highlights}</h2>
            <p className="max-w-3xl">{place.context[locale]}</p>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{t.route}</h2>
            <ol className="list-decimal space-y-2 pl-5">
              {place.route.map((stop, i) => (
                <li key={stop}><a className="underline" href={i === place.route.length - 1 ? destination : parkMap}>{stop}</a></li>
              ))}
            </ol>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{v.rules}</h2>
            <p>{t.aAccess}</p>
            <a className="mt-2 inline-block underline" href={trailUpdates}>{t.updates}</a>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{v.photo}</h2>
            <p className="font-semibold">{visit.photoSpot}</p>
            <p>{t.photoTip}</p>
            <a className="mt-2 inline-block underline" href={place.credit}>{t.file}</a>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{v.stay}</h2>
            <p className="font-semibold">{visit.stay}</p>
            <p>{v.stayText}</p>
            <a className="mt-2 inline-block underline" href={lodging}>{v.stay}</a>
          </section>
          <section id="visitor-reviews" className="scroll-mt-20">
            <h2 className="font-display mb-2 text-2xl font-semibold">{v.reviews}</h2>
            <p>{v.reviewsText}</p>
            <a className="mt-2 inline-block underline" href={destination}>{t.map} · {place.name}</a>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{v.directions}</h2>
            <p>{place.name} · {place.area} · Polska</p>
            <p>{t.approach} · {place.entry}</p>
            <a className="mt-2 inline-block underline" href={destination}>{t.map} · {place.name}</a>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{t.faq}</h2>
            <details className="mb-3"><summary>{t.qAccess}</summary><p className="mt-2">{t.aAccess} <a className="underline" href={trailUpdates}>{t.updates}</a></p></details>
            <details className="mb-3"><summary>{t.qRoute}</summary><p className="mt-2">{route} · <a href={parkMap} className="underline">{t.parkMap}</a></p></details>
            <details><summary>{t.qTickets}</summary><p className="mt-2">{t.aTickets} <a className="underline" href={visit.admissionUrl}>{v.ticketLink}</a></p></details>
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
