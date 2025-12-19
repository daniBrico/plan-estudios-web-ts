import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { useEffect, useState, type JSX } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { LoadingSpinner2 } from './LoadingSpinner2'
import type { RegisterResponse, UserRegisterInputs } from '../types/types'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import NotificationMessage from './NotificationMessage'
import type { ApiError } from '../types/errors'
import { useErrorMessages } from '../hooks/useErrorMessages'

const userSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos dos caracteres')
    .max(50, 'El nombre no debe superar los 50 caracteres'),
  lastName: z
    .string()
    .min(2, 'El apellido debe tener al menos dos caracteres')
    .max(50, 'El apellido no debe superar los 50 caracteres'),
  email: z.email('Debe ser un email valido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
})

type FormFields = z.infer<typeof userSchema>

const RegisterForm = (): JSX.Element => {
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const { signUp, isRegistering } = useAuthContext()
  const location = useNavigate()
  const { translate } = useErrorMessages()

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<FormFields>({
    resolver: zodResolver(userSchema),
    mode: 'onBlur', // input is not focus
    reValidateMode: 'onChange' // Revalidate after modificate value
  })

  const onSubmit: SubmitHandler<FormFields> = async (
    userRegisterInputs: UserRegisterInputs
  ) => {
    signUp(
      userRegisterInputs,
      (res: RegisterResponse) => {
        location('/verify-email-info', {
          state: {
            fromRegister: true,
            errorCode: res.code
          }
        })
      },
      (error: ApiError) => {
        const userMessage = translate(error.errorCode)
        setMessage(userMessage)
        setShowMessage(true)
      }
    )
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0) return

    const showErrorTimer = setTimeout(() => {
      clearErrors()
    }, 3000)

    return (): void => clearTimeout(showErrorTimer)
  }, [errors.name, errors.email, errors.lastName, errors.password])

  useEffect(() => {
    if (!showMessage) return

    const hideTimer = setTimeout(() => {
      setShowMessage(false)
    }, 3000)

    const clearMessageTimer = setTimeout(() => {
      setMessage('')
    }, 3300)

    return (): void => {
      clearTimeout(hideTimer)
      clearTimeout(clearMessageTimer)
    }
  }, [showMessage])

  return (
    <div className="relative w-full">
      <form
        className="relative z-100 flex w-full flex-col gap-3 rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 shadow-md sm:px-6 sm:py-4 dark:border dark:border-stone-800 dark:bg-stone-900 [&_input]:w-full [&_input]:rounded-md [&_input]:border [&_input]:border-gray-300 [&_input]:bg-gray-100 [&_input]:px-2 [&_input]:py-1 [&_input]:text-base [&_input]:placeholder:text-gray-400 [&_input]:focus:outline-gray-400 md:[&_input]:text-lg [&_input]:dark:border-stone-700 [&_input]:dark:bg-stone-800 [&_input]:dark:text-stone-200 [&_input]:dark:placeholder:text-stone-500 [&_input]:dark:focus:outline-1 [&_input]:dark:focus:outline-stone-500"
        action="submit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-lg font-semibold text-gray-700 sm:text-xl md:text-2xl dark:text-stone-300">
          Ingrese sus datos
        </h1>
        <div className="flex flex-col gap-6">
          <div className="relative">
            <input {...register('name')} type="text" placeholder="Nombre" />
            <p
              className={classNames(
                'absolute pl-0.5 text-xs text-red-500 transition-all duration-300 ease-in-out sm:text-sm dark:tracking-wide',
                {
                  'translate-y-0.5 opacity-100': errors.name,
                  'pointer-events-none -translate-y-1 opacity-0': !errors.name
                }
              )}
            >
              {errors.name?.message}
            </p>
          </div>
          <div className="relative">
            <input
              {...register('lastName')}
              type="text"
              placeholder="Apellido"
            />
            <p
              className={classNames(
                'absolute pl-0.5 text-xs text-red-500 transition-all duration-300 ease-in-out md:text-sm dark:tracking-wide',
                {
                  'translate-y-0.5 opacity-100': errors.lastName,
                  'pointer-events-none -translate-y-1 opacity-0':
                    !errors.lastName
                }
              )}
            >
              {errors.lastName?.message}
            </p>
          </div>
          <div className="relative">
            <input {...register('email')} type="text" placeholder="Mail" />
            <p
              className={classNames(
                'absolute pl-0.5 text-xs text-red-500 transition-all duration-300 ease-in-out md:text-sm dark:tracking-wide',
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
                'absolute pl-0.5 text-xs text-red-500 transition-all duration-300 ease-in-out md:text-sm dark:tracking-wide',
                {
                  'translate-y-0.5 opacity-100': errors.password,
                  'pointer-events-none -translate-y-1 opacity-0':
                    !errors.password
                }
              )}
            >
              {errors.password?.message}
            </p>
          </div>
          <div className="flex w-full justify-center">
            <button
              className="relative cursor-pointer rounded-md border border-gray-500 bg-gray-600 px-2 py-1 text-lg text-gray-100 transition-all duration-300 ease-in-out hover:bg-gray-500 disabled:cursor-auto disabled:bg-gray-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 dark:disabled:bg-stone-700 dark:disabled:text-stone-500"
              type="submit"
              // disabled={true}
              disabled={isRegistering}
            >
              Registrarse
              {isRegistering && (
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
        </div>
      </form>
      <NotificationMessage show={showMessage} message={message} />
    </div>
  )
}

export default RegisterForm
