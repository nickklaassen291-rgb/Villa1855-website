import Image from 'next/image'

export default function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="section-header">
          <h2>Sfeerimpressie</h2>
          <p>Ontdek de unieke sfeer en mogelijkheden van Villa 1855.</p>
        </div>
        <div className="gallery-grid">
          <div className="gallery-item large">
            <Image
              src="/images/ceremonie-serre.jpg"
              alt="Ceremonie in de serre van Villa 1855"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="gallery-item">
            <Image
              src="/images/tafel-elegant.jpg"
              alt="Elegant gedekte tafel"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <div className="gallery-item">
            <Image
              src="/images/tuin-love.jpg"
              alt="Romantische tuin met LOVE letters"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <div className="gallery-item">
            <Image
              src="/images/tuin-fontein.jpg"
              alt="Tuin met fontein"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <div className="gallery-item">
            <Image
              src="/images/serre-bar.jpg"
              alt="Serre met bar"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
