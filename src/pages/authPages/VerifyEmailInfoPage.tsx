import { type JSX } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { type ErrorCode } from '../../types/errors'
import { useErrorMessages } from '../../hooks/useErrorMessages'

interface VerifyEmailState {
  fromRegister?: boolean
  fromLogin?: boolean
  email?: string
  errorCode?: ErrorCode
}

const VerifyEmailInfoPage = (): JSX.Element => {
  const { state } = useLocation() as { state: VerifyEmailState | null }
  const { translate } = useErrorMessages()

  if (!state?.fromRegister && !state?.fromLogin)
    return <Navigate to="/inicio" replace />

  const message = state.errorCode
    ? translate(state.errorCode)
    : translate('GENERIC_ERROR')

  return (
    <article className="mx-auto max-w-4xl text-gray-800 dark:text-stone-300">
      <section className="h-full w-full flex-col px-4 pt-6 md:pt-10 lg:px-0">
        <h1 className="text-2xl font-medium md:text-3xl">
          Verifique su correo electronico
        </h1>
        <p>{message}</p>
      </section>
    </article>
  )
}

export default VerifyEmailInfoPage
