'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function VieringenPageContent() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index)
  }

  const eventTypes = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
        </svg>
      ),
      title: 'Verjaardagen',
      description: 'Van 30 tot 100 gasten - vier je verjaardag in stijl met een onvergetelijk feest.',
      capacity: '30-100 gasten'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Jubilea',
      description: 'Vier mijlpalen samen met familie en vrienden in een monumentale setting.',
      capacity: '40-120 gasten'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Familiefeesten',
      description: 'Reünies, communies, of gewoon samen zijn - creëer herinneringen voor het leven.',
      capacity: '30-150 gasten'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: 'Pensioenfeesten',
      description: 'Neem afscheid van een carrière met een stijlvol feest voor collega\'s en dierbaren.',
      capacity: '40-100 gasten'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Thema-avonden',
      description: 'Van murder mystery tot casino night - wij maken jouw creatieve idee werkelijkheid.',
      capacity: '20-80 gasten'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Verlovingsfeesten',
      description: 'Vier jullie verloving met vrienden en familie in een romantische ambiance.',
      capacity: '30-80 gasten'
    }
  ]

  const faqItems = [
    {
      question: 'Voor hoeveel gasten is Villa 1855 geschikt bij een feest?',
      answer: 'Voor een borrel of walking dinner met beide zalen in gebruik is er plek voor maximaal 150 personen. Voor een zittend diner is het maximum 80 personen. Bij een feestavond met muziek en dansvloer is 100 personen het maximum. Voor events waarbij ook de buitenruimte in gebruik is, bespreken we de aantallen in overleg.'
    },
    {
      question: 'Is Villa 1855 exclusief voor ons gezelschap?',
      answer: 'Ja. Op jullie feestdag is Villa 1855 helemaal van jullie. We plannen nooit meerdere events tegelijk — de hele villa, de hele dag, voor jullie gezelschap.'
    },
    {
      question: 'Verzorgen jullie de catering en denken jullie mee over de invulling van het feest?',
      answer: 'Cookaholics verzorgt altijd de catering — dat is onderdeel van wat we doen. En ja, we denken van begin tot eind met je mee. Van het eerste gesprek over de sfeer die je wilt, via het menu en de styling, tot het draaiboek voor de avond zelf. Jij vertelt wat je voor je ziet. Wij vertalen dat naar een avond die klopt.'
    },
    {
      question: 'Kunnen we een eigen DJ, band of ander entertainment meenemen?',
      answer: 'Ja. We werken met een vast netwerk van leveranciers — handig als je zelf nog geen keuze hebt gemaakt. Heb je al iemand in gedachten, of wil je een vaste DJ van een eerder feest meenemen? Laat het weten, dan bespreken we de mogelijkheden.'
    },
    {
      question: 'Kunnen we de ruimte naar wens aankleden of decoreren?',
      answer: 'Ja, daarin is veel mogelijk. Thema\'s, bloemen, specifieke kleuren, een bepaalde sfeer — we bespreken de wensen vooraf en zorgen dat het op de dag zelf staat zoals afgesproken. Zo weet je precies wat je krijgt en hoef je op de dag zelf alleen maar binnen te lopen.'
    },
    {
      question: 'Wat gebeurt er bij slecht weer als we de tuin willen gebruiken?',
      answer: 'Een paar dagen voor het feest bellen we om de weersvoorspelling door te nemen. Zijn er aanpassingen nodig, dan bespreken we op dat moment wat de beste oplossing is. Je staat er niet alleen voor: wij komen met opties, jullie beslissen.'
    },
    {
      question: 'Waar kunnen onze gasten parkeren in Tilburg?',
      answer: 'Met de auto parkeren jullie gasten het beste bij Parkeergarage De Knegtel, op vijf minuten lopen van de villa. Direct voor de deur zijn 10 tot 12 parkeerplaatsen beschikbaar. Fietsen kunnen onbewaakt direct voor de deur gestald worden. Voor de uitnodigingen leveren we kant-en-klare parkeer- en route-informatie aan die jullie met de gasten kunnen delen.'
    },
    {
      question: 'Tot hoe laat mag het feest doorgaan?',
      answer: 'Het feest mag doorgaan tot 00:45 uur. Om 01:00 uur moet de villa leeg zijn.'
    }
  ]

  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="page-hero">
          <Image
            src="/images/tafel-elegant.jpg"
            alt="Feestelijk gedekte tafel Villa 1855"
            fill
            className="page-hero-image"
            priority
          />
          <div className="page-hero-bg" />
          <div className="page-hero-content">
            <div className="label" style={{ justifyContent: 'center' }}>Bijzondere Vieringen</div>
            <h1>Elk moment verdient een <em>bijzonder</em> decor</h1>
            <p>Verjaardagen, jubilea, familiefeesten of thema-avonden – vier jouw mijlpaal in een monumentale setting met persoonlijke aandacht.</p>
            <Link href="#contact" className="btn btn-primary">
              Neem contact op
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="scroll-indicator">
            <span>Scroll</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Intro with Stats */}
        <section className="intro">
          <div className="container">
            <div className="intro-content-centered">
              <h2>Vier het leven in een unieke setting</h2>
              <p>
                Sommige momenten verdienen meer dan een standaard feestzaal. Bij Villa 1855
                creëren we de perfecte ambiance voor jouw bijzondere viering. Of het nu gaat
                om een milestone verjaardag, een gouden jubileum of een creatieve thema-avond –
                wij zorgen ervoor dat jouw gasten een onvergetelijke ervaring beleven.
              </p>

              <div className="intro-stats">
                <div className="stat">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Feesten</div>
                </div>
                <div className="stat">
                  <div className="stat-number">20-150</div>
                  <div className="stat-label">Gasten</div>
                </div>
                <div className="stat">
                  <div className="stat-number">4</div>
                  <div className="stat-label">Unieke ruimtes</div>
                </div>
                <div className="stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Op maat</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature: Locatie */}
        <section className="feature-section alt">
          <div className="container">
            <div className="feature-content">
              <div className="feature-image">
                <Image
                  src="/images/feestzaal.jpg"
                  alt="De grote zaal van Villa 1855"
                  width={600}
                  height={450}
                />
              </div>
              <div className="feature-text">
                <div className="label">De Locatie</div>
                <h2>Een monumentaal decor voor jouw feest</h2>
                <p>
                  Villa 1855 biedt een unieke combinatie van historische grandeur en
                  moderne faciliteiten. Hoge plafonds met originele ornamenten, sfeervolle
                  verlichting en een verborgen binnentuin vormen het perfecte decor voor
                  jouw viering.
                </p>
                <ul className="feature-list">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Monumentaal pand uit 1855 met authentieke details
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Vier verschillende ruimtes voor elke groepsgrootte
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Besloten binnentuin voor recepties en foto&apos;s
                  </li>
                </ul>
                <Link href="/locatie" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Bekijk de locatie
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Event Types */}
        <section className="event-types">
          <div className="container">
            <div className="section-header">
              <h2>Welk feest vier jij?</h2>
              <p>Van intiem tot groots – wij maken er iets bijzonders van</p>
            </div>
            <div className="event-types-grid">
              {eventTypes.map((event, index) => (
                <div key={index} className="event-type-card">
                  <div className="event-type-icon">
                    {event.icon}
                  </div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <span className="event-capacity">{event.capacity}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature: Catering */}
        <section className="feature-section">
          <div className="container">
            <div className="feature-content reverse">
              <div className="feature-image">
                <Image
                  src="/images/tafel-setting.jpg"
                  alt="Culinair genieten bij Villa 1855"
                  width={600}
                  height={450}
                />
              </div>
              <div className="feature-text">
                <div className="label">Culinair</div>
                <h2>Onvergetelijk tafelen met Cookaholics</h2>
                <p>
                  De catering wordt verzorgd door Cookaholics – bekend om creatieve gerechten
                  met verse, lokale ingrediënten. Of je nu kiest voor een uitgebreid diner,
                  een gezellig buffet of hippe foodstations: wij stemmen het menu af op
                  jouw wensen en het karakter van je feest.
                </p>
                <ul className="feature-list">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Sit-down diner, walking dinner of buffet
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Seizoensgebonden menu&apos;s met lokale producten
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Speciale dieetwensen altijd mogelijk
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="gallery-preview">
          <div className="container">
            <div className="section-header">
              <h2>Sfeerimpressie</h2>
              <p>Een glimp van feesten bij Villa 1855</p>
            </div>
            <div className="gallery-grid">
              <div className="gallery-item large">
                <Image
                  src="/images/Styledshootnov2025-1351.jpg"
                  alt="Feest setting"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="gallery-item">
                <Image
                  src="/images/bar-sfeer.jpg"
                  alt="Bar sfeer"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="gallery-item">
                <Image
                  src="/images/tuin-fontein.jpg"
                  alt="Binnentuin"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="gallery-item">
                <Image
                  src="/images/Styledshootnov2025-1509.jpg"
                  alt="Detail"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="gallery-item">
                <Image
                  src="/images/ceremonie-stoelen.jpg"
                  alt="Opstelling"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq">
          <div className="container">
            <div className="faq-content">
              <div className="faq-header">
                <h2>Veelgestelde vragen</h2>
                <p>De antwoorden op de meest gestelde vragen over feesten bij Villa 1855.</p>
                <Link href="#contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Andere vraag? Neem contact op
                </Link>
              </div>
              <div className="faq-list">
                {faqItems.map((item, index) => (
                  <div key={index} className={`faq-item ${activeQuestion === index ? 'active' : ''}`}>
                    <button className="faq-question" onClick={() => toggleQuestion(index)}>
                      {item.question}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta" id="contact">
          <div className="container">
            <div className="cta-content">
              <h2>Laten we jouw feest plannen</h2>
              <p>Neem contact op voor een vrijblijvend gesprek of plan een bezichtiging om de sfeer zelf te ervaren.</p>
              <div className="cta-buttons">
                <a href="mailto:info@villa1855.nl" className="btn btn-secondary">
                  E-mail ons
                </a>
                <a href="tel:+31852736709" className="btn btn-outline">
                  Bel 085 273 6709
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
