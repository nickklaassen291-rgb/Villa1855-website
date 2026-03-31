import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import Link from 'next/link'
import MetaPixel from '@/components/open-trouw-route/MetaPixel'

export const metadata: Metadata = {
  title: 'Bedankt voor je aanmelding | Open Trouw Route Villa 1855',
  description: 'Je aanmelding voor de Open Trouw Route op 12 april is ontvangen. We sturen je binnen 24 uur een bevestiging.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function BedanktPage() {
  return (
    <>
      <MetaPixel />
      <main className="min-h-screen bg-primary-darkest flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 py-20">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-accent flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-white mb-4">
              Bedankt voor je aanmelding!
            </h1>
            <p className="text-primary-light text-lg mb-6">
              We hebben je registratie voor de Open Trouw Route op 12 april ontvangen en sturen je binnen 24 uur een bevestiging per e-mail met alle details.
            </p>
            <p className="text-primary-light/80 text-sm mb-10">
              Heb je vragen? Neem contact op via{' '}
              <a href="mailto:info@villa1855.nl" className="text-accent hover:underline">
                info@villa1855.nl
              </a>
            </p>
            <Link
              href="/open-trouw-route"
              className="btn btn-primary inline-flex"
            >
              Terug naar Open Trouw Route
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
