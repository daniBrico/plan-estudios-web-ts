import { type JSX } from 'react'
import LoginForm from '../../components/form/LoginForm'

const LoginPage = (): JSX.Element => {
  return (
    <article className="flex justify-center px-4 py-12 md:py-16">
      <section className="w-full max-w-sm sm:max-w-md">
        <LoginForm />
      </section>
    </article>
  )
}

export default LoginPage
