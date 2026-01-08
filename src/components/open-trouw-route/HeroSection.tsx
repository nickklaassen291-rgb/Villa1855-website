'use client'

import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const scrollToForm = () => {
    document.getElementById('registratie')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-home.jpg"
          alt="Villa 1855"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-darkest/80 via-primary-darkest/70 to-primary-darkest/90" />
      </div>

      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Logo top left */}
      <div className="absolute top-6 left-6 z-20">
        <Image
          src="/images/logo-light.png"
          alt="Villa 1855"
          width={120}
          height={60}
          className="h-12 w-auto"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-4 mb-6">
          <span className="flex-1 h-px bg-accent" />
          <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase">
            Monumentale stadsvilla Tilburg
          </span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-white text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
          Open Trouw Route
        </h1>

        {/* Date */}
        <div className="inline-block bg-accent/20 border border-accent/40 rounded-lg px-6 py-3 mb-6">
          <span className="text-accent text-2xl md:text-3xl font-heading font-semibold">
            Zaterdag 31 januari 2026
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-primary-light text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Ontdek onze monumentale stadsvilla, proef de culinaire hoogstandjes van Cookaholics en ontvang direct een vrijblijvende offerte
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToForm}
          className="btn btn-primary text-sm mb-6"
        >
          Reserveer je tijdslot
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {/* Urgency */}
        <p className="text-primary-light/80 text-sm">
          Beperkt aantal plekken beschikbaar
        </p>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToForm}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-light/60 hover:text-primary-light transition-colors cursor-pointer"
        aria-label="Scroll naar beneden"
      >
        <span className="text-xs tracking-[0.1em] uppercase">Meld je nu aan</span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  )
}
