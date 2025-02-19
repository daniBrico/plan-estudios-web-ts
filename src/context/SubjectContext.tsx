import React, { useEffect, useState } from 'react'
import { SubjectContext } from '../hooks/useSubjectContext'
import { type SubjectState } from '../types/types'

export const SubjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [subjectState, setSubjectState] = useState<SubjectState[]>([])

  const updateSubjectState = (code: string, state: string): void => {
    if (!subjectState && state === '') return

    setSubjectState((prev) => {
      const initialState = state === '' ? [] : [{ code, state }]

      // Filters and updates in a single pass
      return prev.reduce<SubjectState[]>((acc, currentSubject) => {
        if (currentSubject.code === code) {
          if (state !== '') acc.push({ ...currentSubject, state }) // Updates if the state is not empty
        } else {
          acc.push(currentSubject) // Keeps other subjects
        }

        return acc
      }, initialState) // Adds a new subject if it does not exist and the state is not empty
    })
  }

  useEffect(() => {
    if (!subjectState) return
    console.log('🚀 ~ useEffect ~ subjectState: ', subjectState)
  }, [subjectState])

  return (
    <SubjectContext.Provider value={{ subjectState, updateSubjectState }}>
      {children}
    </SubjectContext.Provider>
  )
}
