import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { authApi } from '../../api/authApi'
import type { RegisterResponse } from '../../types/types'
import type { ApiError } from '../../types/errors'
import type { RegisterFormFields } from '../../schemas/auth/register.schema'

const useRegisterUser = (): UseMutationResult<
  RegisterResponse,
  ApiError,
  RegisterFormFields
> =>
  useMutation({
    mutationFn: authApi.registerUser
  })

export default useRegisterUser
