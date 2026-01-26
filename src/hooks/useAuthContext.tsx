import { createContext, useContext } from 'react'
import type { User, RegisterResponse } from '../types/types'
import type { ApiError } from '../types/errors'
import type { RegisterFormFields } from '../schemas/auth/register.schema'
import type { LoginFormFields } from '../schemas/auth/login.schema'

export interface AuthContextProps {
  user: User | null
  signUp: (
    RegisterFormFields: RegisterFormFields,
    onSuccess?: (res: RegisterResponse) => void,
    onError?: (error: ApiError) => void
  ) => Promise<void>
  signIn: (
    loginData: LoginFormFields,
    onError?: (error: ApiError) => void
  ) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isAuthLoading: boolean
  error: string
  isRegistering: boolean
  isLogin: boolean
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext)

  if (!context)
    throw new Error('useAuthContext must be used within an AuthProvider')

  return context
}
