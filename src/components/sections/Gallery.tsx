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
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
              alt="Villa 1855 zaal"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="gallery-item">
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
              alt="Catering"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <div className="gallery-item">
            <Image
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80"
              alt="Bruiloft"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <div className="gallery-item">
            <Image
              src="https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&q=80"
              alt="Tuin"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <div className="gallery-item">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
              alt="Details"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
