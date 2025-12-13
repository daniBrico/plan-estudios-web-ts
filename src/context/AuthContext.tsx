import { type ReactNode, useState, type JSX, useEffect } from 'react'
import { AuthContext, type AuthContextProps } from '../hooks/useAuthContext'
import type {
  UserRegisterInputs,
  User,
  UserLoginInputs,
  RegisterResponse,
  LoginResponse
  // LoginResponse
} from '../types/types'
import useRegisterUser from '../hooks/api/useRegisterUser'
import useLoginUser from '../hooks/api/useLoginUser'
import Cookies from 'js-cookie'
import useVerifyToken from '../hooks/api/useVerifyToken'
import type { ApiError } from '../types/errors'

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const registerMutation = useRegisterUser()
  const loginMutation = useLoginUser()
  const verifyToken = useVerifyToken()

  const resetAuthState = (): void => {
    Cookies.remove('token')
    setUser(null)
    setIsAuthenticated(false)
  }

  const signUp = async (
    userRegisterInputs: UserRegisterInputs,
    onSuccess?: (res: RegisterResponse) => void,
    onError?: (error: ApiError) => void
  ): Promise<void> => {
    registerMutation.mutate(userRegisterInputs, {
      onSuccess: (res) => onSuccess?.(res),
      onError: (err) => onError?.(err)
    })
  }

  const signIn = async (
    loginData: UserLoginInputs,
    onSuccess?: (res: LoginResponse) => void,
    onError?: (error: ApiError) => void
  ): Promise<void> => {
    setError('')
    loginMutation.mutate(loginData, {
      onSuccess: (res) => {
        if (res.user) {
          setUser(res.user)
          setIsAuthenticated(true)
          return
        }

        onSuccess?.(res)
      },
      onError: (err) => onError?.(err)
    })
  }

  const logout = (): void => resetAuthState()

  useEffect(() => {
    if (verifyToken.isSuccess && verifyToken.data.user) {
      setUser(verifyToken.data.user)
      setIsAuthenticated(true)
    }

    if (verifyToken.isError) resetAuthState()
  }, [verifyToken.status])

  const value: AuthContextProps = {
    user,
    signUp,
    signIn,
    logout,
    isAuthenticated,
    error,
    isRegistering: registerMutation.isPending,
    isLogin: loginMutation.isPending
  }

  return <AuthContext value={value}>{children}</AuthContext>
}

export default AuthProvider
