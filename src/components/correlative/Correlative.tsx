import React, { type JSX } from 'react'
import { type Name } from '../../types/types'
import { useSubjectStore } from '../../store/subjectStore'
import useSubjectState from '../../hooks/useSubjectState'

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
  // customHooks
  const { getStyleForState } = useSubjectState(correlative)

  // subjectStore
  const getSubjectNameFromCode = useSubjectStore(
    (state) => state.getSubjectNameFromCode
  )

  // functions
  const name = getSubjectNameFromCode(correlative)

  return (
    <div className={`group relative inline-block text-left ${cssClasess}`}>
      <span className={`${getStyleForState()} cursor-pointer`}>
        {correlative}
      </span>
      {tooltip && ToolTip(name)}
    </div>
  )
}

export default Correlative
