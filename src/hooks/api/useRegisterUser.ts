import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { authApi } from '../../api/authApi'
import type { RegisterResponse, UserRegisterInputs } from '../../types/types'

const useRegisterUser = (): UseMutationResult<
  RegisterResponse,
  unknown,
  UserRegisterInputs
> => {
  return useMutation({
    mutationFn: authApi.registerUser,
    onSuccess: (data) => {
      console.log('Usuario registrado con éxtito: ', data)
    },
    onError: (error) => {
      console.log('Error al registrarse: ', error)
    }
  })
}

export default useRegisterUser
