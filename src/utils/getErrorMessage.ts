import { errorMessages } from '../constants/errorMessages'
import type { ErrorCode } from '../types/errors'

export const getErrorMessage = (errorCode?: ErrorCode): string => {
  if (errorCode === undefined) return errorMessages.UNDEFINED

  return errorMessages[errorCode] || errorMessages.GENERIC_ERROR
}
