import type { Metadata } from 'next'
import LocatiePageContent from './LocatiePageContent'

export const metadata: Metadata = {
  title: 'De Locatie - Monumentale Stadsvilla',
  description: 'Ontdek Villa 1855: een monumentale stadsvilla uit 1855 in het hart van Tilburg. 4 unieke ruimtes, binnentuin en moderne faciliteiten voor tot 150 gasten.',
  alternates: {
    canonical: 'https://www.villa1855.nl/locatie',
  },
  openGraph: {
    title: 'De Locatie - Monumentale Stadsvilla | Villa 1855',
    description: 'Ontdek Villa 1855: een monumentale stadsvilla uit 1855 in het hart van Tilburg. 4 unieke ruimtes voor tot 150 gasten.',
    url: 'https://www.villa1855.nl/locatie',
    type: 'website',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'De Locatie - Monumentale Stadsvilla | Villa 1855',
    description: 'Ontdek Villa 1855: een monumentale stadsvilla uit 1855 in het hart van Tilburg.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LocatiePage() {
  return <LocatiePageContent />
}
