import SectionLabel from '../ui/SectionLabel'
import CatalogoClient from './CatalogoClient'
 
export default function Catalogo() {
  return (
    <section id="catalogo" style={{ background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '96px 48px' }}>
        <SectionLabel text="Catálogo" num="// 02" />
        <CatalogoClient />
      </div>
    </section>
  )
}