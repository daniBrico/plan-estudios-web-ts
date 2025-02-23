import { createContext, useContext } from 'react'
import {
  type SubjectState,
  type Code,
  type State,
  type Correlatives
} from '../types/types'

interface SubjectContextType {
  changeSubjectState: (code: Code, state: State) => void
  getSubjectState: (code: Code) => State | undefined
  isSubjectsStateChange: boolean
  allSubjectsState: SubjectState[]
  areAllCorrelativesPassed: (correlatives: Correlatives) => boolean
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
