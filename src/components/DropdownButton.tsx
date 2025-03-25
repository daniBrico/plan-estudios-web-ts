import React, { type JSX, useEffect, useRef } from 'react'
import { type DropdownOp } from '../types/types'

interface DropdownButtonProps {
  isDropdownOpen: boolean
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
  isDisabled: boolean
  changeStateOpSelected: (option: DropdownOp) => void
  changeDropdownOp: (option: DropdownOp) => void
  dropdownOp: DropdownOp
}

const options: { label: string; value: DropdownOp }[] = [
  { label: 'Aprobada', value: 'Aprobada' },
  { label: 'Cursando', value: 'Cursando' },
  { label: 'Regular', value: 'Regular' },
  { label: 'Recursar', value: 'Recursar' },
  { label: 'Quitar', value: '' }
]

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  isDropdownOpen,
  setIsDropdownOpen,
  isDisabled,
  changeStateOpSelected,
  changeDropdownOp,
  dropdownOp
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  const setOption = (option: DropdownOp): void => {
    changeDropdownOp(option)
    changeStateOpSelected(option)
    setIsDropdownOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleScroll = (): void => {
      if (isDropdownOpen) setIsDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll)

    return (): void => window.removeEventListener('scroll', handleScroll)
  }, [isDropdownOpen, setIsDropdownOpen])

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setIsDropdownOpen((prev) => !prev)
    }

    if (isDropdownOpen)
      document.addEventListener('mousedown', handleOutsideClick)

    return (): void =>
      document.removeEventListener('mousedown', handleOutsideClick)
  }, [isDropdownOpen, isDisabled, setIsDropdownOpen])

  const renderOption = (label: string, value: DropdownOp): JSX.Element => (
    <li
      key={value}
      onClick={() => setOption(value)}
      className={`hover:bg-first-color box-border cursor-pointer rounded-md px-0.5 py-1 transition hover:text-white hover:shadow-sm`}
    >
      {label}
    </li>
  )

  return (
    <>
      <div className="relative w-28 sm:w-3/4 md:w-full" ref={dropdownRef}>
        {/* Dropdown button */}
        <div className={`relative z-[110]`}>
          <div
            onClick={() => !isDisabled && setIsDropdownOpen((prev) => !prev)}
            className={`select group border-first-color flex min-h-8 items-center justify-between rounded-sm border-2 border-solid px-2 text-white transition-shadow duration-600 ${isDropdownOpen ? 'shadow-shadow-select border-[#f15a5c]' : ''} ${isDisabled ? 'cursor-default opacity-50' : 'hover:bg-first-color cursor-pointer hover:border-white'}`}
          >
            {/* Current selected option */}
            <span className="selected text-first-color group-hover:text-white">
              {dropdownOp}
            </span>
            {/* Caret symbol */}
            <div
              className={`border-t-first-color h-0 w-0 border-t-[6px] border-r-[5px] border-l-[5px] border-r-transparent border-l-transparent transition duration-300 ${isDropdownOpen ? 'rotate-180' : ''} ${!isDisabled ? 'group-hover:border-t-white' : ''}`}
            />
          </div>
        </div>
        {/* Dropdown list elements */}
        <ul
          className={`text-first-color shadow-shadow-box bg-third-color transition-visibility absolute mt-1 flex w-28 flex-col gap-0.5 rounded-md border border-solid border-white px-2 py-2 text-center transition-opacity duration-500 ease-in-out sm:w-30 ${isDropdownOpen ? 'visible opacity-100' : 'invisible opacity-0'} z-[130]`}
        >
          {options.map((option) => renderOption(option.label, option.value))}
        </ul>
      </div>
    </>
  )
}
