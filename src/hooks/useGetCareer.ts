import { useEffect, useState } from 'react'
import { getCareer } from '../api/careerApi'
import { type Career, type useGetCareerType } from '../types/types'

const useGetCareer = (id: string | null): useGetCareerType => {
  const [career, setCareer] = useState<Career | null>(null)
  const [careerLoading, setLoading] = useState(true)
  const [careerError, setError] = useState<Error | null>(null)

  useEffect(() => {
    const setCareerFromApi = async (): Promise<void> => {
      try {
        const careerData = await getCareer(id)

        setCareer(careerData)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    setCareerFromApi()
  }, [id])

  return { career, careerLoading, careerError }
}

export default useGetCareer
