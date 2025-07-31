import { type State, type SubjectCode } from '../types/types'
import { useSubjectStore } from '../store/subjectStore'

interface ReturnType {
  getStyleForState: () => string
}

const useSubjectState = (code: SubjectCode): ReturnType => {
  // subjectStore
  const subjectState = useSubjectStore(
    (state) =>
      state.allSubjectsState.find((subject) => subject.code === code)?.state
  )

  const getStyleForState = (): string => {
    if (!subjectState) return ''

    const stateClassMap: Record<State, string> = {
      Aprobada: 'dark:text-green-600 text-green-500',
      Habilitada: 'text-sky-500 dark:text-sky-600',
      Cursando: 'text-sky-500 dark:text-sky-600',
      Deshabilitada: 'text-primary',
      Recursar: 'text-sky-500 dark:text-sky-600',
      Regular: 'text-yellow-500 dark:text-yellow-600'
    }

    return stateClassMap[subjectState] || ''
  }

  return { getStyleForState }
}

export default useSubjectState
