'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Phone, Mail, MapPin } from 'lucide-react'

export default function LandingFooter() {
  return (
    <footer className="bg-primary-darkest pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo-light.png"
              alt="Villa 1855"
              width={160}
              height={60}
              className="h-14 w-auto mb-4"
            />
            <p className="text-primary-light text-sm leading-relaxed">
              Een monumentale stadsvilla in het hart van Tilburg. De perfecte setting voor bijzondere momenten.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/villa_1855/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-primary-dark flex items-center justify-center text-primary-light hover:border-accent hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@villa18554"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-primary-dark flex items-center justify-center text-primary-light hover:border-accent hover:text-accent transition-colors"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-white text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-primary-light text-sm">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-accent" />
                <span>Noordstraat 36<br />5038 EJ Tilburg</span>
              </li>
              <li>
                <a href="tel:+31852736709" className="flex items-center gap-3 text-primary-light text-sm hover:text-accent transition-colors">
                  <Phone className="w-5 h-5 flex-shrink-0 text-accent" />
                  085 273 6709
                </a>
              </li>
              <li>
                <a href="mailto:info@villa1855.nl" className="flex items-center gap-3 text-primary-light text-sm hover:text-accent transition-colors">
                  <Mail className="w-5 h-5 flex-shrink-0 text-accent" />
                  info@villa1855.nl
                </a>
              </li>
            </ul>
          </div>

          {/* Open Trouw Route */}
          <div>
            <h4 className="font-heading text-white text-lg mb-4">Open Trouw Route</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-primary-light">
                <span className="text-accent">Datum:</span> 31 januari 2026
              </li>
              <li className="text-primary-light">
                <span className="text-accent">Tijd:</span> 10:00 - 17:30
              </li>
              <li className="text-primary-light">
                <span className="text-accent">Locatie:</span> Villa 1855, Tilburg
              </li>
              <li className="text-primary-light">
                <span className="text-accent">Toegang:</span> Gratis op reservering
              </li>
            </ul>
          </div>

          {/* Cookaholics */}
          <div>
            <h4 className="font-heading text-white text-lg mb-4">Cookaholics</h4>
            <p className="text-primary-light text-sm mb-4 leading-relaxed">
              Villa 1855 is een Cookaholics locatie. Al meer dan 15 jaar verzorgen wij culinaire ervaringen op topniveau.
            </p>
            <a
              href="https://www.cookaholics.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent text-sm hover:gap-3 transition-all"
            >
              Ontdek Cookaholics
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-dark flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary text-sm">
            &copy; {new Date().getFullYear()} Villa 1855 ·{' '}
            <a
              href="https://www.cookaholics.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Een Cookaholics locatie
            </a>
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-primary-light hover:text-accent transition-colors">
              Privacy
            </Link>
            <Link href="/voorwaarden" className="text-primary-light hover:text-accent transition-colors">
              Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
