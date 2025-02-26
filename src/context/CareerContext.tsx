import React, { useEffect, useState } from 'react'
import { CareerContext } from '../hooks/useCareerContext'
import {
  type Code,
  type State,
  type SubjectState,
  type Correlatives,
  type ID
} from '../types/types'
import useCareer from '../hooks/useCareer'
import {
  getFromLocalStorage,
  removeStoredValue,
  saveToLocalStorage
} from '../utils/storage'

export const CareerProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [allSubjectsState, setAllSubjectsState] = useState<SubjectState[]>([])
  const [careerSelectedID, setCareerSelected] = useState<ID | null>(null)
  const {
    career,
    error,
    removeCareerLocalStorage,
    changeCareerLocalStorageValue
  } = useCareer({ careerSelectedID })

  const changeCareerSelected = (option: string | null): void =>
    setCareerSelected(option)

  const changeSubjectState = (code: Code, state: State): void =>
    setAllSubjectsState((prev) =>
      prev.map((subject) => {
        if (subject.code === code) return { ...subject, state: state }

        return subject
      })
    )

  const getSubjectState = (code: Code): State | undefined =>
    allSubjectsState.find((subject) => subject.code === code)?.state

  const areAllCorrelativesPassed = (correlatives: Correlatives): boolean =>
    correlatives.every((correlative) =>
      allSubjectsState.some(
        (subject) =>
          subject.code === correlative &&
          (subject.state === 'Aprobada' || subject.state === 'Regular')
      )
    )

  const cleanValuesAndLocalStorage = (): void => {
    changeCareerSelected(null)
    removeStoredValue('career')
    if (careerSelectedID !== null) removeStoredValue(careerSelectedID)
    setAllSubjectsState([])
    removeCareerLocalStorage()
    changeCareerLocalStorageValue(null)
  }

  useEffect(() => {
    if (allSubjectsState.length === 0 || !careerSelectedID) return

    saveToLocalStorage(careerSelectedID, allSubjectsState)
  }, [allSubjectsState, careerSelectedID])

  useEffect(() => {
    if (!careerSelectedID || !career) return

    try {
      const item = getFromLocalStorage(careerSelectedID)

      if (!item) {
        const subjectsStateStored = career.subjectsByYear.flatMap(
          (subjectsByYear) =>
            subjectsByYear.subjects.map((subject) => ({
              code: subject.code,
              state:
                subject.correlatives.length > 0 ? 'Deshabilitada' : 'Habilitada'
            }))
        ) as SubjectState[]

        setAllSubjectsState(subjectsStateStored)
        saveToLocalStorage(careerSelectedID, subjectsStateStored)
      } else {
        setAllSubjectsState(item as SubjectState[])
      }
    } catch (error) {
      console.error('Error parsing career data from localStorage', error)
    }
  }, [careerSelectedID, career])

  return (
    <CareerContext.Provider
      value={{
        changeCareerSelected,
        career,
        error,
        changeSubjectState,
        getSubjectState,
        allSubjectsState,
        areAllCorrelativesPassed,
        cleanValuesAndLocalStorage
      }}
    >
      {children}
    </CareerContext.Provider>
  )
}
