import { createContext, useContext } from 'react'
import {
  type SubjectState,
  type Code,
  type State,
  type Correlatives,
  type Career,
  type Name
} from '../types/types'

interface CareerContextType {
  changeCareerSelected: (option: string | null) => void
  career: Career | null
  error: string | null
  careerIsLoading: boolean
  locStorIsLoading: boolean
  changeSubjectState: (code: Code, state: State) => void
  getSubjectState: (code: Code) => State | undefined
  allSubjectsState: SubjectState[]
  areAllCorrelativesPassed: (correlatives: Correlatives) => boolean
  cleanValuesAndLocalStorage: () => void
  numSubjectsPassed: number
  numSubjectsRegular: number
  numSubjectsCursando: number
  getTotalNumOfSubjects: () => number
  getSubjectNameFromCode: (code: string) => Name | undefined
}

export const CareerContext = createContext<CareerContextType | undefined>(
  undefined
)

export const useCareerContext = (): CareerContextType => {
  const context = useContext(CareerContext)

  if (!context)
    throw new Error('useSubject must be used within an AuthProvider')

  return context
}
