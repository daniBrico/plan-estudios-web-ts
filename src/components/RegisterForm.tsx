import { zodResolver } from '@hookform/resolvers/zod'
import { type JSX } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    resolver: zodResolver(userSchema)
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
  }

  return (
    <form
      className="flex h-full max-w-1/2 flex-col gap-4 rounded-md bg-gray-50 px-8 py-4 shadow-md [&_input]:rounded-md [&_input]:border [&_input]:border-gray-300 [&_input]:bg-gray-100 [&_input]:px-4 [&_input]:py-1 [&_input]:text-lg [&_input]:placeholder:text-gray-400 [&_input]:focus:outline-gray-400"
      action="submit"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-lg font-semibold text-gray-700 md:text-2xl lg:text-3xl dark:text-stone-200">
        Ingrese sus datos
      </h1>
      <input {...register('name')} type="text" placeholder="Nombre" />
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}
      <input {...register('lastName')} type="text" placeholder="Apellido" />
      {errors.lastName && (
        <div className="text-red-500">{errors.lastName.message}</div>
      )}
      <input {...register('email')} type="text" placeholder="Mail" />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      <input
        {...register('password')}
        type="password"
        placeholder="Contraseña"
      />
      {errors.password && (
        <div className="text-red-500">{errors.password.message}</div>
      )}
      <div className="flex w-full justify-center">
        <button
          className="cursor-pointer rounded-md bg-gray-600 px-2 py-1 text-lg text-white transition-all duration-300 ease-in-out hover:bg-gray-500 dark:bg-stone-700 dark:hover:bg-stone-800"
          type="submit"
          disabled={isSubmitting}
        >
          Registrarse
        </button>
      </div>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
    </form>
  )
}

export default RegisterForm
