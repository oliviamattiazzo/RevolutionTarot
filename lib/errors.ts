// lib/errors.ts
// Tratamento centralizado de erros com logging

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR',
    public details?: Record<string, any>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 400, 'VALIDATION_ERROR', details)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(`${resource} não encontrado`, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Não autorizado') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT')
    this.name = 'ConflictError'
  }
}

// ── Logging ──────────────────────────────────────────────────────────────────

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: Record<string, any>
  error?: string
}

function formatLogEntry(entry: LogEntry): string {
  const { timestamp, level, message, data, error } = entry
  let formatted = `[${timestamp}] ${level}: ${message}`
  if (data) formatted += ` | ${JSON.stringify(data)}`
  if (error) formatted += ` | Error: ${error}`
  return formatted
}

export const logger = {
  debug: (message: string, data?: Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: LogLevel.DEBUG,
        message,
        data,
      }
      console.log(formatLogEntry(entry))
    }
  },
  info: (message: string, data?: Record<string, any>) => {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      message,
      data,
    }
    console.log(formatLogEntry(entry))
  },
  warn: (message: string, data?: Record<string, any>) => {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.WARN,
      message,
      data,
    }
    console.warn(formatLogEntry(entry))
  },
  error: (message: string, error?: Error, data?: Record<string, any>) => {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      message,
      data,
      error: error?.message,
    }
    console.error(formatLogEntry(entry))
  },
}

// ── Handler de erros para API routes ──────────────────────────────────────────

import { NextResponse } from 'next/server'

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    logger.warn(error.message, { code: error.code, statusCode: error.statusCode })
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        ...(error.details && { details: error.details }),
      },
      { status: error.statusCode }
    )
  }

  if (error instanceof Error) {
    logger.error('Erro desconhecido', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }

  logger.error('Erro não capturado')
  return NextResponse.json(
    { error: 'Erro interno do servidor', code: 'INTERNAL_ERROR' },
    { status: 500 }
  )
}
