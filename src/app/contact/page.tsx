import type { Metadata } from 'next'
import ContactPageContent from './ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Neem contact op met Villa 1855 in Tilburg. Plan een bezichtiging, vraag een offerte aan of stel je vraag. Bereikbaar op 085 273 6709 of info@villa1855.nl.',
  alternates: {
    canonical: 'https://www.villa1855.nl/contact',
  },
  openGraph: {
    title: 'Contact | Villa 1855',
    description: 'Neem contact op met Villa 1855 in Tilburg. Plan een bezichtiging of vraag een offerte aan.',
    url: 'https://www.villa1855.nl/contact',
    type: 'website',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Villa 1855',
    description: 'Neem contact op met Villa 1855 in Tilburg. Plan een bezichtiging of vraag een offerte aan.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}
