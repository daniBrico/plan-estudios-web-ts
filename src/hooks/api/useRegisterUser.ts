import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { authApi } from '../../api/authApi'
import type { RegisterResponse, UserRegisterInputs } from '../../types/types'
import type { ApiError } from '../../types/errors'

const useRegisterUser = (): UseMutationResult<
  RegisterResponse,
  ApiError,
  UserRegisterInputs
> =>
  useMutation({
    mutationFn: authApi.registerUser
  })

export default useRegisterUser
