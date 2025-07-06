import { type DropdownOp, type State, type Subject } from '../types/types'
import { ListOfCorrelatives } from './Correlative'
import { DropdownButton } from './DropdownButton'
import React, { useEffect, useRef, useState } from 'react'
// import { CorrelativeModal } from './CorrelativeModal'
import { useSubjectStore } from '../store/subjectStore'

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
  // useState
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [cssForState, setCssForState] = useState('')

  // useRef
  const modalRef = useRef<HTMLDivElement>(null)
  const correlativesContainerRef = useRef<HTMLDivElement>(null)

  // useContext
  const { changeSubjectState } = useSubjectStore()

  const changeShowModal = (newValue: boolean): void => {
    setShowModal(newValue)
    if (!newValue && correlativesContainerRef.current)
      correlativesContainerRef.current.scrollTop = 0
  }

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

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent): void => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node))
        if (showModal) changeShowModal(false)
    }

    if (showModal) document.addEventListener('mousedown', handleOutsideClick)

    return (): void =>
      document.removeEventListener('mousedown', handleOutsideClick)
  }, [showModal])

  const backgroundColor =
    index % 2 === 0 ? 'md:bg-theme-third-color' : 'md:bg-theme-second-color'

  return (
    <>
      <tr
        className={`bg-theme-third-color text-theme-text-color grid grid-cols-2 rounded-md p-1 md:table-row md:rounded-none ${backgroundColor} relative`}
      >
        <td
          className={`text-sm transition md:p-2 md:text-center md:text-base ${isDropdownOpen ? 'underline' : ''} ${cssForState}`}
        >
          {code}
        </td>

        <td
          className={`order-first col-span-2 text-sm font-medium text-wrap transition md:p-2 md:text-base md:font-normal ${isDropdownOpen ? `${cssForState} underline` : ''}`}
        >
          <p className="invisible hidden md:visible md:inline">
            {name.longName}
          </p>
          <p className="md:invisible md:hidden">
            {name.shortName || name.longName}
          </p>
        </td>
        <td className="text-right text-sm md:p-2 md:text-center md:text-base">
          {offering}
        </td>
        <td className="flex items-end justify-center text-center text-sm font-light md:table-cell md:py-2 md:text-base md:font-normal">
          {correlatives.length ? (
            <>
              <ListOfCorrelatives
                correlatives={correlatives}
                changeShowModal={changeShowModal}
              />
              {/* <CorrelativeModal
                name={name}
                correlatives={correlatives}
                changeShowModal={changeShowModal}
                showModal={showModal}
                correlativesContainerRef={correlativesContainerRef}
              /> */}
            </>
          ) : (
            '-'
          )}
        </td>
        <td
          className={`flex items-end justify-end md:table-cell md:px-1 md:py-2`}
        >
          <DropdownButton
            isDropdownOpen={isDropdownOpen}
            changeStateOpSelected={changeStateOpSelected}
            setIsDropdownOpen={setIsDropdownOpen}
            backgroundColor={backgroundColor}
            code={code}
            correlatives={correlatives}
            setCssForState={setCssForState}
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
