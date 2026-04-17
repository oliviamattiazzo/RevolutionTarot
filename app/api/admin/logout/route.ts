// app/api/admin/logout/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { headersSeguranca, COOKIE_NAME, logAuditoria, getIp } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  logAuditoria('LOGOUT', getIp(req))

  const res = NextResponse.json({ ok: true }, { headers: headersSeguranca() })
  const isProd = process.env.NODE_ENV === 'production'
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure:   isProd,
    sameSite: 'strict',
    maxAge:   0,
    path:     '/',
  })
  return res
}
