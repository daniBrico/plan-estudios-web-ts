import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, type JSX } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import type { RegisterResponse, UserRegisterInputs } from '../../types/types'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import NotificationMessage from '../NotificationMessage'
import type { ApiError } from '../../types/errors'
import { useErrorMessages } from '../../hooks/useErrorMessages'
import { useNotificationMessage } from '../../hooks/useNotificationMessage'
import FormInput from './FormInput'
import SubmitButton from './SubmitButton'

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
  const { signUp, isRegistering } = useAuthContext()
  const location = useNavigate()
  const { translate } = useErrorMessages()
  const { message, showMessage, showNotificationMessage } =
    useNotificationMessage()

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
        <h1 className="text-lg font-semibold text-gray-700 sm:text-xl md:text-2xl dark:text-stone-300">
          Ingrese sus datos
        </h1>
        <div className="flex flex-col gap-6">
          <FormInput
            placeholder="Nombre"
            register={register('name')}
            error={errors.name}
          />
          <FormInput
            placeholder="Apellido"
            register={register('lastName')}
            error={errors.lastName}
          />
          <FormInput
            placeholder="Mail"
            type="email"
            register={register('email')}
            error={errors.email}
          />
          <FormInput
            placeholder="Contraseña"
            type="password"
            register={register('password')}
            error={errors.password}
          />
          <SubmitButton loading={isRegistering} label="Registrarse" />
        </div>
      </form>
      <NotificationMessage show={showMessage} message={message} />
    </div>
  )
}

export default RegisterForm
