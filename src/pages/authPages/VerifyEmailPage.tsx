import { type JSX } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const VerifyEmailPage = (): JSX.Element => {
  const location = useLocation()

  if (!location.state?.emailSent) return <Navigate to="/inicio" replace />

  return (
    <article className="mx-auto max-w-4xl">
      <section className="h-full w-full flex-col pt-8">
        <h1 className="text-carnation-400 mb-2 text-3xl font-medium">
          Verifique su correo electronico
        </h1>
        {location.state?.userEmail ? (
          <p>
            Se ha enviado un correo de verificación a
            <b> {location.state.userEmail}</b>. <br /> Revise su bandeja de
            entrada o spam.
          </p>
        ) : (
          <p>
            Se ha enviado un correo de verificación. <br /> Revise su bandeja de
            entrada o spam.
          </p>
        )}
      </section>
    </article>
  )
}

export default VerifyEmailPage
