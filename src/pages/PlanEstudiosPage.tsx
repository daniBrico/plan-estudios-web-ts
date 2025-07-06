import { useEffect, useMemo, useState, type JSX } from 'react'
import Select from 'react-select'
import useGetCareerNames from '../hooks/useGetCareerNames'
import {
  getFromLocalStorage,
  removeStoredValue,
  saveToLocalStorage
} from '../utils/storage'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { CareerDetails } from '../components/CareerDetails'
import { type ID } from '../types/types'
import useCareerStore from '../store/careerStore'
import { useSubjectStore } from '../store/subjectStore'

export const PlanEstudiosPage = (): JSX.Element => {
  // useState
  const [initialSelectedOp, setInitialSelectedOp] = useState<{
    value: string
    label: string
  } | null>(null)

  // customHooks
  const { careerNames: careerNamesApi, careerNamesIsLoading } =
    useGetCareerNames()

  // contextApi, zustand
  const {
    setCareerSelectedID,
    cleanCareerStore,
    careerIsLoading,
    localStorageIsLoading,
    error,
    careerSelectedID,
    career
  } = useCareerStore()

  const { createAllSubjectStateDefault, cleanSubjectStore, allSubjectsState } =
    useSubjectStore()

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

    setCareerSelectedID(opFromLocalStorage)
  }, [careerNamesApi])

  useEffect(() => {
    if (!career) return

    createAllSubjectStateDefault(careerSelectedID, career)
  }, [career])

  // useEffect(() => {
  //   if (!allSubjectsState.length) return

  //   console.log('🚀 ~ useEffect ~ allSubjectsState: ', allSubjectsState)
  // }, [allSubjectsState])

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
      {(careerIsLoading || localStorageIsLoading) && (
        <LoadingSpinner message="Cargando Plan de Estudios" />
      )}
      {error && <div className="text-center text-red-500">{error}</div>}
      {career && career.subjectsByYear ? (
        <CareerDetails subjectsByYear={career.subjectsByYear} />
      ) : null}
    </>
  )
}
