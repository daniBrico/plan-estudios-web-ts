import React, { type JSX, useEffect, useRef, useState } from 'react'
import { type DropdownOp } from '../types/types'
import { CancelIcon } from './svg-components/CancelIcon'

interface DropdownButtonProps {
  isDropdownOpen: boolean
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
  isDisabled: boolean
  changeStateOpSelected: (option: DropdownOp) => void
  changeDropdownOp: (option: DropdownOp) => void
  dropdownOp: DropdownOp
  backgroundColor: string
}

const options: { label: string; value: DropdownOp }[] = [
  { label: 'Aprobada', value: 'Aprobada' },
  { label: 'Cursando', value: 'Cursando' },
  { label: 'Regular', value: 'Regular' },
  { label: 'Recursar', value: 'Recursar' }
]

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  isDropdownOpen,
  setIsDropdownOpen,
  isDisabled,
  changeStateOpSelected,
  changeDropdownOp,
  dropdownOp,
  backgroundColor
}) => {
  const [isIconHovered, setIsIconHovered] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const setOption = (option: DropdownOp): void => {
    setIsDropdownOpen((prev) => !prev)

    if (option === dropdownOp) return

    changeDropdownOp(option)
    changeStateOpSelected(option)
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
      className={`hover:bg-theme-first-color box-border cursor-pointer rounded-md px-0.5 py-1 transition duration-0 hover:text-white hover:shadow-sm`}
    >
      {label}
    </li>
  )

  return (
    <>
      <div className="relative w-28 sm:w-3/4 md:w-full" ref={dropdownRef}>
        <div
          className={`border-theme-first-color absolute right-full z-[110] mr-1 h-8 w-8 cursor-pointer rounded-full border-2 border-solid p-1 transition-all duration-300 ${dropdownOp !== '' && isDropdownOpen ? 'pointer-events-auto z-[140] translate-x-0 opacity-100' : 'pointer-events-none translate-x-8 opacity-0'} hover:bg-theme-first-color hover:border-white ${backgroundColor}`}
          onClick={() => setOption('')}
          onMouseEnter={() => setIsIconHovered(true)}
          onMouseLeave={() => setIsIconHovered(false)}
        >
          <CancelIcon isIconHovered={isIconHovered} />
        </div>
        {/* Dropdown button */}
        <div
          className={`bg-theme-third-color relative z-[120] ${backgroundColor}`}
        >
          <div
            onClick={() => !isDisabled && setIsDropdownOpen((prev) => !prev)}
            className={`select group border-theme-first-color flex min-h-8 items-center justify-between rounded-sm border-2 border-solid px-2 text-white transition-shadow duration-300 ${isDropdownOpen ? 'border-[#f15a5c]' : ''} ${isDisabled ? 'cursor-default opacity-50' : 'hover:bg-theme-first-color cursor-pointer hover:border-white'}`}
          >
            {/* Current selected option */}
            <span className="selected text-theme-first-color select-none group-hover:text-white">
              {dropdownOp}
            </span>
            {/* Caret symbol */}
            <div
              className={`border-t-theme-first-color h-0 w-0 border-t-[6px] border-r-[5px] border-l-[5px] border-r-transparent border-l-transparent transition duration-300 ${isDropdownOpen ? 'rotate-180' : ''} ${!isDisabled ? 'group-hover:border-t-white' : ''}`}
            />
          </div>
        </div>
        {/* Dropdown list elements */}
        <ul
          className={`text-theme-first-color shadow-shadow-box bg-theme-third-color absolute mt-1 flex w-28 flex-col gap-0.5 rounded-md border border-solid border-white px-2 py-2 text-center transition-opacity duration-300 ease-in-out sm:w-30 ${isDropdownOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} z-[160]`}
        >
          {options.map((option) => renderOption(option.label, option.value))}
        </ul>
      </div>
    </>
  )
}
