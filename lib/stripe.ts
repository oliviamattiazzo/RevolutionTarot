// lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export const PRODUTOS = {
  tiragem_rapida: {
    nome: 'Tiragem Rápida',
    descricao: 'Uma pergunta, três cartas, resposta direta.',
    preco: 9700, // centavos (R$ 97)
    tipo: 'servico' as const,
  },
  leitura_completa: {
    nome: 'Leitura Completa',
    descricao: 'Visão ampla da situação. Entregue por escrito.',
    preco: 19700,
    tipo: 'servico' as const,
  },
  consulta_ao_vivo: {
    nome: 'Consulta ao Vivo',
    descricao: 'Videochamada de 50 minutos.',
    preco: 29700,
    tipo: 'servico' as const,
  },
  arcano_do_ano: {
    nome: 'Arcano do Ano — Relatório Completo',
    descricao: 'PDF personalizado com seu Arcano do Ano e orientações.',
    preco: 4700,
    tipo: 'digital' as const,
  },
}

export type ProdutoKey = keyof typeof PRODUTOS
