import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { authApi } from '../../api/authApi'
import type { LoginResponse } from '../../types/types'
import type { ApiError } from '../../types/errors'
import type { LoginFormFields } from '../../schemas/auth/login.schema'

const useLoginUser = (): UseMutationResult<
  LoginResponse,
  ApiError,
  LoginFormFields
> => useMutation({ mutationFn: authApi.loginUser })

export default useLoginUser
