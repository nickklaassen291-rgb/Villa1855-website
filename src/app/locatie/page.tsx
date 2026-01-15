'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'

const spaces = [
  {
    name: 'De Grote Zaal',
    description: 'Onze meest indrukwekkende ruimte met originele plafondschilderingen, kristallen kroonluchters en elegante schouwen. De perfecte setting voor een stijlvol diner of groots feest.',
    capacity: '120 zitplaatsen',
    features: ['Originele ornamenten', 'Natuurlijk daglicht', 'Eigen bar'],
    image: '/images/feestzaal.jpg'
  },
  {
    name: 'De Serre',
    description: 'Lichtdoorlatende aanbouw met uitzicht op de binnentuin. De serre baadt in natuurlijk licht en is ideaal voor ceremonies, recepties of als cocktailruimte.',
    capacity: '60 zitplaatsen',
    features: ['Glazen wanden', 'Tuinuitzicht', 'Intieme sfeer'],
    image: '/images/otr-serre.jpg'
  },
  {
    name: 'De Binnentuin',
    description: 'Een verborgen groene oase in het hart van de villa. Met zijn sfeervolle beplanting en romantische uitstraling de ultieme plek voor buitenceremonies en zomerse borrels.',
    capacity: '80 staand',
    features: ['Besloten tuin', 'Romantisch', 'Fotogeniek'],
    image: '/images/tuin-fontein.jpg'
  },
  {
    name: 'Het Salon',
    description: 'Intieme ruimte met authentieke schouw en warme, huiselijke sfeer. Perfect voor kleine gezelschappen, vergaderingen of als aparte ruimte voor het bruidspaar.',
    capacity: '20 zitplaatsen',
    features: ['Authentieke schouw', 'Privé ruimte', 'Gezellig'],
    image: '/images/bar-sfeer.jpg'
  }
]

const facilities = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'AV & Presentatie',
    description: 'Beamer, groot scherm, professioneel geluidssysteem en draadloze microfoons'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    title: 'Snel WiFi',
    description: 'Glasvezel internetverbinding in alle ruimtes voor gasten en livestreams'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Eigen Bar',
    description: 'Volledig uitgeruste bar met professionele bediening en uitgebreide kaart'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Klimaatbeheersing',
    description: 'Centrale verwarming en airconditioning voor optimaal comfort'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Fotogenieke locatie',
    description: 'Talloze Instagram-waardige plekjes voor prachtige foto\'s'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Toegankelijk',
    description: 'Volledig rolstoeltoegankelijk met aangepaste sanitaire voorzieningen'
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
            src="/images/villa-voorkant.jpg"
            alt="Villa 1855 exterieur"
            fill
            className="page-hero-image"
            priority
          />
          <div className="page-hero-bg" />
          <div className="page-hero-content">
            <div className="label" style={{ justifyContent: 'center' }}>De Locatie</div>
            <h1>Waar historie tot <em>leven</em> komt</h1>
            <p>Stap binnen in Villa 1855 en ervaar de magie van een monumentale stadsvilla waar elk detail een verhaal vertelt.</p>
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
                Villa 1855 is meer dan een locatie – het is een ervaring. Achter de statige gevel aan de
                Noordstraat schuilt een wereld van elegantie: hoge plafonds met originele ornamenten,
                sfeervolle zalen met authentieke details en een verborgen binnentuin die je naar een
                andere tijd transporteert.
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
                  De villa getuigt van de welvaart en het vakmanschap van die tijd: rijk gedecoreerde
                  plafonds, marmeren schouwen en elegante proporties die je nog altijd betoveren.
                </p>
                <p>
                  Na een zorgvuldige restauratie opende de villa haar deuren als exclusieve
                  evenementenlocatie. We hebben de grandeur van weleer bewaard en gecombineerd met
                  modern comfort en de culinaire excellentie van Cookaholics.
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
                <h2>Monumentale details, moderne luxe</h2>
                <p>
                  Elk hoekje van Villa 1855 ademt geschiedenis. Van de originele plafondschilderingen
                  tot de antieke kroonluchters – hier voel je de ziel van het gebouw.
                </p>
                <ul className="feature-list">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Originele 19e-eeuwse plafondschilderingen
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Authentieke marmeren schouwen
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Kristallen kroonluchters en sfeerverlichting
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Verborgen binnentuin met romantisch karakter
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Ruimtes */}
        <section className="spaces-section" id="ruimtes">
          <div className="container">
            <div className="section-header">
              <h2>Onze Ruimtes</h2>
              <p>Vier unieke ruimtes, elk met een eigen karakter en sfeer</p>
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
                    <div className="space-capacity-badge">{space.capacity}</div>
                  </div>
                  <div className="space-content">
                    <h3>{space.name}</h3>
                    <p>{space.description}</p>
                    <div className="space-features">
                      {space.features.map((feature, i) => (
                        <span key={i} className="space-feature">{feature}</span>
                      ))}
                    </div>
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
              <p>Alles voor een geslaagd evenement, tot in de puntjes geregeld</p>
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

        {/* Sfeerimpressie Gallery */}
        <section className="gallery-preview">
          <div className="container">
            <div className="section-header">
              <h2>Sfeerimpressie</h2>
              <p>Een glimp van de magie die je bij ons kunt verwachten</p>
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
