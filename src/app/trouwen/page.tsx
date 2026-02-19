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
        text: 'Het feest is standaard tot maximaal 01:00 uur. In overleg is verlenging tot 02:00 uur mogelijk. We vragen wel rekening te houden met onze buren in het centrum van Tilburg.',
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
    {
      '@type': 'Question',
      name: 'Hoe lang is een offerte geldig?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Een offerte van Villa 1855 is 14 dagen geldig. Binnen die periode kunnen jullie de datum vrijblijvend vasthouden. Na het verlopen van de optie komt de datum weer beschikbaar voor andere stellen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe werkt de aanbetaling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Na bevestiging van de boeking vragen wij een aanbetaling van 25% van het totaalbedrag. Het resterende bedrag wordt in overleg gefactureerd richting de trouwdatum.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wanneer moeten we definitieve aantallen doorgeven?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De definitieve aantallen dienen uiterlijk 2 weken voor de trouwdag doorgegeven te worden. Tot die tijd werken we met de geschatte aantallen uit de offerte.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe werkt het inschakelen van externe partijen naast Cookaholics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De catering wordt exclusief verzorgd door Cookaholics. Voor overige leveranciers zoals DJ, fotograaf, bloemist en decoratie zijn jullie vrij om eigen partijen in te schakelen. Wij stemmen graag af om alles soepel te laten verlopen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welke soorten versiering zijn toegestaan in Villa 1855?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jullie mogen de villa naar eigen smaak aankleden. We vragen alleen om geen confetti, glitters of items die schade kunnen veroorzaken aan het monumentale interieur te gebruiken. Kaarsen zijn welkom in houders.',
      },
    },
    {
      '@type': 'Question',
      name: 'Waar kunnen mijn gasten parkeren?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Er zijn meerdere parkeergarages en betaalde parkeerplaatsen op loopafstand van Villa 1855. Het centrum van Tilburg is ook goed bereikbaar met het openbaar vervoer – het station ligt op circa 10 minuten lopen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hebben jullie partners die jullie aanbevelen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, wij werken samen met een netwerk van ervaren trouwleveranciers, van fotografen en DJ\'s tot bloemisten en stylisten. Tijdens een kennismaking delen we graag onze aanbevelingen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kunnen we een trouwverzekering afsluiten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wij raden aan om een trouwverzekering af te sluiten bij een gespecialiseerde verzekeraar. Dit biedt dekking bij onvoorziene omstandigheden zoals ziekte of extreme weersomstandigheden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Voor hoeveel mensen is er plek tijdens de ceremonie, het diner & de feestavond?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bij een ceremonie is er plaats voor maximaal 150 gasten. Voor een diner bieden wij ruimte aan maximaal 120 gasten. Tijdens de feestavond kunnen tot 150 gasten aanwezig zijn.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat valt er te regelen qua entertainment voor de kinderen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In overleg kunnen wij een aparte ruimte beschikbaar stellen voor de kinderen. Denk aan een kinderhoek met activiteiten. Ook kunnen wij een kindermenu verzorgen. Externe kinderanimatie is welkom.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe worden de speeches/stukjes geregeld?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Speeches en stukjes kunnen op elk gewenst moment in het programma worden ingepland. Wij beschikken over een microfoon en geluidsinstallatie. In het draaiboek stemmen we samen het ideale moment af.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mogen we het eten van tevoren proeven?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, wij bieden een proefavond aan waarbij jullie het menu kunnen proeven en samen met de chef de laatste details bespreken. Dit wordt doorgaans enkele maanden voor de trouwdag ingepland.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is een externe ceremonie ook mogelijk?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, het is mogelijk om de ceremonie op een externe locatie te houden en vervolgens naar Villa 1855 te komen voor de receptie, het diner en het feest. Wij passen het programma hierop aan.',
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
