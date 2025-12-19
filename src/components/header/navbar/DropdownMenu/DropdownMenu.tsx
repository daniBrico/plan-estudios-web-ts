import classNames from 'classnames'
import { forwardRef, type PropsWithChildren } from 'react'

interface DropdownMenuProps {
  isOpen: boolean
  cssClassess?: string
}

const DropdownMenu = forwardRef<
  HTMLUListElement,
  PropsWithChildren<DropdownMenuProps>
>(({ isOpen, children, cssClassess = '' }, ref) => {
  return (
    <ul
      ref={ref}
      className={classNames(
        'bg-carnation-400 absolute z-200 mt-1 flex flex-col gap-2 rounded-md p-2 shadow-md transition-all duration-300 ease-in-out sm:mt-2',
        cssClassess,
        {
          'translate-y-0 opacity-100': isOpen,
          'pointer-events-none -translate-y-1/3 opacity-0': !isOpen
        }
      )}
    >
      {children}
    </ul>
  )
})

export default DropdownMenu
