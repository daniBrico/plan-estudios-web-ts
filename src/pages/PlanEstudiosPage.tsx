import { useEffect, useMemo, useState, type JSX } from 'react'
import Select from 'react-select'
import useGetCareerNames from '../hooks/useGetCareerNames'
import { useCareerContext } from '../hooks/useCareerContext'
import {
  getFromLocalStorage,
  removeStoredValue,
  saveToLocalStorage
} from '../utils/storage'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { CareerDetails } from '../components/CareerDetails'
import { type ID } from '../types/types'

export const PlanEstudiosPage = (): JSX.Element => {
  const [initialSelectedOp, setInitialSelectedOp] = useState<{
    value: string
    label: string
  } | null>(null)

  const { careerNames: careerNamesApi, careerNamesIsLoading } =
    useGetCareerNames()

  const {
    changeCareerSelected,
    cleanValuesAndLocalStorage,
    careerIsLoading,
    locStorIsLoading,
    error,
    career
  } = useCareerContext()

  const handleSelectNames = (
    selectedOption: {
      value: string
      label: string
    } | null
  ): void => {
    if (selectedOption) {
      changeCareerSelected(selectedOption.value)
      saveToLocalStorage('career-selected-id', selectedOption.value)
    } else {
      changeCareerSelected(null)
      cleanValuesAndLocalStorage()
      removeStoredValue('career-selected-id')
      setInitialSelectedOp(null)
    }
  }

  const careerNames = useMemo(() => {
    return careerNamesApi
      .filter((el) => el && el.name && el._id)
      .map((el) => ({ label: el.name, value: el._id }))
  }, [careerNamesApi])

  useEffect(() => {
    const opFromLocalStorage: ID | null =
      getFromLocalStorage('career-selected-id')

    if (!opFromLocalStorage) return

    if (careerNamesApi.length > 0) {
      const selectedOption = careerNamesApi.find(
        (option) => option._id === opFromLocalStorage
      )

      if (selectedOption) {
        setInitialSelectedOp({
          value: selectedOption._id,
          label: selectedOption.name
        })
      }
    }

    changeCareerSelected(opFromLocalStorage)
  }, [careerNamesApi, changeCareerSelected])

  return (
    <>
      <div className="w-full">
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
      </div>
      {(careerIsLoading || locStorIsLoading) && (
        <LoadingSpinner message="Cargando Plan de Estudios" />
      )}
      {error && <div className="text-center text-red-500">{error}</div>}
      {career && career.subjectsByYear ? (
        <CareerDetails subjectsByYear={career.subjectsByYear} />
      ) : null}
    </>
  )
}
