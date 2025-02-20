import React, { useEffect, useState } from 'react'
import { SubjectContext } from '../hooks/useSubjectContext'
import { type SubjectState } from '../types/types'
// import { type State } from '../types/enums'

// interface AllSubjectState {
//   subjectsCode: Subject['code'][]
//   state: State
// }

export const SubjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  // const [allSubjectsState, setAllSubjectsState] = useState<AllSubjectState[]>(
  //   []
  // )
  // // implementación anterior
  const [subjectState, setSubjectState] = useState<SubjectState[]>([])
  const [subjectStateChange, setSubjectStateChange] = useState(false)

  const getSubjectState = (code: string): string => {
    const subjectFound = subjectState.find((subject) => subject.code === code)

    return subjectFound?.state || ''
  }

  const thisSubjectIsPassed = (code: string): boolean => {
    const subjectFound = subjectState.find((subject) => subject.code === code)

    if (!subjectFound) return false

    return subjectFound.state === 'Aprobada' ? true : false
  }

  const updateSubjectState = (code: string, state: string): void => {
    setSubjectStateChange((prev) => !prev)

    setSubjectState((prev) => {
      if (state === '') return prev.filter((subject) => subject.code !== code) // Delete if state is empty

      return prev.some((subject) => subject.code === code)
        ? prev.map((subject) =>
            subject.code === code ? { ...subject, state } : subject
          ) // Update if it exists
        : [...prev, { code, state }] // Add if it doesn't exist
    })
  }

  const hasAllCorrelativesPassed = (correlatives: string[]): boolean => {
    return correlatives.every((correlative) =>
      subjectState.some(
        (subject) =>
          subject.code === correlative &&
          (subject.state === 'Aprobada' || subject.state === 'Regular')
      )
    )
  }

  useEffect(() => {
    if (!subjectState) return
    console.log('🚀 ~ useEffect ~ subjectState: ', subjectState)
  }, [subjectState])

  return (
    <SubjectContext.Provider
      value={{
        subjectState,
        updateSubjectState,
        subjectStateChange,
        getSubjectState,
        hasAllCorrelativesPassed,
        thisSubjectIsPassed
      }}
    >
      {children}
    </SubjectContext.Provider>
  )
}
