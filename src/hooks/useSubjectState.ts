import { useEffect, useState } from 'react'
import { type State, type Code } from '../types/types'
import { useCareerContext } from './useCareerContext'

interface ReturnType {
  actualState: State | ''
  setClassForState: (actualState: State | '') => string
}

const useSubjectState = (code: Code): ReturnType => {
  const { allSubjectsState, getSubjectState } = useCareerContext()
  const [actualState, setActualState] = useState<State | ''>('')

  useEffect(() => {
    if (!allSubjectsState) return

    const subjectState = getSubjectState(code)

    if (!subjectState) return

    setActualState(subjectState)
  }, [allSubjectsState, code, getSubjectState])

  const setClassForState = (actualState: State | ''): string => {
    const stateClassMap = {
      Aprobada: 'text-green',
      Habilitada: 'text-blue',
      Cursando: 'text-blue',
      Deshabilitada: 'text-first-color',
      Recursar: actualState === 'Recursar' ? 'text-blue' : 'text-first-color',
      Regular: 'text-yellow',
      '': ''
    }

    return stateClassMap[actualState] || ''
  }

  return { actualState, setClassForState }
}

export default useSubjectState
