import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Image
              src="/images/logo-light.png"
              alt="Villa 1855"
              width={160}
              height={64}
              className="footer-logo"
            />
            <p>Een monumentale stadsvilla in het hart van Tilburg. De perfecte setting voor bijzondere momenten, verzorgd door Cookaholics.</p>
          </div>

          <div className="footer-column">
            <h4>Navigatie</h4>
            <ul>
              <li><Link href="#diensten">Diensten</Link></li>
              <li><Link href="#locatie">De Locatie</Link></li>
              <li><Link href="#gallery">Sfeerimpressie</Link></li>
              <li><Link href="#contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Openingstijden</h4>
            <ul>
              <li><span>Do t/m zo geopend</span></li>
              <li><span>Aangepast op events</span></li>
            </ul>
          </div>

          <div className="footer-column footer-contact">
            <h4>Contact</h4>
            <p>Noordstraat 36</p>
            <p>5038 EJ Tilburg</p>
            <p style={{ marginTop: '1rem' }}>
              <a href="tel:+310852736709">085 273 6709</a>
            </p>
            <p>
              <a href="mailto:info@villa1855.nl">info@villa1855.nl</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Villa 1855 · <a href="https://www.cookaholics.nl" target="_blank" rel="noopener noreferrer">Een Cookaholics locatie</a></p>
          <div className="social-links">
            <a href="https://www.instagram.com/villa_1855/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 7.5h.01" />
              </svg>
            </a>
            <a href="https://www.tiktok.com/@villa18554" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
