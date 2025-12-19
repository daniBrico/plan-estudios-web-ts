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
        className="hover:bg-carnation-500 w-full cursor-pointer rounded-md border border-transparent px-2 py-1 text-left whitespace-nowrap text-white transition-all duration-300 ease-in-out hover:border hover:border-stone-200 hover:underline dark:hover:bg-stone-700/50"
      >
        {children}
      </button>
    </li>
  )
}

export default DropdownItem
