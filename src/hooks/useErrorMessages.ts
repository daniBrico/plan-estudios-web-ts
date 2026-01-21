import type { ErrorCode } from '../types/errors'
import { ErrorTranslator } from '../utils/ErrorTranslator'

interface UseErrorMessagesProps {
  translate: (errorCode: ErrorCode) => string
}

export const useErrorMessages = (): UseErrorMessagesProps => {
  const translate = (errorCode: ErrorCode): string =>
    ErrorTranslator.translate(errorCode, 'es') // Fixed language

  return { translate }
}
