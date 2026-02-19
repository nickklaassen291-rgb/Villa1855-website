import type { Metadata } from 'next'
import TrouwenPageContent from './TrouwenPageContent'

export const metadata: Metadata = {
  title: 'Trouwlocatie Tilburg - Exclusief Trouwen',
  description: 'Trouwen bij Villa 1855 in Tilburg. Exclusieve trouwlocatie in een monumentale stadsvilla uit 1855. Ceremonie en feest op één locatie voor 30-150 gasten.',
  alternates: {
    canonical: 'https://www.villa1855.nl/trouwen',
  },
  openGraph: {
    title: 'Trouwlocatie Tilburg - Exclusief Trouwen | Villa 1855',
    description: 'Trouwen bij Villa 1855 in Tilburg. Exclusieve trouwlocatie in een monumentale stadsvilla uit 1855.',
    url: 'https://www.villa1855.nl/trouwen',
    type: 'website',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trouwlocatie Tilburg - Exclusief Trouwen | Villa 1855',
    description: 'Trouwen bij Villa 1855 in Tilburg. Exclusieve trouwlocatie in een monumentale stadsvilla uit 1855.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hoeveel gasten kunnen er bij Villa 1855 terecht?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bij een diner kunnen maximaal 120 gasten plaatsnemen. Voor een borrel of receptie is er ruimte voor maximaal 150 gasten. Voor intieme ceremonies vanaf 30 personen zijn wij ook de perfecte locatie.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kunnen we ook de ceremonie bij jullie houden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, Villa 1855 is een officiële trouwlocatie. Jullie kunnen hier zowel het burgerlijk huwelijk als een vrije ceremonie houden. De binnentuin en de grote zaal zijn populaire ceremonieplekken.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mogen we onze eigen leveranciers meenemen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De catering wordt exclusief verzorgd door Cookaholics. Voor andere leveranciers zoals fotograaf, DJ, bloemist en decoratie zijn jullie vrij om eigen keuzes te maken. We werken ook graag samen met onze vaste partners.',
      },
    },
    {
      '@type': 'Question',
      name: 'Tot hoe laat mag het feest duren?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standaard is het feest tot 01:00 uur. In overleg is verlenging tot 02:00 uur mogelijk. We vragen wel rekening te houden met onze buren in het centrum van Tilburg.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is er parkeergelegenheid voor onze gasten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Er is betaald parkeren in de directe omgeving en diverse parkeergarages binnen 5 minuten lopen. Het centrum van Tilburg is ook uitstekend bereikbaar met OV – het station ligt op 10 minuten loopafstand.',
      },
    },
  ],
}

export default function TrouwenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <TrouwenPageContent />
    </>
  )
}
