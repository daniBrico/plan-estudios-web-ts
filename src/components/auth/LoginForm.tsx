import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { useEffect, type JSX } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useAuthContext } from '../../hooks/useAuthContext'
import { LoadingSpinner2 } from '../LoadingSpinner2'
import type { LoginResponse, UserLoginInputs } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import NotificationMessage from '../NotificationMessage'
import { useNotificationMessage } from '../../hooks/useNotificationMessage'
import { useErrorMessages } from '../../hooks/useErrorMessages'
import type { ApiError } from '../../types/errors'

const userLoginSchema = z.object({
  email: z.email('Debe ser un mail valido'),
  password: z.string('')
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
    formState: { errors }
  } = useForm({
    resolver: zodResolver(userLoginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const onSubmit = (userLoginInputs: UserLoginInputs): void => {
    signIn(
      userLoginInputs,
      (res: LoginResponse) => {
        console.log(res)
      },
      (error: ApiError) => {
        location('/verify-email', {
          state: {
            fromLogin: true,
            emailSent: error.emailSent
          }
        })
        const userMessage = translate(error.errorCode)
        showNotificationMessage(userMessage)
      }
    )
  }

  useEffect(() => {
    if (!isAuthenticated) return

    navigate('/inicio')
  }, [isAuthenticated])

  return (
    <div className="relative">
      <form
        className="relative z-100 flex h-full min-w-md flex-col gap-6 rounded-md bg-gray-50 px-8 py-4 shadow-md [&_input]:w-full [&_input]:rounded-md [&_input]:border [&_input]:border-gray-300 [&_input]:bg-gray-100 [&_input]:px-4 [&_input]:py-1 [&_input]:text-lg [&_input]:placeholder:text-gray-400 [&_input]:focus:outline-gray-400"
        action="submit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-lg font-semibold text-gray-700 md:text-2xl lg:text-3xl dark:text-stone-200">
          Ingrese sus datos
        </h1>
        <div className="relative">
          <input {...register('email')} type="text" placeholder="Mail" />
          <p
            className={classNames(
              'absolute pl-0.5 text-sm text-red-500 transition-all duration-300 ease-in-out',
              {
                'translate-y-0.5 opacity-100': errors.email,
                'pointer-events-none -translate-y-1 opacity-0': !errors.email
              }
            )}
          >
            {errors.email?.message}
          </p>
        </div>
        <div className="relative">
          <input
            {...register('password')}
            type="password"
            placeholder="Contraseña"
          />
          <p
            className={classNames(
              'absolute pl-0.5 text-sm text-red-500 transition-all duration-300 ease-in-out',
              {
                'translate-y-0.5 opacity-100': errors.password,
                'pointer-events-none -translate-y-1 opacity-0': !errors.password
              }
            )}
          >
            {errors.password?.message}
          </p>
        </div>
        <div className="flex w-full justify-center">
          <button
            className="relative cursor-pointer rounded-md bg-gray-600 px-2 py-1 text-lg text-white transition-all duration-300 ease-in-out hover:bg-gray-500 disabled:cursor-auto disabled:bg-gray-500 dark:bg-stone-700 dark:hover:bg-stone-800"
            type="submit"
            disabled={isLogin}
          >
            Ingresar
            {isLogin && (
              <div className="absolute top-0 -right-12 cursor-auto">
                <LoadingSpinner2
                  size="w-9 h-9"
                  thickness="border-4"
                  color="border-t-gray-600"
                />
              </div>
            )}
          </button>
        </div>
        <p
          className={classNames(
            'absolute pl-0.5 text-sm text-red-500 transition-all duration-300 ease-in-out',
            {
              'translate-y-0.5 opacity-100': errors.root,
              'pointer-events-none -translate-y-1 opacity-0': !errors.root
            }
          )}
        >
          {errors.root?.message}
        </p>
      </form>
      <NotificationMessage show={showMessage} message={message} />
    </div>
  )
}

export default LoginForm
