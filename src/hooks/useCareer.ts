import { useEffect, useState } from 'react'
import { type Career } from '../types/types'
import careerApi from '../api/careerApiInstance'
import {
  getFromLocalStorage,
  removeStoredValue,
  saveToLocalStorage
} from '../utils/storage'

interface useCareerProps {
  careerSelectedID: string | null
}

interface useCareerReturn {
  career: Career | null
  error: string | null
  changeCareerValue: (value: Career | null) => void
  removeCareerLocalStorage: () => void
  changeCareerLocalStorageValue: (value: Career | null) => void
}

const useCareer = ({ careerSelectedID }: useCareerProps): useCareerReturn => {
  const [career, setCareer] = useState<Career | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [careerLocalStorage, setCareerLocalStorage] = useState<Career | null>(
    null
  )

  const changeCareerValue = (value: Career | null): void => setCareer(value)

  const changeCareerLocalStorageValue = (value: Career | null): void =>
    setCareerLocalStorage(value)

  const removeCareerLocalStorage = (): void => removeStoredValue('career')

  useEffect(() => {
    const careerFromLS = getFromLocalStorage('career')

    if (!careerFromLS) return

    setCareerLocalStorage(careerFromLS as Career)
  }, [])

  useEffect(() => {
    if (!careerSelectedID) {
      setCareer(null)
      return
    }

    const initializeCareer = async (): Promise<void> => {
      try {
        const careerData = await careerApi.getCareer(careerSelectedID)
        // const careerData = await getCareer(careerSelectedID)

        setCareer(careerData)
        saveToLocalStorage('career', careerData)
        setCareerLocalStorage(careerData)
        setError(null)
      } catch (err) {
        setError('Error al cargar los datos de la carrera')
        console.error(`Error al inicializar los datos de la carrera: ${err}`)
      }
    }

    if (careerLocalStorage) {
      if (career) return
      setCareer(careerLocalStorage as Career)
    } else {
      initializeCareer()
    }
  }, [careerSelectedID, careerLocalStorage, career])

  return {
    career,
    error,
    changeCareerValue,
    removeCareerLocalStorage,
    changeCareerLocalStorageValue
  }
}

export default useCareer
