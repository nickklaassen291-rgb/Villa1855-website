import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Calendar } from '@/components/calendar'
import { Shield, Clock, CalendarCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Beschikbaarheid | Villa 1855',
  description: 'Bekijk direct wanneer Villa 1855 beschikbaar is voor jouw evenement. Real-time beschikbaarheidskalender.',
  openGraph: {
    title: 'Beschikbaarheid | Villa 1855',
    description: 'Bekijk direct wanneer Villa 1855 beschikbaar is voor jouw evenement.',
    type: 'website',
    locale: 'nl_NL',
  },
}

export default function BeschikbaarheidPage() {
  return (
    <>
      <Header />

      <main>
        {/* Page Hero */}
        <section className="page-hero">
          <div className="page-hero-bg" />
          <div className="hero-pattern" />
          <div className="page-hero-content">
            <span className="label justify-center">Real-time beschikbaarheid</span>
            <h1>
              Plan je <em>bijzondere</em> dag
            </h1>
            <p>
              Bekijk direct wanneer Villa 1855 beschikbaar is voor jouw evenement.
              Selecteer een datum en vraag vrijblijvend een offerte aan.
            </p>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="py-24 bg-white">
          <div className="container">
            <Calendar />
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-24 bg-primary-lightest">
          <div className="container">
            <div className="cards-grid">
              {/* Exclusiviteit */}
              <div className="card">
                <Shield className="card-icon" strokeWidth={1.5} />
                <h3>Exclusiviteit</h3>
                <p>
                  Villa 1855 is exclusief voor jou gereserveerd. Geen andere gasten,
                  alleen jouw feest in onze monumentale stadsvilla.
                </p>
              </div>

              {/* Optie plaatsen */}
              <div className="card">
                <Clock className="card-icon" strokeWidth={1.5} />
                <h3>Optie plaatsen</h3>
                <p>
                  Interesse in een datum? Plaats vrijblijvend een optie. Je hebt
                  14 dagen om te beslissen, zonder verplichtingen.
                </p>
              </div>

              {/* Real-time updates */}
              <div className="card">
                <CalendarCheck className="card-icon" strokeWidth={1.5} />
                <h3>Real-time updates</h3>
                <p>
                  Deze kalender synchroniseert automatisch met onze boekingen. Wat
                  je ziet is altijd up-to-date.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <div className="container">
            <div className="cta-content">
              <h2>Benieuwd naar de mogelijkheden?</h2>
              <p>
                Plan een vrijblijvende bezichtiging en ontdek waarom Villa 1855 de
                perfecte locatie is voor jouw evenement.
              </p>
              <div className="cta-buttons">
                <a href="mailto:info@villa1855.nl" className="btn btn-secondary">
                  Vraag een offerte aan
                </a>
                <a
                  href="tel:+310852736709"
                  className="btn btn-outline"
                >
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
