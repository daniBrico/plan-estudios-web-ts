import { useEffect, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { type Career } from '../types/types'
import { getCareer } from '../api/careerApi'

interface useCareerProps {
  careerSelectedID: string | null
}

interface useCareerReturn {
  career: Career | null
  error: string | null
}

const useCareer = ({ careerSelectedID }: useCareerProps): useCareerReturn => {
  const [career, setCareer] = useState<Career | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { localStorageValue, setLocalStorageValue } = useLocalStorage({
    key: 'career',
    initialValue: null
  })

  useEffect(() => {
    if (!careerSelectedID) {
      setCareer(null)
      return
    }

    const initializeCareer = async (): Promise<void> => {
      try {
        const careerData = await getCareer(careerSelectedID)

        setCareer(careerData)
        setLocalStorageValue(careerData)
        setError(null)
      } catch (err) {
        setError('Error al cargar los datos de la carrera')
        console.error(`Error al inicializar los datos de la carrera: ${err}`)
      }
    }

    console.log('Se ejecuta')

    if (localStorageValue) {
      if (career) return

      console.log('Va por el localStorage')
      setCareer(localStorageValue as Career)
    } else {
      console.log('Inicializa')
      initializeCareer()
    }
  }, [careerSelectedID, localStorageValue, setLocalStorageValue, career])

  return { career, error }
}

export default useCareer
