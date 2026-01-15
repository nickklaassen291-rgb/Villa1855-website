'use client'

import Image from 'next/image'

const images = [
  { src: '/images/otr-serre.jpg', alt: 'Trouwceremonie in de lichte serre van trouwlocatie Villa 1855 Tilburg' },
  { src: '/images/otr-diner.jpg', alt: 'Elegant bruiloftsdiner in monumentale feestzaal Tilburg' },
  { src: '/images/otr-feestzaal.jpg', alt: 'Sfeervolle trouwzaal Villa 1855 - exclusieve bruiloft locatie Brabant' },
  { src: '/images/otr-tuin.jpg', alt: 'Romantische binnentuin met fontein - trouwlocatie Tilburg centrum' },
  { src: '/images/otr-entree.jpg', alt: 'Monumentale entree Villa 1855 - trouwen in monumentaal pand Tilburg' },
  { src: '/images/otr-romantisch.jpg', alt: 'Romantische trouwsetting in de binnentuin Villa 1855' },
]

export default function GallerySection() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-4 block">
            Sfeerimpressie
          </span>
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
