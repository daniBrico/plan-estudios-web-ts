import React, { useEffect, useState } from 'react'
import { SubjectContext } from '../hooks/useSubjectContext'
import { type SubjectState } from '../types/types'

export const SubjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [subjectState, setSubjectState] = useState<SubjectState[]>([])

  const updateSubjectState = (code: string, state: string): void => {
    setSubjectState((prev) => {
      if (state === '') return prev.filter((subject) => subject.code !== code) // Delete if state is empty

      return prev.some((subject) => subject.code === code)
        ? prev.map((subject) =>
            subject.code === code ? { ...subject, state } : subject
          ) // Update if it exists
        : [...prev, { code, state }] // Add if it doesn't exist
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
