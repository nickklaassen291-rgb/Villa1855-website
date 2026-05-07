import type { Metadata } from 'next'
import WeddingCalculator from './WeddingCalculator'

export const metadata: Metadata = {
  title: 'Calculator Bruiloften - Bereken Kosten | Trouwlocatie Tilburg',
  description: 'Bereken de kosten van jullie bruiloft bij Villa 1855 in Tilburg. Pas het aantal gasten en wensen aan en bekijk meteen de bijbehorende kosten.',
  alternates: {
    canonical: 'https://www.villa1855.nl/calculator-bruiloften',
  },
  openGraph: {
    title: 'Calculator Bruiloften | Villa 1855',
    description: 'Bereken de kosten van jullie bruiloft bij Villa 1855 in Tilburg. Pas het aantal gasten en wensen aan en bekijk meteen de bijbehorende kosten.',
    url: 'https://www.villa1855.nl/calculator-bruiloften',
    type: 'website',
    locale: 'nl_NL',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CalculatorBruiloftenPage() {
  return <WeddingCalculator />
}
