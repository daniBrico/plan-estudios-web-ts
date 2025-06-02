import React, { useState } from 'react'
import { CareerContext } from '../hooks/useCareerContext'
import { type ID } from '../types/types'
import useCareer from '../hooks/useCareer'
import { removeStoredValue } from '../utils/storage'

export const CareerProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  // const [allSubjectsState, setAllSubjectsState] = useState<SubjectState[]>([])
  const [careerSelectedID, setCareerSelected] = useState<ID | null>(null)
  // const [numSubjectsPassed, setNumSubjectsPassed] = useState<number>(0)
  // const [numSubjectsRegular, setNumSubjectsRegular] = useState<number>(0)
  // const [numSubjectsCursando, setNumSubjectsCursando] = useState<number>(0)
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

  const cleanValuesAndLocalStorage = (): void => {
    changeCareerSelected(null)
    removeStoredValue('career')
    if (careerSelectedID !== null) removeStoredValue(careerSelectedID)
    removeCareerLocalStorage()
    changeCareerLocalStorageValue(null)
  }

  // const getTotalNumOfSubjects = (): number => allSubjectsState.length

  // useEffect(() => {
  //   if (!allSubjectsState) return

  //   let contSubjectsPassed = 0
  //   let contSubjectsRegular = 0
  //   let contSubjectsCursando = 0

  //   allSubjectsState.forEach((subject) => {
  //     if (subject.state === 'Aprobada') contSubjectsPassed++

  //     if (subject.state === 'Regular') contSubjectsRegular++

  //     if (subject.state === 'Cursando') contSubjectsCursando++
  //   })

  //   setNumSubjectsPassed(contSubjectsPassed)
  //   setNumSubjectsRegular(contSubjectsRegular)
  //   setNumSubjectsCursando(contSubjectsCursando)
  // }, [allSubjectsState])

  // useEffect(() => {
  //   if (allSubjectsState.length === 0 || !careerSelectedID) return

  //   saveToLocalStorage(careerSelectedID, allSubjectsState)
  // }, [allSubjectsState, careerSelectedID])

  return (
    <CareerContext.Provider
      value={{
        changeCareerSelected,
        career,
        error,
        careerIsLoading,
        locStorIsLoading,
        cleanValuesAndLocalStorage,
        careerSelectedID
      }}
    >
      {children}
    </CareerContext.Provider>
  )
}
