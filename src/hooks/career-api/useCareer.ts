import { useEffect, useState } from 'react'
import {
  getFromLocalStorage,
  removeStoredValue,
  saveToLocalStorage
} from '../../utils/storage'
import { type Career } from '../../types/types'
import careerApi from '../../api/careerApiInstance'

interface useCareerProps {
  careerSelectedID: string | null
}

interface useCareerReturn {
  career: Career | null
  error: string | null
  careerIsLoading: boolean
  locStorIsLoading: boolean
  removeCareerLocalStorage: () => void
  changeCareerLocalStorageValue: (value: Career | null) => void
}

const useCareer = ({ careerSelectedID }: useCareerProps): useCareerReturn => {
  const [career, setCareer] = useState<Career | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [careerLocalStorage, setCareerLocalStorage] = useState<Career | null>(
    null
  )
  const [locStorIsLoading, setLocStorIsLoading] = useState<boolean>(false)
  const [careerIsLoading, setCareerIsLoading] = useState(false)

  const changeCareerLocalStorageValue = (value: Career | null): void =>
    setCareerLocalStorage(value)

  const removeCareerLocalStorage = (): void => removeStoredValue('career')

  useEffect(() => {
    setCareerIsLoading(true)
    const careerFromLS: Career | null = getFromLocalStorage('career')

    if (!careerFromLS) return

    setLocStorIsLoading(true)
    setCareerLocalStorage(careerFromLS)
  }, [])

  useEffect(() => {
    if (!careerSelectedID) {
      setCareer(null)
      setCareerIsLoading(false)
      return
    }

    const initializeCareer = async (): Promise<void> => {
      setCareerIsLoading(true)

      try {
        const careerData = await careerApi.getCareer(careerSelectedID)

        setCareer(careerData)
        saveToLocalStorage('career', careerData)
        setCareerLocalStorage(careerData)
        setError(null)
      } catch (err) {
        setError('Error al cargar los datos de la carrera')
        console.error(`Error al inicializar los datos de la carrera: ${err}`)
      }
    }

    // Is it in the Local Storage?
    if (careerLocalStorage) {
      setCareerIsLoading(false)
      setLocStorIsLoading(false)
      if (career) return
      setCareer(careerLocalStorage)
    } else {
      initializeCareer()
    }
  }, [careerSelectedID, careerLocalStorage, career])

  return {
    career,
    error,
    careerIsLoading,
    locStorIsLoading,
    removeCareerLocalStorage,
    changeCareerLocalStorageValue
  }
}

export default useCareer
