import { useEffect, useState } from 'react'
import { type Correlatives, type State, type SubjectCode } from '../types/types'
import { useSubjectStore } from '../store/subjectStore'

interface ReturnType {
  subjectState: State | undefined
  setClassForState: (subjectState: State | undefined) => string
  corrPassed: boolean | undefined
}

interface useSubjectStateProps {
  code: SubjectCode
  correlatives?: Correlatives
}

const useSubjectState = ({
  code,
  correlatives
}: useSubjectStateProps): ReturnType => {
  const {
    getSubjectState,
    allSubjectsState,
    areAllCorrelativesPassed,
    changeSubjectState
  } = useSubjectStore()
  const [subjectState, setSubjectState] = useState<State | undefined>(undefined)
  const [corrPassed, setCorrPassed] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (!allSubjectsState.length) return

    const currentSubjectState = getSubjectState(code)

    if (correlatives === undefined) {
      setSubjectState(currentSubjectState)

      return
    }

    const areCorrPassed = areAllCorrelativesPassed(correlatives)

    if (areCorrPassed && currentSubjectState === 'Deshabilitada')
      changeSubjectState(code, 'Habilitada')

    if (!areCorrPassed && currentSubjectState !== 'Deshabilitada')
      changeSubjectState(code, 'Deshabilitada')

    setSubjectState(currentSubjectState)
    setCorrPassed(areCorrPassed)
  }, [allSubjectsState])

  const setClassForState = (subjectState: State | undefined): string => {
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

  return { subjectState, setClassForState, corrPassed }
}

export default useSubjectState
