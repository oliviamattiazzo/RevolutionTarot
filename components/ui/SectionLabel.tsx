interface SectionLabelProps {
  text: string
  num: string
}

export default function SectionLabel({ text, num }: SectionLabelProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
      <div style={{ width: 24, height: 1, background: 'var(--cyan)' }} />
      <span style={{
        fontSize: '0.6rem', fontWeight: 700,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--cyan)',
      }}>
        {text}
      </span>
      <span style={{
        marginLeft: 'auto',
        fontSize: '0.6rem',
        letterSpacing: '0.1em',
        color: 'rgba(0,245,212,0.35)',
      }}>
        {num}
      </span>
    </div>
  )
}
