'use client'

import Link from 'next/link'
import { Instagram, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react'

export default function BeerPairingFooter() {
  return (
    <footer className="bg-primary-darkest py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Event Info */}
          <div>
            <h3 className="font-heading text-xl text-white mb-4">
              Pop-up Biersommelier
            </h3>
            <p className="text-primary-light mb-4">
              20 & 21 februari 2026<br />
              Villa 1855, Tilburg
            </p>
            <p className="text-primary-light/70 text-sm mb-6">
              Een samenwerking tussen:
            </p>
            <div className="flex items-center gap-4">
              <span className="text-white font-heading">Cookaholics</span>
              <span className="text-accent">×</span>
              <span className="text-white font-heading">Beer Dudes</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-xl text-white mb-4">
              Contact
            </h3>
            <p className="text-primary-light/70 text-sm mb-4">
              Vragen over dit event?
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@cookaholics.nl"
                className="flex items-center gap-3 text-primary-light hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@cookaholics.nl
              </a>
              <a
                href="tel:+31135445566"
                className="flex items-center gap-3 text-primary-light hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4" />
                013 - 544 55 66
              </a>
            </div>
            <div className="flex gap-4 mt-6">
              <a
                href="https://cookaholics.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary-light hover:text-accent transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                cookaholics.nl
              </a>
              <a
                href="https://beerdudes.club"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary-light hover:text-accent transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                beerdudes.club
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-heading text-xl text-white mb-4">
              Volg ons
            </h3>
            <div className="space-y-3">
              <a
                href="https://instagram.com/cookaholics"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-primary-light hover:text-accent transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @cookaholics
              </a>
              <a
                href="https://instagram.com/beerdudesnl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-primary-light hover:text-accent transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @beerdudesnl
              </a>
              <a
                href="https://linkedin.com/company/cookaholics"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-primary-light hover:text-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                Cookaholics
              </a>
            </div>
            <p className="text-primary/50 text-sm mt-6">
              #BeerPairing #Villa1855 #CraftBeer
            </p>
          </div>
        </div>

        {/* Legal */}
        <div className="pt-8 border-t border-primary-dark/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary/50 text-sm text-center md:text-left">
              Alcohol wordt alleen geserveerd aan 18+. Door tickets te kopen ga je akkoord met onze voorwaarden.
            </p>
            <p className="text-primary/50 text-sm">
              © {new Date().getFullYear()} Cookaholics
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
