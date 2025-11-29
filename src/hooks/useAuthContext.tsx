import { createContext, useContext } from 'react'
import type { RegisterPayload } from '../types/types'

export interface AuthContextProps {
  user: RegisterPayload | null
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext)

  if (!context)
    throw new Error('useAuthContext must be used within an AuthProvider')

  return context
}
