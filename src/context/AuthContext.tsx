import { type ReactNode, useState, type JSX } from 'react'
import { AuthContext, type AuthContextProps } from '../hooks/useAuthContext'
import type { UserRegisterInputs, User } from '../types/types'
import useRegisterUser from '../hooks/api/useRegisterUser'

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const registerMutation = useRegisterUser()

  const signUp = async (
    userRegisterInputs: UserRegisterInputs
  ): Promise<void> => {
    registerMutation.mutate(userRegisterInputs, {
      onSuccess: (res) => {
        setUser(res.user)
        setIsAuthenticated(true)
      },
      onError: (err) => {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Unknown error')
        }
      }
    })
  }

  const value: AuthContextProps = {
    user,
    signUp,
    isAuthenticated,
    error,
    isRegistering: registerMutation.isPending
  }

  return <AuthContext value={value}>{children}</AuthContext>
}

export default AuthProvider
