import type { Metadata } from 'next'
import ZakelijkPageContent from './ZakelijkPageContent'
import { faqItems, servicePackages } from './data'

export const metadata: Metadata = {
  title: 'Zakelijke Evenementenlocatie Tilburg',
  description: 'Vergaderlocatie, netwerkborrel of bedrijfsfeest in Tilburg? Villa 1855 is een monumentale stadsvilla, exclusief voor jouw zakelijke event. Pakketten vanaf €52,50 p.p.',
  alternates: {
    canonical: 'https://www.villa1855.nl/zakelijk',
  },
  openGraph: {
    title: 'Zakelijke Evenementenlocatie Tilburg | Villa 1855',
    description: 'Vergaderlocatie, netwerkborrel of bedrijfsfeest in Tilburg in een monumentale stadsvilla. Exclusief voor jouw event.',
    url: 'https://www.villa1855.nl/zakelijk',
    type: 'website',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zakelijke Evenementenlocatie Tilburg | Villa 1855',
    description: 'Vergaderlocatie, netwerkborrel of bedrijfsfeest in Tilburg in een monumentale stadsvilla.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@graph': servicePackages.map((pkg) => ({
    '@type': 'Service',
    '@id': `https://www.villa1855.nl/zakelijk#${pkg.id}`,
    name: pkg.name,
    description: pkg.description,
    serviceType: 'Zakelijk evenement',
    provider: {
      '@type': 'EventVenue',
      name: 'Villa 1855',
      url: 'https://www.villa1855.nl',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Noordstraat 36',
        addressLocality: 'Tilburg',
        postalCode: '5038 EJ',
        addressCountry: 'NL',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Tilburg',
    },
    offers: {
      '@type': 'Offer',
      price: pkg.pricePerPerson,
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: pkg.pricePerPerson,
        priceCurrency: 'EUR',
        unitText: 'per persoon, exclusief btw',
      },
      availability: 'https://schema.org/InStock',
    },
  })),
}

export default function ZakelijkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ZakelijkPageContent />
    </>
  )
}
