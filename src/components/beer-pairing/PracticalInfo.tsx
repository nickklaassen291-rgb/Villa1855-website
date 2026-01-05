'use client'

import { Calendar, Clock, MapPin, Car, Train, Euro, Check } from 'lucide-react'

export default function PracticalInfo() {
  return (
    <section className="py-20 md:py-28 bg-primary-lightest">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-10 h-px bg-accent" />
            <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase">
              Praktisch
            </span>
            <span className="w-10 h-px bg-accent" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-primary-darkest">
            Alles wat je moet weten
          </h2>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* When */}
          <div className="bg-white p-8">
            <h3 className="font-heading text-xl text-primary-darkest mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-accent" />
              Wanneer
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-primary-darkest font-medium">Donderdag 20 februari 2026</p>
                  <p className="text-primary-darkest font-medium">Vrijdag 21 februari 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-primary">Aanvang: 19:00 uur</p>
                  <p className="text-primary">Einde: ca. 23:00 uur</p>
                </div>
              </div>
              <p className="text-sm text-primary-dark italic pt-2 border-t border-primary-lighter">
                Zorg dat je tijd hebt — dit is geen gehaaste avond
              </p>
            </div>
          </div>

          {/* Where */}
          <div className="bg-white p-8">
            <h3 className="font-heading text-xl text-primary-darkest mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-accent" />
              Waar
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-primary-darkest font-medium">Villa 1855</p>
                <p className="text-primary">Noordstraat 36</p>
                <p className="text-primary">Tilburg</p>
              </div>
              <div className="space-y-2 pt-4 border-t border-primary-lighter">
                <div className="flex items-center gap-3 text-primary">
                  <Car className="w-4 h-4 text-accent" />
                  <span className="text-sm">Gratis parkeren op locatie</span>
                </div>
                <div className="flex items-center gap-3 text-primary">
                  <Train className="w-4 h-4 text-accent" />
                  <span className="text-sm">10 min lopen vanaf station Tilburg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="bg-white p-8">
            <h3 className="font-heading text-xl text-primary-darkest mb-6 flex items-center gap-3">
              <Euro className="w-6 h-6 text-accent" />
              Prijs
            </h3>
            <div className="mb-6">
              <p className="font-heading text-4xl text-accent">€109</p>
              <p className="text-primary text-sm">per persoon (incl. btw)</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-primary-dark font-medium mb-3">Inclusief:</p>
              <div className="flex items-center gap-2 text-primary">
                <Check className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm">7 gangen menu</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Check className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm">7 craft beers</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Check className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm">Tafelwater</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Check className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm">Begeleiding biersommelier</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
