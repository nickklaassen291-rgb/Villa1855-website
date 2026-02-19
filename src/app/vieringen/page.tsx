import type { Metadata } from 'next'
import VieringenPageContent from './VieringenPageContent'

export const metadata: Metadata = {
  title: 'Vieringen & Feesten',
  description: 'Vier je verjaardag, jubileum of familiefeest bij Villa 1855 in Tilburg. Monumentale setting voor 20-150 gasten met exclusieve catering door Cookaholics.',
  alternates: {
    canonical: 'https://www.villa1855.nl/vieringen',
  },
  openGraph: {
    title: 'Vieringen & Feesten | Villa 1855',
    description: 'Vier je verjaardag, jubileum of familiefeest bij Villa 1855 in Tilburg. Monumentale setting voor 20-150 gasten.',
    url: 'https://www.villa1855.nl/vieringen',
    type: 'website',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vieringen & Feesten | Villa 1855',
    description: 'Vier je verjaardag, jubileum of familiefeest bij Villa 1855 in Tilburg.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function VieringenPage() {
  return <VieringenPageContent />
}
