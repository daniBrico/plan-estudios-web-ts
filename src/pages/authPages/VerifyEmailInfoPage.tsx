import { type JSX } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface VerifyEmailState {
  fromRegister?: boolean
  fromLogin?: boolean
  emailSent?: boolean
  userEmail?: string
}

const VerofyEmailInfoPage = (): JSX.Element => {
  const { state } = useLocation() as { state: VerifyEmailState | null }

  if (!state?.fromRegister && !state?.fromLogin)
    return <Navigate to="/inicio" replace />

  const verificationMessage = (): JSX.Element => {
    if (!state.emailSent)
      return (
        <p>
          Estamos teniendo inconvenientes para enviar el correo de verificación
          en este momento. Intentelo más tarde.
        </p>
      )

    return (
      <>
        <p>
          Si la dirección es válida, enviaremos un correo de verificación a{' '}
          {state.userEmail && (
            <span>
              <b>{state.userEmail}</b>
            </span>
          )}
          . Asegúrate de revisar la bandeja de entrada o la carpeta de spam.
        </p>
        {state.fromRegister && (
          <p>
            Si no lo recibes en unos minutos, podrás solicitar un reenvío al
            intentar iniciar sesión.
          </p>
        )}
      </>
    )
  }

  return (
    <article className="mx-auto max-w-4xl">
      <section className="h-full w-full flex-col pt-8">
        <h1 className="text-carnation-400 mb-2 text-3xl font-medium">
          Verifique su correo electronico
        </h1>
        {verificationMessage()}
      </section>
    </article>
  )
}

export default VerofyEmailInfoPage
