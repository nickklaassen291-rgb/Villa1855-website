'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import ZakelijkCalculator from './ZakelijkCalculator'

// Video ID
const YOUTUBE_VIDEO_ID = 'ko5JAY5v7-E'

export default function ZakelijkPageContent() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index)
  }

  const faqItems = [
    {
      question: 'Wat is de capaciteit voor zakelijke events bij Villa 1855?',
      answer: 'Voor een borrel of walking dinner waarbij we beide zalen gebruiken, is er plek voor maximaal 150 personen. Voor een zittend diner is het maximum 80 personen. Voor events in de buitenruimte bespreken we de aantallen in overleg — dat hangt af van de opstelling en het programma.'
    },
    {
      question: 'Kunnen we Villa 1855 exclusief afhuren voor ons event?',
      answer: 'Ja. Op jullie eventdag is Villa 1855 helemaal van jullie. We plannen nooit meerdere events tegelijk — de hele villa, de hele dag, één gezelschap. Geen andere groepen in de zaal ernaast, geen overlap in de tuin.'
    },
    {
      question: 'Is Villa 1855 geschikt voor zowel formele als informele bijeenkomsten?',
      answer: 'Ja. Van directiediners en klantenevents tot informele borrels en personeelsfeesten — de villa past zich aan aan jullie event. De styling, de setting en het tempo stemmen we samen af op de sfeer die jullie voor ogen hebben.'
    },
    {
      question: 'Kunnen jullie ons volledig ontzorgen in de organisatie en catering?',
      answer: 'Ja. Cookaholics verzorgt de catering — dat staat vast en is onderdeel van het concept. Voor de rest van het event werken we met een vast netwerk van leveranciers dat we goed kennen. Eén team, één aanspreekpunt, één aansturing. Van eerste planning en draaiboek tot de service op de dag zelf. Hebben jullie specifieke wensen of vaste partners vanuit jullie organisatie? Laat het weten — we bespreken in overleg wat past.'
    },
    {
      question: 'Kunnen we onze eigen leveranciers meenemen?',
      answer: 'De catering verzorgen we altijd zelf — daar is geen uitzondering op. Voor andere onderdelen van het event, zoals AV, entertainment of fotografie, kunnen jullie een eigen leverancier meebrengen. We stemmen vooraf af hoe we samenwerken met jullie leverancier, zodat de dag soepel verloopt en iedereen weet wat er van hen verwacht wordt.'
    },
    {
      question: 'Welke AV-faciliteiten zijn beschikbaar voor presentaties en meetings?',
      answer: 'Villa 1855 beschikt over professionele geluidsapparatuur. Aanvullende AV-middelen — zoals beamers, schermen of specifieke presentatie-apparatuur — huren we in via onze vaste partners en berekenen we door aan de opdrachtgever. Vertel ons vooraf wat jullie nodig hebben voor het programma, dan regelen wij de rest.'
    },
    {
      question: 'Zijn er parkeervoorzieningen in de buurt voor onze gasten?',
      answer: 'Met de auto parkeren jullie gasten het beste in Parkeergarage De Knegtel (Gasthuisring 60, 5041 DT Tilburg), op vijf minuten lopen van Villa 1855. Direct voor de deur zijn 10 tot 12 parkeerplaatsen beschikbaar. Fietsen kunnen onbewaakt voor de deur gestald worden. Vanaf Station Tilburg is het ongeveer vijf minuten lopen naar de villa. We leveren vooraf kant-en-klare parkeer- en route-informatie aan die jullie met de gasten kunnen delen.'
    }
  ]

  const reviews = [
    {
      text: '"De locatie maakte direct indruk op onze internationale klanten. Professionele begeleiding, uitstekende catering en een sfeer die perfect bij ons merk past."',
      author: 'Jan Vermeer',
      role: 'Marketing Director, TechCorp',
      initials: 'JV'
    },
    {
      text: '"Onze strategiedag was een groot succes. De ruimtes zijn perfect voor afwisseling tussen plenaire sessies en break-outs. Aanrader voor elk bedrijf."',
      author: 'Marieke Koster',
      role: 'HR Manager, De Groep',
      initials: 'MK'
    },
    {
      text: '"Ons eindejaarsfeest bij Villa 1855 was memorabel. De combinatie van historie en moderne service overtrof alle verwachtingen. Team was enthousiast!"',
      author: 'Pieter Bakker',
      role: 'Directeur, Bakker & Co',
      initials: 'PB'
    }
  ]

  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="page-hero">
          <Image
            src="/images/feestzaal.jpg"
            alt="Zakelijk event Villa 1855"
            fill
            className="page-hero-image"
            priority
          />
          <div className="page-hero-bg" />
          <div className="page-hero-content">
            <div className="label" style={{ justifyContent: 'center' }}>Zakelijke Events</div>
            <h1>Maak indruk met <em>beleving</em></h1>
            <p>Organiseer je zakelijke event in een monumentale setting. Van netwerkborrels tot bedrijfsfeesten – Villa 1855 biedt ruimtes en een sfeer die uitnodigen tot ontmoeten, gesprek en aandacht.</p>
            <Link href="#configurator" className="btn btn-primary">
              Stel je event samen
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

        {/* Video Section */}
        <section className="video-section-dark">
          <div className="video-wrapper-large">
            <div className="video-header-dark">
              <h2>Bekijk Villa 1855 in actie</h2>
              <p>Een impressie van onze monumentale locatie en de mogelijkheden voor je zakelijke event.</p>
            </div>
            <div className="video-container-large">
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                title="Villa 1855 Zakelijke Events"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Intro with Stats */}
        <section className="intro">
          <div className="container">
            <div className="intro-content-centered">
              <h2>Een locatie die voor je werkt</h2>
              <p>Villa 1855 is gemaakt voor zakelijke events die persoonlijk mogen voelen. Je schakelt makkelijk tussen ontvangst, presentatie, borrel en diner, allemaal op één locatie. Met begeleiding op de achtergrond loopt het programma zoals jij in gedachten hebt.</p>

              <div className="intro-stats">
                <div className="stat">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Zakelijke Events</div>
                </div>
                <div className="stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Exclusiviteit</div>
                </div>
                <div className="stat">
                  <div className="stat-number">150</div>
                  <div className="stat-label">Max. Gasten</div>
                </div>
                <div className="stat">
                  <div className="stat-number">4.9</div>
                  <div className="stat-label">Beoordeling</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature: Professionele Faciliteiten */}
        <section className="feature-section">
          <div className="container">
            <div className="feature-content">
              <div className="feature-image">
                <Image
                  src="/images/event-gasten.jpg"
                  alt="Zakelijk event met gasten"
                  width={600}
                  height={450}
                />
              </div>
              <div className="feature-text">
                <div className="label">Faciliteiten</div>
                <h2>Professioneel tot in detail</h2>
                <p>Onze monumentale zalen zijn uitgerust met moderne AV-apparatuur en bieden de flexibiliteit die je event vraagt. Van intieme vergaderingen tot grote presentaties – wij faciliteren jouw succes.</p>
                <ul className="feature-list">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Beamer, groot scherm en geluidsinstallatie
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Flexibele opstellingen (theater, U-vorm, boardroom)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature: Catering */}
        <section className="feature-section alt">
          <div className="container">
            <div className="feature-content reverse">
              <div className="feature-image">
                <Image
                  src="/images/bar-sfeer.jpg"
                  alt="Bar en catering"
                  width={600}
                  height={450}
                />
              </div>
              <div className="feature-text">
                <div className="label">Catering</div>
                <h2>Culinair op niveau</h2>
                <p>De catering wordt verzorgd door Cookaholics – gespecialiseerd in zakelijke evenementen. Van working lunch tot uitgebreid diner: elk gerecht maakt indruk.</p>
                <ul className="feature-list">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Koffiemomenten en working lunches
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Walking dinner of sit-down diner
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Uitgebreide borrelplateaus
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Arrangement Calculator */}
        <ZakelijkCalculator />

        {/* Reviews */}
        <section className="reviews">
          <div className="container">
            <div className="reviews-header">
              <h2>Wat bedrijven zeggen</h2>
            </div>
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>
                  <p className="review-text">{review.text}</p>
                  <div className="review-author">
                    <div className="review-avatar">{review.initials}</div>
                    <div className="review-info">
                      <h4>{review.author}</h4>
                      <span>{review.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq">
          <div className="container">
            <div className="faq-content">
              <div className="faq-header">
                <h2>Veelgestelde vragen</h2>
                <p>Antwoorden op de meest gestelde vragen over zakelijke events bij Villa 1855.</p>
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
              <h2>Klaar om indruk te maken?</h2>
              <p>Neem contact op voor een vrijblijvende bezichtiging en ontdek de mogelijkheden voor je zakelijke event.</p>
              <div className="cta-buttons">
                <Link href="/beschikbaarheid" className="btn btn-secondary">
                  Check beschikbaarheid
                </Link>
                <a href="mailto:info@villa1855.nl" className="btn btn-outline">
                  Offerte aanvragen
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
