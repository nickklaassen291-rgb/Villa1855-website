'use client'

import { X, Check, AlertTriangle } from 'lucide-react'

export default function RestrictionsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-10 h-px bg-accent" />
              <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase">
                Belangrijk
              </span>
              <span className="w-10 h-px bg-accent" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-primary-darkest">
              Even goed om te weten
            </h2>
          </div>

          {/* Restrictions */}
          <div className="space-y-6">
            {/* No alcohol-free */}
            <div className="flex gap-4 p-6 bg-red-50 border border-red-100">
              <div className="w-10 h-10 bg-red-100 flex items-center justify-center flex-shrink-0">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-heading text-lg text-primary-darkest mb-1">
                  Geen alcoholvrije optie beschikbaar
                </h3>
                <p className="text-primary leading-relaxed">
                  Dit event draait om beer pairing. Zonder het bier mis je de helft van de ervaring.
                </p>
              </div>
            </div>

            {/* No dietary requirements */}
            <div className="flex gap-4 p-6 bg-red-50 border border-red-100">
              <div className="w-10 h-10 bg-red-100 flex items-center justify-center flex-shrink-0">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-heading text-lg text-primary-darkest mb-1">
                  Geen dieetwensen of allergieën mogelijk
                </h3>
                <p className="text-primary leading-relaxed">
                  De combinaties tussen gerechten en bieren zijn zo specifiek dat we deze niet
                  kunnen aanpassen zonder de pairing te verstoren. Als je allergieën hebt,
                  is dit helaas niet het juiste event voor je.
                </p>
              </div>
            </div>

            {/* What you do need */}
            <div className="flex gap-4 p-6 bg-green-50 border border-green-100">
              <div className="w-10 h-10 bg-green-100 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-heading text-lg text-primary-darkest mb-1">
                  Wel: een open mind en nieuwsgierigheid
                </h3>
                <p className="text-primary leading-relaxed">
                  Als je bereid bent om nieuwe smaken te proberen en je te laten verrassen,
                  dan is dit jouw avond.
                </p>
              </div>
            </div>
          </div>

          {/* Age Notice */}
          <div className="mt-8 p-4 bg-primary-lightest flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0" />
            <p className="text-sm text-primary">
              <strong>Let op:</strong> Alcohol wordt alleen geserveerd aan gasten van 18 jaar en ouder.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
