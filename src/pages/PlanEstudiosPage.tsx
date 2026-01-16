import { type JSX } from 'react'
import { LoadingSpinner } from '../components/LoadingSpinner'
import CareerDetails from '../components/CareerDetails'
import SelectCareers from '../components/CareerSelect'
import { type CareerNamesAndID } from '../types/types'
import useCareerStore from '../store/careerStore'
import { removeStoredValue, saveToLocalStorage } from '../utils/storage'
import { useSubjectStore } from '../store/subjectStore'

export const PlanEstudiosPage = (): JSX.Element => {
  // careerStore
  const setCareerSelectedID = useCareerStore(
    (state) => state.setCareerSelectedID
  )
  const cleanCareerStore = useCareerStore((state) => state.cleanCareerStore)
  const careerSelectedID = useCareerStore((state) => state.careerSelectedID)

  // subjectStore
  const cleanSubjectStore = useSubjectStore((state) => state.cleanSubjectStore)

  const handleCareerChange = (
    careerNameAndID: CareerNamesAndID | null
  ): void => {
    if (careerNameAndID === null) {
      setCareerSelectedID(null)
      cleanCareerStore()
      removeStoredValue('career-selected-id')
      cleanSubjectStore(careerSelectedID)

      return
    }

    setCareerSelectedID(careerNameAndID.id)
    saveToLocalStorage('career-selected-id', careerNameAndID.id)
  }

  return (
    <>
      <div className="mx-auto my-8 w-xs sm:w-sm">
        <SelectCareers
          onCareerChange={(careerNameAndID) =>
            handleCareerChange(careerNameAndID)
          }
        />
      </div>
      <LoadingSpinner message="Cargando Plan de Estudios" />
      <CareerDetails />
    </>
  )
}
