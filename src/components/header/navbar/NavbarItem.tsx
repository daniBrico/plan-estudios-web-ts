import classNames from 'classnames'

interface NavbarItemProps {
  label: string
  isActive: boolean
  isFirst?: boolean
  isLast?: boolean
  onClick: () => void
}

const ACTIVE_STYLES =
  'bg-carnation-400 dark:bg-stone-900 dark:text-stone-300 shadow shadow-md dark:shadow-stone-950/30 py-1 underline rounded-b-md'
const INACTIVE_STYLES =
  'bg-inactive-navbar dark:text-stone-400 dark:bg-stone-800 opacity-95 hover:bg-inactive-navbar/90 dark:hover:bg-stone-700/90 py-0'

const NavbarItem: React.FC<NavbarItemProps> = ({
  label,
  isActive,
  isFirst,
  isLast,
  onClick
}) => {
  return (
    <li
      className={classNames(
        `text-white transition-all duration-300 ease-in-out hover:underline`,
        isActive ? ACTIVE_STYLES : INACTIVE_STYLES,
        {
          'rounded-bl-md': isFirst,
          'rounded-br-md': isLast
        }
      )}
    >
      <button
        className="block h-full w-full cursor-pointer px-2"
        onClick={onClick}
      >
        {label}
      </button>
    </li>
  )
}

export default NavbarItem
