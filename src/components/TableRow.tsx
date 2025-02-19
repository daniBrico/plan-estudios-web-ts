import { type Subject } from '../types/types'
import { DropdownButton } from './DropdownButton'
import React, { useCallback, useState } from 'react'

interface ListOfRowsProps extends Omit<Subject, 'state'> {
  index: number
}

const chunkArray = (array: string[], size: number): string[][] => {
  const result = []

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }

  return result
}

const ListOfRows: React.FC<ListOfRowsProps> = ({
  code,
  name,
  offering,
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
        className={`bg-third-color grid grid-cols-2 rounded-md p-1 md:table-row md:rounded-none ${backgroundColor} ${isDropdownOpen ? 'hover:bg-none' : 'md:hover:bg-hover-color'}`}
      >
        <td
          className={`text-sm transition md:p-2 md:text-center md:text-base ${isDropdownOpen ? 'text-first-color underline' : ''} `}
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
          {chunkArray(correlatives, 2).map((group, index) => (
            <React.Fragment key={index}>
              {group.join(' - ')}
              {index < chunkArray(correlatives, 2).length - 1 && <br />}
            </React.Fragment>
          ))}
        </td>
        <td
          className={`flex items-end justify-end md:table-cell md:px-1 md:py-2`}
        >
          <DropdownButton
            isOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            subjectCode={code}
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
