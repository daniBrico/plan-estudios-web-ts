import { type ReactNode, useState, type JSX, useEffect } from 'react'
import { AuthContext, type AuthContextProps } from '../hooks/useAuthContext'
import type { User, RegisterResponse, LoginResponse } from '../types/types'
import useRegisterUser from '../hooks/api/useRegisterUser'
import useLoginUser from '../hooks/api/useLoginUser'
import useVerifyToken from '../hooks/api/useVerifyToken'
import type { ApiError } from '../types/errors'
import type { RegisterFormFields } from '../schemas/auth/register.schema'
import type { LoginFormFields } from '../schemas/auth/login.schema'
import useLogout from '../hooks/api/useLogout'

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')

  const registerMutation = useRegisterUser()
  const loginMutation = useLoginUser()
  const logoutMutation = useLogout()
  const verifyToken = useVerifyToken()

  const clearAuthState = (): void => setUser(null)

  const signUp = async (
    RegisterFormFields: RegisterFormFields,
    onSuccess?: (res: RegisterResponse) => void,
    onError?: (error: ApiError) => void
  ): Promise<void> => {
    registerMutation.mutate(RegisterFormFields, {
      onSuccess: (res) => onSuccess?.(res),
      onError: (err) => onError?.(err)
    })
  }

  const signIn = async (
    loginData: LoginFormFields,
    onSuccess?: (res: LoginResponse) => void,
    onError?: (error: ApiError) => void
  ): Promise<void> => {
    setError('')
    loginMutation.mutate(loginData, {
      onSuccess: (res) => {
        if (res.user) {
          setUser(res.user)
          return
        }

        onSuccess?.(res)
      },
      onError: (err) => onError?.(err)
    })
  }

  const logout = async (): Promise<void> => {
    await logoutMutation.mutateAsync()
    clearAuthState()
  }

  useEffect(() => {
    if (verifyToken.isSuccess && verifyToken.data.user) {
      setUser(verifyToken.data.user)
    }

    if (verifyToken.isError) clearAuthState()
  }, [verifyToken.status])

  const isAuthenticated = Boolean(user)

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
