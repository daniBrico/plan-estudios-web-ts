import { useSubjectContext } from '../hooks/useSubjectContext'
import useSubjectState from '../hooks/useSubjectState'
import { type DropdownOp, type State, type Subject } from '../types/types'
import { ListOfCorrelatives } from './Correlative'
import { DropdownButton } from './DropdownButton'
import React, { useCallback, useEffect, useState } from 'react'

interface ListOfRowsProps extends Omit<Subject, 'state'> {
  index: number
}

const ListOfRows: React.FC<ListOfRowsProps> = ({
  code,
  name,
  offering,
  correlatives,
  index
}) => {
  const {
    changeSubjectState,
    getSubjectState,
    allSubjectsState,
    areAllCorrelativesPassed
  } = useSubjectContext()
  const { actualState, setClassForState } = useSubjectState(code)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [dropdownOp, setDropdownOp] = useState<DropdownOp>('')

  const changeDropdownOp = (newOp: DropdownOp): void => setDropdownOp(newOp)

  const toggleDropdown = useCallback((): void => {
    setIsDropdownOpen((prev) => !prev)
  }, [])

  const changeStateOpSelected = (option: DropdownOp): void => {
    let newOp: State

    if (option === '') {
      newOp =
        correlatives.length > 0
          ? (newOp = 'Deshabilitada')
          : (newOp = 'Habilitada')
    } else {
      newOp = option
    }

    changeSubjectState(code, newOp)
  }

  useEffect(() => {
    const subjectState = getSubjectState(code)

    if (!allSubjectsState || !subjectState) return

    if (correlatives.length === 0 && subjectState === actualState) return

    const correlativesPassed = areAllCorrelativesPassed(correlatives)

    if (correlativesPassed && subjectState === 'Deshabilitada')
      changeSubjectState(code, 'Habilitada')

    if (!correlativesPassed && subjectState !== 'Deshabilitada') {
      changeSubjectState(code, 'Deshabilitada')
      changeDropdownOp('')
    }

    setIsDisabled(!correlativesPassed)
  }, [
    allSubjectsState,
    code,
    getSubjectState,
    areAllCorrelativesPassed,
    changeSubjectState,
    correlatives,
    actualState
  ])

  const backgroundColor =
    index % 2 === 0 ? 'md:bg-third-color' : 'md:bg-second-color'

  return (
    <>
      <tr
        className={`bg-third-color grid grid-cols-2 rounded-md p-1 md:table-row md:rounded-none ${backgroundColor} ${isDropdownOpen ? 'hover:bg-none' : 'md:hover:bg-hover-color'}`}
      >
        <td
          className={`text-sm transition md:p-2 md:text-center md:text-base ${isDropdownOpen ? 'text-first-color underline' : ''} ${setClassForState(actualState)}`}
        >
          {code}
        </td>
        <td
          className={`order-first col-span-2 text-sm font-medium text-wrap whitespace-nowrap transition md:p-2 md:text-base md:font-normal ${isDropdownOpen ? 'text-first-color underline' : ''}`}
        >
          {name}
        </td>
        <td className="text-right text-sm md:p-2 md:text-center md:text-base">
          {offering}
        </td>
        <td className="flex items-end justify-center text-center text-sm font-light md:table-cell md:py-2 md:text-base md:font-normal">
          <ListOfCorrelatives correlatives={correlatives} />
        </td>
        <td
          className={`flex items-end justify-end md:table-cell md:px-1 md:py-2`}
        >
          <DropdownButton
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            isDisabled={isDisabled}
            changeStateOpSelected={changeStateOpSelected}
            changeDropdownOp={changeDropdownOp}
            dropdownOp={dropdownOp}
          />
        </td>
      </tr>
    </>
  )
}

interface TableRowsProps {
  subjects: Subject[]
}

export const TableRows: React.FC<TableRowsProps> = ({ subjects }) => {
  return subjects.map((subject, index) => (
    <ListOfRows
      key={subject.code}
      code={subject.code}
      name={subject.name}
      offering={subject.offering}
      correlatives={subject.correlatives}
      index={index}
    />
  ))
}
