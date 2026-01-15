'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & {
      push: (args: unknown[]) => void
      loaded: boolean
      version: string
      queue: unknown[]
    }
    _fbq: Window['fbq']
  }
}

// Meta Pixel ID for Villa 1855
const META_PIXEL_ID = '1915733935817328'

export default function MetaPixel() {
  const scrollTracked = useRef({
    scroll25: false,
    scroll50: false,
    scroll75: false,
  })

  useEffect(() => {
    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100

      if (scrollPercent >= 25 && !scrollTracked.current.scroll25) {
        scrollTracked.current.scroll25 = true
        if (window.fbq) {
          window.fbq('trackCustom', 'Scroll25', { page: 'open-trouw-route' })
        }
      }

      if (scrollPercent >= 50 && !scrollTracked.current.scroll50) {
        scrollTracked.current.scroll50 = true
        if (window.fbq) {
          window.fbq('trackCustom', 'Scroll50', { page: 'open-trouw-route' })
        }
      }

      if (scrollPercent >= 75 && !scrollTracked.current.scroll75) {
        scrollTracked.current.scroll75 = true
        if (window.fbq) {
          window.fbq('trackCustom', 'Scroll75', { page: 'open-trouw-route' })
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Script
      id="facebook-pixel"
      strategy="afterInteractive"
    >
      {`
        if (!window.fbq) {
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        }
      `}
    </Script>
  )
}
