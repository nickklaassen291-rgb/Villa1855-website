import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'

const events = [
  {
    title: 'Beer Pairing Diner',
    subtitle: 'Cookaholics x Beer Dudes',
    description: '7 gangen. 7 zeldzame craft beers. Eén onvergetelijke avond met biersommelier.',
    dates: ['20 februari 2026', '21 februari 2026'],
    time: 'Ontvangst 18:00 • Diner 18:30 • Einde 22:30',
    price: '€109 p.p.',
    capacity: 'Max. 70 gasten per avond',
    image: '/images/tafel-elegant.jpg',
    href: 'https://view.peggypay.com/2a9ce0e2',
    status: 'beschikbaar',
  },
  // Voeg hier meer evenementen toe
]

export default function PopupRestaurantPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="page-hero">
          <Image
            src="/images/tafel-setting.jpg"
            alt="Pop-up Restaurant Villa 1855"
            fill
            className="page-hero-image"
            priority
          />
          <div className="page-hero-bg" />
          <div className="page-hero-content">
            <div className="label" style={{ justifyContent: 'center' }}>Culinaire Ervaringen</div>
            <h1>Pop-up <em>Restaurant</em></h1>
            <p>Exclusieve culinaire evenementen in de sfeervolle setting van Villa 1855. Ontdek onze aankomende pop-up diners.</p>
          </div>
          <div className="scroll-indicator">
            <span>Scroll</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl text-primary-darkest mb-6">
                Culinaire avonturen bij Villa 1855
              </h2>
              <p className="text-primary text-lg leading-relaxed">
                Regelmatig opent Villa 1855 haar deuren voor bijzondere culinaire evenementen.
                Van exclusieve wine pairings tot gastchef-diners – elke avond is een unieke ervaring.
                Bekijk hieronder onze aankomende evenementen en reserveer je plek.
              </p>
            </div>
          </div>
        </section>

        {/* Events Calendar */}
        <section className="py-16 md:py-20 bg-offwhite">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-4 block">
                Agenda
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-primary-darkest">
                Aankomende evenementen
              </h2>
            </div>

            <div className="space-y-6">
              {events.map((event, index) => (
                <div key={index} className="bg-white overflow-hidden shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    {/* Image */}
                    <div className="relative h-64 lg:h-auto">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      {event.status === 'beschikbaar' && (
                        <span className="absolute top-4 left-4 bg-accent text-white text-xs font-medium px-3 py-1 uppercase tracking-wider">
                          Beschikbaar
                        </span>
                      )}
                      {event.status === 'bijna-vol' && (
                        <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-medium px-3 py-1 uppercase tracking-wider">
                          Bijna vol
                        </span>
                      )}
                      {event.status === 'uitverkocht' && (
                        <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-medium px-3 py-1 uppercase tracking-wider">
                          Uitverkocht
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-2 p-8">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-2">
                            {event.subtitle}
                          </p>
                          <h3 className="font-heading text-2xl md:text-3xl text-primary-darkest mb-3">
                            {event.title}
                          </h3>
                          <p className="text-primary mb-6">
                            {event.description}
                          </p>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="flex items-center gap-2 text-sm text-primary">
                              <Calendar className="w-4 h-4 text-accent" />
                              <div>
                                {event.dates.map((date, i) => (
                                  <div key={i}>{date}</div>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-primary">
                              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-primary">
                              <Users className="w-4 h-4 text-accent" />
                              <span>{event.capacity}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-primary">
                              <MapPin className="w-4 h-4 text-accent" />
                              <span>Villa 1855, Tilburg</span>
                            </div>
                          </div>
                        </div>

                        {/* Price & CTA */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-primary-lighter">
                          <div>
                            <span className="text-sm text-primary">Vanaf</span>
                            <p className="font-heading text-2xl text-primary-darkest">{event.price}</p>
                          </div>
                          <a
                            href={event.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                          >
                            Reserveer nu
                            <ArrowRight className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {events.length === 0 && (
              <div className="text-center py-12 bg-white">
                <p className="text-primary text-lg">
                  Er zijn momenteel geen aankomende evenementen gepland.
                </p>
                <p className="text-primary mt-2">
                  Volg ons op social media om als eerste op de hoogte te zijn van nieuwe evenementen.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter / Stay Updated */}
        <section className="py-16 md:py-20 bg-primary-darkest text-white">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl mb-4">
                Blijf op de hoogte
              </h2>
              <p className="text-white/70 mb-8">
                Wil je als eerste weten wanneer we nieuwe pop-up evenementen organiseren?
                Volg ons op Instagram of neem contact op.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.instagram.com/villa1855/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Volg ons op Instagram
                </a>
                <Link href="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-darkest">
                  Neem contact op
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
