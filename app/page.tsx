import Navbar      from '@/components/sections/Navbar'
import Hero        from '@/components/sections/Hero'
import Ticker      from '@/components/sections/Ticker'
import Sobre       from '@/components/sections/Sobre'
import Catalogo    from '@/components/sections/Catalogo'
import Depoimentos from '@/components/sections/Depoimentos'
import CtaFinal    from '@/components/sections/CtaFinal'
import Footer      from '@/components/sections/Footer'
import BookingWizard from '@/components/sections/BookingWizard'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Sobre />
        <Catalogo />
        <Depoimentos />
        <CtaFinal />
        <BookingWizard />
      </main>
      <Footer />
    </>
  )
}
