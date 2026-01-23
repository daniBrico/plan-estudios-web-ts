import { type JSX } from 'react'
import CareerDetails from '../components/CareerDetails'
import SelectCareers from '../components/CareerSelect'
import { type CareerNamesAndID } from '../types/types'
import useCareerStore from '../store/careerStore'
import { removeStoredValue, saveToLocalStorage } from '../utils/storage'
import { useSubjectStore } from '../store/subjectStore'
import { LoadingSpinner2 } from '../components/LoadingSpinner2'

export const PlanEstudiosPage = (): JSX.Element => {
  // careerStore
  const setCareerSelectedID = useCareerStore(
    (state) => state.setCareerSelectedID
  )
  const cleanCareerStore = useCareerStore((state) => state.cleanCareerStore)
  const careerSelectedID = useCareerStore((state) => state.careerSelectedID)
  const careerIsLoading = useCareerStore((state) => state.careerIsLoading)

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
    <div className="relative flex flex-col items-center">
      <div className="mx-auto my-8 w-xs sm:w-sm">
        <SelectCareers
          onCareerChange={(careerNameAndID) =>
            handleCareerChange(careerNameAndID)
          }
        />
      </div>
      {careerIsLoading && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg dark:text-stone-300">
            Cargando Plan de Estudios
          </p>
          <LoadingSpinner2 size="w-12 h-12" thickness="border-6" />
        </div>
      )}
      <CareerDetails />
    </div>
  )
}
