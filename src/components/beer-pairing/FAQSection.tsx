'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Hoe lang duurt de avond?',
    answer: 'Reken op ongeveer 4 uur. We starten om 19:00 uur en eindigen rond 23:00 uur. Het is geen gehaaste ervaring — neem de tijd om te genieten.',
  },
  {
    question: 'Kan ik mijn ticket omruilen naar de andere avond?',
    answer: 'Ja, tot 48 uur voor het event. Neem contact op via info@cookaholics.nl en we kijken wat mogelijk is.',
  },
  {
    question: 'Is er parkeergelegenheid?',
    answer: 'Ja, gratis parkeren bij Villa 1855. Ook makkelijk bereikbaar met OV (10 min lopen vanaf station Tilburg).',
  },
  {
    question: 'Wat als ik niet van alle bierstijlen houd?',
    answer: 'Dan is dit misschien niet het juiste event. We serveren verschillende stijlen — van licht en fris tot donker en krachtig. De kracht van dit diner zit hem juist in de variatie en het ontdekken van nieuwe smaken.',
  },
  {
    question: 'Kan ik alleen komen?',
    answer: 'Absoluut! Veel gasten komen solo. Je zit aan tafels met andere nieuwsgierige bierliefhebbers. Gesprekken ontstaan vanzelf.',
  },
  {
    question: 'Zijn er vegetarische/vegan opties?',
    answer: 'Nee, helaas niet. De pairings zijn zo specifiek dat we geen alternatieven kunnen aanbieden zonder de ervaring te verstoren.',
  },
  {
    question: 'Wat gebeurt er als ik ziek word?',
    answer: 'Neem zo snel mogelijk contact op via info@cookaholics.nl. We kijken per geval wat mogelijk is, maar garanties kunnen we niet geven.',
  },
  {
    question: 'Krijg ik een factuur?',
    answer: 'Ja, automatisch na betaling via Peggy Pay.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-10 h-px bg-accent" />
              <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase">
                FAQ
              </span>
              <span className="w-10 h-px bg-accent" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-primary-darkest">
              Vragen die je misschien hebt
            </h2>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-primary-lighter overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-offwhite hover:bg-primary-lightest transition-colors"
                >
                  <span className="font-heading text-lg text-primary-darkest pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-accent flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="p-6 pt-0 bg-offwhite">
                    <p className="text-primary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12 p-6 bg-primary-lightest">
            <p className="text-primary mb-2">
              Staat je vraag er niet bij?
            </p>
            <a
              href="mailto:info@cookaholics.nl"
              className="text-accent hover:underline font-medium"
            >
              Mail ons: info@cookaholics.nl
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
