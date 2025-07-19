import React, { type JSX } from 'react'
import { type State, type Name } from '../../types/types'
import { useSubjectStore } from '../../store/subjectStore'

const ToolTip = (name: Name | undefined): JSX.Element => {
  return (
    <span className="bg-theme-first-color invisible absolute bottom-full left-1/2 z-[130] -translate-x-1/2 transform rounded-sm border-2 border-white px-1.5 py-1 text-center whitespace-nowrap text-white group-hover:visible">
      {name?.shortName || name?.longName}
    </span>
  )
}

interface CorrelativeProps {
  correlative: string
  tooltip: boolean
  cssClasess: string
}

const Correlative: React.FC<CorrelativeProps> = ({
  correlative,
  tooltip,
  cssClasess
}) => {
  // subjectStore
  const getSubjectNameFromCode = useSubjectStore(
    (state) => state.getSubjectNameFromCode
  )
  const subjectState = useSubjectStore(
    (state) =>
      state.allSubjectsState.find((subject) => subject.code === correlative)
        ?.state
  )

  // Functions
  const name = getSubjectNameFromCode(correlative)

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

  return (
    <div className={`group relative inline-block text-left ${cssClasess}`}>
      <span className={`${setClassForState(subjectState)} cursor-pointer`}>
        {correlative}
      </span>
      {tooltip && ToolTip(name)}
    </div>
  )
}

export default Correlative
