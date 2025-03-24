import { type ReactNode, type JSX } from 'react'

interface ButtonProps {
  children: ReactNode | JSX.Element
  handleClickCallback: () => void
  cssClasses: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  handleClickCallback,
  cssClasses
}) => {
  return (
    <button
      className={`bg-first-color fixed z-100 flex cursor-pointer items-center justify-center text-white shadow-xl transition-opacity duration-300 select-none ${cssClasses}`}
      onClick={handleClickCallback}
    >
      {children}
    </button>
  )
}
