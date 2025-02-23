import React, { type JSX, useEffect, useRef } from 'react'
import { type DropdownOp } from '../types/types'

interface DropdownButtonProps {
  isDropdownOpen: boolean
  toggleDropdown: () => void
  isDisabled: boolean
  changeStateOpSelected: (option: DropdownOp) => void
  changeDropdownOp: (option: DropdownOp) => void
  dropdownOp: DropdownOp
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  isDropdownOpen,
  toggleDropdown,
  isDisabled,
  changeStateOpSelected,
  changeDropdownOp,
  dropdownOp
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  const setOption = (option: DropdownOp): void => {
    changeDropdownOp(option)
    changeStateOpSelected(option)
    toggleDropdown()
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        toggleDropdown()
    }

    if (isDropdownOpen)
      document.addEventListener('mousedown', handleOutsideClick)

    return (): void =>
      document.removeEventListener('mousedown', handleOutsideClick)
  }, [isDropdownOpen, toggleDropdown, isDisabled])

  const options: { label: string; value: DropdownOp }[] = [
    { label: 'Aprobada', value: 'Aprobada' },
    { label: 'Cursando', value: 'Cursando' },
    { label: 'Regular', value: 'Regular' },
    { label: 'Recursar', value: 'Recursar' },
    { label: 'Quitar', value: '' }
  ]

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
    <div
      ref={dropdownRef}
      className={`relative w-28 sm:w-3/4 md:w-full`}
      data-drop-menu="dropdown"
    >
      <div
        onClick={() => !isDisabled && toggleDropdown()}
        className={`select group border-first-color z-10 flex min-h-8 items-center justify-between rounded-sm border-2 border-solid px-2 text-white transition-shadow duration-600 ${isDropdownOpen ? 'shadow-shadow-select border-[#f15a5c]' : ''} ${isDisabled ? 'cursor-default opacity-50' : 'hover:bg-first-color cursor-pointer hover:border-white'}`}
      >
        <span className="selected text-first-color group-hover:text-white">
          {dropdownOp}
        </span>
        <div
          className={`caret border-t-first-color h-0 w-0 border-t-[6px] border-r-[5px] border-l-[5px] border-r-transparent border-l-transparent transition duration-300 ${isDropdownOpen ? 'rotate-180' : ''} ${!isDisabled ? 'group-hover:border-t-white' : ''}`}
        />
      </div>
      <ul
        className={`text-first-color shadow-shadow-box bg-third-color absolute top-9 left-1/2 z-30 flex w-full -translate-x-1/2 flex-col gap-0.5 rounded-md border border-solid border-white px-2 py-2 text-center transition duration-300 ${isDropdownOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        {options.map((option) => renderOption(option.label, option.value))}
      </ul>
    </div>
  )
}
