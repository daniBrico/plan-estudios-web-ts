import { createContext, useContext } from 'react'
import { type Career, type ID } from '../types/types'

interface CareerContextType {
  changeCareerSelected: (option: string | null) => void
  career: Career | null
  error: string | null
  careerIsLoading: boolean
  locStorIsLoading: boolean
  cleanValuesAndLocalStorage: () => void
  careerSelectedID: ID | null
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
