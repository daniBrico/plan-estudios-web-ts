import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { authApi } from '../../api/authApi'
import { type VerifyTokenResponse } from '../../types/types'
import Cookies from 'js-cookie'

const useVerifyToken = (): UseQueryResult<VerifyTokenResponse> => {
  const token = Cookies.get('token')

  return useQuery({
    queryKey: ['verify-token'],
    queryFn: authApi.verifyToken,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    enabled: Boolean(token)
  })
}

export default useVerifyToken
