'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Review {
  text: string
  author: string
  role?: string
  rating?: number
}

interface ReviewsProps {
  label?: string
  title?: string
  reviews?: Review[]
}

const defaultReviews: Review[] = [
  {
    text: 'Onlangs van een heerlijk diner mogen genieten samen met mijn vrouw. Op en top verzorgd! Tevens hele mooie trouwlocatie!',
    author: 'Google Review',
    rating: 5,
  },
  {
    text: 'Een prachtige locatie, heerlijke gerechten en een hele persoonlijke bediening door een zeer enthousiast team.',
    author: 'TripAdvisor',
    rating: 5,
  },
  {
    text: 'De perfecte setting voor onze bruiloft. De combinatie van het historische pand, de prachtige tuin en het heerlijke eten maakte het een onvergetelijke dag.',
    author: 'Bruidspaar 2024',
    role: 'Bruiloft',
    rating: 5,
  },
]

export default function Reviews({
  label = 'Ervaringen',
  title = 'Wat onze gasten zeggen',
  reviews = defaultReviews,
}: ReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const currentReview = reviews[currentIndex]

  return (
    <section className="section-padding bg-primary-darkest text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <span className="label justify-center text-accent">{label}</span>
          <h2 className="text-white mb-12">{title}</h2>

          {/* Review Card */}
          <div className="relative">
            {/* Quote icon */}
            <Quote size={48} className="text-accent/30 mx-auto mb-6" />

            {/* Review text */}
            <blockquote className="text-xl md:text-2xl font-heading font-normal leading-relaxed mb-8 text-white/90">
              &ldquo;{currentReview.text}&rdquo;
            </blockquote>

            {/* Rating */}
            {currentReview.rating && (
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < currentReview.rating! ? 'text-accent fill-accent' : 'text-white/30'}
                  />
                ))}
              </div>
            )}

            {/* Author */}
            <div>
              <p className="font-medium text-white">{currentReview.author}</p>
              {currentReview.role && (
                <p className="text-sm text-white/60">{currentReview.role}</p>
              )}
            </div>
          </div>

          {/* Navigation */}
          {reviews.length > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={prevReview}
                className="p-2 border border-white/30 hover:border-accent hover:text-accent transition-colors"
                aria-label="Vorige review"
              >
                <ChevronLeft size={20} />
              </button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-accent' : 'bg-white/30'
                    }`}
                    aria-label={`Ga naar review ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextReview}
                className="p-2 border border-white/30 hover:border-accent hover:text-accent transition-colors"
                aria-label="Volgende review"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
