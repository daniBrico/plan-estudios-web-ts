import React, { useEffect, useState } from 'react'
import { SubjectContext } from '../hooks/useSubjectContext'
import { type SubjectState } from '../types/types'

export const SubjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [subjectState, setSubjectState] = useState<SubjectState[]>([])
  const [subjectStateChange, setSubjectStateChange] = useState(false)

  const getSubjectState = (code: string): string => {
    const subjectFound = subjectState.find((subject) => subject.code === code)

    return subjectFound?.state || ''
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

  const hasAllCorrelativesPassed = (correlatives: string[]): boolean =>
    correlatives.every((correlative) =>
      subjectState.some((subject) => subject.code === correlative)
    )

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
        hasAllCorrelativesPassed
      }}
    >
      {children}
    </SubjectContext.Provider>
  )
}
