import { useEffect, useState } from 'react'
import careerApi from '../api/careerApiInstance'
import { type CareerNamesAndID } from '../types/types'

interface useGetCareerNamesReturn {
  careerNamesAndIDFromAPI: CareerNamesAndID[]
  careerNamesError: Error | null
  careerNamesIsLoading: boolean
}

const useGetCareerNames = (): useGetCareerNamesReturn => {
  const [careerNamesAndIDFromAPI, setCareerNames] = useState<
    CareerNamesAndID[]
  >([])
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCareerNames = async (): Promise<void> => {
      try {
        setIsLoading(true)

        const apiNames = await careerApi.getCareerNames()

        setCareerNames(apiNames)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    const timeOutRef = setTimeout(() => {
      fetchCareerNames()
    }, 3000)

    return (): void => clearTimeout(timeOutRef)
  }, [])

  return {
    careerNamesAndIDFromAPI,
    careerNamesError: error,
    careerNamesIsLoading: isLoading
  }
}

export default useGetCareerNames
