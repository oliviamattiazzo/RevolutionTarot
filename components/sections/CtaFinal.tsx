export default function CtaFinal() {
  return (
    <section id="agendar" style={{
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
      padding: '96px 48px',
      borderTop: '1px solid var(--border)',
    }}>
      {/* Glow de fundo */}
      <div style={{
        position: 'absolute',
        top: -100, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(255,45,120,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Texto fantasma de fundo */}
      <div style={{
        position: 'absolute',
        bottom: -20, left: '50%', transform: 'translateX(-50%)',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '10rem',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.02)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        letterSpacing: '-0.02em',
        userSelect: 'none',
      }}>
        REVOLUTION
      </div>

      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
        fontWeight: 300,
        fontStyle: 'italic',
        lineHeight: 1.1,
        color: 'var(--ink)',
        marginBottom: 16,
        position: 'relative', zIndex: 1,
      }}>
        Tá na hora de entender<br />
        o que você{' '}
        <strong style={{ fontWeight: 600, color: 'var(--magenta)', fontStyle: 'normal' }}>já sabe.</strong>
      </h2>

      <p style={{
        fontSize: '0.78rem',
        color: 'var(--muted)',
        maxWidth: 460,
        margin: '0 auto 40px',
        lineHeight: 1.85,
        position: 'relative', zIndex: 1,
      }}>
        Agenda uma tiragem. A gente olha junto — sem drama, sem bullshit, com as cartas que você precisa ouvir.
      </p>

      <a href="#" style={{
        background: 'var(--magenta)',
        color: '#fff',
        padding: '17px 44px',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.85rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        display: 'inline-block',
        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
        transition: 'all 0.2s',
        position: 'relative', zIndex: 1,
      }}>
        [ quero minha tiragem ]
      </a>
    </section>
  )
}
