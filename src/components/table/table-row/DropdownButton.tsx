import React, { type JSX, useEffect, useRef, useState } from 'react'
import {
  type DropdownOp,
  type SubjectCode,
  type Correlatives,
  type State
} from '../../../types/types'
import CancelIcon from '../../svg-components/CancelIcon'
import { useSubjectStore } from '../../../store/subjectStore'
import useCloseOnScrollOrClickOutside from '../../../hooks/useCloseOnScrollOrClickOutside'
import CaretSymbol from '../../CaretSymbol'
import classNames from 'classnames'

interface DropdownButtonProps {
  code: SubjectCode
  correlatives: Correlatives
  isDropdownOpen: boolean
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const options: { label: string; value: DropdownOp }[] = [
  { label: 'Aprobada', value: 'Aprobada' },
  { label: 'Cursando', value: 'Cursando' },
  { label: 'Regular', value: 'Regular' },
  { label: 'Recursar', value: 'Recursar' }
]

const DropdownButton: React.FC<DropdownButtonProps> = ({
  code,
  correlatives,
  isDropdownOpen,
  setIsDropdownOpen
}) => {
  // useState
  const [dropdownOp, setDropdownOp] = useState<DropdownOp>('')

  // useRef
  const dropdownRef = useRef<HTMLDivElement>(null)

  const setOption = (option: DropdownOp): void => {
    setIsDropdownOpen(false)

    if (option === dropdownOp) return

    // Acá debería modificar el estado de aquellas materias que dependan de esta, si es que todas sus correlativas están habilitadas
    setDropdownOp(option)
    changeStateOpSelected(option)
  }

  const subjectState = useSubjectStore(
    (state) =>
      state.allSubjectsState.find((subject) => subject.code === code)?.state
  )
  const corrPassed = useSubjectStore((state) =>
    state.areAllCorrelativesPassed(correlatives)
  )
  const changeSubjectState = useSubjectStore(
    (state) => state.changeSubjectState
  )

  // Hooks
  useCloseOnScrollOrClickOutside({
    isOpen: isDropdownOpen,
    onClose: () => setIsDropdownOpen(false),
    ref: dropdownRef
  })

  // useEffect
  useEffect(() => {
    // if (code === '07071') {
    //   console.log('🚀 ~ DropdownButton ~ subjectState: ', subjectState)
    //   console.log('🚀 ~ DropdownButton ~ dropdownOp: ', dropdownOp)
    // }

    if (subjectState === undefined) return

    if (
      (subjectState === 'Habilitada' || subjectState === 'Deshabilitada') &&
      dropdownOp === ''
    )
      return

    setDropdownOp(
      subjectState === 'Aprobada' ||
        subjectState === 'Cursando' ||
        subjectState === 'Recursar' ||
        subjectState === 'Regular'
        ? subjectState
        : ''
    )
  }, [subjectState])

  useEffect(() => {
    if (corrPassed === true) return

    setDropdownOp('')
  }, [corrPassed])

  // Functions
  const renderOption = (label: string, value: DropdownOp): JSX.Element => (
    <li
      key={value}
      onClick={() => setOption(value)}
      className={`hover:bg-primary box-border cursor-pointer rounded-md px-0.5 py-1 transition duration-0 hover:text-white hover:shadow-sm dark:hover:bg-stone-700 dark:hover:text-stone-300`}
    >
      {label}
    </li>
  )

  const changeStateOpSelected = (stateOp: DropdownOp): void => {
    let newStateOp: State

    newStateOp =
      stateOp === ''
        ? correlatives.length > 0
          ? (newStateOp = 'Deshabilitada')
          : (newStateOp = 'Habilitada')
        : (newStateOp = stateOp)

    changeSubjectState(code, newStateOp)
  }

  return (
    <div className="relative w-28 sm:w-3/4 md:w-full" ref={dropdownRef}>
      <div
        className={`border-primary group absolute right-full z-[110] mr-1 h-8 w-8 cursor-pointer rounded-full border-2 border-solid p-1 transition-all duration-300 dark:border-stone-500 dark:hover:border-stone-300 ${dropdownOp !== '' && isDropdownOpen ? 'pointer-events-auto z-[140] translate-x-0 opacity-100' : 'pointer-events-none translate-x-8 opacity-0'} hover:bg-primary dark:hover:bg-stone-900`}
        onClick={() => setOption('')}
      >
        <CancelIcon />
      </div>
      {/* Dropdown button */}
      <div className={`bg-third relative z-[120] rounded-sm dark:bg-stone-800`}>
        <div
          onClick={() => corrPassed && setIsDropdownOpen((prev) => !prev)}
          className={`select group border-primary flex min-h-8 items-center justify-between rounded-sm border-2 border-solid px-2 text-white transition-shadow duration-300 dark:border-stone-500 ${isDropdownOpen ? 'border-[#f15a5c]' : ''} ${corrPassed ? 'hover:bg-primary cursor-pointer hover:border-white dark:hover:border-stone-300 dark:hover:bg-stone-700' : 'cursor-default opacity-50'}`}
        >
          {/* Current selected option */}
          <span className="selected text-primary select-none group-hover:text-white dark:text-stone-400 dark:group-hover:text-stone-300">
            {dropdownOp}
          </span>
          {/* Caret symbol */}
          <div
            className={classNames('transition duration-300', {
              'rotate-180': isDropdownOpen,
              'group-hover:border-t-white dark:group-hover:border-t-stone-300':
                corrPassed
            })}
          >
            <CaretSymbol />
          </div>
          {/* <div
            className={`border-t-primary h-0 w-0 border-t-[6px] border-r-[5px] border-l-[5px] border-r-transparent border-l-transparent transition duration-300 dark:border-t-stone-500 ${isDropdownOpen ? 'rotate-180' : ''} ${corrPassed ? 'group-hover:border-t-white dark:group-hover:border-t-stone-300' : ''}`}
          /> */}
        </div>
      </div>
      {/* Dropdown list elements */}
      <ul
        className={`text-primary bg-third absolute mt-1 flex w-28 flex-col gap-0.5 rounded-md border-2 border-solid border-white px-2 py-2 text-center shadow-sm transition-opacity duration-300 ease-in-out sm:w-30 dark:border-stone-500 dark:bg-stone-800 dark:text-stone-400 ${isDropdownOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} z-[160]`}
      >
        {options.map((option) => renderOption(option.label, option.value))}
      </ul>
    </div>
  )
}

export default DropdownButton
