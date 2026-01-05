import type { Metadata } from 'next'
import HeroSection from '@/components/beer-pairing/HeroSection'
import HookSection from '@/components/beer-pairing/HookSection'
import ExperienceTimeline from '@/components/beer-pairing/ExperienceTimeline'
import CreatorsSection from '@/components/beer-pairing/CreatorsSection'
import PracticalInfo from '@/components/beer-pairing/PracticalInfo'
import RestrictionsSection from '@/components/beer-pairing/RestrictionsSection'
import ScarcitySection from '@/components/beer-pairing/ScarcitySection'
import CTASection from '@/components/beer-pairing/CTASection'
import FAQSection from '@/components/beer-pairing/FAQSection'
import BeerPairingFooter from '@/components/beer-pairing/BeerPairingFooter'
import StickyCTA from '@/components/beer-pairing/StickyCTA'

export const metadata: Metadata = {
  title: 'Pop-up Biersommelier | 7 Gangen Beer Pairing Diner',
  description: '7 gangen. 7 zeldzame craft beers. Eén onvergetelijke avond. Cookaholics x Beer Dudes presenteren een exclusief beer pairing diner op 20 & 21 februari 2026 in Villa 1855, Tilburg.',
  keywords: ['beer pairing', 'craft beer', 'diner', 'Tilburg', 'Villa 1855', 'Cookaholics', 'Beer Dudes', 'biersommelier', '7 gangen'],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.villa1855.nl/beer-pairing-diner',
    siteName: 'Villa 1855',
    title: 'Pop-up Biersommelier | 7 Gangen Beer Pairing Diner',
    description: '7 gangen. 7 zeldzame craft beers. Eén onvergetelijke avond in Villa 1855.',
    images: [
      {
        url: '/images/og-beer-pairing.jpg',
        width: 1200,
        height: 630,
        alt: 'Beer Pairing Diner - Cookaholics x Beer Dudes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pop-up Biersommelier | 7 Gangen Beer Pairing Diner',
    description: '7 gangen. 7 zeldzame craft beers. 20 & 21 februari 2026.',
    images: ['/images/og-beer-pairing.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BeerPairingDinerPage() {
  return (
    <>
      <main>
        <HeroSection />
        <HookSection />
        <ExperienceTimeline />
        <CreatorsSection />
        <PracticalInfo />
        <RestrictionsSection />
        <ScarcitySection />
        <CTASection />
        <FAQSection />
      </main>
      <BeerPairingFooter />
      <StickyCTA />
    </>
  )
}
