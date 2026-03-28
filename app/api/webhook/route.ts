// app/api/webhook/route.ts
// Recebe confirmação de pagamento do Stripe
// Configure em: dashboard.stripe.com > Webhooks > Endpoint URL: /api/webhook
// Evento a escutar: checkout.session.completed

import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook inválido.' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const produto = session.metadata?.produto

    console.log(`✅ Pagamento confirmado: ${produto} — ${session.customer_email}`)

    // TODO: enviar e-mail de confirmação
    // TODO: liberar produto digital se for 'arcano_do_ano'
    // TODO: notificar no WhatsApp/Slack
  }

  return NextResponse.json({ received: true })
}
