import React, { useEffect, useState } from 'react'
import { CareerContext } from '../hooks/useCareerContext'
import {
  type Code,
  type State,
  type SubjectState,
  type Correlatives
} from '../types/types'
import useCareer from '../hooks/useCareer'

export const CareerProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [allSubjectsState, setAllSubjectsState] = useState<SubjectState[]>([])
  const [careerSelectedID, setCareerSelected] = useState<string | null>(null)
  const { career, error } = useCareer({ careerSelectedID })

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

  useEffect(() => {
    if (!career) return

    try {
      const subjectsStateStored = career.subjectsByYear.flatMap(
        (subjectsByYear) =>
          subjectsByYear.subjects.map((subject) => ({
            code: subject.code,
            state: (subject.correlatives.length > 0
              ? 'Deshabilitada'
              : 'Habilitada') as State
          }))
      )

      setAllSubjectsState(subjectsStateStored)
    } catch (error) {
      console.error('Error parsing career data from localStorage', error)
    }
  }, [career])

  return (
    <CareerContext.Provider
      value={{
        changeCareerSelected,
        career,
        error,
        changeSubjectState,
        getSubjectState,
        allSubjectsState,
        areAllCorrelativesPassed
      }}
    >
      {children}
    </CareerContext.Provider>
  )
}
