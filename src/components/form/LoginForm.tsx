import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, type JSX } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import NotificationMessage from '../NotificationMessage'
import { useNotificationMessage } from '../../hooks/useNotificationMessage'
import { useErrorMessages } from '../../hooks/useErrorMessages'
import type { ApiError } from '../../types/errors'
import FormInput from './FormInput'
import SubmitButton from './SubmitButton'
import type { LoginFormFields } from '../../schemas/auth/login.schema'

const userLoginSchema = z.object({
  email: z.email('Debe ser un mail valido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
})

const LoginForm = (): JSX.Element => {
  const { isLogin, signIn, isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const { message, showMessage, showNotificationMessage } =
    useNotificationMessage()
  const { translate } = useErrorMessages()
  const location = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({
    resolver: zodResolver(userLoginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const handleLoginError = (error: ApiError): void => {
    if (error.errorCode !== 'INVALID_CREDENTIALS')
      location('/verify-email-info', {
        state: {
          fromLogin: true,
          email: error.email,
          errorCode: error.errorCode
        }
      })

    const userMessage = translate(error.errorCode)
    showNotificationMessage(userMessage)
  }

  const onSubmit = (LoginFormFields: LoginFormFields): void => {
    signIn(LoginFormFields, handleLoginError)
  }

  useEffect(() => {
    if (!isAuthenticated) return

    navigate('/inicio')
  }, [isAuthenticated])

  useEffect(() => {
    if (Object.keys(errors).length === 0) return

    const showErrorTimer = setTimeout(() => {
      clearErrors()
    }, 3000)

    return (): void => clearTimeout(showErrorTimer)
  }, [errors.email, errors.password])

  return (
    <div className="relative">
      <form
        className="relative z-100 flex w-full flex-col gap-3 rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 shadow-md sm:px-6 sm:py-4 dark:border dark:border-stone-800 dark:bg-stone-900 [&_input]:w-full [&_input]:rounded-md [&_input]:border [&_input]:border-gray-300 [&_input]:bg-gray-100 [&_input]:px-2 [&_input]:py-1 [&_input]:text-base [&_input]:placeholder:text-gray-400 [&_input]:focus:outline-gray-400 md:[&_input]:text-lg [&_input]:dark:border-stone-700 [&_input]:dark:bg-stone-800 [&_input]:dark:text-stone-200 [&_input]:dark:placeholder:text-stone-500 [&_input]:dark:focus:outline-1 [&_input]:dark:focus:outline-stone-500"
        action="submit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-lg font-semibold text-gray-700 sm:text-xl md:text-2xl dark:text-stone-200">
          Ingrese sus datos
        </h1>
        <div className="flex flex-col gap-6">
          <FormInput
            name="email"
            placeholder="Mail"
            type="email"
            autocomplete="email"
            register={register('email')}
            error={errors.email}
          />
          <FormInput
            name="password"
            placeholder="Contraseña"
            type="password"
            register={register('password')}
            error={errors.password}
            autocomplete="current-password"
          />
          <SubmitButton loading={isLogin} label="Ingresar" />
        </div>
      </form>
      <NotificationMessage show={showMessage} message={message} />
    </div>
  )
}

export default LoginForm
