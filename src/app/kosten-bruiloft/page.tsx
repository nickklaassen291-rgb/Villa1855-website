import type { Metadata } from 'next'
import WeddingCalculator from './WeddingCalculator'

export const metadata: Metadata = {
  title: 'Kosten Bruiloft Berekenen - Trouwlocatie Tilburg',
  description: 'Bereken de kosten van jullie bruiloft bij Villa 1855 in Tilburg. Pas het aantal gasten en wensen aan en bekijk meteen de bijbehorende kosten.',
  alternates: {
    canonical: 'https://www.villa1855.nl/kosten-bruiloft',
  },
  openGraph: {
    title: 'Kosten Bruiloft Berekenen | Villa 1855',
    description: 'Bereken de kosten van jullie bruiloft bij Villa 1855 in Tilburg. Pas het aantal gasten en wensen aan en bekijk meteen de bijbehorende kosten.',
    url: 'https://www.villa1855.nl/kosten-bruiloft',
    type: 'website',
    locale: 'nl_NL',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function KostenBruiloftPage() {
  return <WeddingCalculator />
}
