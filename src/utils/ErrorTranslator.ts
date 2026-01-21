import type { ErrorCode } from '../types/errors'
import { errorMessages } from '../constants/errorMessages'

export const ErrorTranslator = {
  translate(errorCode: ErrorCode, language: 'es' | 'en' = 'es'): string {
    return (
      errorMessages[language][errorCode] ||
      errorMessages[language].GENERIC_ERROR
    )
  }
}
