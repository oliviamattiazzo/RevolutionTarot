// lib/arcano.ts — lógica reutilizável no frontend e backend

export const ARCANOS = [
  { numero: 0,  nome: 'O Louco',           emoji: '🃏', palavra: 'Liberdade' },
  { numero: 1,  nome: 'O Mago',            emoji: '🔮', palavra: 'Manifestação' },
  { numero: 2,  nome: 'A Sacerdotisa',     emoji: '🌙', palavra: 'Intuição' },
  { numero: 3,  nome: 'A Imperatriz',      emoji: '🌸', palavra: 'Abundância' },
  { numero: 4,  nome: 'O Imperador',       emoji: '👑', palavra: 'Estrutura' },
  { numero: 5,  nome: 'O Hierofante',      emoji: '🏛️', palavra: 'Tradição' },
  { numero: 6,  nome: 'Os Amantes',        emoji: '♥️',  palavra: 'Escolha' },
  { numero: 7,  nome: 'O Carro',           emoji: '⚡', palavra: 'Movimento' },
  { numero: 8,  nome: 'A Justiça',         emoji: '⚖️', palavra: 'Equilíbrio' },
  { numero: 9,  nome: 'O Eremita',         emoji: '🕯️', palavra: 'Introspecção' },
  { numero: 10, nome: 'A Roda da Fortuna', emoji: '🎡', palavra: 'Ciclos' },
  { numero: 11, nome: 'A Força',           emoji: '🦁', palavra: 'Coragem' },
  { numero: 12, nome: 'O Pendurado',       emoji: '🙃', palavra: 'Pausa' },
  { numero: 13, nome: 'A Morte',           emoji: '🦋', palavra: 'Transformação' },
  { numero: 14, nome: 'A Temperança',      emoji: '🌊', palavra: 'Harmonia' },
  { numero: 15, nome: 'O Diabo',           emoji: '🔗', palavra: 'Sombra' },
  { numero: 16, nome: 'A Torre',           emoji: '⚡', palavra: 'Ruptura' },
  { numero: 17, nome: 'A Estrela',         emoji: '⭐', palavra: 'Esperança' },
  { numero: 18, nome: 'A Lua',             emoji: '🌕', palavra: 'Ilusão' },
  { numero: 19, nome: 'O Sol',             emoji: '☀️', palavra: 'Vitalidade' },
  { numero: 20, nome: 'O Julgamento',      emoji: '🎺', palavra: 'Renovação' },
  { numero: 21, nome: 'O Mundo',           emoji: '🌍', palavra: 'Completude' },
]

export function calcularArcanoDoAno(
  dia: number,
  mes: number,
  anoAtual = new Date().getFullYear()
) {
  const reduzir = (n: number): number => {
    while (n > 22) n = String(n).split('').reduce((a, d) => a + Number(d), 0)
    return n
  }
  const somaAno = String(anoAtual).split('').reduce((a, d) => a + Number(d), 0)
  return ARCANOS[reduzir(dia + mes + somaAno) % 22]
}
