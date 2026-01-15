import type { Metadata } from 'next'
import HeroSection from '@/components/open-trouw-route/HeroSection'
import TrustSection from '@/components/open-trouw-route/TrustSection'
import EventDetails from '@/components/open-trouw-route/EventDetails'
import USPsSection from '@/components/open-trouw-route/USPsSection'
import PartnersSection from '@/components/open-trouw-route/PartnersSection'
import GallerySection from '@/components/open-trouw-route/GallerySection'
import RegistrationForm from '@/components/open-trouw-route/RegistrationForm'
import LandingFooter from '@/components/open-trouw-route/LandingFooter'
import StickyCTA from '@/components/open-trouw-route/StickyCtA'
import MetaPixel from '@/components/open-trouw-route/MetaPixel'

export const metadata: Metadata = {
  title: 'Open Trouw Route Villa 1855 | 31 januari 2026 Tilburg',
  description: 'Bezoek Villa 1855 op 31 januari. Exclusieve trouwlocatie in centrum Tilburg. Rondleiding, culinaire proeverij & vrijblijvende offerte. Gratis toegang.',
  keywords: ['trouwlocatie tilburg', 'trouwen tilburg', 'bruiloft locatie tilburg', 'trouwlocatie brabant', 'open dag trouwlocatie', 'trouwlocatie centrum', 'exclusieve trouwlocatie', 'trouwlocatie tilburg met binnentuin', 'trouwen monumentaal pand tilburg', 'Villa 1855'],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.villa1855.nl/open-trouw-route',
    siteName: 'Villa 1855',
    title: 'Open Trouw Route Villa 1855 | 31 januari 2026 Tilburg',
    description: 'Bezoek Villa 1855 op 31 januari. Exclusieve trouwlocatie in centrum Tilburg. Rondleiding, culinaire proeverij & vrijblijvende offerte.',
    images: [
      {
        url: '/images/og-open-trouw-route.jpg',
        width: 1200,
        height: 630,
        alt: 'Open Trouw Route Villa 1855 - Exclusieve trouwlocatie Tilburg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Trouw Route Villa 1855 | 31 januari 2026 Tilburg',
    description: 'Bezoek exclusieve trouwlocatie Villa 1855 in Tilburg. Gratis rondleiding & proeverij.',
    images: ['/images/og-open-trouw-route.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.villa1855.nl/open-trouw-route',
  },
}

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Open Trouw Route Villa 1855',
  description: 'Bezoek Villa 1855 tijdens de Open Trouw Route. Exclusieve trouwlocatie in centrum Tilburg. Rondleiding, culinaire proeverij & vrijblijvende offerte.',
  startDate: '2026-01-31T10:00:00+01:00',
  endDate: '2026-01-31T17:00:00+01:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Villa 1855',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Noordstraat 36',
      addressLocality: 'Tilburg',
      postalCode: '5038 EJ',
      addressCountry: 'NL',
    },
  },
  image: 'https://www.villa1855.nl/images/og-open-trouw-route.jpg',
  organizer: {
    '@type': 'Organization',
    name: 'Villa 1855',
    url: 'https://www.villa1855.nl',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: 'https://www.villa1855.nl/open-trouw-route',
    validFrom: '2025-01-01',
  },
  performer: {
    '@type': 'Organization',
    name: 'Villa 1855 & Cookaholics',
  },
}

export default function OpenTrouwRoutePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <MetaPixel />
      <main>
        <HeroSection />
        <TrustSection />
        <EventDetails />
        <USPsSection />
        <PartnersSection />
        <GallerySection />
        <RegistrationForm />
      </main>
      <LandingFooter />
      <StickyCTA />
    </>
  )
}
