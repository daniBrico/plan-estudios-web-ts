import { useEffect, useState } from 'react'
import careerApi from '../api/careerApiInstance'
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
        const careerNames = await careerApi.getCareerNames()
        // const careerNames = await getCareerNames()

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
