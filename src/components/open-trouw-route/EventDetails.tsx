'use client'

import { Building2, UtensilsCrossed, Handshake, Receipt, Check } from 'lucide-react'

const details = [
  {
    icon: Building2,
    title: 'De locatie',
    description: 'Rondleiding door de monumentale feestzaal, serre en romantische binnentuin. Exclusief voor jullie op de grote dag.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Culinaire proeverij',
    description: 'Proef de signatuurhapjes van Cookaholics, de high-end cateraar die jullie bruiloft van A tot Z culinair verzorgt.',
  },
  {
    icon: Handshake,
    title: 'Alle trouwpartners persoonlijk',
    description: 'Maak kennis met fotograaf, DJ, bloemist, stylist en meer. Stel direct jullie vragen.',
  },
  {
    icon: Receipt,
    title: 'Vrijblijvende offerte',
    description: 'Volledig afgestemd op jullie trouwdag. Ontvang na afloop een offerte op maat.',
  },
]

export default function EventDetails() {
  return (
    <section className="py-20 md:py-24 bg-primary-darkest relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-4 block">
            Zondag 28 juni 2026
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
            Wat jullie ontdekken
          </h2>
          <p className="text-primary-light max-w-2xl mx-auto">
            In één bezoek van circa 1 tot 1,5 uur ontdekken jullie alles over Villa 1855. Alles is gratis en vrijblijvend.
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {details.map((detail) => {
            const Icon = detail.icon
            return (
              <div
                key={detail.title}
                className="border border-primary-dark/50 p-8 transition-all duration-300 hover:border-accent/50 hover:-translate-y-1 group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-white mb-2">
                      {detail.title}
                    </h3>
                    <p className="text-primary-light leading-relaxed">
                      {detail.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Gratis inbegrepen */}
        <div className="border border-accent/30 bg-accent/5 p-8 md:p-10 max-w-2xl mx-auto text-center">
          <h3 className="font-heading text-2xl text-white mb-6">
            Alles gratis inbegrepen
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              'Rondleiding door de monumentale villa',
              'Hapjes & drankjes van Cookaholics',
              'Persoonlijke kennismaking met alle trouwpartners',
              'Offerte op maat — volledig afgestemd op jullie trouwdag',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-primary-light">
                <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
