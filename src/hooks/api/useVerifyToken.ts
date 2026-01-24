import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { authApi } from '../../api/authApi'
import { type VerifyTokenResponse } from '../../types/types'

const useVerifyToken = (): UseQueryResult<VerifyTokenResponse> => {
  return useQuery({
    queryKey: ['verify-token'],
    queryFn: authApi.verifyToken,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
  })
}

export default useVerifyToken
