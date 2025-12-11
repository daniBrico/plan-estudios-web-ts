import { createContext, useContext } from 'react'
import type {
  UserRegisterInputs,
  User,
  UserLoginInputs,
  RegisterResponse
} from '../types/types'

export interface AuthContextProps {
  user: User | null
  signUp: (
    userRegisterInputs: UserRegisterInputs,
    onFinished?: (res: RegisterResponse) => void
  ) => Promise<void>
  signIn: (loginData: UserLoginInputs) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
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
