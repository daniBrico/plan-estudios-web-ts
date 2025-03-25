import { useCareerContext } from '../hooks/useCareerContext'
import useSubjectState from '../hooks/useSubjectState'
import {
  type Name,
  type DropdownOp,
  type State,
  type Subject
} from '../types/types'
import { CancelIcon } from './CancelIcon'
import { Correlative, ListOfCorrelatives } from './Correlative'
import { DropdownButton } from './DropdownButton'
import React, { useEffect, useRef, useState } from 'react'

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
  const [showModal, setShowModal] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const { getSubjectNameFromCode } = useCareerContext()

  const changeDropdownOp = (newOp: DropdownOp): void => setDropdownOp(newOp)

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

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent): void => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node))
        if (showModal) setShowModal(false)
    }

    if (showModal) document.addEventListener('mousedown', handleOutsideClick)

    return (): void =>
      document.removeEventListener('mousedown', handleOutsideClick)
  }, [showModal])

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
          className={`order-first col-span-2 text-sm font-medium text-wrap transition md:p-2 md:text-base md:font-normal ${isDropdownOpen ? `${setClassForState(actualState)} underline` : ''}`}
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
          <ListOfCorrelatives
            correlatives={correlatives}
            setShowModal={setShowModal}
          />
          {
            <div
              className={`bg-second-color/40 fixed top-0 left-0 z-[1000] flex h-dvh w-dvw items-center justify-center transition-opacity duration-500 ease-in-out md:invisible md:hidden md:opacity-0 ${showModal ? 'visible opacity-100' : 'invisible opacity-0'}`}
            >
              <div className="absolute h-full w-full" />
              <div
                ref={modalRef}
                className="bg-first-color z-200 flex w-[90%] flex-col gap-2.5 rounded-lg border-2 border-white p-2 text-white shadow-lg shadow-black/40 sm:w-[60%]"
              >
                <div className="relative flex items-center justify-center">
                  <p className="text-md py-0.5 font-bold sm:text-lg">
                    {name.longName}
                  </p>
                  <div
                    className="absolute top-0 right-0 w-6 translate-y-0.5 rounded-full bg-white p-1 sm:w-7"
                    onClick={() => setShowModal(false)}
                  >
                    <CancelIcon />
                  </div>
                </div>
                {/* correlativas */}
                {
                  <div className="bg-third-color flex flex-col gap-1 rounded-sm border-2 border-white px-1.5 py-1">
                    {correlatives.map((correlative) => {
                      const subjectNameFromCode =
                        getSubjectNameFromCode(correlative) || ''

                      const subjectName =
                        (subjectNameFromCode as Name).shortName ||
                        (subjectNameFromCode as Name).longName

                      return (
                        <div key={correlative}>
                          <div className="flex items-center justify-between gap-2">
                            <Correlative
                              correlative={correlative}
                              tooltip={false}
                              cssClasess="font-light"
                            />
                            <p className="grow-2 text-left text-black">{`${subjectName}`}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                }
              </div>
            </div>
          }
        </td>
        <td
          className={`flex items-end justify-end md:table-cell md:px-1 md:py-2`}
        >
          <DropdownButton
            isDropdownOpen={isDropdownOpen}
            isDisabled={isDisabled}
            changeStateOpSelected={changeStateOpSelected}
            changeDropdownOp={changeDropdownOp}
            dropdownOp={dropdownOp}
            setIsDropdownOpen={setIsDropdownOpen}
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
