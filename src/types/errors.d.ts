import type { GenericResponse } from './types'

export const ErrorCodes = {
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  INVALID_CREDENTILS: 'INVALID_CREDENTIALS',
  EXPIRED_TOKEN: 'EXPIRED_TOKEN'
} as const

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes]

export interface ApiError extends GenericResponse {
  errorCode: ErrorCode
  emailSent?: boolean
}
