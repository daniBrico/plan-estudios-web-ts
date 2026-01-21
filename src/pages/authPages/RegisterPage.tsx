import { type JSX } from 'react'
import RegisterForm from '../../components/form/RegisterForm'

const RegisterPage = (): JSX.Element => {
  return (
    <article className="flex justify-center px-4 py-12 md:py-16">
      <section className="w-full max-w-sm sm:max-w-md">
        <RegisterForm />
      </section>
    </article>
  )
}

export default RegisterPage
