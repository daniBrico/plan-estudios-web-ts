import { create } from 'zustand'
import {
  type State,
  type Career,
  type ID,
  type SubjectState,
  type SubjectCode,
  type Name
} from '../types/types'
import {
  getFromLocalStorage,
  removeStoredValue,
  saveToLocalStorage
} from '../utils/storage'
import useCareerStore from './careerStore'

interface SubjectStore {
  allSubjectsState: SubjectState[]
  createAllSubjectStateDefault: (
    careerSelectedID: ID | null,
    career: Career | null
  ) => void
  setAllSubjectsState: (subjectsState: SubjectState[]) => void
  cleanSubjectStore: (careerSelectedID: ID | null) => void
  getSubjectState: (code: SubjectCode) => State | undefined
  changeSubjectState: (code: SubjectCode, state: State) => void
  areAllCorrelativesPassed: (correlatives: SubjectCode[]) => boolean
  getSubjectNameFromCode: (code: string) => Name | undefined
  getTotalNumOfSubjects: () => number
  getAllSubjectsStateInfo: () => {
    numSubjectsPassed: number
    numSubjectsCursando: number
    numSubjectsRegular: number
    totalNumOfSubjects: number
  }
}

export const useSubjectStore = create<SubjectStore>()((set, get) => ({
  allSubjectsState: [],
  setAllSubjectsState: (subjectsState): void => {
    set({ allSubjectsState: subjectsState })
  },
  createAllSubjectStateDefault: (careerSelectedID, career): void => {
    if (careerSelectedID === null || career === null) return

    try {
      const allSubjectsStateInStorage: SubjectState[] | null =
        getFromLocalStorage(careerSelectedID)

      if (allSubjectsStateInStorage === null) {
        // LS: Local Storage
        const subjectsStateLS: SubjectState[] = career.subjectsByYear.flatMap(
          (subjectsByYear) =>
            subjectsByYear.subjects.map((subject) => ({
              code: subject.code,
              name: subject.name,
              state:
                subject.correlatives.length > 0 ? 'Deshabilitada' : 'Habilitada'
            }))
        )

        get().setAllSubjectsState(subjectsStateLS)
        saveToLocalStorage(careerSelectedID, subjectsStateLS)
      } else {
        get().setAllSubjectsState(allSubjectsStateInStorage)
      }
    } catch (error) {
      console.error('Error parsing career data from localStorage', error)
    }
  },
  cleanSubjectStore: (careerSelectedID): void => {
    if (careerSelectedID !== null) removeStoredValue(careerSelectedID)
  },
  getSubjectState: (code): State | undefined => {
    return get().allSubjectsState.find((subject) => subject.code === code)
      ?.state
  },
  changeSubjectState: (code, state): void => {
    const careerSelectedID = useCareerStore.getState().careerSelectedID

    if (!careerSelectedID) return

    set((prev) => {
      const updatedSubjects = prev.allSubjectsState.map((subject) => {
        if (subject.code === code) {
          return { ...subject, state }
        }

        return subject
      })

      saveToLocalStorage(careerSelectedID, updatedSubjects)

      return { allSubjectsState: updatedSubjects }
    })
  },
  areAllCorrelativesPassed: (correlatives): boolean => {
    if (correlatives.length === 0) return true

    return correlatives.every((correlative) =>
      get().allSubjectsState.some(
        (subject) =>
          subject.code === correlative &&
          (subject.state === 'Aprobada' || subject.state === 'Regular')
      )
    )
  },
  getSubjectNameFromCode: (code): Name | undefined =>
    get().allSubjectsState.find((subject) => subject.code === code)?.name,
  getTotalNumOfSubjects: (): number => get().allSubjectsState.length,
  getAllSubjectsStateInfo: (): {
    numSubjectsPassed: number
    numSubjectsCursando: number
    numSubjectsRegular: number
    totalNumOfSubjects: number
  } => {
    let numSubjectsPassed = 0,
      numSubjectsCursando = 0,
      numSubjectsRegular = 0

    const totalNumOfSubjects = get().allSubjectsState.length

    get().allSubjectsState.forEach((subject) => {
      if (subject.state === 'Aprobada') numSubjectsPassed++

      if (subject.state === 'Cursando') numSubjectsCursando++

      if (subject.state === 'Regular') numSubjectsRegular++
    })

    return {
      numSubjectsPassed,
      numSubjectsCursando,
      numSubjectsRegular,
      totalNumOfSubjects
    }
  }
}))
