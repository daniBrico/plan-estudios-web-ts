import { type PropsWithChildren } from 'react'

interface DropdownItemProps {
  onClick: () => void
}

const DropdownItem: React.FC<PropsWithChildren<DropdownItemProps>> = ({
  children,
  onClick
}) => {
  return (
    <li>
      <button
        onClick={onClick}
        className="hover:bg-carnation-500 w-full cursor-pointer rounded-md border px-2 py-1 text-left whitespace-nowrap text-white shadow-md hover:underline"
      >
        {children}
      </button>
    </li>
  )
}

export default DropdownItem
