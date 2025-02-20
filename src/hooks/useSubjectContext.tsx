import { createContext, useContext } from 'react'
import { type Correlatives, type SubjectState } from '../types/types'

interface SubjectContextType {
  subjectState: SubjectState[]
  updateSubjectState: (code: string, state: string) => void
  subjectStateChange: boolean
  getSubjectState: (code: string) => string
  hasAllCorrelativesPassed: (correlatives: Correlatives) => boolean
  thisSubjectIsPassed: (code: string) => boolean
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

export const useSubjectContext = (): SubjectContextType => {
  const context = useContext(SubjectContext)

  if (!context)
    throw new Error('useSubject must be used within an AuthProvider')

  return context
}
