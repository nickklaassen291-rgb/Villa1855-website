'use client'

import { useEffect, useState } from 'react'
import posthog from 'posthog-js'
import { X } from 'lucide-react'

const STORAGE_KEY = 'villa1855-cookie-consent'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const existing = localStorage.getItem(STORAGE_KEY)
    if (!existing) {
      // Wachten 800ms om de hero eerst te laten landen
      const t = setTimeout(() => setShow(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    if (posthog.__loaded) posthog.opt_in_capturing()
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    if (posthog.__loaded) posthog.opt_out_capturing()
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-toestemming"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[1100] bg-white border border-primary-lighter shadow-strong p-5 md:p-6"
      style={{ animation: 'fadeInUp 0.4s ease' }}
    >
      <button
        type="button"
        onClick={decline}
        aria-label="Sluit cookie-melding"
        className="absolute top-3 right-3 text-primary hover:text-primary-darkest"
      >
        <X size={18} />
      </button>

      <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">Cookies</p>
      <h3 className="font-heading text-lg text-primary-darkest mb-2">
        Mogen we anonieme analytics gebruiken?
      </h3>
      <p className="text-sm text-primary leading-relaxed mb-4">
        We meten met PostHog hoe bezoekers onze site gebruiken — geanonimiseerd. Geen advertenties, geen tracking voor derden. Je kunt later altijd weigeren via de footer.
      </p>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={accept}
          className="btn btn-primary flex-1 justify-center text-xs"
        >
          Akkoord
        </button>
        <button
          type="button"
          onClick={decline}
          className="text-sm text-primary hover:text-primary-darkest underline self-center sm:self-auto sm:px-4"
        >
          Weigeren
        </button>
      </div>
    </div>
  )
}
