'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'

// Video ID
const YOUTUBE_VIDEO_ID = 'FYhpMGblwMo'

// Arrangement data - Prijzen 2026 (excl. BTW)
const arrangements = {
  1: {
    name: 'Netwerkborrel',
    description: 'Een informele setting om relaties te versterken. Ideaal voor netwerkevents, productlanceringen of seizoensborrels. De monumentale sfeer van Villa 1855 zorgt voor gespreksstof en een onvergetelijke indruk.',
    included: [
      'Macaron bij ontvangst',
      'Tafelgarnituur',
      '2 luxe hapjes per persoon',
      '2 bites per persoon',
      'Bier, fris, wijn en warme dranken',
      'Meubilair',
      'Locatiehuur',
      'Schoonmaak'
    ],
    program: [
      { time: '16:00', activity: 'Ontvangst gasten | borrel' },
      { time: '19:00', activity: 'Einde bijeenkomst' }
    ],
    pricing: [
      { name: 'Basis', description: 'All-inclusive netwerkborrel pakket', price: 52.50 }
    ]
  },
  2: {
    name: 'Zakelijke bijeenkomst',
    description: 'Een productieve dag in een inspirerende omgeving. Perfect voor strategiesessies, trainingen, presentaties of workshops. De verschillende ruimtes bieden mogelijkheden voor plenaire sessies en break-outs.',
    included: [
      'Macaron bij ontvangst',
      'Tafelgarnituur',
      '2 luxe hapjes per persoon',
      'Bier, fris, wijn en warme dranken',
      'Meubilair',
      'Beeldscherm 55 inch',
      'Locatiehuur',
      'Schoonmaak'
    ],
    program: [
      { time: '14:00', activity: 'Ontvangst gasten' },
      { time: '14:30', activity: 'Start plenaire sessie' },
      { time: '15:30', activity: 'Einde plenaire sessie | borrel' },
      { time: '18:30', activity: 'Einde bijeenkomst' }
    ],
    pricing: [
      { name: 'Basis', description: 'All-inclusive bijeenkomst pakket', price: 65 }
    ]
  },
  3: {
    name: 'Zakelijk diner',
    description: 'Versterk je zakelijke relaties met een onvergetelijk diner. Combineer netwerken met excellent eten in een unieke setting. Maak van je klanten en relaties ambassadeurs.',
    included: [
      'Tafelgarnituur',
      '3-gangen diner',
      'Bier, fris, wijn en warme dranken',
      'Meubilair',
      'Linnen',
      'Locatiehuur',
      'Schoonmaak'
    ],
    program: [
      { time: '17:30', activity: 'Ontvangst gasten' },
      { time: '18:00', activity: 'Borrel' },
      { time: '19:00', activity: 'Start diner' },
      { time: '22:00', activity: 'Einde diner | naborrel' },
      { time: '23:00', activity: 'Einde bijeenkomst' }
    ],
    pricing: [
      { name: 'Basis', description: 'All-inclusive diner pakket', price: 92.50 }
    ],
    extras: [
      { name: 'Extra borrel vooraf', description: 'Bier, fris, wijn, warme dranken + 2 luxe hapjes p.p.', price: 15 },
      { name: 'Extra borrel achteraf', description: 'Bier, fris, wijn, warme dranken + 2 bites p.p.', price: 15 }
    ]
  }
}

type ArrangementKey = keyof typeof arrangements

