import { createContext, useContext } from 'react'
import {
  type SubjectState,
  type Name,
  type State,
  type SubjectCode
} from '../types/types'

interface SubjectStateContextType {
  getSubjectState: (code: SubjectCode) => State | undefined
  changeSubjectState: (code: SubjectCode, state: State) => void
  areAllCorrelativesPassed: (correlatives: SubjectCode[]) => boolean
  getSubjectNameFromCode: (code: string) => Name | undefined
  allSubjectsState: SubjectState[]
}

export const SubjectStateContext = createContext<
  SubjectStateContextType | undefined
>(undefined)

export const useSubjectStateContext = (): SubjectStateContextType => {
  const context = useContext(SubjectStateContext)
  if (!context) {
    throw new Error(
      'useSubjectStateContext must be used within SubjectStateProvider'
    )
  }
  return context
}
