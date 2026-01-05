import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import Services from '@/components/sections/Services'
import USPs from '@/components/sections/USPs'
import Gallery from '@/components/sections/Gallery'
import CTA from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Services />
        <USPs />
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
