'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const heroImages = [
  '/images/Styledshootnov2025-1351.jpg',
  '/images/Styledshootnov2025-1407.jpg',
  '/images/Styledshootnov2025-1509.jpg',
]

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero">
      {/* Background */}
      <div className="hero-bg" />
      <div className="hero-pattern" />

      {/* Content */}
      <div className="hero-content">
        {/* Text */}
        <div className="hero-text">
          <div className="label">Evenementenlocatie Tilburg</div>
          <h1 className="hero-title">
            Waar <em>historie</em> en elegantie samenkomen
          </h1>
          <p className="hero-subtitle">
            Ontdek Villa 1855, een monumentale stadsvilla in het hart van Tilburg.
            De perfecte setting voor jouw bruiloft, zakelijk evenement of bijzondere viering.
          </p>
          <Link href="#contact" className="btn btn-primary">
            Plan een bezichtiging
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Visual */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            {heroImages.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt="Villa 1855 interieur"
                fill
                className={`hero-image ${index === currentImageIndex ? 'active' : ''}`}
                priority={index === 0}
              />
            ))}
          </div>
          <div className="hero-badge">
            <Image
              src="/images/villa1855-logo.png"
              alt="Villa 1855"
              width={100}
              height={100}
              className="hero-badge-logo"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