export default function ZakelijkPage() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [currentArrangement, setCurrentArrangement] = useState<ArrangementKey>(1)
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0)
  const [guestCount, setGuestCount] = useState('')
  const [eventDate, setEventDate] = useState('')

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index)
  }

  const handleArrangementChange = (arrangement: ArrangementKey) => {
    setCurrentArrangement(arrangement)
    setSelectedPriceIndex(0)
  }

  const calculateTotal = () => {
    const count = parseInt(guestCount) || 0
    if (count > 0) {
      const price = arrangements[currentArrangement].pricing[selectedPriceIndex].price
      return `€${(price * count).toLocaleString('nl-NL')} (${count} × €${price})`
    }
    return 'Vul aantal personen in'
  }

  const eventTypes = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Netwerkborrel',
      description: 'Informeel netwerken in een inspirerende omgeving',
      price: '€52,50 p.p.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Zakelijke bijeenkomst',
      description: 'Presentaties, trainingen en workshops',
      price: '€65 p.p.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Zakelijk diner',
      description: 'Versterk relaties met een culinaire ervaring',
      price: '€92,50 p.p.'
    }
  ]

  const faqItems = [
    {
      question: 'Wat is de capaciteit voor zakelijke events?',
      answer: 'Villa 1855 biedt ruimte voor maximaal 120 gasten bij een dinersetting en 150 gasten bij een staande receptie of borrel. Voor vergaderingen en presentaties zijn opstellingen mogelijk tot 80 personen theateropstelling.'
    },
    {
      question: 'Welke AV-faciliteiten zijn beschikbaar?',
      answer: 'Wij beschikken over een beamer met groot scherm, professionele geluidsinstallatie, draadloze microfoons, en snel WiFi. Technische ondersteuning is op aanvraag beschikbaar.'
    },
    {
      question: 'Zijn er parkeervoorzieningen?',
      answer: 'Er is betaald parkeren in de directe omgeving en meerdere parkeergarages binnen 5 minuten lopen. Op aanvraag kunnen wij parkeerkaarten verzorgen voor je gasten.'
    },
    {
      question: 'Kunnen we eigen leveranciers meenemen?',
      answer: 'De catering wordt exclusief verzorgd door Cookaholics. Voor entertainment, decoratie en techniek ben je vrij om eigen leveranciers in te schakelen, of te kiezen uit onze vaste partners.'
    },
    {
      question: 'Wat zijn de annuleringsvoorwaarden?',
      answer: 'Tot 60 dagen voor het event kun je kosteloos annuleren. Tussen 30-60 dagen geldt 50% van de locatiekosten, binnen 30 dagen wordt het volledige bedrag in rekening gebracht.'
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
            <h1>Maak indruk met <em>karakter</em></h1>
            <p>Organiseer je zakelijke event in een monumentale setting. Van netwerkborrels tot bedrijfsfeesten – Villa 1855 biedt de perfecte backdrop voor succes.</p>
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
              <p>Villa 1855 combineert historische grandeur met professionele faciliteiten. Of het nu gaat om een belangrijke presentatie, een relatiedag of een bedrijfsfeest – onze monumentale villa biedt de setting die je event verdient. Met exclusieve beschikbaarheid en persoonlijke begeleiding staat jouw boodschap centraal.</p>

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

        {/* Event Types */}
        <section className="event-types">
          <div className="container">
            <div className="section-header">
              <h2>Welk event organiseer je?</h2>
              <p>Villa 1855 is geschikt voor diverse zakelijke gelegenheden</p>
            </div>
            <div className="event-types-grid">
              {eventTypes.map((type, index) => (
                <div key={index} className="event-type-card">
                  <div className="event-type-icon">
                    {type.icon}
                  </div>
                  <h3>{type.title}</h3>
                  <p>{type.description}</p>
                  <div className="event-price">{type.price}</div>
                </div>
              ))}
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
                    Flexibele opstellingen (theater, U-vorm, cabaret)
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Snel WiFi en technische ondersteuning
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
                    Luxe koffiemomenten en working lunches
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

        {/* Arrangement Configurator */}
        <section className="configurator" id="configurator">
          <div className="container">
            <div className="configurator-header">
              <h2>Stel je arrangement samen</h2>
              <p>Kies een eventtype, bepaal je datum en aantal gasten, en ontdek direct de mogelijkheden en richtprijzen.</p>
            </div>

            <div className="configurator-box">
              {/* Controls */}
              <div className="configurator-controls">
                <div className="controls-grid">
                  <div className="control-group">
                    <label>Kies je eventtype</label>
                    <div className="arrangement-tabs">
                      {([1, 2, 3] as ArrangementKey[]).map((num) => (
                        <button
                          key={num}
                          className={`arrangement-tab ${currentArrangement === num ? 'active' : ''}`}
                          onClick={() => handleArrangementChange(num)}
                        >
                          <span className="tab-name">{arrangements[num].name}</span>
                          <span className="tab-type">
                            €{arrangements[num].pricing[0].price.toFixed(2).replace('.', ',')} p.p.
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="control-group">
                    <label>Datum event</label>
                    <input
                      type="date"
                      className="control-input"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>
                  <div className="control-group">
                    <label>Aantal personen</label>
                    <input
                      type="number"
                      className="control-input"
                      placeholder="Bijv. 50"
                      min="20"
                      max="150"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="configurator-content">
                {/* Arrangement Details */}
                <div className="arrangement-details">
                  <h3>{arrangements[currentArrangement].name}</h3>
                  <p className="arrangement-description">{arrangements[currentArrangement].description}</p>

                  <div className="included-list">
                    <h4>Inbegrepen</h4>
                    <ul>
                      {arrangements[currentArrangement].included.map((item, index) => (
                        <li key={index}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sample-program">
                    <h4>Voorbeeldprogramma</h4>
                    <ul className="program-timeline">
                      {arrangements[currentArrangement].program.map((item, index) => (
                        <li key={index}>
                          <span className="program-time">{item.time}</span>
                          <span className="program-activity">{item.activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing Options */}
                <div className="pricing-options">
                  <h3>Je investering</h3>
                  <p className="pricing-subtitle">Prijzen 2026, exclusief BTW</p>

                  <div className="pricing-cards">
                    {arrangements[currentArrangement].pricing.map((pricing, index) => (
                      <button
                        key={index}
                        className={`pricing-card ${selectedPriceIndex === index ? 'selected' : ''}`}
                        onClick={() => setSelectedPriceIndex(index)}
                      >
                        <div className="pricing-card-info">
                          <h4>{pricing.name}</h4>
                          <p>{pricing.description}</p>
                        </div>
                        <div className="pricing-card-price">
                          <span className="price">€{pricing.price.toFixed(2).replace('.', ',')}</span>
                          <span className="unit">p.p.</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Extra opties voor Zakelijk diner */}
                  {currentArrangement === 3 && arrangements[3].extras && (
                    <div className="extras-section">
                      <h4>Optionele uitbreidingen</h4>
                      <div className="extras-list">
                        {arrangements[3].extras.map((extra, index) => (
                          <div key={index} className="extra-item">
                            <div className="extra-info">
                              <span className="extra-name">{extra.name}</span>
                              <span className="extra-desc">{extra.description}</span>
                            </div>
                            <span className="extra-price">+€{extra.price} p.p.</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="configurator-cta">
                <div className="price-estimate">
                  Geschatte investering
                  <strong>{calculateTotal()}</strong>
                </div>
                <Link href="#contact" className="btn btn-primary">
                  Vrijblijvende offerte aanvragen
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

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
