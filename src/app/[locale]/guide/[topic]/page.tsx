import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GuideLinks from '@/components/GuideLinks';
import { guides, labels, sources, sourceLabels, topics, type Topic } from '@/content/guides';
import { routing, type Locale } from '@/i18n/routing';

const site = 'https://morskieokolake.com';
const photo = '/gallery/morskie-oko (1).jpg';
type Params = { params: Promise<{ locale: Locale; topic: Topic }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return topics.map((topic) => ({ topic }));
}

async function readGuide(params: Params['params']) {
  const { locale, topic } = await params;
  if (!routing.locales.includes(locale) || !topics.includes(topic)) notFound();
  return { locale, topic, guide: guides[locale][topic] };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, topic, guide } = await readGuide(params);
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
  const { locale, topic, guide } = await readGuide(params);
  setRequestLocale(locale);
  const [related, home, official, map] = labels[locale];
  const places = topic === 'parking' ? ['Palenica Białczańska', 'Łysa Polana'] : ['Palenica Białczańska'];
  return (
    <>
      <Header />
      <main>
        <div className="relative isolate overflow-hidden bg-black text-white">
          <Image src={photo} alt="Morskie Oko" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-black/65" />
          <div className="mx-auto max-w-5xl px-4 pb-12 pt-28 sm:px-6 sm:pb-20 sm:pt-36">
            <a href={`/${locale}`} className="text-sm underline">{home}</a>
            <h1 className="font-display mt-4 max-w-3xl text-3xl font-semibold sm:text-5xl">{guide.title}</h1>
            <p className="mt-4 max-w-2xl">{guide.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {places.map((place) => (
                <li key={place}>
                  <a className="underline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place + ', Poland')}`}>
                    {map} · {place}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <article className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
          {guide.sections.map(([heading, body]) => (
            <section key={heading}>
              <h2 className="font-display mb-2 text-2xl font-semibold">{heading}</h2>
              <p className="max-w-3xl leading-relaxed">{body}</p>
            </section>
          ))}
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
      </main>
      <Footer />
    </>
  );
}
