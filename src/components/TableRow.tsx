import { useCareerContext } from '../hooks/useCareerContext'
import useSubjectState from '../hooks/useSubjectState'
import {
  type Name,
  type DropdownOp,
  type State,
  type Subject
} from '../types/types'
import { CancelIcon } from './svg-components/CancelIcon'
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
  const correlativesContainerRef = useRef<HTMLDivElement>(null)
  const { getSubjectNameFromCode } = useCareerContext()

  const changeDropdownOp = (newOp: DropdownOp): void => setDropdownOp(newOp)

  const changeShowModal = (newValue: boolean): void => {
    setShowModal(newValue)

    if (!newValue && correlativesContainerRef.current)
      correlativesContainerRef.current.scrollTop = 0
  }

  const changeStateOpSelected = (option: DropdownOp): void => {
    let newOp: State

    newOp =
      option === ''
        ? correlatives.length > 0
          ? (newOp = 'Deshabilitada')
          : (newOp = 'Habilitada')
        : (newOp = option)

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
            changeShowModal={changeShowModal}
          />
          {
            <div
              className={`bg-theme-second-color/40 fixed top-0 left-0 z-[1000] flex h-dvh w-dvw items-center justify-center transition-opacity duration-300 ease-in-out ${showModal ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
            >
              <div className="absolute h-full w-full" />
              <div
                ref={modalRef}
                className={`bg-theme-first-color z-200 flex w-[75%] flex-col gap-2.5 rounded-lg border-2 border-white p-2 text-white shadow-lg shadow-black/40 duration-300 ease-in-out sm:w-[60%] md:w-[50%] lg:w-[40%] ${showModal ? 'animate-expand-element opacity-100' : 'animate-shrink-element opacity-0'}`}
              >
                <div className="relative flex items-center justify-center">
                  <p className="text-md py-0.5 font-bold sm:text-lg">
                    {name.longName}
                  </p>
                  <div
                    className="transition-rotate absolute top-0 right-0 w-6 cursor-pointer rounded-full bg-white p-1 transition-transform duration-300 hover:scale-110 hover:rotate-180 sm:w-7"
                    onClick={() => changeShowModal(false)}
                  >
                    <CancelIcon />
                  </div>
                </div>
                {/* correlativas */}
                {
                  <div
                    ref={correlativesContainerRef}
                    className="bg-theme-third-color flex max-h-64 flex-col gap-1 overflow-y-auto rounded-sm border-2 border-white px-1.5 py-1 lg:max-h-90"
                  >
                    {correlatives.map((correlative) => {
                      const subjectNameFromCode =
                        getSubjectNameFromCode(correlative) || ''

                      const subjectName =
                        (subjectNameFromCode as Name).shortName ||
                        (subjectNameFromCode as Name).longName

                      return (
                        <div key={correlative}>
                          <div className="flex items-center gap-2">
                            <Correlative
                              correlative={correlative}
                              tooltip={false}
                              cssClasess="font-light min-w-12"
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
            backgroundColor={backgroundColor}
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
