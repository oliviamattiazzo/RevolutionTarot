# 🚀 GUIA RÁPIDO: COMO USAR AS REFATORAÇÕES

## 1️⃣ Validadores

### ✅ Basicão
```typescript
import { validarEmail, validarNome } from '@/lib/validators'

// Email
const email = validarEmail('user@example.com')
if (!email.valido) {
  console.log(email.erro) // "Email inválido" ou similar
}

// Nome
const nome = validarNome('João')
if (!nome.valido) {
  console.log(nome.erro)
}
```

### 🎯 Bundle (recomendado para APIs)
```typescript
import { validarCorpoPedidoAgendamento } from '@/lib/validators'

const body = { /* req.body */ }
const validation = validarCorpoPedidoAgendamento(body)

if (!validation.valido) {
  // validation.erros = ['Nome: muito curto', 'Email: inválido', ...]
  return res.json({ erros: validation.erros }, 400)
}

// Agora você pode confiar nos dados
processarAgendamento(body)
```

### 📋 Todas as funções
```typescript
validarEmail(email)           // RFC 5322
validarNome(nome)             // 3-100 chars
validarTelefone(phone)        // 7-15 dígitos
validarPreco(price)           // Positivo
validarDesconto(discount)     // 0-100%
validarMoeda(moeda)           // BRL|USD|EUR
validarIdioma(lang)           // pt|es|en
validarCanal(channel)         // whatsapp|telegram
validarMetodoPagamento(method) // pix|revolut|cartao (null ok)
validarCodigoCupom(code)      // A-Z0-9, 3-50 chars
validarNota(note)             // Max 500 chars
validarCorpoPedidoAgendamento(body) // All together
```

---

## 2️⃣ Tratamento de Erros

### ❌ Antes (ruim)
```typescript
export async function POST(req) {
  try {
    const user = await db.getUser(id)
    // ... 
  } catch (err) {
    console.log(err.message)
    return res.json({ error: 'Something went wrong' }, 500)
  }
}
```

### ✅ Depois (bom)
```typescript
import { 
  ValidationError, 
  NotFoundError, 
  handleApiError,
  logger 
} from '@/lib/errors'

export async function POST(req) {
  try {
    const body = await req.json()
    
    if (!body.email) {
      throw new ValidationError('Email é obrigatório', { field: 'email' })
    }
    
    const user = await db.getUser(body.email)
    if (!user) {
      throw new NotFoundError('Usuário')
    }
    
    logger.info('Usuário encontrado', { userId: user.id })
    return res.json(user)
    
  } catch (error) {
    return handleApiError(error)  // Trata tudo automaticamente!
  }
}
```

### 🎯 Classes de Erro
```typescript
import { 
  ApiError, 
  ValidationError, 
  NotFoundError, 
  UnauthorizedError, 
  ConflictError 
} from '@/lib/errors'

throw new ValidationError('Email inválido')        // 400
throw new NotFoundError('Usuário')                 // 404
throw new UnauthorizedError()                       // 401
throw new ConflictError('Email já existe')        // 409
throw new ApiError('Erro Stripe', 402, 'PAYMENT_FAILED')
```

### 📝 Logging
```typescript
import { logger } from '@/lib/errors'

logger.debug('Debug message', { dev: 'only' })              // Dev only
logger.info('Agendamento criado', { bookingId: '123' })     // Info
logger.warn('Cupom expirado em breve', { cupomId, dias: 3 }) // Warning
logger.error('Erro Stripe', stripeError, { attempt: 2 })    // Error + stack
```

---

## 3️⃣ Testes

### ▶️ Rodar
```bash
# Tudo
npm test

# Arquivo específico
npm test lib/__tests__/validators.test.ts
npm test __tests__/integration/api.test.ts

# Watch (dev)
npm run test:watch

# Com cobertura
npm run test:coverage
```

### ✍️ Escrever novo teste
```typescript
// lib/__tests__/meu-novo.test.ts

describe('MinhaFuncao', () => {
  it('deve fazer algo', () => {
    const result = minhaFuncao()
    expect(result).toBe(esperado)
  })

  it('deve falhar com input inválido', () => {
    expect(() => minhaFuncao(null)).toThrow()
  })
})
```

---

## 4️⃣ API Route Exemplo

