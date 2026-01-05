'use client'

import Image from 'next/image'

const images = [
  { src: '/images/hero-home.jpg', alt: 'Villa 1855 - Monumentale stadsvilla' },
  { src: '/images/service-trouwen.jpg', alt: 'Sfeervolle feestzaal' },
  { src: '/images/service-popup.jpg', alt: 'Culinaire excellentie door Cookaholics' },
  { src: '/images/usp-image.jpg', alt: 'Stijlvol decor vol elegantie' },
  { src: '/images/service-zakelijk.jpg', alt: 'Lichte serre' },
  { src: '/images/cta-bg.jpg', alt: 'Charmante binnentuin' },
]

export default function GallerySection() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="label justify-center mb-4">
            <span className="w-10 h-px bg-accent" />
            <span>Sfeerimpressie</span>
            <span className="w-10 h-px bg-accent" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-primary-darkest mb-4">
            Impressie Villa 1855
          </h2>
          <p className="text-primary max-w-xl mx-auto">
            Ontdek de unieke sfeer en mogelijkheden van onze monumentale stadsvilla.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary-darkest/0 group-hover:bg-primary-darkest/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
