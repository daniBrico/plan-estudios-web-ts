import React, { useState } from 'react'
import { type Subject } from '../../../types/types'
import ListOfCorrelatives from '../../correlative/ListOfCorrelatives'
import DropdownButton from '../../DropdownButton'
import TableDataCode from './TableDataCode'
import TableDataName from './TableDataName'

interface ListOfRowsProps extends Omit<Subject, 'state'> {
  index: number
  subjectsLength: number
}

const TableRow: React.FC<ListOfRowsProps> = ({
  code,
  name,
  offering,
  correlatives,
  index,
  subjectsLength
}) => {
  // useState
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // useRef
  // const modalRef = useRef<HTMLDivElement>(null)
  // const correlativesContainerRef = useRef<HTMLDivElement>(null)

  // const changeShowModal = (newValue: boolean): void => {
  //   setShowModal(newValue)
  //   if (!newValue && correlativesContainerRef.current)
  //     correlativesContainerRef.current.scrollTop = 0
  // }

  // useEffect(() => {
  //   const handleOutsideClick = (e: MouseEvent): void => {
  //     if (modalRef.current && !modalRef.current.contains(e.target as Node))
  //       if (showModal) changeShowModal(false)
  //   }

  //   if (showModal) document.addEventListener('mousedown', handleOutsideClick)

  //   return (): void =>
  //     document.removeEventListener('mousedown', handleOutsideClick)
  // }, [showModal])

  const backgroundColor =
    index % 2 === 0
      ? 'md:bg-third dark:bg-stone-700'
      : 'md:bg-secondary dark:bg-stone-800'

  return (
    <>
      <tr
        className={`text-text-secondary bg-third grid grid-cols-2 rounded-md p-1 md:table-row dark:text-stone-400 ${backgroundColor} relative`}
      >
        <TableDataCode
          code={code}
          isDropdownOpen={isDropdownOpen}
          index={index}
          subjectsLength={subjectsLength}
        />
        <TableDataName
          code={code}
          name={name}
          isDropdownOpen={isDropdownOpen}
        />
        <td className="text-right text-sm md:p-2 md:text-center md:text-base">
          {offering}
        </td>
        <td className="flex items-end justify-center text-center text-sm font-light md:table-cell md:py-2 md:text-base md:font-normal">
          <ListOfCorrelatives
            correlatives={correlatives}
            // changeShowModal={changeShowModal}
          />
          {/* <CorrelativeModal
                name={name}
                correlatives={correlatives}
                changeShowModal={changeShowModal}
                showModal={showModal}
                correlativesContainerRef={correlativesContainerRef}
              /> */}
        </td>
        <td
          className={`flex items-end justify-end md:table-cell md:px-1 md:py-2 ${index === subjectsLength - 1 ? 'rounded-br-lg' : ''}`}
        >
          <DropdownButton
            code={code}
            correlatives={correlatives}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        </td>
      </tr>
    </>
  )
}

export default TableRow
