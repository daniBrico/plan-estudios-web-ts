import { type ReactNode, useState, type JSX } from 'react'
import { AuthContext, type AuthContextProps } from '../hooks/useAuthContext'
import type { RegisterPayload } from '../types/types'

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<RegisterPayload | null>(null)

  const value: AuthContextProps = { user }

  return <AuthContext value={value}>{children}</AuthContext>
}

export default AuthProvider
