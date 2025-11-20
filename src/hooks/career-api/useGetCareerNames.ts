import { useEffect, useState } from 'react'
import careerApi from '../../api/careerApiInstance'
import { type CareerNamesAndID } from '../../types/types'
import {
  getFromSessionStorage,
  saveToSessionStorage
} from '../../utils/storage'

interface useGetCareerNamesReturn {
  careerNamesAndIDFromAPI: CareerNamesAndID[]
  careerNamesError: Error | null
  careerNamesIsLoading: boolean
}

const cachedKey = 'career-names-id'

const useGetCareerNames = (): useGetCareerNamesReturn => {
  const [careerNamesAndIDFromAPI, setCareerNamesAndIDFromAPI] = useState<
    CareerNamesAndID[]
  >([])
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true

    const fetchCareerNames = async (): Promise<void> => {
      try {
        setIsLoading(true)

        // SS: Session Storage
        const cachedSSCareerNamesAndID = getFromSessionStorage(
          cachedKey
        ) as CareerNamesAndID[]

        if (cachedSSCareerNamesAndID !== null) {
          setCareerNamesAndIDFromAPI(cachedSSCareerNamesAndID)
          return
        }

        const apiNamesAndID = await careerApi.getCareerNames()

        if (isMounted) {
          setCareerNamesAndIDFromAPI(apiNamesAndID)
          saveToSessionStorage(cachedKey, apiNamesAndID)
        }
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
