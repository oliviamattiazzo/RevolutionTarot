// app/api/cal/agendar/route.ts
// POST /api/cal/agendar
// Cria um booking no Cal.com após o pagamento ser confirmado

import { NextRequest, NextResponse } from 'next/server'

const CAL_TOKEN = process.env.CAL_API_KEY!
const CAL_BASE  = 'https://api.cal.com/v1'

export async function POST(req: NextRequest) {
  const {
    eventTypeId,   // number — ID do event type no Cal.com
    startTime,     // ISO string — ex: "2025-06-14T10:00:00.000Z"
    nome,
    email,
    idioma,
    tiragem,
    urgencia,
    nota,
  } = await req.json()

  if (!eventTypeId || !startTime || !nome || !email)
    return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 })

  const body = {
    eventTypeId,
    start: startTime,
    responses: {
      name:  nome,
      email: email,
      notes: [
        `Tiragem: ${tiragem}`,
        `Idioma: ${idioma}`,
        urgencia ? 'Urgência: sim' : '',
        nota ? `Nota: ${nota}` : '',
      ].filter(Boolean).join('\n'),
    },
    timeZone: 'Europe/Lisbon',
    language: 'pt',
    metadata: { tiragem, idioma, urgencia },
  }

  const res  = await fetch(`${CAL_BASE}/bookings`, {
    method:  'POST',
    headers: {
      Authorization:  `Bearer ${CAL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const json = await res.json()

  if (!res.ok)
    return NextResponse.json({ error: json.message ?? 'Erro no Cal.com.' }, { status: res.status })

  return NextResponse.json({ bookingId: json.id, uid: json.uid })
}
