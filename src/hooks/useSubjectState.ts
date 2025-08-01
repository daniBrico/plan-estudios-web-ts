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

    const skyStyle = 'text-sky-500 dark:text-sky-700'

    const stateClassMap: Record<State, string> = {
      Aprobada: 'dark:text-green-700 text-green-500',
      Habilitada: skyStyle,
      Cursando: skyStyle,
      Deshabilitada: 'text-red-500 dark:text-red-900',
      Recursar: skyStyle,
      Regular: 'text-yellow-500 dark:text-yellow-700'
    }

    return stateClassMap[subjectState] || ''
  }

  return { getStyleForState }
}

export default useSubjectState
