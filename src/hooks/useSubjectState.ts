import { useEffect, useState } from 'react'
import { type State, type SubjectCode } from '../types/types'
import { useSubjectStateContext } from './useSubjectContext'

interface ReturnType {
  subjectState: State | undefined
  setClassForState: (subjectState: State | undefined) => string
}

const useSubjectState = (code: SubjectCode): ReturnType => {
  const { getSubjectState, allSubjectsState } = useSubjectStateContext()
  const [subjectState, setSubjectState] = useState<State | undefined>(
    getSubjectState(code)
  )

  useEffect(() => {
    setSubjectState(getSubjectState(code))
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

  return { subjectState, setClassForState }
}

export default useSubjectState
