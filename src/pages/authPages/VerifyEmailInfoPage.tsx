import { type JSX } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { type ErrorCode } from '../../types/errors'
import { useErrorMessages } from '../../hooks/useErrorMessages'

interface VerifyEmailState {
  fromRegister?: boolean
  fromLogin?: boolean
  emailSent?: boolean
  email?: string
  errorCode?: ErrorCode
}

const VerofyEmailInfoPage = (): JSX.Element => {
  const { state } = useLocation() as { state: VerifyEmailState | null }
  const { translate } = useErrorMessages()

  if (!state?.fromRegister && !state?.fromLogin)
    return <Navigate to="/inicio" replace />

  const message = state.errorCode
    ? translate(state.errorCode)
    : translate('GENERIC_ERROR')

  return (
    <article className="mx-auto max-w-4xl">
      <section className="h-full w-full flex-col pt-8">
        <h1 className="text-carnation-400 mb-2 text-3xl font-medium">
          Verifique su correo electronico
        </h1>
        {/* {verificationMessage()} */}
        <p>{message}</p>
      </section>
    </article>
  )
}

export default VerofyEmailInfoPage
