import classNames from 'classnames'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface FormInputProps {
  type?: string
  placeholder: string
  register: UseFormRegisterReturn
  error?: FieldError
}

const FormInput: React.FC<FormInputProps> = ({
  type = 'text',
  placeholder,
  register,
  error
}) => {
  return (
    <div className="relative">
      <input {...register} type={type} placeholder={placeholder} />
      <p
        className={classNames(
          'absolute pl-0.5 text-xs text-red-500 transition-all duration-300 ease-in-out sm:text-sm dark:tracking-wide',
          {
            'translate-y-0.5 opacity-100': error,
            'pointer-events-none -translate-y-1 opacity-0': !error
          }
        )}
      >
        {error?.message}
      </p>
    </div>
  )
}

export default FormInput
