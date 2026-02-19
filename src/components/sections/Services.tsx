import Link from 'next/link'

export default function Services() {
  return (
    <section className="services" id="diensten">
      <div className="container">
        <div className="section-header">
          <h2>Onze Mogelijkheden</h2>
          <p>Van intieme ceremonies tot grootschalige evenementen – wij creëren de perfecte setting voor elk moment.</p>
        </div>

        <div className="cards-grid">
          {/* Card 1 - Bruiloften */}
          <div className="card">
            <svg className="card-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3>Bruiloften</h3>
            <p>Vier jullie liefde in een stijlvol decor vol karakter en elegantie. Van ceremonie tot feest, alles onder één dak met exclusieve aandacht voor jullie dag.</p>
            <Link href="/trouwen" className="card-link">
              Meer ontdekken
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Card 2 - Zakelijke Events */}
          <div className="card">
            <svg className="card-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3>Zakelijke Events</h3>
            <p>Maak indruk op relaties en medewerkers. Van netwerkborrels tot bedrijfsfeesten en presentaties in een unieke, karaktervolle setting.</p>
            <Link href="/zakelijk" className="card-link">
              Meer ontdekken
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Card 3 - Bijzondere Vieringen */}
          <div className="card">
            <svg className="card-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <h3>Bijzondere Vieringen</h3>
            <p>Jubilea, verjaardagen of thema-avonden. Wij maken van elk moment een onvergetelijke ervaring met persoonlijke aandacht voor elk detail.</p>
            <Link href="/vieringen" className="card-link">
              Meer ontdekken
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
