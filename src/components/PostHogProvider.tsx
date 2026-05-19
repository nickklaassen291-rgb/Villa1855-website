'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'

// AVG-conform: opt-out by default. PostHog stuurt geen events tot
// de bezoeker consent geeft via de cookie banner.
function initPostHog() {
  if (typeof window === 'undefined') return
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return
  if (posthog.__loaded) return

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
    ui_host: 'https://eu.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false, // We doen pageviews handmatig in PostHogPageView
    capture_pageleave: true,
    opt_out_capturing_by_default: true,
    mask_all_text: false,
    mask_all_element_attributes: false,
    autocapture: {
      // Privacy: niet alles autocapturen — alleen klikken op CTA's en formulier-submits
      dom_event_allowlist: ['click', 'submit'],
      element_allowlist: ['button', 'a', 'form'],
    },
    persistence: 'localStorage+cookie',
    loaded: (ph) => {
      // Check eerder gegeven consent
      const consent = typeof window !== 'undefined' ? localStorage.getItem('villa1855-cookie-consent') : null
      if (consent === 'accepted') {
        ph.opt_in_capturing()
      } else if (consent === 'declined') {
        ph.opt_out_capturing()
      }
    },
  })
}

// Track pageviews zelf — Next.js App Router triggert geen vanilla
// pageviews bij client-side navigation.
function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname || typeof window === 'undefined' || !posthog.__loaded) return
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    posthog.capture('$pageview', { $current_url: window.location.origin + url })
  }, [pathname, searchParams])

  return null
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog()
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </>
  )
}

// Convenience helpers voor event-tracking elders in de app
export function trackEvent(event: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined' || !posthog.__loaded) return
  posthog.capture(event, properties)
}
