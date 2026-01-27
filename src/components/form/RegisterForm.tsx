import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, type JSX } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import type { RegisterResponse } from '../../types/types'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import NotificationMessage from '../NotificationMessage'
import type { ApiError } from '../../types/errors'
import { useNotificationMessage } from '../../hooks/useNotificationMessage'
import FormInput from './FormInput'
import SubmitButton from './SubmitButton'
import {
  registerSchema,
  type RegisterFormFields
} from '../../schemas/auth/register.schema'
import { getErrorMessage } from '../../utils/getErrorMessage'

const RegisterForm = (): JSX.Element => {
  const { signUp, isRegistering } = useAuthContext()
  const location = useNavigate()
  const { message, showMessage, showNotificationMessage } =
    useNotificationMessage()

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur', // input is not focus
    reValidateMode: 'onChange' // Revalidate after modificate value
  })

  const onSubmit: SubmitHandler<RegisterFormFields> = async (
    RegisterFormFields
  ) => {
    signUp(
      RegisterFormFields,
      (res: RegisterResponse) => {
        location('/verify-email-info', {
          state: {
            fromRegister: true,
            errorCode: res.code
          }
        })
      },
      (error: ApiError) => {
        const userMessage = getErrorMessage(error.errorCode)
        showNotificationMessage(userMessage)
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

  return (
    <div className="relative w-full">
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
            name="name"
            placeholder="Nombre"
            register={register('name')}
            error={errors.name}
            autocomplete="name"
          />
          <FormInput
            name="lastName"
            placeholder="Apellido"
            register={register('lastName')}
            error={errors.lastName}
            autocomplete="family-name"
          />
          <FormInput
            name="email"
            placeholder="Mail"
            type="email"
            register={register('email')}
            error={errors.email}
            autocomplete="email"
          />
          <FormInput
            name="password"
            placeholder="Contraseña"
            type="password"
            register={register('password')}
            error={errors.password}
            autocomplete="new-password"
          />
          <SubmitButton loading={isRegistering} label="Registrarse" />
        </div>
      </form>
      <NotificationMessage show={showMessage} message={message} />
    </div>
  )
}

export default RegisterForm
