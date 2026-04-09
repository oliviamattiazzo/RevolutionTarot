// lib/validators.ts
// Funções de validação reutilizáveis com tratamento de erros

export class ValidationError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

// ── Email ────────────────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validarEmail(email: string): { valido: boolean; erro?: string } {
  if (!email || typeof email !== 'string') {
    return { valido: false, erro: 'Email é obrigatório' }
  }
  const trimmed = email.trim()
  if (!EMAIL_REGEX.test(trimmed)) {
    return { valido: false, erro: 'Email inválido' }
  }
  if (trimmed.length > 254) {
    return { valido: false, erro: 'Email muito longo' }
  }
  return { valido: true }
}

// ── Nome ─────────────────────────────────────────────────────────────────────

export function validarNome(nome: string): { valido: boolean; erro?: string } {
  if (!nome || typeof nome !== 'string') {
    return { valido: false, erro: 'Nome é obrigatório' }
  }
  const trimmed = nome.trim()
  if (trimmed.length < 3) {
    return { valido: false, erro: 'Nome muito curto (mín. 3 caracteres)' }
  }
  if (trimmed.length > 100) {
    return { valido: false, erro: 'Nome muito longo' }
  }
  return { valido: true }
}

// ── Telefone ─────────────────────────────────────────────────────────────────

export function validarTelefone(telefone: string): { valido: boolean; erro?: string } {
  if (!telefone || typeof telefone !== 'string') {
    return { valido: false, erro: 'Telefone é obrigatório' }
  }
  const numeros = telefone.replace(/\D/g, '')
  if (numeros.length < 7) {
    return { valido: false, erro: 'Telefone inválido' }
  }
  if (numeros.length > 15) {
    return { valido: false, erro: 'Telefone muito longo' }
  }
  return { valido: true }
}

// ── Preço ────────────────────────────────────────────────────────────────────

export function validarPreco(preco: any): { valido: boolean; erro?: string } {
  if (preco === null || preco === undefined) {
    return { valido: false, erro: 'Preço é obrigatório' }
  }
  const num = Number(preco)
  if (isNaN(num) || num < 0) {
    return { valido: false, erro: 'Preço deve ser um número positivo' }
  }
  if (num > 999999) {
    return { valido: false, erro: 'Preço muito alto' }
  }
  return { valido: true }
}

// ── Desconto (tipo cupom) ────────────────────────────────────────────────────

export function validarDesconto(desconto: any): { valido: boolean; erro?: string } {
  const validPrice = validarPreco(desconto)
  if (!validPrice.valido) {
    return validPrice
  }
  const num = Number(desconto)
  if (num > 100) {
    return { valido: false, erro: 'Desconto não pode ser maior que 100%' }
  }
  return { valido: true }
}

// ── ID de Moeda ──────────────────────────────────────────────────────────────

export function validarMoeda(moeda: any): { valido: boolean; erro?: string } {
  const moedas = ['BRL', 'USD', 'EUR']
  if (!moedas.includes(moeda)) {
    return { valido: false, erro: 'Moeda inválida' }
  }
  return { valido: true }
}

// ── Idioma ───────────────────────────────────────────────────────────────────

export function validarIdioma(idioma: any): { valido: boolean; erro?: string } {
  const idiomas = ['pt', 'es', 'en']
  if (!idiomas.includes(idioma)) {
    return { valido: false, erro: 'Idioma inválido' }
  }
  return { valido: true }
}

// ── Canal de contato ─────────────────────────────────────────────────────────

export function validarCanal(canal: any): { valido: boolean; erro?: string } {
  const canais = ['whatsapp', 'telegram']
  if (!canais.includes(canal)) {
    return { valido: false, erro: 'Canal de contato inválido' }
  }
  return { valido: true }
}

// ── Método de pagamento ──────────────────────────────────────────────────────

export function validarMetodoPagamento(metodo: any): { valido: boolean; erro?: string } {
  const metodos = ['pix', 'revolut', 'cartao']
  if (metodo && !metodos.includes(metodo)) {
    return { valido: false, erro: 'Método de pagamento inválido' }
  }
  return { valido: true }
}

// ── Código de Cupom ──────────────────────────────────────────────────────────

export function validarCodigoCupom(codigo: any): { valido: boolean; erro?: string } {
  if (!codigo || typeof codigo !== 'string') {
    return { valido: false, erro: 'Código do cupom é obrigatório' }
  }
  const trimmed = codigo.trim().toUpperCase()
  if (!/^[A-Z0-9]+$/.test(trimmed)) {
    return { valido: false, erro: 'Código de cupom deve conter apenas letras e números' }
  }
  if (trimmed.length < 3 || trimmed.length > 50) {
    return { valido: false, erro: 'Comprimento do código de cupom inválido' }
  }
  return { valido: true }
}

// ── Nota (observações) ───────────────────────────────────────────────────────

export function validarNota(nota: any): { valido: boolean; erro?: string } {
  if (nota === null || nota === undefined) return { valido: true } // opcional
  if (typeof nota !== 'string') {
    return { valido: false, erro: 'Nota deve ser texto' }
  }
  if (nota.trim().length > 500) {
    return { valido: false, erro: 'Nota muito longa (máx. 500 caracteres)' }
  }
  return { valido: true }
}

// ── Bundle validation ────────────────────────────────────────────────────────

export function validarCorpoPedidoAgendamento(body: any): {
  valido: boolean
  erros: string[]
} {
  const erros: string[] = []

  // Step 1
  const checkTirada = validarMoeda(body.moeda)
  if (!checkTirada.valido) erros.push(`Moeda: ${checkTirada.erro}`)

  // Step 2
  if (!body.dataAgendada) {
    erros.push('Data do agendamento é obrigatória')
  }

  // Step 3
  const checkNome = validarNome(body.nome)
  if (!checkNome.valido) erros.push(`Nome: ${checkNome.erro}`)

  const checkEmail = validarEmail(body.email)
  if (!checkEmail.valido) erros.push(`Email: ${checkEmail.erro}`)

  const checkCanal = validarCanal(body.canal)
  if (!checkCanal.valido) erros.push(`Canal: ${checkCanal.erro}`)

  const checkContato = validarTelefone(body.contato)
  if (!checkContato.valido) erros.push(`Contato: ${checkContato.erro}`)

  // Preço
  const checkPreco = validarPreco(body.totalBrl)
  if (!checkPreco.valido) erros.push(`Preço: ${checkPreco.erro}`)

  return {
    valido: erros.length === 0,
    erros,
  }
}
