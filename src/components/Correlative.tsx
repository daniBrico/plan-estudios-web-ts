import React, { Fragment, type JSX } from 'react'
import { type Name, type Correlatives } from '../types/types'
import useSubjectState from '../hooks/useSubjectState'
import { useCareerContext } from '../hooks/useCareerContext'

const ToolTip = (name: Name | undefined): JSX.Element => {
  return (
    <span className="bg-first-color invisible absolute bottom-full left-1/2 z-50 -translate-x-1/2 transform rounded-sm border-2 border-white px-1.5 py-1 text-center whitespace-nowrap text-white group-hover:visible">
      {name?.shortName || name?.longName}
    </span>
  )
}

interface CorrelativeProps {
  correlative: string
  tooltip: boolean
  cssClasess: string
}

export const Correlative: React.FC<CorrelativeProps> = ({
  correlative,
  tooltip,
  cssClasess
}) => {
  const { actualState, setClassForState } = useSubjectState(correlative)
  const { getSubjectNameFromCode } = useCareerContext()
  const name = getSubjectNameFromCode(correlative)

  // font-thin sm:font-normal

  return (
    <>
      <div className={`group relative z-[105] inline-block ${cssClasess}`}>
        <span className={`${setClassForState(actualState)} cursor-pointer`}>
          {correlative}
        </span>
        {tooltip && ToolTip(name)}
      </div>
    </>
  )
}

interface ListOfCorrelativesProps {
  correlatives: Correlatives
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ListOfCorrelatives: React.FC<ListOfCorrelativesProps> = ({
  correlatives,
  setShowModal
}) => {
  const maxCorrelativesToShow = 3

  return (
    <>
      <div
        className="flex gap-0.5 md:flex-wrap md:items-center md:justify-center"
        onClick={() => setShowModal(true)}
      >
        {correlatives.length === 0 && (
          <span className="text-first-color text-lg select-none">{'-'}</span>
        )}
        {correlatives.length <= maxCorrelativesToShow &&
          correlatives
            .slice(0, maxCorrelativesToShow)
            .map((correlative, index) => (
              <Fragment key={correlative}>
                {/* Quiero poner el tooltip solo si es desktop, revisar */}
                <Correlative
                  correlative={correlative}
                  tooltip={true}
                  cssClasess="font-thin sm:font-normal"
                />
                {index < correlatives.length - 1 && <span> - </span>}
              </Fragment>
            ))}
        {correlatives.length > maxCorrelativesToShow && (
          <span className="text-first-color cursor-pointer text-lg select-none">
            {'...'}
          </span>
        )}
      </div>
    </>
  )
}
