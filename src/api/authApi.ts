import type {
  UserRegisterInputs,
  RegisterResponse,
  UserLoginInputs,
  LoginResponse
} from '../types/types'
import httpClient from './httpClient'

const AUTH_API_PREFIX = '/auth'

export const authApi = {
  registerUser: async (data: UserRegisterInputs): Promise<RegisterResponse> => {
    const res = await httpClient.post<RegisterResponse>(
      `${AUTH_API_PREFIX}/register`,
      data
    )

    return res.data
  },
  loginUser: async (data: UserLoginInputs): Promise<LoginResponse> => {
    const res = await httpClient.post(`${AUTH_API_PREFIX}/login`, data)

    return res.data
  }
}
