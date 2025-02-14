import { type Subjects } from '../types/types'
import { DropdownButton } from './DropdownButton'
import React, { useCallback, useState } from 'react'

interface ListOfRowsProps extends Omit<Subjects, 'state'> {
  index: number
}

const ListOfRows: React.FC<ListOfRowsProps> = ({
  code,
  name,
  dictado,
  correlatives,
  index
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = useCallback((): void => {
    setIsDropdownOpen((prev) => !prev)
  }, [])

  const backgroundColor =
    index % 2 === 0 ? 'md:bg-third-color' : 'md:bg-second-color'

  return (
    <>
      <tr
        className={`bg-third-color grid grid-cols-2 rounded-md p-1 md:table-row md:rounded-none ${backgroundColor} ${isDropdownOpen ? 'hover:bg-none' : 'md:hover:bg-hover-color'} `}
      >
        <td
          className={`text-sm transition md:p-2 md:text-center md:text-base ${isDropdownOpen ? 'text-first-color underline' : ''} `}
        >
          {code}
        </td>
        <td
          className={`order-first col-span-2 text-sm font-medium text-wrap whitespace-nowrap transition md:p-2 md:text-base md:font-normal ${isDropdownOpen ? 'text-first-color underline' : ''} `}
        >
          {name}
        </td>
        <td className="text-right text-sm md:p-2 md:text-center md:text-base">
          {dictado}
        </td>
        <td className="flex items-end justify-center text-center text-sm font-light md:table-cell md:p-2 md:text-base md:font-normal">
          {correlatives.length !== 0 ? correlatives.join(' - ') : ''}
        </td>
        <td className={`flex items-end justify-end md:p-1`}>
          <DropdownButton
            isOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
          />
        </td>
      </tr>
    </>
  )
}

interface TableRowsProps {
  subjects: Subjects[]
}

export const TableRows: React.FC<TableRowsProps> = ({ subjects }) => {
  return subjects.map((subject, index) => (
    <ListOfRows
      key={subject.code}
      code={subject.code}
      name={subject.name}
      dictado={subject.dictado}
      correlatives={subject.correlatives}
      index={index}
    />
  ))
}
