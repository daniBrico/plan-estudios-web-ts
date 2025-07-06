import { create } from 'zustand'
import { type Career, type ID } from '../types/types'
import {
  getFromLocalStorage,
  removeStoredValue,
  saveToLocalStorage
} from '../utils/storage'
import careerApi from '../api/careerApiInstance'

interface CareerStore {
  careerSelectedID: ID | null
  career: Career | null
  error: string | null
  careerIsLoading: boolean
  localStorageIsLoading: boolean

  // actions
  setCareerSelectedID: (id: ID | null) => void
  removeCareerLocalStorage: () => void
  cleanCareerStore: () => void
  fetchCareer: (id: ID) => Promise<void>
  // changeCareerLocalStorageValue: (value: Career | null) => void
}

const useCareerStore = create<CareerStore>((set, get) => ({
  careerSelectedID: null,
  career: null,
  error: null,
  careerIsLoading: false,
  localStorageIsLoading: false,

  // actions
  setCareerSelectedID: (id: ID | null): void => {
    set({ careerSelectedID: id })

    if (id) get().fetchCareer(id)
    else set({ career: null })
  },
  removeCareerLocalStorage: (): void => {},
  cleanCareerStore: (): void => {
    set({
      careerSelectedID: null,
      career: null,
      error: null,
      careerIsLoading: false,
      localStorageIsLoading: false
    })
    removeStoredValue('career')

    if (get().careerSelectedID !== null)
      removeStoredValue(get().careerSelectedID as string)
  },
  fetchCareer: async (id: ID): Promise<void> => {
    set({ careerIsLoading: true })
    const careerFromLS = getFromLocalStorage<Career>('career')

    if (careerFromLS?._id === id) {
      set({
        career: careerFromLS,
        localStorageIsLoading: false,
        careerIsLoading: false
      })
      return
    }

    try {
      const career = await careerApi.getCareer(id)
      saveToLocalStorage('career', career)
      set({ career, error: null, careerIsLoading: false })
    } catch (err) {
      console.error('Error fetching career:', err)
      set({
        error: 'Error al cargar los datos de la carrera',
        careerIsLoading: false
      })
    }
  }
  // changeCareerLocalStorageValue: (value: Career | null) => void
}))

export default useCareerStore
