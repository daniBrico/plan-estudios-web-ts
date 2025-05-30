import React, { useEffect, useState } from 'react'
import { CareerContext } from '../hooks/useCareerContext'
import {
  type SubjectCode,
  type State,
  type SubjectState,
  type Correlatives,
  type ID,
  type Name
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
  const [numSubjectsPassed, setNumSubjectsPassed] = useState<number>(0)
  const [numSubjectsRegular, setNumSubjectsRegular] = useState<number>(0)
  const [numSubjectsCursando, setNumSubjectsCursando] = useState<number>(0)
  const {
    career,
    error,
    careerIsLoading,
    locStorIsLoading,
    removeCareerLocalStorage,
    changeCareerLocalStorageValue
  } = useCareer({ careerSelectedID })

  const changeCareerSelected = (option: string | null): void =>
    setCareerSelected(option)

  const changeSubjectState = (code: SubjectCode, state: State): void =>
    setAllSubjectsState((prev) =>
      prev.map((subject) => {
        if (subject.code === code) return { ...subject, state: state }

        return subject
      })
    )

  const getSubjectState = (code: SubjectCode): State | undefined =>
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

  const getTotalNumOfSubjects = (): number => allSubjectsState.length

  const getSubjectNameFromCode = (code: string): Name | undefined =>
    allSubjectsState.find((subject) => subject.code === code)?.name

  useEffect(() => {
    if (!allSubjectsState) return

    let contSubjectsPassed = 0
    let contSubjectsRegular = 0
    let contSubjectsCursando = 0

    allSubjectsState.forEach((subject) => {
      if (subject.state === 'Aprobada') contSubjectsPassed++

      if (subject.state === 'Regular') contSubjectsRegular++

      if (subject.state === 'Cursando') contSubjectsCursando++
    })

    setNumSubjectsPassed(contSubjectsPassed)
    setNumSubjectsRegular(contSubjectsRegular)
    setNumSubjectsCursando(contSubjectsCursando)
  }, [allSubjectsState])

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
              name: subject.name,
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
        careerIsLoading,
        locStorIsLoading,
        changeSubjectState,
        getSubjectState,
        allSubjectsState,
        areAllCorrelativesPassed,
        cleanValuesAndLocalStorage,
        numSubjectsPassed,
        numSubjectsRegular,
        numSubjectsCursando,
        getTotalNumOfSubjects,
        getSubjectNameFromCode
      }}
    >
      {children}
    </CareerContext.Provider>
  )
}
