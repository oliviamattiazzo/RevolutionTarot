# Revolution Tarot — Estrutura do Projeto

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Sanity.io (CMS/Blog)
- Stripe (pagamentos)
- Cal.com (agendamento)
- Supabase (banco/auth — futuro)

## Estrutura
```
revolution-tarot/
├── app/
│   ├── page.tsx                  ← Home (seu HTML atual migrado)
│   ├── layout.tsx                ← Layout global (nav, footer)
│   ├── globals.css               ← Estilos globais
│   │
│   ├── catalogo/
│   │   └── page.tsx              ← Página de consultas
│   │
│   ├── blog/
│   │   ├── page.tsx              ← Listagem de posts
│   │   └── [slug]/page.tsx       ← Post individual (dinâmico)
│   │
│   ├── agendar/
│   │   └── page.tsx              ← Página de agendamento (embed Cal.com)
│   │
│   └── api/
│       ├── arcano-do-ano/
│       │   └── route.ts          ← API: calcula Arcano do Ano
│       ├── checkout/
│       │   └── route.ts          ← API: cria sessão Stripe
│       └── webhook/
│           └── route.ts          ← Webhook Stripe (confirma pagamento)
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Ticker.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── Catalogo.tsx
│       ├── Depoimentos.tsx
│       └── CtaFinal.tsx
│
├── lib/
│   ├── stripe.ts                 ← Instância e helpers do Stripe
│   ├── arcano.ts                 ← Lógica de cálculo do Arcano
│   └── sanity.ts                 ← Client do Sanity
│
├── sanity/
│   ├── schema/
│   │   ├── post.ts               ← Schema do post do blog
│   │   └── produto.ts            ← Schema de produtos digitais
│   └── sanity.config.ts
│
├── public/
│   └── fonts/
│
├── .env.local                    ← Variáveis de ambiente (não sobe pro git)
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```
