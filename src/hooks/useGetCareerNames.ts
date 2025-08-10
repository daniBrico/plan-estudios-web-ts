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
    let isMounted = true

    const fetchCareerNames = async (): Promise<void> => {
      try {
        setIsLoading(true)

        const apiNames = await careerApi.getCareerNames()

        if (isMounted) setCareerNames(apiNames)
      } catch (err) {
        if (isMounted) setError(err as Error)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchCareerNames()

    return (): void => {
      isMounted = false
    }
  }, [])

  return {
    careerNamesAndIDFromAPI,
    careerNamesError: error,
    careerNamesIsLoading: isLoading
  }
}

export default useGetCareerNames
