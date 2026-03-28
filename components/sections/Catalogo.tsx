import SectionLabel from '../ui/SectionLabel'
import HoverCard from '../ui/HoverCard'

const CONSULTAS = [
  { num: '// 001', nome: 'Tiragem Rápida',   desc: 'Uma pergunta, três cartas, uma resposta direta. Pra quando você precisa de clareza agora, sem rodeio.',                                       preco: 'R$ 97'  },
  { num: '// 002', nome: 'Leitura Completa', desc: 'Uma situação, visão ampla. Passado, presente e o que tá pedindo atenção agora. Por escrito, com profundidade.',                               preco: 'R$ 197' },
  { num: '// 003', nome: 'Consulta ao Vivo', desc: 'Videochamada de 50 minutos. A gente olha junto, você pergunta, eu respondo. Sem roteiro, sem filtro.',                                        preco: 'R$ 297' },
]

const cardBase = {
  background: 'var(--bg)',
  padding: '36px 28px',
  position: 'relative' as const,
  cursor: 'pointer',
  transition: 'background 0.25s',
  overflow: 'hidden' as const,
}

const cardHover = { background: 'rgba(255,45,120,0.04)' }

export default function Catalogo() {
  return (
    <section id="catalogo" style={{ background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '96px 48px' }}>
        <SectionLabel text="Catálogo" num="// 02" />
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginTop: 40,
        }}>
          {CONSULTAS.map(({ num, nome, desc, preco }) => (
            <HoverCard key={num} baseStyle={cardBase} hoverStyle={cardHover}>
              <span style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--cyan)', marginBottom: 20, display: 'block' }}>{num}</span>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.7rem', fontStyle: 'italic', fontWeight: 300, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.15 }}>{nome}</div>
              <p style={{ fontSize: '0.72rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28 }}>{desc}</p>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '1rem', fontWeight: 700, color: 'var(--gold)' }}>{preco}</div>
              <span style={{ position: 'absolute', bottom: 28, right: 24, color: 'var(--magenta)', fontSize: '1.1rem' }}>↗</span>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  )
}
