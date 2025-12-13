import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { authApi } from '../../api/authApi'
import type { LoginResponse, UserLoginInputs } from '../../types/types'
import type { ApiError } from '../../types/errors'

const useLoginUser = (): UseMutationResult<
  LoginResponse,
  ApiError,
  UserLoginInputs
> => useMutation({ mutationFn: authApi.loginUser })

export default useLoginUser
