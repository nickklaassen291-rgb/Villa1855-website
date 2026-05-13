'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import ZakelijkCalculator from './ZakelijkCalculator'
import AutoplayYouTube from '@/components/AutoplayYouTube'
import { faqItems, useCases } from './data'

// Video ID
const YOUTUBE_VIDEO_ID = 'ko5JAY5v7-E'

export default function ZakelijkPageContent() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [brochureData, setBrochureData] = useState({ naam: '', telefoon: '' })
  const [brochureStatus, setBrochureStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index)
  }

  const handleBrochureInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBrochureData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBrochureSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBrochureStatus('submitting')
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      console.log('Zakelijke brochure-aanvraag:', brochureData)
      setBrochureStatus('success')
      setBrochureData({ naam: '', telefoon: '' })
    } catch {
      setBrochureStatus('error')
    }
  }

  const reviews = [
    {
      text: '"Wij hebben genoten van een heerlijk kerstdiner bij Villa 1855. De aanloop naar het event wordt professioneel en vriendelijk begeleid. Op de avond zelf een vast contactpersoon voor eventuele vragen en een fantastisch team die het horeca vak verstaan. Heerlijke gerechtjes gegeten, gezellige ambiance en top bediening. Absoluut een aanrader!"',
      author: 'Marloes Verbeek',
      role: 'Google review · 11 maanden geleden',
      initials: 'MV'
    },
    {
      text: '"Wat een top locatie, alles tot in de puntjes geregeld. Bediening is de juiste style, de gangen van Cookaholics waren subliem en de sfeer overtrof mijn verwachting. Mocht je een locatie zoeken met het beste eten voor je gasten — die heb je dus nu gevonden."',
      author: 'Tibor Vermeer',
      role: 'Google review · 9 maanden geleden',
      initials: 'TV'
    },
    {
      text: '"Genoten van de prachtige locatie in het centrum van Tilburg. Welkomstdrankje in de mooie, ruime stadstuin, daarna heerlijk gegeten met bijpassende dranken. De gerechten zagen er uitnodigend en uniek uit, de bediening was beleefd en toegankelijk. Een zeer geslaagde avond — zeker een aanrader."',
      author: 'Remo Hendriks',
      role: 'Google review · 6 maanden geleden',
      initials: 'RH'
    },
    {
      text: '"Ben je te gast op een event, privé of zakelijk, waar Cookaholics de catering verzorgt? Dan weet je zeker dat het tot in de puntjes verzorgd is!"',
      author: 'Marieke van Os',
      role: 'Google review',
      initials: 'MO'
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
            alt="Zakelijke evenementenlocatie Villa 1855 Tilburg — feestzaal met monumentale haard"
            fill
            className="page-hero-image"
            priority
          />
          <div className="page-hero-bg" />
          <div className="page-hero-content">
            <div className="label" style={{ justifyContent: 'center' }}>Zakelijke evenementenlocatie · Tilburg</div>
            <h1>Zakelijke evenementen met <em>beleving</em> in Tilburg</h1>
            <p>Vergaderlocatie, netwerkborrel of bedrijfsfeest in Tilburg? Villa 1855 is een monumentale stadsvilla in het centrum, exclusief voor jouw event. Eén locatie waar ontvangst, presentatie, borrel en diner soepel in elkaar overlopen — met catering van Cookaholics en begeleiding op de achtergrond.</p>
            <Link href="#configurator" className="btn btn-primary">
              Bekijk de pakketten
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
              <AutoplayYouTube videoId={YOUTUBE_VIDEO_ID} title="Villa 1855 Zakelijke Events" />
            </div>
          </div>
        </section>

        {/* Intro with Stats */}
        <section className="intro">
          <div className="container">
            <div className="intro-content-centered">
              <h2>Een locatie die voor je werkt</h2>
              <p>Villa 1855 is een evenementenlocatie en vergaderlocatie in hartje Tilburg, gemaakt voor zakelijke events die persoonlijk mogen voelen. Je schakelt makkelijk tussen ontvangst, presentatie, borrel en diner — allemaal op één locatie, exclusief voor jullie groep. Met begeleiding op de achtergrond loopt het programma zoals jij in gedachten hebt.</p>

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
                  alt="Zakelijk event in de feestzaal van Villa 1855 Tilburg met gasten in gesprek"
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
                  alt="Catering en bar tijdens een bedrijfsborrel bij Villa 1855 Tilburg"
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

        {/* Use cases — SEO content */}
        <section className="intro" aria-labelledby="use-cases-heading">
          <div className="container">
            <div className="intro-content-centered">
              <div className="label" style={{ justifyContent: 'center' }}>Toepassingen</div>
              <h2 id="use-cases-heading">Voor welk type bedrijfsevent is Villa 1855 geschikt?</h2>
              <p>Villa 1855 wordt door Tilburgse en regionale bedrijven gekozen voor uiteenlopende zakelijke events. Swipe door een paar voorbeelden van wat we organiseren:</p>
            </div>
          </div>
          <div
            className="use-case-strip"
            role="region"
            aria-label="Type bedrijfsevents"
          >
            {useCases.map((uc) => (
              <article key={uc.title} className="use-case-card">
                <h3>{uc.title}</h3>
                <p>{uc.body}</p>
              </article>
            ))}
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

        {/* Zakelijke brochure */}
        <section className="brochure-section" id="brochure">
          <div className="container">
            <div className="brochure-content">
              <div className="brochure-text">
                <div className="label">Gratis brochure</div>
                <h2>Ontvang onze zakelijke brochure</h2>
                <p>
                  Bekijk de mogelijkheden van Villa 1855 voor je bedrijfsevent — van netwerkborrel tot relatiediner, vergadering of bedrijfsfeest in een monumentale stadsvilla in Tilburg.
                </p>
                <ul className="brochure-list">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Indrukwekkende foto&apos;s van alle ruimtes
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Inhoud en prijzen van de zakelijke arrangementen
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Capaciteiten, AV-faciliteiten en praktische info
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Voorbeeld-programma&apos;s en menukeuzes
                  </li>
                </ul>
              </div>

              <div className="brochure-form-wrapper">
                {brochureStatus === 'success' ? (
                  <div className="form-success">
                    <div className="success-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3>Bedankt!</h3>
                    <p>We bellen je binnen 1 werkdag terug met de brochure en bespreken graag je vraag.</p>
                  </div>
                ) : (
                  <form onSubmit={handleBrochureSubmit} className="brochure-form">
                    <h3>Vraag de brochure aan</h3>
                    <div className="form-group">
                      <label htmlFor="zakelijk-naam">Naam *</label>
                      <input
                        type="text"
                        id="zakelijk-naam"
                        name="naam"
                        value={brochureData.naam}
                        onChange={handleBrochureInput}
                        required
                        placeholder="Je naam"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zakelijk-telefoon">Telefoonnummer *</label>
                      <input
                        type="tel"
                        id="zakelijk-telefoon"
                        name="telefoon"
                        value={brochureData.telefoon}
                        onChange={handleBrochureInput}
                        required
                        placeholder="06 - 12345678"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-full"
                      disabled={brochureStatus === 'submitting'}
                    >
                      {brochureStatus === 'submitting' ? (
                        'Verzenden...'
                      ) : (
                        <>
                          Vraag brochure aan
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </>
                      )}
                    </button>
                    {brochureStatus === 'error' && (
                      <p className="form-privacy" style={{ color: '#b91c1c' }}>
                        Er ging iets mis. Probeer het opnieuw of bel ons direct.
                      </p>
                    )}
                    <p className="form-privacy">
                      We bellen je binnen 1 werkdag terug. Je gegevens gebruiken we alleen voor dit contact.
                    </p>
                  </form>
                )}
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
