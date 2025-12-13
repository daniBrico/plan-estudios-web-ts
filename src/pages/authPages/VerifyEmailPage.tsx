import { type JSX } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const VerifyEmailPage = (): JSX.Element => {
  const location = useLocation()

  if (!location.state?.fromRegister) return <Navigate to="/inicio" replace />

  return (
    <article className="mx-auto max-w-4xl">
      <section className="h-full w-full flex-col pt-8">
        <h1 className="text-carnation-400 mb-2 text-3xl font-medium">
          Verifique su correo electronico
        </h1>
        {location.state?.emailSent ? (
          <p>
            Si la dirección es válida, te hemos enviado un correo de
            verificación a<b> {location.state.userEmail}</b>.
            <br />
            Revisa tu bandeja de entrada o la carpeta de spam.
            <br />
            Si no lo recibes en unos minutos, podrás solicitar un reenvío al
            intentar iniciar sesión.
          </p>
        ) : (
          <p>
            Estamos teniendo inconvenientes para enviar el correo de
            verificación en este momento.
            <br />
            Intenta iniciar sesión más tarde para solicitar un nuevo envío.
          </p>
        )}
      </section>
    </article>
  )
}

export default VerifyEmailPage
