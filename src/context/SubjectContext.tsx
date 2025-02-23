import React, { useEffect, useState } from 'react'
import { SubjectContext } from '../hooks/useSubjectContext'
import {
  type Subject,
  type SubjectsByYear,
  type Code,
  type State,
  type SubjectState,
  type Correlatives
} from '../types/types'

export const SubjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [allSubjectsState, setAllSubjectsState] = useState<SubjectState[]>([])
  const [isSubjectsStateChange, setIsSubjectsStateChange] = useState(false)

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
    const storedCareer = localStorage.getItem('career')

    if (!storedCareer) return

    const career = JSON.parse(storedCareer)

    let subjectsStateStored: SubjectState[] = []

    career.subjectsByYear.forEach((subjectsByYear: SubjectsByYear) => {
      subjectsStateStored = [
        ...subjectsStateStored,
        ...subjectsByYear.subjects.map((subject: Subject) => {
          const code: Code = subject.code
          const state: State =
            subject.correlatives.length > 0 ? 'Deshabilitada' : 'Habilitada'

          return { code, state }
        })
      ]
    })

    setAllSubjectsState(subjectsStateStored)
    setIsSubjectsStateChange((prev) => !prev)
  }, [])

  // useEffect(() => {
  //   if (!allSubjectsState) return

  //   console.log('🚀 ~ useEffect ~ allSubjectsState: ', allSubjectsState)
  // }, [allSubjectsState])

  return (
    <SubjectContext.Provider
      value={{
        changeSubjectState,
        getSubjectState,
        isSubjectsStateChange,
        allSubjectsState,
        areAllCorrelativesPassed
      }}
    >
      {children}
    </SubjectContext.Provider>
  )
}
