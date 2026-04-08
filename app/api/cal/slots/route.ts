// app/api/cal/slots/route.ts
// GET /api/cal/slots?eventTypeId=123&data=2025-06-14

import { NextRequest, NextResponse } from 'next/server'

const CAL_TOKEN = process.env.CAL_API_KEY!
const CAL_BASE  = 'https://api.cal.com/v1'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const eventTypeId = searchParams.get('eventTypeId')
  const data        = searchParams.get('data') // YYYY-MM-DD

  if (!eventTypeId || !data)
    return NextResponse.json({ error: 'Parâmetros inválidos.' }, { status: 400 })

  const startTime = `${data}T00:00:00.000Z`
  const endDate   = new Date(data)
  endDate.setDate(endDate.getDate() + 1)
  const endTime   = endDate.toISOString().split('T')[0] + 'T00:00:00.000Z'

  const url = `${CAL_BASE}/slots?eventTypeId=${eventTypeId}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}&timeZone=Europe/Lisbon`

  const res  = await fetch(url, {
    headers: { Authorization: `Bearer ${CAL_TOKEN}` },
  })
  const json = await res.json()

  if (!res.ok)
    return NextResponse.json({ error: json.message ?? 'Erro no Cal.com' }, { status: res.status })

  // Cal.com retorna { slots: { "YYYY-MM-DD": [{ time: "..." }] } }
  const slots: string[] = (json.slots?.[data] ?? []).map((s: { time: string }) => s.time)

  return NextResponse.json({ slots })
}
