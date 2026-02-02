'use client'

import { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past the hero section (100vh)
      setIsVisible(window.scrollY > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    document.getElementById('registratie')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-primary-darkest/98 backdrop-blur-md border-t border-primary-dark z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-white font-heading text-lg">Open Trouw Route</p>
            <p className="text-primary-light text-sm">12 april 2026 · Beperkte plekken</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-accent sm:hidden">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">12 apr 2026</span>
            </div>
            <button
              onClick={scrollToForm}
              className="btn btn-primary !py-3 text-xs flex-1 sm:flex-none justify-center"
            >
              Reserveer nu
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
