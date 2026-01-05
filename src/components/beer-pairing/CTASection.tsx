'use client'

import { Lock, Mail, Smartphone } from 'lucide-react'

export default function CTASection() {
  return (
    <section id="tickets" className="py-20 md:py-28 bg-accent/10">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          {/* Section Header */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-10 h-px bg-accent" />
            <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase">
              Tickets
            </span>
            <span className="w-10 h-px bg-accent" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-primary-darkest mb-4">
            Reserveer je plek
          </h2>
          <p className="text-primary mb-8">
            Kies je avond en het aantal personen. Je ontvangt direct een bevestiging per e-mail.
          </p>

          {/* Price Reminder */}
          <div className="inline-block bg-white px-6 py-3 mb-8 shadow-soft">
            <span className="font-heading text-2xl text-accent">€109</span>
            <span className="text-primary ml-2">per persoon</span>
          </div>

          {/* Peggy Pay Button */}
          <div className="mb-8">
            <a
              href="https://view.peggypay.com/2a9ce0e2"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-lg px-12 py-4"
              onClick={() => {
                // Track conversion attempt
                if (typeof window !== 'undefined') {
                  const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq
                  if (fbq) {
                    fbq('track', 'InitiateCheckout', {
                      content_name: 'Beer Pairing Diner Ticket',
                      content_category: 'Event Ticket',
                      value: 109,
                      currency: 'EUR',
                    })
                  }
                }
              }}
            >
              Koop je tickets
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-primary">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-accent" />
              <span>Veilige betaling</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" />
              <span>Directe bevestiging</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-accent" />
              <span>Mobile tickets</span>
            </div>
          </div>

          {/* Fallback Link */}
          <p className="mt-6 text-sm text-primary/70">
            Knop werkt niet?{' '}
            <a
              href="https://view.peggypay.com/2a9ce0e2"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Klik hier om direct te bestellen
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
