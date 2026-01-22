import { create } from 'zustand'
import type {
  State,
  Career,
  ID,
  SubjectState,
  SubjectCode,
  Name,
  Subject,
  Correlative
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
  areAllCorrelativesPassed: (correlatives: Correlative[]) => boolean
  getSubjectNameFromCode: (code: string) => Name | undefined
  getTotalNumOfSubjects: () => number
  getAllSubjectsStateInfo: () => {
    numSubjectsPassed: number
    numSubjectsCursando: number
    numSubjectsRegular: number
    totalNumOfSubjects: number
  }
}

const setStateSubject = (subject: Subject): State =>
  subject.correlatives.length > 0 ? 'Deshabilitada' : 'Habilitada'

const isStatePassed = (s: State): boolean => s === 'Aprobada' || s === 'Regular'

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
        const allSubjects = career.subjectsByYear.flatMap(
          (year) => year.subjects
        )

        const subjectsStateLS: SubjectState[] = allSubjects.map((subject) => {
          return {
            code: subject.code,
            name: subject.name,
            state: setStateSubject(subject),
            correlativeAndState: subject.correlatives.map((correlative) => {
              const subjectFind = allSubjects.find(
                (findSubject) => findSubject.code === correlative.code
              )

              if (subjectFind) {
                return {
                  correlative,
                  corrState: setStateSubject(subjectFind)
                }
              }

              return { correlative, corrState: 'Deshabilitada' }
            })
          }
        })

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
        // If it's the subject whose state is changing directly
        if (subject.code === code) return { ...subject, state }

        // If the subject has the one that changed as a correlative
        const isCorrelative = subject.correlativeAndState.some(
          (el) => el.correlative.code === code
        )

        if (!isCorrelative) return subject

        // Update the state of the correlative
        const updatedCorrelatives = subject.correlativeAndState.map((el) =>
          el.correlative.code === code ? { ...el, corrState: state } : el
        )

        const allCorrPassed = updatedCorrelatives.every((el) =>
          isStatePassed(el.corrState)
        )

        return {
          ...subject,
          state: (allCorrPassed ? 'Habilitada' : 'Deshabilitada') as State,
          correlativeAndState: updatedCorrelatives
        }
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
          subject.code === correlative.code &&
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
