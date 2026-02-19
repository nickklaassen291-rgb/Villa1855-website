'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'

// Video ID
const YOUTUBE_VIDEO_ID = 'ko5JAY5v7-E'

export default function TrouwenPageContent() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    telefoon: '',
    trouwdatum: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')

    // Hier kun je de data naar een API sturen (bijv. Mailchimp, HubSpot, of eigen backend)
    // Voor nu simuleren we een succesvolle submit
    try {
      // Simuleer API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('Form data:', formData)
      setFormStatus('success')

      // Reset form
      setFormData({ naam: '', email: '', telefoon: '', trouwdatum: '' })
    } catch (error) {
      setFormStatus('error')
    }
  }

  const faqItems = [
    {
      question: 'Hoeveel gasten kunnen er bij Villa 1855 terecht?',
      answer: 'Bij een diner kunnen maximaal 120 gasten plaatsnemen. Voor een borrel of receptie is er ruimte voor maximaal 150 gasten. Voor intieme ceremonies vanaf 30 personen zijn wij ook de perfecte locatie.'
    },
    {
      question: 'Kunnen we ook de ceremonie bij jullie houden?',
      answer: 'Ja, Villa 1855 is een officiële trouwlocatie. Jullie kunnen hier zowel het burgerlijk huwelijk als een vrije ceremonie houden. De binnentuin en de grote zaal zijn populaire ceremonieplekken.'
    },
    {
      question: 'Mogen we onze eigen leveranciers meenemen?',
      answer: 'De catering wordt exclusief verzorgd door Cookaholics. Voor andere leveranciers zoals fotograaf, DJ, bloemist en decoratie zijn jullie vrij om eigen keuzes te maken. We werken ook graag samen met onze vaste partners.'
    },
    {
      question: 'Tot hoe laat mag het feest duren?',
      answer: 'Het feest is standaard tot maximaal 01:00 uur. In overleg is verlenging tot 02:00 uur mogelijk. We vragen wel rekening te houden met onze buren in het centrum van Tilburg.'
    },
    {
      question: 'Is er parkeergelegenheid voor onze gasten?',
      answer: 'Er is betaald parkeren in de directe omgeving en diverse parkeergarages binnen 5 minuten lopen. Het centrum van Tilburg is ook uitstekend bereikbaar met OV – het station ligt op 10 minuten loopafstand.'
    },
    {
      question: 'Hoe lang is een offerte geldig?',
      answer: 'Een offerte van Villa 1855 is 14 dagen geldig. Binnen die periode kunnen jullie de datum vrijblijvend vasthouden. Na het verlopen van de optie komt de datum weer beschikbaar voor andere stellen.'
    },
    {
      question: 'Hoe werkt de aanbetaling?',
      answer: 'Na bevestiging van de boeking vragen wij een aanbetaling van 25% van het totaalbedrag. Het resterende bedrag wordt in overleg gefactureerd richting de trouwdatum.'
    },
    {
      question: 'Wanneer moeten we definitieve aantallen doorgeven?',
      answer: 'De definitieve aantallen dienen uiterlijk 2 weken voor de trouwdag doorgegeven te worden. Tot die tijd werken we met de geschatte aantallen uit de offerte.'
    },
    {
      question: 'Hoe werkt het inschakelen van externe partijen naast Cookaholics?',
      answer: 'De catering wordt exclusief verzorgd door Cookaholics. Voor overige leveranciers zoals DJ, fotograaf, bloemist en decoratie zijn jullie vrij om eigen partijen in te schakelen. Wij stemmen graag af om alles soepel te laten verlopen.'
    },
    {
      question: 'Welke soorten versiering zijn toegestaan in Villa 1855?',
      answer: 'Jullie mogen de villa naar eigen smaak aankleden. We vragen alleen om geen confetti, glitters of items die schade kunnen veroorzaken aan het monumentale interieur te gebruiken. Kaarsen zijn welkom in houders.'
    },
    {
      question: 'Waar kunnen mijn gasten parkeren?',
      answer: 'Er zijn meerdere parkeergarages en betaalde parkeerplaatsen op loopafstand van Villa 1855. Het centrum van Tilburg is ook goed bereikbaar met het openbaar vervoer – het station ligt op circa 10 minuten lopen.'
    },
    {
      question: 'Hebben jullie partners die jullie aanbevelen?',
      answer: 'Ja, wij werken samen met een netwerk van ervaren trouwleveranciers, van fotografen en DJ\'s tot bloemisten en stylisten. Tijdens een kennismaking delen we graag onze aanbevelingen.'
    },
    {
      question: 'Kunnen we een trouwverzekering afsluiten?',
      answer: 'Wij raden aan om een trouwverzekering af te sluiten bij een gespecialiseerde verzekeraar. Dit biedt dekking bij onvoorziene omstandigheden zoals ziekte of extreme weersomstandigheden.'
    },
    {
      question: 'Voor hoeveel mensen is er plek tijdens de ceremonie, het diner & de feestavond?',
      answer: 'Bij een ceremonie is er plaats voor maximaal 150 gasten. Voor een diner bieden wij ruimte aan maximaal 120 gasten. Tijdens de feestavond kunnen tot 150 gasten aanwezig zijn.'
    },
    {
      question: 'Wat valt er te regelen qua entertainment voor de kinderen?',
      answer: 'In overleg kunnen wij een aparte ruimte beschikbaar stellen voor de kinderen. Denk aan een kinderhoek met activiteiten. Ook kunnen wij een kindermenu verzorgen. Externe kinderanimatie is welkom.'
    },
    {
      question: 'Hoe worden de speeches/stukjes geregeld?',
      answer: 'Speeches en stukjes kunnen op elk gewenst moment in het programma worden ingepland. Wij beschikken over een microfoon en geluidsinstallatie. In het draaiboek stemmen we samen het ideale moment af.'
    },
    {
      question: 'Mogen we het eten van tevoren proeven?',
      answer: 'Ja, wij bieden een proefavond aan waarbij jullie het menu kunnen proeven en samen met de chef de laatste details bespreken. Dit wordt doorgaans enkele maanden voor de trouwdag ingepland.'
    },
    {
      question: 'Is een externe ceremonie ook mogelijk?',
      answer: 'Ja, het is mogelijk om de ceremonie op een externe locatie te houden en vervolgens naar Villa 1855 te komen voor de receptie, het diner en het feest. Wij passen het programma hierop aan.'
    }
  ]

  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="page-hero">
          <Image
            src="/images/bruidspaar-villa.jpg"
            alt="Bruidspaar voor Villa 1855 trouwlocatie Tilburg"
            fill
            className="page-hero-image"
            priority
          />
          <div className="page-hero-bg" />
          <div className="page-hero-content">
            <div className="label" style={{ justifyContent: 'center' }}>Trouwen bij Villa 1855</div>
            <h1>Jullie <em style={{ color: 'white' }}>droombruiloft</em> begint hier</h1>
            <p>Een monumentale stadsvilla, exclusief voor jullie. Waar historie en romantiek samenkomen voor de mooiste dag van jullie leven.</p>
            <Link href="#brochure" className="btn btn-primary">
              Download onze brochure
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
              <h2>Een onvergetelijke dag verdient een onvergetelijke locatie</h2>
              <p>Villa 1855 is meer dan een trouwlocatie. Het is een plek waar jullie verhaal een nieuw hoofdstuk begint. Een monumentale villa uit 1855 met aandacht voor sfeer, detail en jullie wensen.</p>

              <div className="intro-stats">
                <div className="stat">
                  <div className="stat-number">170+</div>
                  <div className="stat-label">Bruiloften</div>
                </div>
                <div className="stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Exclusiviteit</div>
                </div>
                <div className="stat">
                  <div className="stat-number">1855</div>
                  <div className="stat-label">Bouwjaar</div>
                </div>
                <div className="stat">
                  <div className="stat-number">4.9/5</div>
                  <div className="stat-label">Beoordeling</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="video-section">
          <div className="container">
            <div className="section-header">
              <h2>Beleef de sfeer</h2>
              <p>Bekijk hoe jullie droomdag eruit kan zien bij Villa 1855</p>
            </div>
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                title="Villa 1855 Bruiloften"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Feature: Exclusiviteit */}
        <section className="feature-section">
          <div className="container">
            <div className="feature-content">
              <div className="feature-image">
                <Image
                  src="/images/ceremonie-stoelen.jpg"
                  alt="Ceremonie opstelling in de serre"
                  width={600}
                  height={450}
                />
              </div>
              <div className="feature-text">
                <div className="label">Exclusiviteit</div>
                <h2>De hele villa, alleen voor jullie</h2>
                <p>Bij Villa 1855 vindt er per dag één evenement plaats, in dit geval één bruiloft. De villa en de tuin staan volledig tot jullie beschikking, zodat de dag zich naar jullie wensen verloopt.</p>
                <ul className="feature-list">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Volledige privacy voor jullie en je gasten
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Flexibele indeling naar eigen wens
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Ceremonie en feest op één locatie
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature: De Locatie */}
        <section className="feature-section alt">
          <div className="container">
            <div className="feature-content reverse">
              <div className="feature-image">
                <Image
                  src="/images/Styledshootnov2025-1311.jpg"
                  alt="Historische trouwzaal"
                  width={600}
                  height={450}
                />
              </div>
              <div className="feature-text">
                <div className="label">De Locatie</div>
                <h2>Historische charme, modern comfort</h2>
                <p>Villa 1855 ademt de charme van de 19e eeuw en is ingericht met het comfort van nu. De sfeervolle zalen, lichte serre en groene binnentuin bieden de perfecte setting voor elk moment van jullie dag.</p>
                <ul className="feature-list">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Monumentaal pand met authentieke details
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Prachtige binnentuin voor ceremonie of receptie
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Capaciteit tot 120 gasten (diner) of 150 (borrel)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature: Catering */}
        <section className="feature-section">
          <div className="container">
            <div className="feature-content">
              <div className="feature-image">
                <Image
                  src="/images/tafel-setting.jpg"
                  alt="Elegant gedekte tafel"
                  width={600}
                  height={450}
                />
              </div>
              <div className="feature-text">
                <div className="label">Culinair</div>
                <h2>Onvergetelijk tafelen met Cookaholics</h2>
                <p>De catering van Villa 1855 wordt verzorgd door Cookaholics. Samen kijken we naar hoe de culinaire invulling van de avond het beste aansluit bij jullie wensen, het gezelschap en het moment, met de kennis en ervaring die wij in huis hebben.</p>
                <ul className="feature-list">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Menu&apos;s op maat, met een focus op kwaliteit, duurzaamheid en creativiteit
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Een samenspel tussen locatie, sfeer en gastronomie
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Elk event wordt met aandacht en passie vormgegeven
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="timeline">
          <div className="container">
            <div className="timeline-header">
              <h2>Van eerste contact tot ja-woord</h2>
              <p>Zo begeleiden wij jullie naar de perfecte dag</p>
            </div>
            <div className="timeline-steps">
              <div className="timeline-step">
                <div className="step-number">1</div>
                <h3>Kennismaking</h3>
                <p>Vrijblijvende bezichtiging en kennismaking. We luisteren naar jullie wensen en dromen.</p>
              </div>
              <div className="timeline-step">
                <div className="step-number">2</div>
                <h3>Voorstel</h3>
                <p>Op maat gemaakt voorstel met indeling, menu en alle details die jullie dag bijzonder maken.</p>
              </div>
              <div className="timeline-step">
                <div className="step-number">3</div>
                <h3>Voorbereiding</h3>
                <p>Samen werken we alles uit: draaiboek, proefmenu, decoratie-afspraken en meer.</p>
              </div>
              <div className="timeline-step">
                <div className="step-number">4</div>
                <h3>De grote dag</h3>
                <p>Wij regelen alles. Jullie hoeven alleen maar te genieten van de mooiste dag.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="reviews">
          <div className="container">
            <div className="reviews-header">
              <h2>Wat stellen zeggen over hun dag</h2>
            </div>
            <div className="reviews-grid">
              <div className="review-card">
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="review-text">&ldquo;Wat een top team op een geweldige locatie. Mooi wijn arrangement en een heerlijk menu vol met verrassingen. Werd goed meegedacht met dieetwensen. Een avond om niet snel te vergeten!&rdquo;</p>
                <div className="review-author">
                  <div className="review-avatar">A</div>
                  <div className="review-info">
                    <h4>Angelique & Partner</h4>
                    <span>Getrouwd april 2025</span>
                  </div>
                </div>
              </div>

              <div className="review-card">
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="review-text">&ldquo;Op de dag zelf ging het personeel above and beyond. Het eten was GEWELDIG - dat doet nog niet voor de helft recht aan hoe lekker het was. Villa 1855 heeft aan onze dag het gouden randje toegevoegd.&rdquo;</p>
                <div className="review-author">
                  <div className="review-avatar">W</div>
                  <div className="review-info">
                    <h4>Wessel & Partner</h4>
                    <span>Getrouwd juli 2025</span>
                  </div>
                </div>
              </div>

              <div className="review-card">
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="review-text">&ldquo;Vanaf het eerste moment waren wij enthousiast. Het personeel ziet je, hoort je en is supergastvrij. Zowel de locatie als het team zorgden voor een topdag waaraan niets ontbrak. Zeker aanbevolen!&rdquo;</p>
                <div className="review-author">
                  <div className="review-avatar">N</div>
                  <div className="review-info">
                    <h4>Nikki & Partner</h4>
                    <span>Getrouwd augustus 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="gallery-preview">
          <div className="container">
            <div className="section-header">
              <h2>Sfeerimpressie</h2>
              <p>Een glimp van bruiloften bij Villa 1855</p>
            </div>
            <div className="gallery-grid">
              <div className="gallery-item large">
                <Image
                  src="/images/ceremonie-fontein.jpg"
                  alt="Huwelijksceremonie bij de fontein met gasten"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="gallery-item">
                <Image
                  src="/images/bruidspaar-toast.jpg"
                  alt="Bruidspaar toost met champagne"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="gallery-item">
                <Image
                  src="/images/bruidspaar-voordeur.jpg"
                  alt="Bruidspaar bij monumentale voordeur Villa 1855"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="gallery-item">
                <Image
                  src="/images/Styledshootnov2025-1407.jpg"
                  alt="Bloemen"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="gallery-item">
                <Image
                  src="/images/Styledshootnov2025-1509.jpg"
                  alt="Feestzaal"
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
                <p>De antwoorden op de meest gestelde vragen over trouwen bij Villa 1855.</p>
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

        {/* Brochure Download Form */}
        <section className="brochure-section" id="brochure">
          <div className="container">
            <div className="brochure-content">
              <div className="brochure-text">
                <div className="label">Gratis Brochure</div>
                <h2>Ontvang onze trouwbrochure</h2>
                <p>
                  Ontdek alle mogelijkheden voor jullie droombruiloft bij Villa 1855.
                  In onze uitgebreide brochure vind je inspiratie, informatie over
                  de locatie en praktische details.
                </p>
                <ul className="brochure-list">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Foto&apos;s van onze prachtige ruimtes
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Informatie over arrangementen
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Voorbeeldmenu&apos;s van onze chef
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Praktische informatie & tips
                  </li>
                </ul>
              </div>

              <div className="brochure-form-wrapper">
                {formStatus === 'success' ? (
                  <div className="form-success">
                    <div className="success-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3>Bedankt!</h3>
                    <p>De brochure is naar jullie e-mailadres verzonden. We nemen binnenkort contact op om jullie wensen te bespreken.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="brochure-form">
                    <h3>Download de brochure</h3>
                    <div className="form-group">
                      <label htmlFor="naam">Naam *</label>
                      <input
                        type="text"
                        id="naam"
                        name="naam"
                        value={formData.naam}
                        onChange={handleInputChange}
                        required
                        placeholder="Jullie namen"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">E-mailadres *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="jullie@email.nl"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="telefoon">Telefoonnummer *</label>
                      <input
                        type="tel"
                        id="telefoon"
                        name="telefoon"
                        value={formData.telefoon}
                        onChange={handleInputChange}
                        required
                        placeholder="06 - 12345678"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="trouwdatum">Gewenste trouwdatum</label>
                      <input
                        type="date"
                        id="trouwdatum"
                        name="trouwdatum"
                        value={formData.trouwdatum}
                        onChange={handleInputChange}
                        placeholder="Selecteer een datum"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-full"
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting' ? (
                        'Verzenden...'
                      ) : (
                        <>
                          Download brochure
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="form-privacy">
                      Door dit formulier in te vullen ga je akkoord met ons privacybeleid.
                      We gebruiken je gegevens alleen om contact met je op te nemen.
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
              <h2>Liever direct contact?</h2>
              <p>Neem gerust contact met ons op voor een vrijblijvend gesprek of om een bezichtiging te plannen.</p>
              <div className="cta-buttons">
                <Link href="/beschikbaarheid" className="btn btn-secondary">
                  Check beschikbaarheid
                </Link>
                <a href="mailto:info@villa1855.nl" className="btn btn-outline">
                  E-mail ons
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
