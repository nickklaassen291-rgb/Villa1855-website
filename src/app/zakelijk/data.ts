export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: 'Wat is de capaciteit voor zakelijke events bij Villa 1855?',
    answer: 'Voor een borrel of walking dinner waarbij we beide zalen gebruiken, is er plek voor maximaal 150 personen. Voor een zittend diner is het maximum 80 personen. Voor events in de buitenruimte bespreken we de aantallen in overleg — dat hangt af van de opstelling en het programma.',
  },
  {
    question: 'Hebben we Villa 1855 voor onszelf op onze eventdag?',
    answer: 'Ja. We plannen nooit meerdere events tegelijk — maximaal één event per dag. De zalen en de tuin zijn op jullie eventdag voor jullie groep: geen andere gezelschappen in de zaal ernaast, geen overlap in de tuin.',
  },
  {
    question: 'Is Villa 1855 geschikt voor zowel formele als informele bijeenkomsten?',
    answer: 'Ja. Van directiediners en klantenevents tot informele borrels en personeelsfeesten — de villa past zich aan aan jullie event. De styling, de setting en het tempo stemmen we samen af op de sfeer die jullie voor ogen hebben.',
  },
  {
    question: 'Kunnen jullie ons volledig ontzorgen in de organisatie en catering?',
    answer: 'Ja. Cookaholics verzorgt de catering — dat staat vast en is onderdeel van het concept. Voor de rest van het event werken we met een vast netwerk van leveranciers dat we goed kennen. Eén team, één aanspreekpunt, één aansturing. Van eerste planning en draaiboek tot de service op de dag zelf. Hebben jullie specifieke wensen of vaste partners vanuit jullie organisatie? Laat het weten — we bespreken in overleg wat past.',
  },
  {
    question: 'Welke AV-faciliteiten zijn beschikbaar voor presentaties en meetings?',
    answer: 'Villa 1855 beschikt over professionele geluidsapparatuur. Aanvullende AV-middelen — zoals beamers, schermen of specifieke presentatie-apparatuur — huren we in via onze vaste partners en berekenen we door aan de opdrachtgever. Vertel ons vooraf wat jullie nodig hebben voor het programma, dan regelen wij de rest.',
  },
  {
    question: 'Zijn er parkeervoorzieningen in de buurt voor onze gasten?',
    answer: 'Met de auto parkeren jullie gasten het beste in Parkeergarage De Knegtel (Gasthuisring 60, 5041 DT Tilburg), op vijf minuten lopen van Villa 1855. Direct voor de deur zijn 10 tot 12 parkeerplaatsen beschikbaar. Fietsen kunnen onbewaakt voor de deur gestald worden. Vanaf Station Tilburg is het ongeveer vijf minuten lopen naar de villa.',
  },
]

export interface UseCase {
  title: string
  body: string
}

export const useCases: UseCase[] = [
  {
    title: 'Kick-offs en strategiesessies',
    body: 'Een dag uit de waan van de dag, in een setting die focus uitlokt. Plenaire sessie \'s ochtends, lunch in de tuin, breakouts in de achterzaal en een afsluitende borrel.',
  },
  {
    title: 'Klantendagen en relatie-events',
    body: 'Maak indruk op klanten zonder de afstandelijkheid van een hotel. Onze monumentale stadsvilla geeft je event direct karakter, en gasten parkeren binnen vijf minuten lopen in De Knegtel.',
  },
  {
    title: 'Productlanceringen en persmomenten',
    body: 'Walking dinner met chef-presentatie, AV-faciliteiten voor pitch of demo, fotogenieke ruimtes voor pers en social media — een setting die zichzelf verkoopt.',
  },
  {
    title: 'Bedrijfsfeesten en kerstborrels',
    body: 'Tot 150 gasten bij staande ontvangst, 80 bij zittend diner. Volledig exclusief — geen andere groepen in de villa op jullie dag.',
  },
  {
    title: 'Vergaderingen en trainingen',
    body: 'Beeldscherm, flexibele opstellingen (theater, U-vorm, boardroom), professionele geluidsinstallatie. Catering aanwezig zonder logistieke rompslomp.',
  },
]

export interface ServicePackage {
  id: string
  name: string
  description: string
  pricePerPerson: number
}

export const servicePackages: ServicePackage[] = [
  {
    id: 'netwerkborrel',
    name: 'Netwerkborrel',
    description: 'Informele setting om relaties te versterken — ideaal voor netwerkevents, productlanceringen en seizoensborrels.',
    pricePerPerson: 52.5,
  },
  {
    id: 'werksessie-borrel',
    name: 'Werksessie & borrel',
    description: 'Productieve dag in een inspirerende omgeving — perfect voor strategiesessies, trainingen, presentaties en workshops.',
    pricePerPerson: 65,
  },
  {
    id: 'relatiediner',
    name: 'Relatiediner',
    description: 'Onvergetelijk diner om indruk te maken — combineer netwerken met excellent eten in een unieke setting.',
    pricePerPerson: 92.5,
  },
]
