import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { authApi } from '../../api/authApi'
import { type ApiError } from '../../types/errors'

const useLogout = (): UseMutationResult<void, ApiError, void> => {
  return useMutation({
    mutationFn: authApi.logoutUser
  })
}

export default useLogout
