import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { authApi } from '../../api/authApi'
import type { RegisterResponse, UserRegisterInputs } from '../../types/types'

const useRegisterUser = (): UseMutationResult<
  RegisterResponse,
  unknown,
  UserRegisterInputs
> =>
  useMutation({
    mutationFn: authApi.registerUser
  })

export default useRegisterUser
