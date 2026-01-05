import Image from 'next/image'

export default function USPs() {
  return (
    <section className="features" id="locatie">
      <div className="container">
        <div className="features-content">
          <div className="features-text">
            <h2>Waarom Villa 1855 de perfecte keuze is</h2>
            <ul className="features-list">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong>Exclusief voor jullie</strong>
                  Op de dag van jullie evenement is Villa 1855 volledig van jullie. Geen gedeelde ruimtes, volledige privacy en persoonlijke aandacht.
                </div>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong>Historische charme</strong>
                  Een monumentale stadsvilla uit 1855, waar elk detail ademt van geschiedenis, elegantie en tijdloze schoonheid.
                </div>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong>Culinaire excellentie</strong>
                  High-end catering door Cookaholics. Verse, lokale producten en creatieve gerechten die indruk maken.
                </div>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong>Centrale ligging</strong>
                  In het hart van Tilburg, omgeven door groen. Uitstekend bereikbaar met OV en auto.
                </div>
              </li>
            </ul>
          </div>
          <div className="features-image">
            <Image
              src="/images/Styledshootnov2025-1311.jpg"
              alt="Sfeervolle setting Villa 1855"
              width={600}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
