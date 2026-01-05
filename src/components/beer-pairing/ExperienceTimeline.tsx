'use client'

import { Wine, Utensils, Sparkles, Star } from 'lucide-react'

const timeline = [
  {
    phase: 'Gang 1-2',
    title: 'De opening',
    description: 'De eerste twee gangen zetten de toon. Licht, verkennend, met bieren die je zintuigen openen voor wat komen gaat.',
    icon: Wine,
  },
  {
    phase: 'Gang 3-4',
    title: 'Het midden',
    description: 'Hier wordt het interessant. Krachtiger smaken, complexere bieren. De chef speelt met contrasten en Miel laat je zien hoe textuur en carbonatie een gerecht kunnen tillen.',
    icon: Utensils,
  },
  {
    phase: 'Gang 5-6',
    title: 'De climax',
    description: 'Dit zijn de gangen waar maanden voorbereiding in zijn gaan zitten. Unieke pairings die je nergens anders vindt. Bieren die specifiek voor deze combinaties zijn geselecteerd.',
    icon: Sparkles,
  },
  {
    phase: 'Gang 7',
    title: 'De afsluiter',
    description: 'Een finale die je smaakpapillen laat nadenken over wat ze net hebben ervaren. Meestal iets zoets, altijd verrassend.',
    icon: Star,
  },
]

const highlights = [
  { icon: '🍺', text: '7 zeldzame craft beers' },
  { icon: '🍽️', text: '7 handgemaakte gangen' },
  { icon: '💡', text: 'Uitleg bij elke pairing' },
  { icon: '🏛️', text: 'In monumentale Villa 1855' },
]

export default function ExperienceTimeline() {
  return (
    <section className="py-20 md:py-28 bg-primary-darkest relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-10 h-px bg-accent" />
            <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase">
              De ervaring
            </span>
            <span className="w-10 h-px bg-accent" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
            Van eerste bite tot laatste slok
          </h2>
          <p className="text-primary-light max-w-xl mx-auto">
            Een culinaire reis door 7 gangen, begeleid door 7 zorgvuldig geselecteerde craft beers.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-accent hidden md:block" />

            {timeline.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={item.phase} className="relative flex gap-6 mb-8 last:mb-0">
                  {/* Icon */}
                  <div className="relative z-10 w-16 h-16 bg-primary-darkest border-2 border-accent flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8 border-b border-primary-dark/30 last:border-0">
                    <div className="text-accent text-sm font-medium tracking-wider uppercase mb-1">
                      {item.phase}
                    </div>
                    <h3 className="font-heading text-xl text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-primary-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((item) => (
            <div
              key={item.text}
              className="bg-primary-dark/30 border border-primary-dark/50 p-6 text-center"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="text-white text-sm">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
