'use client'

import { Camera, Music, Flower2, Sparkles, Cake, BedDouble } from 'lucide-react'

const partners = [
  {
    icon: Camera,
    name: 'Trouwfotografie',
    type: 'Vastleggen van jullie dag',
  },
  {
    icon: Music,
    name: 'DJ & entertainment',
    type: 'De perfecte sfeer',
  },
  {
    icon: Sparkles,
    name: 'Bruidsstyling',
    type: 'Hair, makeup & jurken',
  },
  {
    icon: Flower2,
    name: 'Bloemen & decoratie',
    type: 'Prachtige styling',
  },
  {
    icon: Cake,
    name: 'Taart & cocktails',
    type: 'Culinaire hoogtepunten',
  },
  {
    icon: BedDouble,
    name: 'Overnachten',
    type: 'Comfortabel voor gasten',
  },
]

export default function PartnersSection() {
  return (
    <section className="py-20 md:py-24 bg-primary-lightest">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-4 block">
            Ontmoet ze op 12 april
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-primary-darkest mb-4">
            Onze partners
          </h2>
          <p className="text-primary max-w-xl mx-auto">
            Maak kennis met onze zorgvuldig geselecteerde partners die jullie dag onvergetelijk maken.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => {
            const Icon = partner.icon
            return (
              <div
                key={partner.name}
                className="bg-white p-8 text-center transition-all duration-300 hover:shadow-soft hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 bg-primary-lightest flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/10 transition-colors">
                  <Icon className="w-8 h-8 text-primary-darkest group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-heading text-lg text-primary-darkest mb-1">
                  {partner.name}
                </h3>
                <p className="text-sm text-primary">
                  {partner.type}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
