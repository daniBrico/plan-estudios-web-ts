import { type JSX } from 'react'
import RegisterForm from '../../components/RegisterForm'

const RegisterPage = (): JSX.Element => {
  return (
    <article className="mx-auto max-w-4xl pt-16">
      <section className="flex h-full w-full items-center justify-center">
        <RegisterForm />
      </section>
    </article>
  )
}

export default RegisterPage
