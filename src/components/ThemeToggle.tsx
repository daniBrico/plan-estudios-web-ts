import { useRef, useState, type JSX } from 'react'
import DeviceDesktop from './svg-components/DeviceDesktopSvg'
import BulbSvg from './svg-components/BulbSvg'
import MoonSvg from './svg-components/MoonSvg'
import useCloseOnScrollOrClickOutside from '../hooks/useCloseOnScrollOrClickOutside'
import { useThemeContext } from '../hooks/useThemeContext'
import { type ThemeType } from '../types/types'

const themeIconMap = {
  light: <BulbSvg />,
  dark: <MoonSvg />,
  system: <DeviceDesktop />
}

const themeOptions: ThemeType[] = ['light', 'dark', 'system']

const ThemeToggle = (): JSX.Element => {
  // useState
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // context
  const { changeTheme, theme } = useThemeContext()

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
    <div className="sm:relative" ref={dropdownRef}>
      <button
        className="bg-primary hover:bg-hover-navbar/30 flex w-10 cursor-pointer rounded-sm border p-1 shadow-md transition-all duration-300 ease-in-out hover:scale-110 dark:bg-stone-900 dark:shadow-stone-700 dark:hover:bg-stone-700/50"
        onClick={handleOpenClose}
      >
        {themeIconMap[theme]}
      </button>
      <ul
        className={`bg-primary absolute z-50 mt-2 flex h-28 w-10 transform flex-col justify-around rounded-sm border border-solid border-white shadow-lg transition-all duration-300 ease-in-out sm:right-0 sm:h-34 sm:w-30 sm:p-1.5 dark:border-stone-200 dark:bg-stone-900 ${isDropdownOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}
      >
        {themeOptions.map((option) => (
          <li
            key={option}
            className="flex items-center justify-center sm:block"
          >
            <button
              className="hover:bg-hover-navbar/30 group cursor-pointer rounded-sm border border-transparent transition-colors duration-300 ease-in-out hover:border hover:border-stone-200 sm:flex sm:w-full sm:items-center sm:justify-between sm:p-1 dark:hover:bg-stone-700/50"
              onClick={() => handleSelectOp(option)}
            >
              <span className="hidden text-white sm:inline dark:text-stone-200">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </span>
              <div className="w-7 transition-transform duration-300 ease-in-out group-hover:scale-110">
                {themeIconMap[option]}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ThemeToggle
