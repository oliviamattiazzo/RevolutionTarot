// app/api/checkout/route.ts
// Cria sessão de pagamento no Stripe
// Uso: POST /api/checkout  body: { produto: 'tiragem_rapida' }

import { NextRequest, NextResponse } from 'next/server'
import { stripe, PRODUTOS, ProdutoKey } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const { produto } = await req.json() as { produto: ProdutoKey }

  if (!produto || !PRODUTOS[produto]) {
    return NextResponse.json({ error: 'Produto inválido.' }, { status: 400 })
  }

  const item = PRODUTOS[produto]
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'brl',
          product_data: { name: item.nome, description: item.descricao },
          unit_amount: item.preco,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${baseUrl}/obrigada?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${baseUrl}/catalogo`,
    metadata: { produto },
  })

  return NextResponse.json({ url: session.url })
}
