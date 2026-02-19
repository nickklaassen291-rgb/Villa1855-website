import type { Metadata } from 'next'
import ZakelijkPageContent from './ZakelijkPageContent'

export const metadata: Metadata = {
  title: 'Zakelijke Evenementen Tilburg',
  description: 'Organiseer je zakelijk event bij Villa 1855 in Tilburg. Netwerkborrels, vergaderingen en zakelijke diners in een monumentale setting. Vanaf €52,50 p.p.',
  alternates: {
    canonical: 'https://www.villa1855.nl/zakelijk',
  },
  openGraph: {
    title: 'Zakelijke Evenementen Tilburg | Villa 1855',
    description: 'Organiseer je zakelijk event bij Villa 1855 in Tilburg. Netwerkborrels, vergaderingen en zakelijke diners in een monumentale setting.',
    url: 'https://www.villa1855.nl/zakelijk',
    type: 'website',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zakelijke Evenementen Tilburg | Villa 1855',
    description: 'Organiseer je zakelijk event bij Villa 1855 in Tilburg. Netwerkborrels, vergaderingen en zakelijke diners.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ZakelijkPage() {
  return <ZakelijkPageContent />
}
