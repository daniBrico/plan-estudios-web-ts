import type { RegisterPayload, RegisterResponse } from '../types/types'
import httpClient from './httpClient'

const AUTH_API_PREFIX = '/auth'

export const authApi = {
  registerUser: async (data: RegisterPayload): Promise<RegisterResponse> => {
    const res = await httpClient.post<RegisterResponse>(
      `${AUTH_API_PREFIX}/register`,
      data
    )

    return res.data
  }
}
