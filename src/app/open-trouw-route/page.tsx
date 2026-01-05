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
  title: 'Open Trouw Route 31 januari 2026 | Villa 1855',
  description: 'Ontdek Villa 1855 tijdens de Open Trouw Route op 31 januari 2026. Proef onze catering, ontmoet toppartners en ontvang een offerte op maat. Reserveer nu je plek!',
  keywords: ['open trouw route', 'trouwlocatie tilburg', 'Villa 1855', 'bruiloft bezichtiging', 'wedding venue', 'open dag trouwen'],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.villa1855.nl/open-trouw-route',
    siteName: 'Villa 1855',
    title: 'Open Trouw Route 31 januari 2026 | Villa 1855',
    description: 'Ontdek Villa 1855 tijdens de Open Trouw Route. Proef onze catering, ontmoet toppartners en ontvang een offerte op maat.',
    images: [
      {
        url: '/images/og-open-trouw-route.jpg',
        width: 1200,
        height: 630,
        alt: 'Open Trouw Route Villa 1855',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Trouw Route 31 januari 2026 | Villa 1855',
    description: 'Ontdek Villa 1855 tijdens de Open Trouw Route. Reserveer nu je plek!',
    images: ['/images/og-open-trouw-route.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function OpenTrouwRoutePage() {
  return (
    <>
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
