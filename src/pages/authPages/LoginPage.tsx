import { type JSX } from 'react'
import LoginForm from '../../components/auth/LoginForm'

const LoginPage = (): JSX.Element => {
  return (
    <article className="mx-auto max-w-4xl">
      <section className="flex h-full w-full items-center justify-center pt-8">
        <LoginForm />
      </section>
    </article>
  )
}

export default LoginPage
