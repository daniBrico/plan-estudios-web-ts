import React, { type JSX } from 'react'
import { type Name } from '../../types/types'
import { useSubjectStore } from '../../store/subjectStore'
import useSubjectState from '../../hooks/useSubjectState'

const ToolTip = (name: Name | undefined): JSX.Element => {
  return (
    <span className="bg-primary invisible absolute bottom-[150%] left-1/2 z-[130] -translate-x-1/2 transform rounded-sm border-2 border-white px-1.5 py-1 text-center whitespace-nowrap text-white shadow-sm shadow-gray-400/90 group-hover:visible before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-x-8 before:border-y-12 before:border-white before:border-x-transparent before:border-b-transparent dark:border-stone-400 dark:bg-stone-800 dark:text-stone-300 dark:shadow-stone-950/90 dark:before:border-t-stone-400 dark:before:shadow-stone-950/90">
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
  const name = useSubjectStore((state) =>
    state.getSubjectNameFromCode(correlative)
  )

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
