'use client'

import { Building2, UtensilsCrossed, Handshake, Receipt } from 'lucide-react'

const details = [
  {
    icon: Building2,
    title: 'Rondleiding door de villa',
    description: 'Ontdek onze sfeervolle feestzaal, lichte serre en charmante binnentuin. Exclusief voor jullie op de grote dag.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Culinaire proeverij',
    description: 'Proef de culinaire excellentie van Cookaholics. Verse, lokale producten en creatieve gerechten die indruk maken.',
  },
  {
    icon: Handshake,
    title: 'Ontmoet toppartners',
    description: 'Maak kennis met onze geselecteerde partners: fotografen, DJ\'s, bloemisten en meer.',
  },
  {
    icon: Receipt,
    title: 'Vrijblijvende offerte',
    description: 'Ontvang na afloop een offerte op maat, volledig afgestemd op jullie wensen en droomdag.',
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
            Zaterdag 31 januari 2026
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
            Wat kun je verwachten?
          </h2>
          <p className="text-primary-light max-w-xl mx-auto">
            Een dag vol inspiratie, culinaire hoogstandjes en persoonlijke aandacht voor jullie onvergetelijke dag.
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </section>
  )
}
