'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import { navigation, contactInfo } from '@/data/site'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary-darkest/98 backdrop-blur-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex-shrink-0">
            <Image
              src="/images/logo-light.png"
              alt="Villa 1855"
              width={160}
              height={64}
              className={`transition-all duration-300 ${scrolled ? 'h-12 w-auto' : 'h-16 w-auto'}`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navigation.main.slice(1, -1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <a
              href={contactInfo.phoneLink}
              className="hidden md:flex items-center gap-2 text-white/80 hover:text-accent transition-colors"
            >
              <Phone size={16} />
              <span className="text-sm">{contactInfo.phone}</span>
            </a>

            <Link
              href="/contact"
              className="hidden lg:inline-flex btn btn-primary !py-3 !px-6 text-xs"
            >
              Contact
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden text-white p-2 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Menu sluiten' : 'Menu openen'}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-white/10">
            <div className="flex flex-col gap-1">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-white hover:bg-white/5 text-base font-medium py-3 px-4 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href={contactInfo.phoneLink}
                className="flex items-center gap-3 text-accent py-3 px-4 mt-2 border-t border-white/10"
              >
                <Phone size={18} />
                <span className="font-medium">{contactInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
