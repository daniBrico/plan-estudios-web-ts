import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { authApi } from '../../api/authApi'
import type { LoginResponse, UserLoginInputs } from '../../types/types'

const useLoginUser = (): UseMutationResult<
  LoginResponse,
  unknown,
  UserLoginInputs
> => useMutation({ mutationFn: authApi.loginUser })

export default useLoginUser
