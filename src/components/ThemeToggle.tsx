import { useRef, useState, type JSX } from 'react'
import DeviceDesktop from './svg-components/DeviceDesktopSvg'
import BulbSvg from './svg-components/BulbSvg'
import MoonSvg from './svg-components/MoonSvg'
import useCloseOnScrollOrClickOutside from '../hooks/useCloseOnScrollOrClickOutside'
import { useThemeContext } from '../hooks/useThemeContext'
import { type ThemeType } from '../types/types'

const ThemeToggle = (): JSX.Element => {
  // useState
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // context
  const { changeTheme } = useThemeContext()

  // useRef
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Hooks
  useCloseOnScrollOrClickOutside({
    isOpen: isDropdownOpen,
    onClose: () => setIsDropdownOpen(false),
    ref: dropdownRef
  })

  // functions
  const handleOpenClose = (): void => {
    setIsDropdownOpen((prev) => !prev)
  }

  const handleSelectOp = (value: ThemeType): void => {
    changeTheme(value)
    setIsDropdownOpen(false)
  }

  return (
    <div className="absolute right-0 mr-4" ref={dropdownRef}>
      <button
        className="flex w-10 rounded-sm border p-1"
        onClick={handleOpenClose}
      >
        <DeviceDesktop />
      </button>
      <ul
        className={`bg-theme-first-color absolute z-50 mt-2 flex h-28 w-10 flex-col justify-around rounded-sm border border-solid border-white transition-opacity duration-300 dark:bg-gray-800 ${isDropdownOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <li
          className="flex items-center justify-center"
          onClick={() => handleSelectOp('light')}
        >
          <button className="w-8">
            <BulbSvg />
          </button>
        </li>
        <li
          className="flex items-center justify-center"
          onClick={() => handleSelectOp('dark')}
        >
          <button className="w-8">
            <MoonSvg />
          </button>
        </li>
        <li
          className="flex items-center justify-center"
          onClick={() => handleSelectOp('system')}
        >
          <button className="w-8">
            <DeviceDesktop />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ThemeToggle
