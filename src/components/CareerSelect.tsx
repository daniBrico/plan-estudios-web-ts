// CareerSelect.tsx
import { useEffect, useMemo, useState } from 'react'
import Select from 'react-select'
import useGetCareerNames from '../hooks/useGetCareerNames'
import {
  getFromLocalStorage,
  removeStoredValue,
  saveToLocalStorage
} from '../utils/storage'
import { type ID } from '../types/types'
import useCareerStore from '../store/careerStore'
import { useSubjectStore } from '../store/subjectStore'

const CareerSelect: React.FC = () => {
  // useState
  const [initialSelectedOp, setInitialSelectedOp] = useState<{
    value: string
    label: string
  } | null>(null)

  // customHooks
  const { careerNames: careerNamesApi, careerNamesIsLoading } =
    useGetCareerNames()

  // context
  // careerStore
  const setCareerSelectedID = useCareerStore(
    (state) => state.setCareerSelectedID
  )
  const cleanCareerStore = useCareerStore((state) => state.cleanCareerStore)
  const careerSelectedID = useCareerStore((state) => state.careerSelectedID)
  // subjectStore
  const cleanSubjectStore = useSubjectStore((state) => state.cleanSubjectStore)

  const careerNames = useMemo(() => {
    if (careerNamesApi.length === 0) return

    return careerNamesApi
      .filter((el) => el && el.name && el._id)
      .map((el) => ({ label: el.name, value: el._id }))
  }, [careerNamesApi])

  // functions and events handlers

  const handleSelectNames = (
    selectedOption: {
      value: string
      label: string
    } | null
  ): void => {
    if (selectedOption) {
      setCareerSelectedID(selectedOption.value)
      saveToLocalStorage('career-selected-id', selectedOption.value)
      setInitialSelectedOp(selectedOption)
    } else {
      setCareerSelectedID(null)
      cleanCareerStore()
      removeStoredValue('career-selected-id')
      cleanSubjectStore(careerSelectedID)
      setInitialSelectedOp(null)
    }
  }

  // useEffect
  useEffect(() => {
    const opFromLocalStorage: ID | null =
      getFromLocalStorage('career-selected-id')

    if (opFromLocalStorage === undefined) return

    if (careerNamesApi.length > 0) {
      const selectedOption = careerNamesApi.find(
        (option) => option._id === opFromLocalStorage
      )

      if (selectedOption !== undefined) {
        if (initialSelectedOp?.value !== selectedOption._id) {
          setInitialSelectedOp({
            value: selectedOption._id,
            label: selectedOption.name
          })
        }
      }
    }

    setCareerSelectedID(opFromLocalStorage)
  }, [careerNamesApi, initialSelectedOp])

  return (
    <Select
      className="mx-auto my-8 w-xs sm:w-sm"
      options={careerNames}
      onChange={handleSelectNames}
      placeholder={'Seleccione la Carrera'}
      isClearable={true}
      value={initialSelectedOp}
      isLoading={careerNamesIsLoading}
      loadingMessage={() => 'Cargando carreras disponibles..'}
    />
  )
}

export default CareerSelect
