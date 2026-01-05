'use client'

import { Flame, Ticket, Beer, Clock } from 'lucide-react'

const scarcityPoints = [
  {
    icon: Flame,
    title: 'Slechts 2 avonden',
    description: 'Na 21 februari is dit voorbij. We herhalen dit event niet.',
  },
  {
    icon: Ticket,
    title: 'Beperkt aantal plekken',
    description: 'Villa 1855 kan maar 80 gasten ontvangen per avond. Vol = vol.',
  },
  {
    icon: Beer,
    title: 'Bieren die bijna nergens te krijgen zijn',
    description: 'Sommige batches zijn zo klein dat er letterlijk maar 10-15 flessen in Nederland zijn.',
  },
  {
    icon: Clock,
    title: 'Alleen online beschikbaar',
    description: 'We openen geen wachtlijst. Mis je deze kans, dan mis je deze kans.',
  },
]

export default function ScarcitySection() {
  return (
    <section className="py-20 md:py-28 bg-primary-darkest relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-10 h-px bg-accent" />
            <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase">
              Beperkt beschikbaar
            </span>
            <span className="w-10 h-px bg-accent" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-white">
            Waarom je nu moet beslissen
          </h2>
        </div>

        {/* Scarcity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {scarcityPoints.map((point) => {
            const Icon = point.icon
            return (
              <div
                key={point.title}
                className="flex gap-4 p-6 border border-accent/30 bg-primary-dark/20"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-white mb-1">
                    {point.title}
                  </h3>
                  <p className="text-primary-light text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Preview */}
        <div className="text-center mt-12">
          <p className="text-primary-light mb-6">
            Als deze avonden voorbij zijn, proef je deze bieren waarschijnlijk nooit meer.
          </p>
          <a
            href="https://view.peggypay.com/2a9ce0e2"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Bestel nu je tickets
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
