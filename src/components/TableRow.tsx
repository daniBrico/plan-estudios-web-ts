import { useSubjectContext } from '../hooks/useSubjectContext'
import { type Subject } from '../types/types'
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [subjectState, setSubjectState] = useState('Habilitada')
  const [isDisabled, setIsDisabled] = useState(false)
  const { hasAllCorrelativesPassed, thisSubjectIsPassed } = useSubjectContext()

  const toggleDropdown = useCallback((): void => {
    setIsDropdownOpen((prev) => !prev)
  }, [])

  const backgroundColor =
    index % 2 === 0 ? 'md:bg-third-color' : 'md:bg-second-color'

  useEffect(() => {
    const isThisSubjectPassed = thisSubjectIsPassed(code)

    if (correlatives.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isThisSubjectPassed
        ? setSubjectState('Aprobada')
        : setSubjectState('Habilitada')

      return
    }

    const thisSubjectHasCorrPassed = hasAllCorrelativesPassed(correlatives)

    if (thisSubjectHasCorrPassed) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isThisSubjectPassed
        ? setSubjectState('Aprobada')
        : setSubjectState('Habilitada')

      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }

    if (!thisSubjectHasCorrPassed) setSubjectState('')
  }, [correlatives, hasAllCorrelativesPassed, code, thisSubjectIsPassed])

  useEffect(() => {
    if (correlatives.length > 0) setIsDisabled(true)
  }, [correlatives.length])

  const stateClasses: Record<string, string> = {
    Habilitada: 'text-blue-500',
    Aprobada: 'text-green-500',
    Regular: 'text-yellow-500',
    '': 'text-first-color'
  }

  return (
    <>
      <tr
        className={`bg-third-color grid grid-cols-2 rounded-md p-1 md:table-row md:rounded-none ${backgroundColor} ${isDropdownOpen ? 'hover:bg-none' : 'md:hover:bg-hover-color'}`}
      >
        <td
          className={`text-sm transition md:p-2 md:text-center md:text-base ${isDropdownOpen ? 'text-first-color underline' : ''} ${stateClasses[subjectState]}`}
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
            subjectCode={code}
            isDisabled={isDisabled}
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
