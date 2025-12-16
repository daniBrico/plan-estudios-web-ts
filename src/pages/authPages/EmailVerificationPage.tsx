import { useEffect, useState, type JSX } from 'react'
import { useSearchParams } from 'react-router-dom'
import useVerifyEmail from '../../hooks/api/useVerifyEmail'
import { useErrorMessages } from '../../hooks/useErrorMessages'

const EmailVerificationPage = (): JSX.Element => {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const { mutate } = useVerifyEmail()
  const { translate } = useErrorMessages()

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
          translate(error.errorCode) ||
            'Ocurrió un problema al verificar el mail.'
        )
      }
    })
  }, [token])

  return (
    <article className="mx-auto max-w-4xl">
      <section className="h-full w-full flex-col pt-8">
        {isLoading ? (
          <>
            <h1 className="text-carnation-400 mb-2 text-3xl font-medium">
              Verificando su correo
            </h1>
            <p>Por favor espere un momento.</p>
          </>
        ) : (
          <>
            <h1 className="text-carnation-400 mb-2 text-3xl font-medium">
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
