'use client'

import { Check } from 'lucide-react'
import Image from 'next/image'

const usps = [
  'Monumentale stadsvilla uit 1855',
  'Sfeervolle feestzaal, serre én binnentuin',
  'Ceremonie, diner & feest onder één dak',
  'Culinaire excellentie door Cookaholics',
  'Centrale ligging in het hart van Tilburg',
  'Exclusief voor jullie - geen gedeelde ruimtes',
  'Persoonlijke aandacht van A tot Z',
  'Stijlvol decor vol karakter en elegantie',
]

export default function USPsSection() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/otr-ceremonie.jpg"
                alt="Villa 1855 interieur"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative border */}
            <div className="absolute inset-4 border border-accent/30 pointer-events-none" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="label mb-4">
              <span className="w-10 h-px bg-accent" />
              <span>Voordelen</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-primary-darkest mb-8">
              Waarom Villa 1855?
            </h2>

            {/* USP List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {usps.map((usp, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-primary leading-relaxed">
                    {usp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
