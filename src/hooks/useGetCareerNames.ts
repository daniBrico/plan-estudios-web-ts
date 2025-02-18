import { useEffect, useState } from 'react'
import { getCareerNames } from '../api/careerApi'
import { type CareerNames } from '../types/types'

const useGetCareerNames = (): {
  careerNames: CareerNames[]
  careerNamesError: Error | null
} => {
  const [careerNames, setCareerNames] = useState<CareerNames[]>([])
  const [careerNamesError, setError] = useState<Error | null>(null)

  useEffect(() => {
    const setCareerFormApi = async (): Promise<void> => {
      try {
        const careerNames = await getCareerNames()

        setCareerNames(careerNames)
      } catch (err) {
        setError(err as Error)
      }
    }

    setCareerFormApi()
  }, [])

  return { careerNames, careerNamesError }
}

export default useGetCareerNames
