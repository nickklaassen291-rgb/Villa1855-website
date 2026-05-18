'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Armchair, Presentation, Heart, Sparkles } from 'lucide-react'

type Capacity = {
  number: number
  label: string
  description: string
  icon: 'users' | 'armchair' | 'presentation' | 'heart'
}

type Space = {
  name: string
  description: string
  image: string
  capacities: Capacity[]
  features: string[]
}

const spaces: Space[] = [
  {
    name: 'Orangerie',
    description: 'Onze monumentale hoofdzaal met hoge plafonds, ruime proporties en een sfeervolle uitstraling. De perfecte setting voor een stijlvol diner, ceremonie of receptie.',
    image: '/images/feestzaal.jpg',
    capacities: [
      { number: 80, label: 'ZITPLAATSEN', description: 'Ideaal voor diner en ceremonie.', icon: 'armchair' },
      { number: 100, label: 'STAANPLAATSEN', description: 'Geschikt voor recepties en borrels.', icon: 'users' },
    ],
    features: ['Diner', 'Ceremonie', 'Receptie'],
  },
  {
    name: 'Coure',
    description: 'De Coure is een karaktervolle ruimte voor presentaties, recepties en sfeervolle bijeenkomsten. Door de open opzet en stijlvolle uitstraling is deze ruimte perfect voor events waarbij ontmoeting, beleving en uitstraling samenkomen.',
    image: '/images/coure.jpg',
    capacities: [
      { number: 120, label: 'STAAND', description: 'Ideaal voor recepties, borrels en netwerkevents.', icon: 'users' },
      { number: 60, label: 'THEATER OPSTELLING', description: 'Geschikt voor presentaties, lezingen en bijeenkomsten.', icon: 'presentation' },
    ],
    features: ['Presentaties', 'Recepties & borrels', 'Theateropstelling 60 gasten'],
  },
  {
    name: 'De Binnentuin',
    description: 'Een verborgen groene oase in het hart van de villa. Met zijn sfeervolle uitstraling de ultieme plek voor buitenceremonies, zomerse recepties en sfeervolle diners onder de open hemel.',
    image: '/images/tuin-fontein.jpg',
    capacities: [
      { number: 250, label: 'STAANPLAATSEN', description: 'Voor zomerse borrels en recepties.', icon: 'users' },
      { number: 100, label: 'CEREMONIE', description: 'Voor een buitenceremonie in groene setting.', icon: 'heart' },
      { number: 80, label: 'ZITTEND', description: 'Voor diners onder de open hemel.', icon: 'armchair' },
    ],
    features: ['Ceremonie', 'Buiten', 'Receptie'],
  },
  {
    name: 'Coure + Orangerie',
    description: 'De Coure en Orangerie gecombineerd vormen één grootse evenementenruimte. De moderne uitstraling van de Orangerie ontmoet de monumentale grandeur van de Coure — perfect voor uitgebreide bedrijfsevents, feesten en netwerkmomenten.',
    image: '/images/feestzaal.jpg',
    capacities: [
      { number: 220, label: 'STAAND', description: 'Voor grootse feesten en netwerkevents.', icon: 'users' },
      { number: 140, label: 'ZITTEND', description: 'Voor diners en meetings op formaat.', icon: 'armchair' },
    ],
    features: ['Feest', 'Netwerkevent', 'Meeting'],
  },
]

const capacityIcons = {
  users: Users,
  armchair: Armchair,
  presentation: Presentation,
  heart: Heart,
}