### 📄 Template completo
```typescript
// app/api/novo-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { 
  validarEmail, 
  ValidationError, 
  handleApiError, 
  logger 
} from '@/lib/*'

export async function POST(req: NextRequest) {
  try {
    const { email, name, etc } = await req.json()
    
    // Validar
    const emailCheck = validarEmail(email)
    if (!emailCheck.valido) {
      throw new ValidationError(emailCheck.erro, { field: 'email' })
    }
    
    // Processar
    logger.info('Processando requisição', { email, name })
    const resultado = await processarAlgo({ email, name })
    
    // Responder
    logger.info('Sucesso', { id: resultado.id })
    return NextResponse.json(resultado)
    
  } catch (error) {
    return handleApiError(error)  // Tratamento automático!
  }
}
```

---

## 5️⃣ Checklist de Integração

Para **cada API route** que você quer melhorar:

- [ ] Adicionar imports: `import { validar*, ValidationError, handleApiError } from '@/lib/*'`
- [ ] Adicionar try/catch com `handleApiError` no final
- [ ] Validar entrada com `validar*()`
- [ ] Usar `logger.info/warn/error` para logging
- [ ] Testar com `npm test`

---

## 6️⃣ Erros Comuns

### ❌ Esquecer de chamar handleApiError
```typescript
// ERRADO
export async function POST(req) {
  const body = await req.json()
  const result = await processarAlgo(body) // Pode falhar!
  return NextResponse.json(result)
}

// CERTO
export async function POST(req) {
  try {
    const body = await req.json()
    const result = await processarAlgo(body)
    return NextResponse.json(result)
  } catch (error) {
    return handleApiError(error)
  }
}
```

### ❌ Não validar entrada
```typescript
// ERRADO
export async function POST(req) {
  const { email } = await req.json()
  await db.saveUser(email) // email pode ser inválido!
}

// CERTO
export async function POST(req) {
  const { email } = await req.json()
  const check = validarEmail(email)
  if (!check.valido) throw new ValidationError(check.erro)
  await db.saveUser(email)
}
```

### ❌ Response inconsistente
```typescript
// ERRADO
catch (error) {
  return NextResponse.json({ msg: error.message })  // Inconsistente
}

// CERTO
catch (error) {
  return handleApiError(error)  // Sempre consistente
}
```

---

## 7️⃣ Próximos Passos

1. **Esta semana:**
   - Rodar `npm install` (adiciona jest/ts-jest)
   - Rodar `npm test` para verificar que tudo passa
   - Começar a usar em 1-2 novas APIs

2. **Próxima semana:**
   - Refatorar APIs existentes com os novos patterns
   - Implementar rate limiting
   - Adicionar CORS

3. **Médio prazo:**
   - Testes E2E com Cypress
   - Autenticação JWT
   - Documentação Swagger

---

## 📚 Exemplos Reais

### Exemplo 1: Cupom Validation
```typescript
import { validarCodigoCupom, ValidationError } from '@/lib/*'

export async function POST(req) {
  try {
    const { codigo } = await req.json()
    
    const check = validarCodigoCupom(codigo)
    if (!check.valido) {
      throw new ValidationError(check.erro)
    }
    
    // Buscar cupom do DB
    // ...
  } catch (error) {
    return handleApiError(error)
  }
}
```

### Exemplo 2: Agendamento Bundle
```typescript
import { validarCorpoPedidoAgendamento, ValidationError } from '@/lib/*'

export async function POST(req) {
  try {
    const body = await req.json()
    
    // Valida TUDO de uma vez
    const check = validarCorpoPedidoAgendamento(body)
    if (!check.valido) {
      throw new ValidationError('Dados inválidos', { erros: check.erros })
    }
    
    // Agora você confiar nos dados
    // Criar cliente + agendamento
    // ...
  } catch (error) {
    return handleApiError(error)
  }
}
```

---

## 🆘 Precisa de Ajuda?

1. Leia o `RELATORIO_COMPLETO_CODIGO.md` para contexto completo
2. Veja exemplos de testes em `lib/__tests__/validators.test.ts`
3. Veja exemplos de integração em `__tests__/integration/api.test.ts`
4. Use `npm run test:watch` no desenvolvimento

---

**Última atualização:** 2026-04-08  
**Versão:** 1.0
