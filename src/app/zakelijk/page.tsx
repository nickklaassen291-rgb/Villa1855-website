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

const reviewsForSchema = [
  {
    author: 'Marloes Verbeek',
    body: 'Wij hebben genoten van een heerlijk kerstdiner bij Villa 1855. De aanloop naar het event wordt professioneel en vriendelijk begeleid. Op de avond zelf een vast contactpersoon voor eventuele vragen en een fantastisch team die het horeca vak verstaan. Heerlijke gerechtjes, gezellige ambiance en top bediening. Absoluut een aanrader!',
  },
  {
    author: 'Tibor Vermeer',
    body: 'Wat een top locatie, alles tot in de puntjes geregeld. Bediening is de juiste style, de gangen van Cookaholics waren subliem en de sfeer overtrof mijn verwachting.',
  },
  {
    author: 'Remo Hendriks',
    body: 'Genoten van de prachtige locatie in het centrum van Tilburg. Welkomstdrankje in de mooie, ruime stadstuin, daarna heerlijk gegeten met bijpassende dranken. De gerechten zagen er uitnodigend en uniek uit, de bediening was beleefd en toegankelijk.',
  },
  {
    author: 'Marieke van Os',
    body: 'Ben je te gast op een event, privé of zakelijk, waar Cookaholics de catering verzorgt? Dan weet je zeker dat het tot in de puntjes verzorgd is!',
  },
]

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

const venueJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  '@id': 'https://www.villa1855.nl/zakelijk#venue',
  name: 'Villa 1855',
  url: 'https://www.villa1855.nl/zakelijk',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Noordstraat 36',
    addressLocality: 'Tilburg',
    postalCode: '5038 EJ',
    addressCountry: 'NL',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: reviewsForSchema.length,
    bestRating: '5',
    worstRating: '1',
  },
  review: reviewsForSchema.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.author },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: r.body,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(venueJsonLd) }}
      />
      <ZakelijkPageContent />
    </>
  )
}
