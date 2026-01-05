'use client'

import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const scrollToCTA = () => {
    document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-home.jpg"
          alt="Beer Pairing Diner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-darkest/85 via-primary-darkest/75 to-primary-darkest/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-10 h-px bg-accent" />
          <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase">
            Exclusief pop-up event
          </span>
          <span className="w-10 h-px bg-accent" />
        </div>

        {/* Title */}
        <h1 className="font-heading text-white text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
          7 gangen. 7 bieren die je nergens vindt.
          <span className="block text-accent mt-2">Eén avond die je niet vergeet.</span>
        </h1>

        {/* Date */}
        <div className="text-primary-light text-lg md:text-xl mb-8">
          20 & 21 februari 2026 | Villa 1855, Tilburg
        </div>

        {/* Collaboration Badge */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-primary-light text-sm">Een samenwerking van</span>
          <span className="text-white font-heading">Cookaholics</span>
          <span className="text-accent">×</span>
          <span className="text-white font-heading">Beer Dudes</span>
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToCTA}
          className="btn btn-primary text-sm mb-6"
        >
          Reserveer je plek
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {/* Urgency */}
        <p className="text-primary-light/80 text-sm">
          Slechts 2 avonden · 80 plekken per avond · Vol = vol
        </p>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => document.getElementById('hook')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-light/60 hover:text-primary-light transition-colors cursor-pointer"
        aria-label="Scroll naar beneden"
      >
        <span className="text-xs tracking-[0.1em] uppercase">Ontdek meer</span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  )
}
