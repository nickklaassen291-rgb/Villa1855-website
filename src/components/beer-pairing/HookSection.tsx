'use client'

import Image from 'next/image'

export default function HookSection() {
  return (
    <section id="hook" className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-px bg-accent" />
              <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase">
                Waarom dit anders is
              </span>
              <span className="w-10 h-px bg-accent" />
            </div>

            <h2 className="font-heading text-3xl md:text-4xl text-primary-darkest mb-6">
              Dit is geen standaard beer pairing
            </h2>

            <div className="space-y-4 text-primary leading-relaxed">
              <p>
                Voor dit diner hebben de chef van Cookaholics en Miel van Beer Dudes
                maanden samengewerkt aan iets bijzonders.
              </p>

              <p className="font-medium text-primary-darkest">
                Geen voorspelbare combinaties.<br />
                Geen bieren die je overal kunt krijgen.<br />
                Geen compromissen.
              </p>

              <p>
                7 gangen die ontstaan vanuit 7 zeldzame craft beers. Of juist andersom —
                waar het bier het gerecht stuurt.
              </p>

              <p>
                Elke gang is een experiment. Een ontdekking. Sommige bieren zijn kleine
                batches van Nederlandse microbrouwerijen. Andere zijn bijna niet
                verkrijgbaar buiten deze avonden.
              </p>

              <p>
                <strong>Miel vertelt je waarom het werkt.</strong><br />
                <strong>De chef laat je proeven hoe het voelt.</strong>
              </p>

              <p className="text-primary-dark italic">
                Dit is voor mensen die nieuwsgierig zijn. Die iets willen ervaren dat
                niet voorspelbaar is. Die begrijpen dat de beste momenten ontstaan als
                je openstaat voor verrassingen.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/service-popup.jpg"
                alt="Beer pairing experience"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative border */}
            <div className="absolute inset-4 border border-accent/30 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
