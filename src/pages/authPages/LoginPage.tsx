import { type JSX } from 'react'
import LoginForm from '../../components/auth/LoginForm'

const LoginPage = (): JSX.Element => {
  return (
    <article className="flex justify-center px-4 py-8">
      <section className="w-full max-w-sm sm:max-w-md">
        <LoginForm />
      </section>
    </article>
  )
}

export default LoginPage
