import React, { useRef, useState } from 'react'
import { type Subject } from '../../../types/types'
import ListOfCorrelatives from '../../correlative/ListOfCorrelatives'
import DropdownButton from './DropdownButton'
import TableDataCode from './TableDataCode'
import TableDataName from './TableDataName'
import { CorrelativeModal } from '../../CorrelativeModal'
import classNames from 'classnames'
import useCloseOnScrollOrClickOutside from '../../../hooks/useCloseOnScrollOrClickOutside'

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isCorrModalOpen, setIsCorrModalOpen] = useState(false)

  const corrModalRef = useRef(null)
  const listOfCorrelativesTDRef = useRef<HTMLTableCellElement | null>(null)

  const handleOnClose = (currentTarget: Node): void => {
    const isClickInsideTDCorrelatives =
      currentTarget && listOfCorrelativesTDRef.current?.contains(currentTarget)

    if (isClickInsideTDCorrelatives) return

    setIsCorrModalOpen(false)
  }

  useCloseOnScrollOrClickOutside({
    isOpen: isCorrModalOpen,
    onClose: (currentTarget) => handleOnClose(currentTarget as Node),
    ref: corrModalRef
  })

  return (
    <>
      <tr
        className={classNames(
          'bg-third relative grid grid-cols-2 rounded-lg p-1 text-gray-800 md:table-row dark:bg-stone-800 dark:text-stone-400',
          {
            'md:bg-third md:dark:bg-stone-750': index % 2 === 0,
            'md:bg-secondary md:dark:bg-stone-800': index % 2 !== 0,
            'rounded-b-none': isCorrModalOpen
          }
        )}
      >
        <TableDataCode
          code={code}
          isDropdownOpen={isDropdownOpen}
          index={index}
          subjectsLength={subjectsLength}
          isCorrModalOpen={isCorrModalOpen}
        />
        <TableDataName
          code={code}
          name={name}
          isDropdownOpen={isDropdownOpen}
        />
        <td className="relative z-[110] text-right text-sm md:p-2 md:text-center md:text-base">
          {offering}
        </td>
        <td
          className={classNames(
            'relative z-[110] flex items-end justify-center text-center text-sm font-light md:table-cell md:py-2 md:text-base md:font-normal'
            // {
            //   'group/td hover:bg-gray-400/20 dark:hover:bg-stone-700/20':
            //     correlatives.length > 0
            // }
          )}
          onClick={() => {
            if (correlatives.length === 0) return

            setIsCorrModalOpen(!isCorrModalOpen)
          }}
          ref={listOfCorrelativesTDRef}
        >
          <ListOfCorrelatives correlatives={correlatives} />
        </td>
        <td
          className={classNames(
            'flex items-end justify-end md:table-cell md:px-1 md:py-2',
            {
              'rounded-br-lg': index === subjectsLength - 1,
              'rounded-br-none': isCorrModalOpen
            }
          )}
        >
          <DropdownButton
            code={code}
            correlatives={correlatives}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        </td>
        {correlatives.length > 0 ? (
          <td ref={corrModalRef}>
            <CorrelativeModal
              correlatives={correlatives}
              cssClasses={classNames('dark:from-stone-800 bg-third', {
                'md:bg-third md:dark:from-stone-750': index % 2 === 0,
                'md:bg-secondary': index % 2 !== 0
              })}
              isOpen={isCorrModalOpen}
            />
          </td>
        ) : null}
      </tr>
    </>
  )
}

export default TableRow
