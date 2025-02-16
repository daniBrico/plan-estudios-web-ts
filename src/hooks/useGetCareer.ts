import { useEffect, useState } from 'react'
import { getCareer } from '../api/careerApi'
import { type Career } from '../types/types'

const useGetCareer = (
  id: string
): { career: Career | null; loading: boolean; error: Error | null } => {
  const [career, setCareer] = useState<Career | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      try {
        const careerData = await getCareer(id)

        setCareer(careerData)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [id])

  return { career, loading, error }
}

export default useGetCareer
