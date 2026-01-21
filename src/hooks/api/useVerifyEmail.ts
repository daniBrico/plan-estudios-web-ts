import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { authApi } from '../../api/authApi'
import type { VerifyEmailResponse } from '../../types/types'
import type { ApiError } from '../../types/errors'

const useVerifyEmail = (): UseMutationResult<
  VerifyEmailResponse,
  ApiError,
  string
> => {
  return useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
    retry: 0
  })
}

export default useVerifyEmail
