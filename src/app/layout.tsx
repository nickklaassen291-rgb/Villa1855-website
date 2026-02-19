import type { Metadata } from 'next'
import { Lora, Public_Sans, Great_Vibes } from 'next/font/google'
import Script from 'next/script'
import '@/styles/globals.css'

const GA_MEASUREMENT_ID = 'G-TBBKG39G8K'

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
  metadataBase: new URL('https://www.villa1855.nl'),
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['LocalBusiness', 'EventVenue'],
              name: 'Villa 1855',
              description: 'Exclusieve evenementenlocatie in een monumentale stadsvilla uit 1855 in het hart van Tilburg. Voor bruiloften, zakelijke events en bijzondere vieringen.',
              url: 'https://www.villa1855.nl',
              telephone: '+31852736709',
              email: 'info@villa1855.nl',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Noordstraat 36',
                addressLocality: 'Tilburg',
                postalCode: '5038 EJ',
                addressCountry: 'NL',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 51.5607,
                longitude: 5.0847,
              },
              image: 'https://www.villa1855.nl/images/villa-voorkant.jpg',
              priceRange: '€€€',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '18:00',
                },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                bestRating: '5',
                ratingCount: '200',
              },
              maximumAttendeeCapacity: 150,
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'Binnentuin', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Catering', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Ceremonie', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Bar', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Klimaatbeheersing', value: true },
              ],
              sameAs: [
                'https://www.instagram.com/villa.1855/',
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
