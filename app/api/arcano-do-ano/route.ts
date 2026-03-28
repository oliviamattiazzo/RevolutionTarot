// app/api/arcano-do-ano/route.ts
// Uso: GET /api/arcano-do-ano?dia=15&mes=3&ano=1990

import { NextRequest, NextResponse } from 'next/server'

const ARCANOS = [
  { numero: 0,  nome: 'O Louco',           palavra: 'Liberdade' },
  { numero: 1,  nome: 'O Mago',            palavra: 'Manifestação' },
  { numero: 2,  nome: 'A Sacerdotisa',     palavra: 'Intuição' },
  { numero: 3,  nome: 'A Imperatriz',      palavra: 'Abundância' },
  { numero: 4,  nome: 'O Imperador',       palavra: 'Estrutura' },
  { numero: 5,  nome: 'O Hierofante',      palavra: 'Tradição' },
  { numero: 6,  nome: 'Os Amantes',        palavra: 'Escolha' },
  { numero: 7,  nome: 'O Carro',           palavra: 'Movimento' },
  { numero: 8,  nome: 'A Justiça',         palavra: 'Equilíbrio' },
  { numero: 9,  nome: 'O Eremita',         palavra: 'Introspecção' },
  { numero: 10, nome: 'A Roda da Fortuna', palavra: 'Ciclos' },
  { numero: 11, nome: 'A Força',           palavra: 'Coragem' },
  { numero: 12, nome: 'O Pendurado',       palavra: 'Pausa' },
  { numero: 13, nome: 'A Morte',           palavra: 'Transformação' },
  { numero: 14, nome: 'A Temperança',      palavra: 'Harmonia' },
  { numero: 15, nome: 'O Diabo',           palavra: 'Sombra' },
  { numero: 16, nome: 'A Torre',           palavra: 'Ruptura' },
  { numero: 17, nome: 'A Estrela',         palavra: 'Esperança' },
  { numero: 18, nome: 'A Lua',             palavra: 'Ilusão' },
  { numero: 19, nome: 'O Sol',             palavra: 'Vitalidade' },
  { numero: 20, nome: 'O Julgamento',      palavra: 'Renovação' },
  { numero: 21, nome: 'O Mundo',           palavra: 'Completude' },
]

function reduzir(n: number): number {
  while (n > 22) n = String(n).split('').reduce((acc, d) => acc + Number(d), 0)
  return n
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const dia     = Number(searchParams.get('dia'))
  const mes     = Number(searchParams.get('mes'))
  const ano     = Number(searchParams.get('ano'))
  const anoAtual = new Date().getFullYear()

  if (!dia || !mes || !ano || dia > 31 || mes > 12) {
    return NextResponse.json(
      { error: 'Parâmetros inválidos. Use: ?dia=15&mes=3&ano=1990' },
      { status: 400 }
    )
  }

  const somaAno  = String(anoAtual).split('').reduce((acc, d) => acc + Number(d), 0)
  const total    = dia + mes + somaAno
  const arcano   = ARCANOS[reduzir(total) % 22]

  return NextResponse.json({
    arcano,
    anoCalculado: anoAtual,
    dataNascimento: `${dia}/${mes}/${ano}`,
    mensagem: `Seu Arcano do Ano ${anoAtual} é ${arcano.nome} — ${arcano.palavra}.`,
  })
}
