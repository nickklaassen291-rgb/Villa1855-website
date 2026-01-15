'use client'

import { Star } from 'lucide-react'

const stats = [
  { number: '25+', label: 'Bruidsparen Hebben Al Toegezegd' },
  { number: '100%', label: 'Ceremonie, Diner & Feest\nOnder Één Dak' },
  { number: '1', label: 'Vast Contactpersoon' },
]

const testimonials = [
  {
    quote: 'Wat een top team op een geweldige locatie. Mooi wijn arrangement en een heerlijk menu vol met verrassingen. Werd goed meegedacht met dieetwensen. Een avond om niet snel te vergeten. Wij hebben genoten!',
    author: 'Angelique & Partner',
    date: 'Getrouwd april 2025',
  },
  {
    quote: 'Op de dag zelf ging het personeel above and beyond. Het eten was GEWELDIG - dat in hoofdletters doet nog niet voor de helft recht aan hoe lekker het was. Villa 1855 heeft aan onze dag het gouden randje toegevoegd.',
    author: 'Wessel & Partner',
    date: 'Getrouwd juli 2025',
  },
  {
    quote: 'Vanaf het eerste moment waren wij enthousiast. Het personeel ziet je, hoort je en is supergastvrij. Zowel de locatie als het team zorgden voor een topdag waaraan niets ontbrak. Zeker aanbevolen!',
    author: 'Nikki & Partner',
    date: 'Getrouwd augustus 2025',
  },
]

export default function TrustSection() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-4 block">
            Waarom Villa 1855
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-primary-darkest">
            Waar historie en elegantie samenkomen
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-primary-lightest p-8 text-center transition-all duration-300 hover:shadow-soft hover:-translate-y-1"
            >
              <div className="font-heading text-4xl md:text-5xl text-accent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-primary uppercase tracking-[0.1em] whitespace-pre-line">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-offwhite p-8 relative"
            >
              {/* Quote mark */}
              <div className="absolute top-4 left-6 font-heading text-6xl text-accent/20 leading-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-primary italic mb-6 relative z-10 leading-relaxed">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-lighter flex items-center justify-center font-heading text-lg text-primary-dark">
                  {testimonial.author.split(' ')[0][0]}
                </div>
                <div>
                  <div className="font-script text-xl text-primary-darkest">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-primary">
                    {testimonial.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
