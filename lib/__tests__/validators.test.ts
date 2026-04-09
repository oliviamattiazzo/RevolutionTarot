/**
 * lib/__tests__/validators.test.ts
 * Testes unitários para funcções de validação
 * 
 * Rodar: npm test lib/__tests__/validators.test.ts
 */

import {
  validarEmail,
  validarNome,
  validarTelefone,
  validarPreco,
  validarDesconto,
  validarMoeda,
  validarIdioma,
  validarCanal,
  validarMetodoPagamento,
  validarCodigoCupom,
  validarNota,
  validarCorpoPedidoAgendamento,
} from '@/lib/validators'

describe('Validators', () => {
  // ── Email ────────────────────────────────────────────────────────────────────

  describe('validarEmail', () => {
    it('deve aceitar email válido', () => {
      const result = validarEmail('user@example.com')
      expect(result.valido).toBe(true)
      expect(result.erro).toBeUndefined()
    })

    it('deve rejeitar email sem @', () => {
      const result = validarEmail('invalid-email')
      expect(result.valido).toBe(false)
      expect(result.erro).toBeDefined()
    })

    it('deve rejeitar email vazio', () => {
      const result = validarEmail('')
      expect(result.valido).toBe(false)
    })

    it('deve rejeitar email não-string', () => {
      const result = validarEmail(123 as any)
      expect(result.valido).toBe(false)
    })

    it('deve rejeitar email muito longo', () => {
      const result = validarEmail('a'.repeat(250) + '@example.com')
      expect(result.valido).toBe(false)
    })

    it('deve aceitar email com múltiplos subdomínios', () => {
      const result = validarEmail('user@mail.example.co.uk')
      expect(result.valido).toBe(true)
    })
  })

  // ── Nome ─────────────────────────────────────────────────────────────────────

  describe('validarNome', () => {
    it('deve aceitar nome válido', () => {
      const result = validarNome('João Silva')
      expect(result.valido).toBe(true)
    })

    it('deve rejeitar nome muito curto', () => {
      const result = validarNome('Jo')
      expect(result.valido).toBe(false)
    })

    it('deve rejeitar nome vazio', () => {
      const result = validarNome('')
      expect(result.valido).toBe(false)
    })

    it('deve rejeitar nome muito longo', () => {
      const result = validarNome('A'.repeat(101))
      expect(result.valido).toBe(false)
    })

    it('deve trim espaços em branco', () => {
      const result = validarNome('  João  ')
      expect(result.valido).toBe(true)
    })
  })

  // ── Telefone ─────────────────────────────────────────────────────────────────

  describe('validarTelefone', () => {
    it('deve aceitar telefone válido', () => {
      const result = validarTelefone('939189631')
      expect(result.valido).toBe(true)
    })

    it('deve aceitar telefone com +', () => {
      const result = validarTelefone('+351 939 189 631')
      expect(result.valido).toBe(true)
    })

    it('deve rejeitar telefone muito curto', () => {
      const result = validarTelefone('123')
      expect(result.valido).toBe(false)
    })

    it('deve rejeitar telefone muito longo', () => {
      const result = validarTelefone('1'.repeat(20))
      expect(result.valido).toBe(false)
    })

    it('deve rejeitar telefone vazio', () => {
      const result = validarTelefone('')
      expect(result.valido).toBe(false)
    })
  })

  // ── Preço ────────────────────────────────────────────────────────────────────

  describe('validarPreco', () => {
    it('deve aceitar preço válido', () => {
      const result = validarPreco(100)
      expect(result.valido).toBe(true)
    })

    it('deve aceitar preço zero', () => {
      const result = validarPreco(0)
      expect(result.valido).toBe(true)
    })

    it('deve aceitar preço em string', () => {
      const result = validarPreco('99.90')
      expect(result.valido).toBe(true)
    })

    it('deve rejeitar preço negativo', () => {
      const result = validarPreco(-10)
      expect(result.valido).toBe(false)
    })

    it('deve rejeitar preço muito alto', () => {
      const result = validarPreco(1000000)
      expect(result.valido).toBe(false)
    })

    it('deve rejeitar preço não-número', () => {
      const result = validarPreco('abc')
      expect(result.valido).toBe(false)
    })
  })

  // ── Desconto ─────────────────────────────────────────────────────────────────

  describe('validarDesconto', () => {
    it('deve aceitar desconto 50%', () => {
      const result = validarDesconto(50)
      expect(result.valido).toBe(true)
    })

    it('deve aceitar desconto 0%', () => {
      const result = validarDesconto(0)
      expect(result.valido).toBe(true)
    })

    it('deve rejeitar desconto > 100%', () => {
      const result = validarDesconto(101)
      expect(result.valido).toBe(false)
    })

    it('deve rejeitar desconto negativo', () => {
      const result = validarDesconto(-10)
      expect(result.valido).toBe(false)
    })
  })

  // ── Moeda ────────────────────────────────────────────────────────────────────

  describe('validarMoeda', () => {
    it('deve aceitar BRL', () => {
      const result = validarMoeda('BRL')
      expect(result.valido).toBe(true)
    })

    it('deve aceitar USD', () => {
      const result = validarMoeda('USD')
      expect(result.valido).toBe(true)
    })

    it('deve aceitar EUR', () => {
      const result = validarMoeda('EUR')
      expect(result.valido).toBe(true)
    })

    it('deve rejeitar moeda inválida', () => {
      const result = validarMoeda('JPY')
      expect(result.valido).toBe(false)
    })
  })

  // ── Idioma ───────────────────────────────────────────────────────────────────

  describe('validarIdioma', () => {
    it('deve aceitar pt', () => {
      const result = validarIdioma('pt')
      expect(result.valido).toBe(true)
    })

    it('deve aceitar es', () => {
      const result = validarIdioma('es')
      expect(result.valido).toBe(true)
    })

    it('deve aceitar en', () => {
      const result = validarIdioma('en')
      expect(result.valido).toBe(true)
    })

    it('deve rejeitar idioma inválido', () => {
      const result = validarIdioma('fr')
      expect(result.valido).toBe(false)
    })
  })

  // ── Canal ────────────────────────────────────────────────────────────────────

  describe('validarCanal', () => {
    it('deve aceitar whatsapp', () => {
      const result = validarCanal('whatsapp')
      expect(result.valido).toBe(true)
    })

    it('deve aceitar telegram', () => {
      const result = validarCanal('telegram')
      expect(result.valido).toBe(true)
    })

    it('deve rejeitar canal inválido', () => {
      const result = validarCanal('email')
      expect(result.valido).toBe(false)
    })
  })

  // ── Método de pagamento ──────────────────────────────────────────────────────

  describe('validarMetodoPagamento', () => {
    it('deve aceitar pix', () => {
      const result = validarMetodoPagamento('pix')
      expect(result.valido).toBe(true)
    })

    it('deve aceitar revolut', () => {
      const result = validarMetodoPagamento('revolut')
      expect(result.valido).toBe(true)
    })

    it('deve aceitar cartao', () => {
      const result = validarMetodoPagamento('cartao')
      expect(result.valido).toBe(true)
    })

    it('deve rejeitar método inválido', () => {
      const result = validarMetodoPagamento('bitcoin')
      expect(result.valido).toBe(false)
    })

    it('deve permitir null (opcional)', () => {
      const result = validarMetodoPagamento(null)
      expect(result.valido).toBe(true)
    })
  })

  // ── Código de cupom ──────────────────────────────────────────────────────────

  describe('validarCodigoCupom', () => {
    it('deve aceitar código válido', () => {
      const result = validarCodigoCupom('PROMO123')
      expect(result.valido).toBe(true)
    })

    it('deve rejeitar código com caracteres especiais', () => {
      const result = validarCodigoCupom('PROMO@123')
      expect(result.valido).toBe(false)
    })

    it('deve rejeitar código muito curto', () => {
      const result = validarCodigoCupom('AB')
      expect(result.valido).toBe(false)
    })

    it('deve rejeitar código muito longo', () => {
      const result = validarCodigoCupom('A'.repeat(51))
      expect(result.valido).toBe(false)
    })

    it('deve converter para maiúscula', () => {
      const result = validarCodigoCupom('promo123')
      expect(result.valido).toBe(true)
    })
  })

  // ── Nota ─────────────────────────────────────────────────────────────────────

  describe('validarNota', () => {
    it('deve aceitar nota válida', () => {
      const result = validarNota('Nota de teste')
      expect(result.valido).toBe(true)
    })

    it('deve aceitar nota vazia (opcional)', () => {
      const result = validarNota('')
      expect(result.valido).toBe(true)
    })

    it('deve aceitar null (opcional)', () => {
      const result = validarNota(null)
      expect(result.valido).toBe(true)
    })

    it('deve rejeitar nota muito longa', () => {
      const result = validarNota('A'.repeat(501))
      expect(result.valido).toBe(false)
    })

    it('deve rejeitar nota não-string', () => {
      const result = validarNota(123)
      expect(result.valido).toBe(false)
    })
  })

  // ── Bundle validation ────────────────────────────────────────────────────────

  describe('validarCorpoPedidoAgendamento', () => {
    const validBody = {
      moeda: 'BRL',
      dataAgendada: '2026-04-10',
      nome: 'João Silva',
      email: 'joao@example.com',
      canal: 'whatsapp',
      contato: '939189631',
      totalBrl: 150,
    }

    it('deve aceitar corpo válido', () => {
      const result = validarCorpoPedidoAgendamento(validBody)
      expect(result.valido).toBe(true)
      expect(result.erros).toHaveLength(0)
    })

    it('deve rejeitar corpo com moeda inválida', () => {
      const result = validarCorpoPedidoAgendamento({ ...validBody, moeda: 'JPY' })
      expect(result.valido).toBe(false)
      expect(result.erros.length).toBeGreaterThan(0)
    })

    it('deve rejeitar corpo sem data', () => {
      const { dataAgendada, ...body } = validBody
      const result = validarCorpoPedidoAgendamento(body)
      expect(result.valido).toBe(false)
    })

    it('deve coletar múltiplos erros', () => {
      const result = validarCorpoPedidoAgendamento({
        moeda: 'INVALID',
        nome: 'Jo',
        email: 'invalid',
        canal: 'invalid',
        contato: '123',
        totalBrl: -50,
      })
      expect(result.valido).toBe(false)
      expect(result.erros.length).toBeGreaterThan(1)
    })
  })
})
