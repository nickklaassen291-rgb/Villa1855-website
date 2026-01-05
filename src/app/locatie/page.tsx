'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'

const spaces = [
  {
    name: 'De Grote Zaal',
    description: 'Onze grootste ruimte met originele plafondschilderingen en kroonluchters. Perfect voor diners tot 120 personen of recepties tot 150 gasten.',
    capacity: '120 zitplaatsen',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80'
  },
  {
    name: 'De Serre',
    description: 'Lichte, glazen aanbouw met uitzicht op de binnentuin. Ideaal voor ceremonies, recepties of als extra ruimte bij grotere events.',
    capacity: '60 zitplaatsen',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80'
  },
  {
    name: 'De Binnentuin',
    description: 'Besloten groene oase in het hart van de villa. Populair voor huwelijksceremonies en zomerse borrels.',
    capacity: '80 staand',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
  },
  {
    name: 'Het Salon',
    description: 'Intieme ruimte met authentieke schouw en sfeervolle inrichting. Geschikt voor kleine vergaderingen of als bruidskamer.',
    capacity: '20 zitplaatsen',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
  }
]

const facilities = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'AV-apparatuur',
    description: 'Beamer, scherm, geluidsinstallatie en microfoons'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    title: 'Snel WiFi',
    description: 'Glasvezel internetverbinding in alle ruimtes'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: 'Eigen Bar',
    description: 'Volledig uitgeruste bar met professionele bediening'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Klimaatbeheersing',
    description: 'Verwarming en airconditioning voor elk seizoen'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
    title: 'Garderobe',
    description: 'Ruime garderobe met professionele bediening'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Toegankelijk',
    description: 'Rolstoeltoegankelijk met aangepast toilet'
  }
]

export default function LocatiePage() {
  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="page-hero">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
            alt="Villa 1855 exterieur"
            fill
            className="page-hero-image"
            priority
          />
          <div className="page-hero-bg" />
          <div className="page-hero-content">
            <div className="label" style={{ justifyContent: 'center' }}>De Locatie</div>
            <h1>Een monument vol <em>verhalen</em></h1>
            <p>Ontdek Villa 1855: een monumentale stadsvilla in het hart van Tilburg waar historie en moderne luxe samenkomen.</p>
            <Link href="#ruimtes" className="btn btn-primary">
              Bekijk de ruimtes
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

        {/* Intro */}
        <section className="intro">
          <div className="container">
            <div className="intro-content-centered">
              <h2>Welkom bij Villa 1855</h2>
              <p>
                In het bruisende centrum van Tilburg, verscholen achter een statige gevel aan de Noordstraat,
                ligt Villa 1855. Deze monumentale stadsvilla uit 1855 is meer dan een locatie – het is een
                ervaring. Hoge plafonds met originele ornamenten, sfeervolle zalen met authentieke details
                en een verborgen binnentuin vormen het decor voor uw bijzondere momenten.
              </p>
            </div>
          </div>
        </section>

        {/* Het Verhaal */}
        <section className="feature-section alt">
          <div className="container">
            <div className="feature-content">
              <div className="feature-image">
                <Image
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
                  alt="Historisch interieur Villa 1855"
                  width={600}
                  height={450}
                />
              </div>
              <div className="feature-text">
                <div className="label">Ons Verhaal</div>
                <h2>Sinds 1855</h2>
                <p>
                  Villa 1855 werd gebouwd als woonhuis voor een vooraanstaande Tilburgse textielfamilie.
                  De villa getuigt van de welvaart en het vakmanschap van die tijd: rijk gedecoreerde
                  plafonds, marmeren schouwen en elegante proporties.
                </p>
                <p>
                  Na een zorgvuldige restauratie opende de villa haar deuren als exclusieve
                  evenementenlocatie. Vandaag combineren we de grandeur van weleer met
                  hedendaags comfort en culinaire excellentie van Cookaholics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ruimtes */}
        <section className="spaces-section" id="ruimtes">
          <div className="container">
            <div className="section-header">
              <h2>Onze Ruimtes</h2>
              <p>Vier unieke ruimtes, elk met een eigen karakter</p>
            </div>
            <div className="spaces-grid">
              {spaces.map((space, index) => (
                <div key={index} className="space-card">
                  <div className="space-image">
                    <Image
                      src={space.image}
                      alt={space.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="space-content">
                    <h3>{space.name}</h3>
                    <p>{space.description}</p>
                    <span className="space-capacity">{space.capacity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Faciliteiten */}
        <section className="facilities-section">
          <div className="container">
            <div className="section-header">
              <h2>Faciliteiten</h2>
              <p>Alles voor een geslaagd evenement</p>
            </div>
            <div className="facilities-grid">
              {facilities.map((facility, index) => (
                <div key={index} className="facility-card">
                  <div className="facility-icon">
                    {facility.icon}
                  </div>
                  <h3>{facility.title}</h3>
                  <p>{facility.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bereikbaarheid */}
        <section className="location-section">
          <div className="container">
            <div className="location-content">
              <div className="location-info">
                <div className="label">Bereikbaarheid</div>
                <h2>Makkelijk te bereiken</h2>
                <p>
                  Villa 1855 ligt in het centrum van Tilburg, op loopafstand van het station
                  en met diverse parkeermogelijkheden in de buurt.
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4>Openbaar Vervoer</h4>
                      <p>10 min lopen vanaf<br />Station Tilburg</p>
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
                      <p>Parkeergarages binnen<br />5 min lopen</p>
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
              <p>Plan een vrijblijvende bezichtiging en ontdek wat Villa 1855 voor uw evenement kan betekenen.</p>
              <div className="cta-buttons">
                <a href="mailto:info@villa1855.nl" className="btn btn-secondary">
                  Bezichtiging aanvragen
                </a>
                <a href="tel:+310852736709" className="btn btn-outline">
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
