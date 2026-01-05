'use client'

import { useState, useEffect } from 'react'

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (approx 100vh)
      const scrolled = window.scrollY > window.innerHeight * 0.8

      // Hide when near the CTA section
      const ticketsSection = document.getElementById('tickets')
      if (ticketsSection) {
        const rect = ticketsSection.getBoundingClientRect()
        const nearCTA = rect.top < window.innerHeight && rect.bottom > 0
        setIsVisible(scrolled && !nearCTA)
      } else {
        setIsVisible(scrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary-darkest/95 backdrop-blur-sm border-t border-accent/20 py-3 px-4 transform transition-transform duration-300">
      <div className="container-custom flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-white font-heading">Beer Pairing Diner</p>
          <p className="text-primary-light text-sm">20 & 21 februari · €109 p.p.</p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-primary-light text-sm hidden md:block">
            Slechts 80 plekken per avond
          </span>
          <a
            href="https://view.peggypay.com/2a9ce0e2"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-sm flex-1 sm:flex-none justify-center"
          >
            Bestel tickets
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
