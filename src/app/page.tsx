import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import Services from '@/components/sections/Services'
import USPs from '@/components/sections/USPs'
import Gallery from '@/components/sections/Gallery'
import CTA from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Villa 1855 | Evenementenlocatie Tilburg',
  description: 'Villa 1855 is dé exclusieve evenementenlocatie in het hart van Tilburg. Monumentale stadsvilla uit 1855 voor bruiloften, zakelijke events en bijzondere vieringen.',
  alternates: {
    canonical: 'https://www.villa1855.nl',
  },
  openGraph: {
    title: 'Villa 1855 | Evenementenlocatie Tilburg',
    description: 'Dé exclusieve evenementenlocatie in het hart van Tilburg. Monumentale stadsvilla voor bruiloften, zakelijke events en vieringen.',
    url: 'https://www.villa1855.nl',
    type: 'website',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Villa 1855 | Evenementenlocatie Tilburg',
    description: 'Dé exclusieve evenementenlocatie in het hart van Tilburg.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Services />
        <USPs />
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