export default function LocatiePageContent() {
  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="page-hero">
          <Image
            src="/images/villa-voorkant.jpg"
            alt="Villa 1855 exterieur"
            fill
            className="page-hero-image"
            priority
          />
          <div className="page-hero-bg" />
          <div className="page-hero-content">
            <div className="label" style={{ justifyContent: 'center' }}>De Locatie</div>
            <h1>Waar historie tot <em style={{ color: 'white' }}>leven</em> komt</h1>
            <p>Stap binnen in Villa 1855, een plek met historie, rust en ruimte voor jouw bijzondere dag.</p>
            <Link href="#ruimtes" className="btn btn-primary">
              Ontdek de ruimtes
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
              <h2>Een monumentale stadsvilla in het hart van Tilburg</h2>
              <p>
                Villa 1855 is meer dan een locatie – het is een onvergetelijk moment. Achter de statige gevel aan de
                Noordstraat bevinden zich hoge plafonds met originele ornamenten,
                sfeervolle ruimtes met unieke details en een rustige binnentuin, verscholen in het hart van de stad.
              </p>

              <div className="intro-stats">
                <div className="stat">
                  <div className="stat-number">1855</div>
                  <div className="stat-label">Bouwjaar</div>
                </div>
                <div className="stat">
                  <div className="stat-number">4</div>
                  <div className="stat-label">Unieke ruimtes</div>
                </div>
                <div className="stat">
                  <div className="stat-number">150</div>
                  <div className="stat-label">Max. gasten</div>
                </div>
                <div className="stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Exclusief</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Het Verhaal */}
        <section className="feature-section alt">
          <div className="container">
            <div className="feature-content">
              <div className="feature-image">
                <Image
                  src="/images/Styledshootnov2025-1311.jpg"
                  alt="Interieur Villa 1855"
                  width={600}
                  height={450}
                />
              </div>
              <div className="feature-text">
                <div className="label">Ons Verhaal</div>
                <h2>Een rijke geschiedenis sinds 1855</h2>
                <p>
                  Villa 1855 werd gebouwd als woonhuis voor een vooraanstaande Tilburgse textielfamilie.
                  De villa getuigt van de welvaart en het vakmanschap van die tijd: hoge plafonds, ruime
                  proporties en een verborgen Franse binnentuin die je nog altijd betoveren.
                </p>
                <p>
                  Na een zorgvuldige restauratie opende de villa haar deuren als unieke
                  evenementenlocatie. De historie van het pand vormt nog altijd de basis, aangevuld
                  met hedendaags comfort en de begeleiding vanuit Cookaholics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Monumentale Details */}
        <section className="feature-section">
          <div className="container">
            <div className="feature-content reverse">
              <div className="feature-image">
                <Image
                  src="/images/Styledshootnov2025-1351.jpg"
                  alt="Monumentale details"
                  width={600}
                  height={450}
                />
              </div>
              <div className="feature-text">
                <div className="label">Authentiek</div>
                <h2>Monumentale ruimtes, moderne luxe</h2>
                <p>
                  Elke ruimte van Villa 1855 ademt karakter. Na een zorgvuldige restauratie zijn
                  de monumentale proporties bewaard gebleven en aangevuld met hedendaags comfort.
                </p>
                <ul className="feature-list">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Hoge plafonds en ruime proporties in de Orangerie
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Karaktervolle Coure met stijlvolle uitstraling
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Verborgen Franse binnentuin met romantisch karakter
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Sfeervolle ambiance die zonder extra aankleding al impact heeft
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Ruimtes */}
        <section className="py-20 md:py-24 bg-white" id="ruimtes">
          <div className="container-custom">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-4 block">
                Ontdek de ruimtes
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-primary-darkest">Onze Ruimtes</h2>
              <p className="text-primary mt-3">Vier unieke ruimtes, elk met een eigen karakter en sfeer</p>
            </div>
            <div className="space-y-12 md:space-y-16">
              {spaces.map((space, index) => (
                <article
                  key={index}
                  className="bg-offwhite shadow-soft overflow-hidden"
                >
                  <div className="relative aspect-[16/9] md:aspect-[21/9]">
                    <Image
                      src={space.image}
                      alt={space.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 1100px"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-8 md:p-12">
                    <div>
                      <h3 className="font-heading text-3xl md:text-5xl text-primary-darkest mb-6 leading-tight">
                        {space.name}
                      </h3>
                      <p className="text-primary leading-relaxed">{space.description}</p>
                    </div>
                    <div className="space-y-8">
                      <div
                        className={`grid gap-6 border-b border-primary-lighter pb-8 ${
                          space.capacities.length === 1
                            ? 'grid-cols-1'
                            : space.capacities.length === 2
                              ? 'grid-cols-1 sm:grid-cols-2'
                              : 'grid-cols-1'
                        }`}
                      >
                        {space.capacities.map((cap, i) => {
                          const Icon = capacityIcons[cap.icon]
                          return (
                            <div key={i} className="flex gap-3">
                              <Icon className="w-6 h-6 text-primary-darkest flex-shrink-0 mt-1" strokeWidth={1.5} />
                              <div>
                                <div className="font-heading text-lg text-primary-darkest mb-1">
                                  {cap.number} {cap.label}
                                </div>
                                <p className="text-sm text-primary leading-snug">{cap.description}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div>
                        <h4 className="text-xs tracking-[0.25em] text-primary-darkest mb-4 font-medium">
                          KENMERKEN
                        </h4>
                        <div className="space-y-3">
                          {space.features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <Sparkles className="w-4 h-4 text-accent flex-shrink-0" strokeWidth={1.5} />
                              <span className="text-primary-darkest">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sfeerimpressie Gallery */}
        <section className="gallery-preview">
          <div className="container">
            <div className="section-header">
              <h2>Sfeerimpressie</h2>
              <p>Een kijkje in de Villa</p>
            </div>
            <div className="gallery-grid">
              <div className="gallery-item large">
                <Image
                  src="/images/tafel-elegant.jpg"
                  alt="Elegant gedekte tafel"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="gallery-item">
                <Image
                  src="/images/ceremonie-stoelen.jpg"
                  alt="Ceremonie opstelling"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="gallery-item">
                <Image
                  src="/images/tuin-love.jpg"
                  alt="Binnentuin"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="gallery-item">
                <Image
                  src="/images/Styledshootnov2025-1407.jpg"
                  alt="Detail"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="gallery-item">
                <Image
                  src="/images/tafel-buiten.jpg"
                  alt="Buiten setting"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Bereikbaarheid */}
        <section className="location-section">
          <div className="container">
            <div className="location-content">
              <div className="location-info">
                <div className="label">Bereikbaarheid</div>
                <h2>Centraal gelegen, makkelijk bereikbaar</h2>
                <p>
                  Villa 1855 ligt in het bruisende centrum van Tilburg, op loopafstand van het
                  station en met diverse parkeermogelijkheden om de hoek.
                </p>

                <div className="location-details">
                  <div className="location-item">
                    <div className="location-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4>Adres</h4>
                      <p>Noordstraat 36<br />5038 EJ Tilburg</p>
                    </div>
                  </div>

                  <div className="location-item">
                    <div className="location-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <div>
                      <h4>Openbaar Vervoer</h4>
                      <p>10 minuten lopen<br />vanaf Station Tilburg</p>
                    </div>
                  </div>

                  <div className="location-item">
                    <div className="location-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <div>
                      <h4>Parkeren</h4>
                      <p>Parkeergarages<br />op 5 min loopafstand</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Noordstraat+36+Tilburg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ marginTop: '2rem' }}
                >
                  Route plannen
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="location-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.5!2d5.0847!3d51.5607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6bf85a1c0b0a1%3A0x1234567890abcdef!2sNoordstraat%2036%2C%205038%20EJ%20Tilburg!5e0!3m2!1snl!2snl!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Villa 1855 locatie"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta" id="contact">
          <div className="container">
            <div className="cta-content">
              <h2>Kom de sfeer zelf ervaren</h2>
              <p>Plan een vrijblijvende bezichtiging en ontdek wat Villa 1855 voor jouw evenement kan betekenen.</p>
              <div className="cta-buttons">
                <Link href="/beschikbaarheid" className="btn btn-secondary">
                  Check beschikbaarheid
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Bezichtiging aanvragen
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
