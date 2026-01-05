import Link from 'next/link'

export default function CTA() {
  return (
    <section className="cta" id="contact">
      <div className="container">
        <div className="cta-content">
          <h2>Benieuwd naar de mogelijkheden?</h2>
          <p>Plan een vrijblijvende bezichtiging en ontdek waarom Villa 1855 de perfecte locatie is voor jouw evenement.</p>
          <div className="cta-buttons">
            <a href="mailto:info@villa1855.nl" className="btn btn-secondary">
              Vraag een offerte aan
            </a>
            <a href="tel:+310852736709" className="btn btn-outline">
              Bel 085 273 6709
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
