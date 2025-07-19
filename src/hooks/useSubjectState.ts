import { type State, type SubjectCode } from '../types/types'
import { useSubjectStore } from '../store/subjectStore'

interface ReturnType {
  // subjectState: State | undefined
  getStyleForState: () => string
}

// interface useSubjectStateProps {
//   code: SubjectCode
// }

const useSubjectState = (code: SubjectCode): ReturnType => {
  // subjectStore
  const subjectState = useSubjectStore(
    (state) =>
      state.allSubjectsState.find((subject) => subject.code === code)?.state
  )

  const getStyleForState = (): string => {
    if (!subjectState) return ''

    const stateClassMap: Record<State | '', string> = {
      Aprobada: 'text-theme-green',
      Habilitada: 'text-theme-blue',
      Cursando: 'text-theme-blue',
      Deshabilitada: 'text-theme-first-color',
      Recursar: 'text-theme-blue',
      Regular: 'text-theme-yellow',
      '': ''
    }

    return stateClassMap[subjectState] || ''
  }

  return { getStyleForState }
}

export default useSubjectState
