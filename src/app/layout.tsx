import type { Metadata } from 'next'
import { Lora, Public_Sans, Great_Vibes } from 'next/font/google'
import '@/styles/globals.css'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Villa 1855 | Evenementenlocatie Tilburg',
    template: '%s | Villa 1855',
  },
  description: 'Villa 1855 is dé unieke evenementenlocatie in het hart van Tilburg. Historische charme en moderne luxe voor bruiloften, zakelijke events en bijzondere vieringen.',
  keywords: ['trouwlocatie', 'evenementenlocatie', 'Tilburg', 'bruiloft', 'zakelijk event', 'Villa 1855', 'feestlocatie'],
  authors: [{ name: 'Cookaholics' }],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.villa1855.nl',
    siteName: 'Villa 1855',
    title: 'Villa 1855 | Evenementenlocatie Tilburg',
    description: 'Historische charme en moderne luxe voor bruiloften, zakelijke events en bijzondere vieringen.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${lora.variable} ${publicSans.variable} ${greatVibes.variable}`} suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
