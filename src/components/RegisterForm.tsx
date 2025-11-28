import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { useEffect, type JSX } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import useRegisterUser from '../hooks/api/useRegisterUser'
import { LoadingSpinner2 } from './LoadingSpinner2'

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
  const registerUser = useRegisterUser()

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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    registerUser.mutate(data)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0) return

    const showErrorTimer = setTimeout(() => {
      clearErrors()
    }, 3000)

    return (): void => clearTimeout(showErrorTimer)
  }, [errors.name, errors.email, errors.lastName, errors.password])

  return (
    <form
      className="flex h-full min-w-md flex-col gap-6 rounded-md bg-gray-50 px-8 py-4 shadow-md [&_input]:w-full [&_input]:rounded-md [&_input]:border [&_input]:border-gray-300 [&_input]:bg-gray-100 [&_input]:px-4 [&_input]:py-1 [&_input]:text-lg [&_input]:placeholder:text-gray-400 [&_input]:focus:outline-gray-400"
      action="submit"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-lg font-semibold text-gray-700 md:text-2xl lg:text-3xl dark:text-stone-200">
        Ingrese sus datos
      </h1>
      <div className="relative">
        <input {...register('name')} type="text" placeholder="Nombre" />
        <p
          className={classNames(
            'absolute pl-0.5 text-sm text-red-500 transition-all duration-300 ease-in-out',
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
        <input {...register('lastName')} type="text" placeholder="Apellido" />
        <p
          className={classNames(
            'absolute pl-0.5 text-sm text-red-500 transition-all duration-300 ease-in-out',
            {
              'translate-y-0.5 opacity-100': errors.lastName,
              'pointer-events-none -translate-y-1 opacity-0': !errors.lastName
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
          disabled={registerUser.isPending}
        >
          Registrarse
          {registerUser.isPending && (
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
  )
}

export default RegisterForm
