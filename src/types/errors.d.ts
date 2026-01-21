import type { GenericResponse } from './types'

export const ErrorCodes = {
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  INVALID_CREDENTILS: 'INVALID_CREDENTIALS',
  TOKEN_INVALID: 'TOKEN_INVALID',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  EMAIL_SENT: 'EMAIL_SENT',
  VERIFICATION_EMAIL_TOO_SOON: 'VERIFICATION_EMAIL_TOO_SOON',
  VERIFICATION_EMAIL_LIMITE_REACHED: 'VERIFICATION_EMAIL_LIMITE_REACHED',
  VERIFICATION_EMAIL_SEND_FAILED: 'VERIFICATION_EMAIL_SEND_FAILED',
  GENERIC_ERROR: 'GENERIC_ERROR'
} as const

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes]

export interface ApiError extends GenericResponse {
  errorCode: ErrorCode
  emailSent?: boolean
  email?: string
}
