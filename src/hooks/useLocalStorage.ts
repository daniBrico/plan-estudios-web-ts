import { useCallback, useState } from 'react'
import { type Career } from '../types/types'

interface useLocalStorageReturn {
  localStorageValue: Career | null
  setLocalStorageValue: (value: Career) => void
}

interface UseLocalStorage {
  key: string
  initialValue: Career | null
}

export const useLocalStorage = ({
  key,
  initialValue
}: UseLocalStorage): useLocalStorageReturn => {
  const [localStorageValue, setStoredValue] = useState<Career | null>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setLocalStorageValue = useCallback(
    (value: Career): void => {
      try {
        setStoredValue(value)
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(error)
      }
    },
    [key]
  )

  // const removeStoredValue = (): void => {
  //   try {
  //     localStorage.removeItem(key)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return { localStorageValue, setLocalStorageValue }
}
