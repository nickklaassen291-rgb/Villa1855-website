'use client'

import { useState, useEffect } from 'react'
import { Lock, Check, AlertCircle, Loader2 } from 'lucide-react'

const timeSlots = [
  { value: '10:00', label: '10:00 - 11:00' },
  { value: '11:00', label: '11:00 - 12:00' },
  { value: '12:00', label: '12:00 - 13:00' },
  { value: '13:00', label: '13:00 - 14:00' },
  { value: '14:00', label: '14:00 - 15:00' },
  { value: '15:00', label: '15:00 - 16:00' },
  { value: '16:00', label: '16:00 - 17:00' },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  names: string
  email: string
  phone: string
  weddingDate: string
  timeSlot: string
  guestCount: string
  message: string
}

export default function RegistrationForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState<FormData>({
    names: '',
    email: '',
    phone: '',
    weddingDate: '',
    timeSlot: '',
    guestCount: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})

  // Capture UTM parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utm: Record<string, string> = {}
    ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((key) => {
      const value = params.get(key)
      if (value) utm[key] = value
    })
    setUtmParams(utm)
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.names.trim()) {
      newErrors.names = 'Vul jullie namen in'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vul een e-mailadres in'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Vul een geldig e-mailadres in'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vul een telefoonnummer in'
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Vul een geldig telefoonnummer in'
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Kies een tijdslot'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setFormState('loading')

    // Track form submission with Meta Pixel
    if (typeof window !== 'undefined' && (window as Window & { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as Window & { fbq?: (...args: unknown[]) => void }).fbq?.('track', 'Lead', {
        content_name: 'Open Trouw Route Registratie',
        content_category: 'Event Registration',
        value: 200,
        currency: 'EUR',
      })
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...utmParams,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Registration failed')
      }

      setFormState('success')
    } catch (err) {
      console.error('Registration error:', err)
      setFormState('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Track form focus
  const handleFormFocus = () => {
    if (typeof window !== 'undefined' && (window as Window & { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as Window & { fbq?: (...args: unknown[]) => void }).fbq?.('track', 'InitiateCheckout')
    }
  }

  if (formState === 'success') {
    return (
      <section id="registratie" className="py-20 md:py-24 bg-primary-darkest relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-accent flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-heading text-3xl text-white mb-4">
              Bedankt voor je aanmelding!
            </h2>
            <p className="text-primary-light mb-6">
              We hebben je registratie ontvangen en sturen je binnen 24 uur een bevestiging per e-mail met alle details over de Open Trouw Route.
            </p>
            <p className="text-primary-light/80 text-sm">
              Heb je vragen? Neem contact op via{' '}
              <a href="mailto:info@villa1855.nl" className="text-accent hover:underline">
                info@villa1855.nl
              </a>
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="registratie" className="py-20 md:py-24 bg-primary-darkest relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-px bg-accent" />
              <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase">
                Zaterdag 31 januari 2026
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-6">
              Reserveer je plek
            </h2>
            <p className="text-primary-light text-lg mb-8 leading-relaxed">
              Meld je aan voor de Open Trouw Route en ontdek waarom Villa 1855 de perfecte setting is voor jullie onvergetelijke dag. Het aantal plekken per tijdslot is beperkt.
            </p>

            {/* What's included */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary-light">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Rondleiding door feestzaal, serre en binnentuin</span>
              </div>
              <div className="flex items-center gap-3 text-primary-light">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Culinaire proeverij van Cookaholics</span>
              </div>
              <div className="flex items-center gap-3 text-primary-light">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Kennismaking met toppartners</span>
              </div>
              <div className="flex items-center gap-3 text-primary-light">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Vrijblijvende offerte op maat</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 shadow-strong">
            <h3 className="font-heading text-2xl text-primary-darkest mb-6 text-center">
              Aanmeldformulier
            </h3>

            <form onSubmit={handleSubmit} onFocus={handleFormFocus}>
              {/* Names */}
              <div className="mb-4">
                <label htmlFor="names" className="block text-sm font-medium text-primary-darkest mb-2">
                  Jullie namen *
                </label>
                <input
                  type="text"
                  id="names"
                  name="names"
                  value={formData.names}
                  onChange={handleChange}
                  placeholder="bijv. Lisa & Mark"
                  className={`w-full px-4 py-3 border bg-offwhite text-primary-darkest placeholder:text-primary transition-colors focus:outline-none focus:border-accent focus:bg-white ${
                    errors.names ? 'border-red-500' : 'border-primary-lighter'
                  }`}
                />
                {errors.names && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.names}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-primary-darkest mb-2">
                  E-mailadres *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jullie@email.nl"
                  className={`w-full px-4 py-3 border bg-offwhite text-primary-darkest placeholder:text-primary transition-colors focus:outline-none focus:border-accent focus:bg-white ${
                    errors.email ? 'border-red-500' : 'border-primary-lighter'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-primary-darkest mb-2">
                  Telefoonnummer *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="06 12345678"
                  className={`w-full px-4 py-3 border bg-offwhite text-primary-darkest placeholder:text-primary transition-colors focus:outline-none focus:border-accent focus:bg-white ${
                    errors.phone ? 'border-red-500' : 'border-primary-lighter'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Time Slot */}
              <div className="mb-4">
                <label htmlFor="timeSlot" className="block text-sm font-medium text-primary-darkest mb-2">
                  Voorkeur tijdslot 31 januari *
                </label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border bg-offwhite text-primary-darkest transition-colors focus:outline-none focus:border-accent focus:bg-white ${
                    errors.timeSlot ? 'border-red-500' : 'border-primary-lighter'
                  }`}
                >
                  <option value="">Kies een tijdslot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
                {errors.timeSlot && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.timeSlot}
                  </p>
                )}
              </div>

              {/* Wedding Date */}
              <div className="mb-4">
                <label htmlFor="weddingDate" className="block text-sm font-medium text-primary-darkest mb-2">
                  Gewenste trouwdatum
                </label>
                <input
                  type="date"
                  id="weddingDate"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-primary-lighter bg-offwhite text-primary-darkest transition-colors focus:outline-none focus:border-accent focus:bg-white"
                />
              </div>

              {/* Guest Count */}
              <div className="mb-4">
                <label htmlFor="guestCount" className="block text-sm font-medium text-primary-darkest mb-2">
                  Verwacht aantal gasten
                </label>
                <input
                  type="number"
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  placeholder="bijv. 80"
                  min="1"
                  max="150"
                  className="w-full px-4 py-3 border border-primary-lighter bg-offwhite text-primary-darkest placeholder:text-primary transition-colors focus:outline-none focus:border-accent focus:bg-white"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-primary-darkest mb-2">
                  Vragen of opmerkingen
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Laat ons weten als je specifieke vragen hebt..."
                  className="w-full px-4 py-3 border border-primary-lighter bg-offwhite text-primary-darkest placeholder:text-primary transition-colors focus:outline-none focus:border-accent focus:bg-white resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formState === 'loading'}
                className="btn btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Even geduld...
                  </>
                ) : (
                  <>
                    Reserveer mijn plek
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>

              {/* Privacy note */}
              <p className="mt-4 text-xs text-primary text-center flex items-center justify-center gap-2">
                <Lock className="w-3 h-3" />
                Je gegevens zijn veilig en worden niet gedeeld met derden.
              </p>

              {/* Error message */}
              {formState === 'error' && (
                <p className="mt-4 text-sm text-red-500 text-center flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Er ging iets mis. Probeer het opnieuw of neem contact op.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
