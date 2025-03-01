import { useCareerContext } from '../hooks/useCareerContext'
import useSubjectState from '../hooks/useSubjectState'
import { type DropdownOp, type State, type Subject } from '../types/types'
import { Correlative, ListOfCorrelatives } from './Correlative'
import { DropdownButton } from './DropdownButton'
import React, { Fragment, useCallback, useEffect, useState } from 'react'

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
  } = useCareerContext()
  const { actualState, setClassForState } = useSubjectState(code)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [dropdownOp, setDropdownOp] = useState<DropdownOp>('')
  const [showAll, setShowAll] = useState(false)

  const changeShowAll = (): void => setShowAll((prev) => !prev)

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

    if (
      subjectState === 'Aprobada' ||
      subjectState === 'Cursando' ||
      subjectState === 'Recursar' ||
      subjectState === 'Regular'
    )
      setDropdownOp(subjectState)

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
        className={`bg-third-color grid grid-cols-2 rounded-md p-1 md:table-row md:rounded-none ${backgroundColor} relative`}
      >
        <td
          className={`text-sm transition md:p-2 md:text-center md:text-base ${isDropdownOpen ? 'underline' : ''} ${setClassForState(actualState)}`}
        >
          {code}
        </td>
        <td
          className={`order-first col-span-2 text-sm font-medium text-wrap whitespace-nowrap transition md:p-2 md:text-base md:font-normal ${isDropdownOpen ? `${setClassForState(actualState)} underline` : ''}`}
        >
          {name}
        </td>
        <td className="text-right text-sm md:p-2 md:text-center md:text-base">
          {offering}
        </td>
        <td className="flex items-end justify-center text-center text-sm font-light md:table-cell md:py-2 md:text-base md:font-normal">
          <ListOfCorrelatives
            correlatives={correlatives}
            changeShowAll={changeShowAll}
          />
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
        <td
          className={`absolute top-full z-50 mt-1 flex max-h-[500px] flex-col items-center justify-center rounded-lg bg-white p-2 text-sm font-light shadow-lg shadow-gray-500/40 transition-all duration-300 ease-in-out md:right-0 md:text-base md:font-normal ${
            !showAll
              ? 'invisible translate-y-[-10px] opacity-0'
              : 'visible translate-y-0 opacity-100'
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-0.5">
            {correlatives.map((correlative, index) => (
              <Fragment key={correlative + code}>
                <Correlative correlative={correlative} />
                {index < correlatives.length - 1 && <span> - </span>}
              </Fragment>
            ))}
          </div>
          <button
            className="bg-first-color hover:bg-first-color/80 mt-2 cursor-pointer rounded px-2 py-1 text-white transition duration-300"
            onClick={changeShowAll}
          >
            Cerrar
          </button>
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
