import type { LoginFormFields } from '../schemas/auth/login.schema'
import type { RegisterFormFields } from '../schemas/auth/register.schema'
import type {
  RegisterResponse,
  LoginResponse,
  VerifyTokenResponse,
  VerifyEmailResponse
} from '../types/types'
import httpClient from './httpClient'

const AUTH_API_PREFIX = '/auth'

export const authApi = {
  registerUser: async (data: RegisterFormFields): Promise<RegisterResponse> => {
    const res = await httpClient.post<RegisterResponse>(
      `${AUTH_API_PREFIX}/register`,
      data
    )

    return res.data
  },
  loginUser: async (data: LoginFormFields): Promise<LoginResponse> => {
    const res = await httpClient.post(`${AUTH_API_PREFIX}/login`, data)

    return res.data
  },
  logoutUser: async (): Promise<void> => {
    await httpClient.post(`${AUTH_API_PREFIX}/logout`)
  },
  verifyToken: async (): Promise<VerifyTokenResponse> => {
    const res = await httpClient.get<VerifyTokenResponse>(
      `${AUTH_API_PREFIX}/verify/token`
    )

    return res.data
  },
  verifyEmail: async (token: string): Promise<VerifyEmailResponse> => {
    const res = await httpClient.post<VerifyEmailResponse>(
      `${AUTH_API_PREFIX}/verify/email`,
      { token }
    )

    return res.data
  }
}
