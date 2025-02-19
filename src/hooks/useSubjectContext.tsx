import { createContext, useContext } from 'react'
import { type SubjectState } from '../types/types'

interface SubjectContextType {
  subjectState: SubjectState[]
  updateSubjectState: (code: string, state: string) => void
}

const defaultValues: SubjectContextType = {
  subjectState: [],
  updateSubjectState: () => {}
}

export const SubjectContext = createContext<SubjectContextType>(defaultValues)

export const useSubject = (): SubjectContextType => {
  const context = useContext(SubjectContext)

  if (!context)
    throw new Error('useSubject must be used within an AuthProvider')

  return context
}
