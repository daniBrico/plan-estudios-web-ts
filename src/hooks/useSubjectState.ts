import { useEffect, useState } from 'react'
import { type Correlatives, type State, type SubjectCode } from '../types/types'
import { useSubjectStore } from '../store/subjectStore'

interface ReturnType {
  subjectState: State | undefined
  setClassForState: (subjectState: State | undefined) => string
  corrPassed: boolean | undefined
}

const useSubjectState = (
  code: SubjectCode,
  correlatives: Correlatives
): ReturnType => {
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

    const areCorrPassed = areAllCorrelativesPassed(correlatives)
    const currentSubjectState = getSubjectState(code)

    if (areCorrPassed && currentSubjectState === 'Deshabilitada')
      changeSubjectState(code, 'Habilitada')

    if (!areCorrPassed && currentSubjectState !== 'Deshabilitada')
      changeSubjectState(code, 'Deshabilitada')

    setSubjectState(currentSubjectState)
    setCorrPassed(areCorrPassed)
  }, [allSubjectsState])

  const setClassForState = (subjectState: State | undefined): string => {
    if (!subjectState) return ''

    const stateClassMap = {
      Aprobada: 'text-theme-green',
      Habilitada: 'text-theme-blue',
      Cursando: 'text-theme-blue',
      Deshabilitada: 'text-theme-first-color',
      Recursar:
        subjectState === 'Recursar'
          ? 'text-theme-blue'
          : 'text-theme-first-color',
      Regular: 'text-theme-yellow',
      '': ''
    }

    return stateClassMap[subjectState] || ''
  }

  return { subjectState, setClassForState, corrPassed }
}

export default useSubjectState
