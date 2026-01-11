'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock, Send, Loader2, Check, AlertCircle } from 'lucide-react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Vul je naam in'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vul een e-mailadres in'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Vul een geldig e-mailadres in'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Vul een bericht in'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setFormState('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Verzenden mislukt')
      }

      setFormState('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setFormState('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="page-hero">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
            alt="Villa 1855"
            fill
            className="page-hero-image"
            priority
          />
          <div className="page-hero-bg" />
          <div className="page-hero-content">
            <div className="label" style={{ justifyContent: 'center' }}>Contact</div>
            <h1>Neem <em>contact</em> op</h1>
            <p>Heb je vragen of wil je een bezichtiging plannen? Wij helpen je graag verder.</p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <div className="label mb-4">
                  Contactgegevens
                </div>
                <h2 className="font-heading text-3xl md:text-4xl text-primary-darkest mb-6">
                  We horen graag van je
                </h2>
                <p className="text-primary mb-8 leading-relaxed">
                  Of je nu een bruiloft plant, een zakelijk event organiseert of gewoon nieuwsgierig bent naar onze locatie – we staan klaar om al je vragen te beantwoorden.
                </p>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-primary-darkest mb-1">Adres</h3>
                      <p className="text-primary">
                        Noordstraat 36<br />
                        5038 EJ Tilburg
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-primary-darkest mb-1">Telefoon</h3>
                      <a href="tel:+310852736709" className="text-primary hover:text-accent transition-colors">
                        085 273 6709
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-primary-darkest mb-1">E-mail</h3>
                      <a href="mailto:info@villa1855.nl" className="text-primary hover:text-accent transition-colors">
                        info@villa1855.nl
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-primary-darkest mb-1">Bereikbaarheid</h3>
                      <p className="text-primary">
                        Maandag - Vrijdag: 09:00 - 18:00<br />
                        Weekend: Op afspraak
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-offwhite p-8">
                {formState === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-accent flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading text-2xl text-primary-darkest mb-2">
                      Bericht verzonden!
                    </h3>
                    <p className="text-primary mb-6">
                      Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.
                    </p>
                    <button
                      onClick={() => setFormState('idle')}
                      className="text-accent hover:underline"
                    >
                      Nieuw bericht versturen
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-heading text-2xl text-primary-darkest mb-6">
                      Stuur een bericht
                    </h3>

                    <form onSubmit={handleSubmit}>
                      {/* Name */}
                      <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-primary-darkest mb-2">
                          Naam *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border bg-white text-primary-darkest placeholder:text-primary transition-colors focus:outline-none focus:border-accent ${
                            errors.name ? 'border-red-500' : 'border-primary-lighter'
                          }`}
                          placeholder="Je naam"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
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
                          className={`w-full px-4 py-3 border bg-white text-primary-darkest placeholder:text-primary transition-colors focus:outline-none focus:border-accent ${
                            errors.email ? 'border-red-500' : 'border-primary-lighter'
                          }`}
                          placeholder="je@email.nl"
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
                          Telefoonnummer
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-primary-lighter bg-white text-primary-darkest placeholder:text-primary transition-colors focus:outline-none focus:border-accent"
                          placeholder="06 12345678"
                        />
                      </div>

                      {/* Subject */}
                      <div className="mb-4">
                        <label htmlFor="subject" className="block text-sm font-medium text-primary-darkest mb-2">
                          Onderwerp
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-primary-lighter bg-white text-primary-darkest transition-colors focus:outline-none focus:border-accent"
                        >
                          <option value="">Selecteer een onderwerp</option>
                          <option value="bruiloft">Bruiloft</option>
                          <option value="zakelijk">Zakelijk event</option>
                          <option value="bezichtiging">Bezichtiging aanvragen</option>
                          <option value="anders">Anders</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-primary-darkest mb-2">
                          Bericht *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className={`w-full px-4 py-3 border bg-white text-primary-darkest placeholder:text-primary transition-colors focus:outline-none focus:border-accent resize-none ${
                            errors.message ? 'border-red-500' : 'border-primary-lighter'
                          }`}
                          placeholder="Je bericht..."
                        />
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.message}
                          </p>
                        )}
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
                            Verzenden...
                          </>
                        ) : (
                          <>
                            Verstuur bericht
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </button>

                      {/* Error message */}
                      {formState === 'error' && (
                        <p className="mt-4 text-sm text-red-500 text-center flex items-center justify-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Er ging iets mis. Probeer het opnieuw of neem telefonisch contact op.
                        </p>
                      )}
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-96 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.5!2d5.0847!3d51.5607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6bf85a1c0b0a1%3A0x1234567890abcdef!2sNoordstraat%2036%2C%205038%20EJ%20Tilburg!5e0!3m2!1snl!2snl!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Villa 1855 locatie"
          />
        </section>
      </main>
      <Footer />
    </>
  )
}
