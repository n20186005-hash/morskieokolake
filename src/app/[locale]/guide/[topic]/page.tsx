import { moduleLabels, nearbyFacts } from '@/content/nearby';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GuideLinks from '@/components/GuideLinks';
import { getGuide, isNearby, labels, sources, sourceLabels, topics, type Topic } from '@/content/guides';
import { routing, type Locale } from '@/i18n/routing';

const site = 'https://morskieokolake.com';
const lakePhoto = '/gallery/morskie-oko (1).jpg';
const park = 'https://tpn.gov.pl/';
const lakeMap = 'https://maps.app.goo.gl/EkjxMAqKNf9H8NCb6';
type Params = { params: Promise<{ locale: Locale; topic: Topic }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return topics.map((topic) => ({ topic }));
}

async function readGuide(params: Params['params']) {
  const { locale, topic } = await params;
  if (!routing.locales.includes(locale) || !topics.includes(topic)) notFound();
  return {
    locale,
    topic,
    guide: getGuide(locale, topic),
    landmark: isNearby(topic) ? nearbyFacts[topic] : null,
    photo: isNearby(topic) ? `/nearby/${topic}.webp` : lakePhoto,
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, topic, guide, photo } = await readGuide(params);
  const path = `/guide/${topic}`;
  const url = `${site}/${locale}${path}`;
  const languages = Object.fromEntries(routing.locales.map((lang) => [lang, `${site}/${lang}${path}`]));
  return {
    title: guide.title,
    description: guide.summary,
    alternates: { canonical: url, languages: { ...languages, 'x-default': `${site}/en${path}` } },
    openGraph: { title: guide.title, description: guide.summary, url, type: 'article', images: [photo] },
    twitter: { card: 'summary_large_image', title: guide.title, description: guide.summary, images: [photo] },
  };
}

export default async function GuidePage({ params }: Params) {
  const { locale, topic, guide, landmark, photo } = await readGuide(params);
  setRequestLocale(locale);
  const [related, home, official, map] = labels[locale];
  const [, basic, managed, transport, reviews, reviewSource, checked, lakeReviews, elevation, area, reviewCount] = moduleLabels[locale];
  const places = {
    'mickiewicz-waterfalls': [],
    wlosienica: [],
    parking: ['Palenica Białczańska', 'Łysa Polana'],
    tickets: ['Palenica Białczańska'],
    'from-zakopane': ['Dworzec Autobusowy Zakopane', 'Palenica Białczańska'],
  }[topic];
  const primarySource = sources[topic][0];
  return (
    <>
      <Header />
      <main>
        <div className="relative isolate overflow-hidden bg-black text-white">
          <Image src={photo} alt={landmark?.name ?? "Morskie Oko"} fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-black/65" />
          <div className="mx-auto max-w-5xl px-4 pb-12 pt-28 sm:px-6 sm:pb-20 sm:pt-36">
            <a href={`/${locale}`} className="text-sm underline">{home}</a>
            <h1 className="font-display mt-4 max-w-3xl text-3xl font-semibold sm:text-5xl">{guide.title}</h1>
            <p className="mt-4 max-w-2xl">{guide.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {landmark && <li><a href={landmark.map} className="underline">{map} · {landmark.name}</a></li>}
              {places.map((place) => (
                <li key={place}>
                  <a className="underline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place + ', Poland')}`}>
                    {map} · {place}
                  </a>
                </li>
              ))}
            </ul>
            {landmark && (
              <p className="mt-4">
                <a className="underline" href="#visitor-reviews">
                  {new Intl.NumberFormat(locale).format(4.8)} / 5 · {new Intl.NumberFormat(locale).format(landmark.count)} {reviewCount}
                </a>
              </p>
            )}
            <a href={primarySource} className="mt-5 inline-block rounded-lg border border-white/60 px-4 py-2 hover:bg-white/15">
              {sourceLabels[primarySource]}
            </a>
          </div>
        </div>
        <article className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
          {landmark && (
            <p className="text-sm">
              <a href={landmark.photo} className="underline">{landmark.photographer} · Wikimedia Commons</a>
              {' · '}
              <a href={landmark.licenseUrl} className="underline">{landmark.license}</a>
              {' · WebP'}
            </p>
          )}
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{managed}</h2>
            <a href={park} className="underline">Tatrzański Park Narodowy (TPN)</a>
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{basic}</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              <div><dt className="font-semibold">{area}</dt><dd>{landmark?.name ?? places.join(' · ')}</dd></div>
              {landmark && <div><dt className="font-semibold">{elevation}</dt><dd>{new Intl.NumberFormat(locale).format(landmark.elevation)} m</dd></div>}
            </dl>
          </section>
          {guide.sections.map(([heading, body]) => (
            <section key={heading}>
              <h2 className="font-display mb-2 text-2xl font-semibold">{heading}</h2>
              <p className="max-w-3xl leading-relaxed">{body}</p>
            </section>
          ))}
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{transport}</h2>
            <ul className="list-disc space-y-2 pl-5">
              {(['from-zakopane', 'parking'] as const).filter((item) => item !== topic).map((item) => (
                <li key={item}><a className="underline" href={`/${locale}/guide/${item}`}>{getGuide(locale, item).title}</a></li>
              ))}
              {topic === 'from-zakopane' && <li><a href={primarySource} className="underline">{sourceLabels[primarySource]}</a></li>}
            </ul>
          </section>
          <section id="visitor-reviews" className="scroll-mt-20">
            <h2 className="font-display mb-2 text-2xl font-semibold">{reviews}</h2>
            {landmark ? (
              <p>
                <a href={landmark.map} className="font-semibold underline">
                  {new Intl.NumberFormat(locale).format(4.8)} / 5 · {new Intl.NumberFormat(locale).format(landmark.count)} {reviewCount}
                </a>
                {' · '}<a href={landmark.reviews} className="underline">{reviewSource}</a>
                <span className="block text-sm">{checked}</span>
              </p>
            ) : <a href={lakeMap} className="underline">{lakeReviews}</a>}
          </section>
          <section>
            <h2 className="font-display mb-2 text-2xl font-semibold">{official}</h2>
            <ul className="list-disc space-y-2 pl-5">
              {sources[topic].map((source) => (
                <li key={source}><a href={source} className="underline">{sourceLabels[source]}</a></li>
              ))}
            </ul>
          </section>
          <a href={`/${locale}#visit-guides`} className="underline">{related}</a>
        </article>
        <GuideLinks locale={locale} current={topic} />
        <GuideLinks locale={locale} current={topic} nearby />
      </main>
      <Footer />
    </>
  );
}
