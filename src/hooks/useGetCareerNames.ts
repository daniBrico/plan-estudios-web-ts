import { useEffect, useState } from 'react'
import careerApi from '../api/careerApiInstance'
import { type CareerNames } from '../types/types'

interface useGetCareerNamesReturn {
  careerNames: CareerNames[]
  careerNamesError: Error | null
  careerNamesIsLoading: boolean
}

const useGetCareerNames = (): useGetCareerNamesReturn => {
  const [careerNames, setCareerNames] = useState<CareerNames[]>([])
  const [careerNamesError, setError] = useState<Error | null>(null)
  const [careerNamesIsLoading, setCareerNamesIsLoading] =
    useState<boolean>(false)

  useEffect(() => {
    setCareerNamesIsLoading(false)
  }, [careerNames])

  useEffect(() => {
    setCareerNamesIsLoading(true)

    const setCareerFromApi = async (): Promise<void> => {
      try {
        const careerNames = await careerApi.getCareerNames()

        setCareerNames(careerNames)
      } catch (err) {
        setError(err as Error)
      }
    }

    setCareerFromApi()
  }, [])

  return { careerNames, careerNamesError, careerNamesIsLoading }
}

export default useGetCareerNames
