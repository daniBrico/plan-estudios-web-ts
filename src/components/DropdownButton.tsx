import React, { useEffect, useRef, useState } from 'react'
import { useSubject } from '../hooks/useSubjectContext'

interface DropdownButtonProps {
  isOpen: boolean
  subjectCode: string
  toggleDropdown: () => void
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  isOpen,
  toggleDropdown,
  subjectCode
}) => {
  const { updateSubjectState } = useSubject()
  const [optionSelected, setOptionSelected] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const setOption = (option: string): void => {
    setOptionSelected(option)
    toggleDropdown()
    updateSubjectState(subjectCode, option)
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        toggleDropdown()
    }

    if (isOpen) document.addEventListener('mousedown', handleOutsideClick)

    return (): void =>
      document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen, toggleDropdown])

  return (
    <div
      ref={dropdownRef}
      className="relative w-28 sm:w-3/4 md:w-full"
      data-drop-menu="dropdown"
    >
      <div
        onClick={toggleDropdown}
        className={`select group border-first-color hover:bg-first-color z-10 flex min-h-8 cursor-pointer items-center justify-between rounded-sm border-2 border-solid px-2 text-white transition-shadow duration-600 hover:border-white ${isOpen ? 'shadow-shadow-select border-[#f15a5c]' : ''}`}
      >
        <span
          className="selected text-first-color group-hover:text-white"
          data-selected={optionSelected}
        >
          {optionSelected}
        </span>
        <div
          className={`caret border-t-first-color h-0 w-0 border-t-[6px] border-r-[5px] border-l-[5px] border-r-transparent border-l-transparent transition duration-300 group-hover:border-t-white ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      <ul
        className={`text-first-color shadow-shadow-box bg-third-color absolute top-9 left-1/2 z-30 flex w-full -translate-x-1/2 flex-col gap-0.5 rounded-md border border-solid border-white px-2 py-2 text-center transition duration-300 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <li
          onClick={() => setOption('Aprobada')}
          className="hover:bg-first-color box-border cursor-pointer rounded-md px-0.5 py-1 transition hover:text-white hover:shadow-sm"
        >
          Aprobada
        </li>
        <li
          onClick={() => setOption('Cursando')}
          className="hover:bg-first-color box-border cursor-pointer rounded-md px-0.5 py-1 transition hover:text-white hover:shadow-sm"
        >
          Cursando
        </li>
        <li
          onClick={() => setOption('Regular')}
          className="hover:bg-first-color box-border cursor-pointer rounded-md px-0.5 py-1 transition hover:text-white hover:shadow-sm"
        >
          Regular
        </li>
        <li
          onClick={() => setOption('Recursar')}
          className="hover:bg-first-color box-border cursor-pointer rounded-md px-0.5 py-1 transition hover:text-white hover:shadow-sm"
        >
          Recursar
        </li>
        <li
          onClick={() => setOption('')}
          className="hover:bg-first-color box-border cursor-pointer rounded-md px-0.5 py-1 transition hover:text-white hover:shadow-sm"
        >
          Quitar
        </li>
      </ul>
    </div>
  )
}
