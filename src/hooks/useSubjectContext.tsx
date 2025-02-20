import { createContext, useContext } from 'react'
import { type SubjectState } from '../types/types'

interface SubjectContextType {
  subjectState: SubjectState[]
  updateSubjectState: (code: string, state: string) => void
  subjectStateChange: boolean
  getSubjectState: (code: string) => string
}

// const defaultValues: SubjectContextType = {
//   subjectState: [],
//   updateSubjectState: () => {},
//   subjectStateChange: false,
//   getSubjectState: () => ''
// }

export const SubjectContext = createContext<SubjectContextType | undefined>(
  undefined
)

export const useSubject = (): SubjectContextType => {
  const context = useContext(SubjectContext)

  if (!context)
    throw new Error('useSubject must be used within an AuthProvider')

  return context
}
