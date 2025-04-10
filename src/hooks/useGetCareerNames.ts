import { useEffect, useState } from 'react'
import careerApi from '../api/careerApiInstance'
import { type CareerNames } from '../types/types'
import {
  getFromSessionStorage,
  removeFromSessionStorage,
  saveToSessionStorage
} from '../utils/storage'

interface useGetCareerNamesReturn {
  careerNames: CareerNames[]
  careerNamesError: Error | null
  careerNamesIsLoading: boolean
}

const useGetCareerNames = (): useGetCareerNamesReturn => {
  const [careerNames, setCareerNames] = useState<CareerNames[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // Clear sessionStorage after reloading the page
    const handleBeforeUnload = (): void =>
      removeFromSessionStorage('careerNames')

    window.addEventListener('beforeunload', handleBeforeUnload)

    const fetchCareerNames = async (): Promise<void> => {
      try {
        setIsLoading(true)

        // 1. First, we try to get it from sessionStorage
        const cachedNames: CareerNames[] | null =
          getFromSessionStorage('careerNames')

        if (cachedNames) {
          setCareerNames(cachedNames)
          return
        }

        // 2. If it's not cached, we call the API
        const apiNames = await careerApi.getCareerNames()

        // 3. We save it in sessionStorage and in state
        saveToSessionStorage('careerNames', apiNames)
        setCareerNames(apiNames)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCareerNames()

    return (): void => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return {
    careerNames,
    careerNamesError: error,
    careerNamesIsLoading: isLoading
  }
}

export default useGetCareerNames
