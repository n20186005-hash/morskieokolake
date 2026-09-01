import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import InfoSection from '@/components/InfoSection';
import HistorySection from '@/components/HistorySection';
import StoriesSection from '@/components/StoriesSection';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import AmenitiesSection from '@/components/AmenitiesSection';
import TransportSection from '@/components/TransportSection';
import RouteSection from '@/components/RouteSection';
import WeatherSection from '@/components/WeatherSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FAQSection from '@/components/FAQSection';
import MapEmbed from '@/components/MapEmbed';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://morskieokolake.com';
  return {
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        zh: `${baseUrl}/zh`,
        pl: `${baseUrl}/pl`,
        ru: `${baseUrl}/ru`,
        de: `${baseUrl}/de`,
        'x-default': `${baseUrl}/en`,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <InfoSection />
        <HistorySection />
        <StoriesSection />
        <HoursSection />
        <TicketsSection />
        <AmenitiesSection />
        <TransportSection />
        <RouteSection />
        <WeatherSection />
        <Gallery />
        <Reviews />
        <FAQSection />
        <MapEmbed />
        <SourcesSection />
      </main>
      <Footer />
    </>
  );
}
