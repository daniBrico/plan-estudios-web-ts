import { useEffect, useState, type JSX } from 'react'
import { useSearchParams } from 'react-router-dom'
import useVerifyEmail from '../../hooks/api/useVerifyEmail'
import { getErrorMessage } from '../../utils/getErrorMessage'

const EmailVerificationPage = (): JSX.Element => {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const { mutate } = useVerifyEmail()

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      setMessage('El enlace no es válido o ya fue utilizado.')
      return
    }

    mutate(token, {
      onSuccess: () => {
        setIsLoading(false)
        setMessage(
          'El correo fue verificado correctamente. Ya puedes iniciar sesión.'
        )
      },
      onError: (error) => {
        setIsLoading(false)
        setMessage(
          getErrorMessage(error.errorCode) ||
            'Ocurrió un problema al verificar el mail.'
        )
      }
    })
  }, [token])

  return (
    <article className="mx-auto max-w-4xl">
      <section className="h-full w-full flex-col px-4 pt-6 text-gray-800 md:pt-10 lg:px-0 dark:text-stone-300">
        {isLoading ? (
          <>
            <h1 className="mb-2 text-2xl font-medium md:mb-4 md:text-3xl">
              Verificando su correo
            </h1>
            <p>Por favor espere un momento.</p>
          </>
        ) : (
          <>
            <h1 className="mb-2 text-2xl font-medium md:mb-4 md:text-3xl">
              Verificación de cuenta
            </h1>
            {message && <p>{message}</p>}
          </>
        )}
      </section>
    </article>
  )
}

export default EmailVerificationPage
