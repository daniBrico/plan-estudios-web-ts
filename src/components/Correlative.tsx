import React, { Fragment, type JSX } from 'react'
import { type Name, type Correlatives } from '../types/types'
import useSubjectState from '../hooks/useSubjectState'
import { useSubjectStore } from '../store/subjectStore'

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

export const Correlative: React.FC<CorrelativeProps> = React.memo(
  ({ correlative, tooltip, cssClasess }) => {
    const { setClassForState, subjectState } = useSubjectState({
      code: correlative
    })
    const { getSubjectNameFromCode } = useSubjectStore()
    const name = getSubjectNameFromCode(correlative)

    return (
      <>
        <div className={`group relative inline-block text-left ${cssClasess}`}>
          <span className={`${setClassForState(subjectState)} cursor-pointer`}>
            {correlative}
          </span>
          {tooltip && ToolTip(name)}
        </div>
      </>
    )
  }
)

interface ListOfCorrelativesProps {
  correlatives: Correlatives
  changeShowModal: (newValue: boolean) => void
}

export const ListOfCorrelatives: React.FC<ListOfCorrelativesProps> = React.memo(
  ({ correlatives /* changeShowModal */ }) => {
    const maxCorrelativesToShow = 3

    const handleClick = (): void => {
      // if (correlatives.length > 0) changeShowModal(true)
    }

    return (
      <>
        <div
          className={`relative z-[130] flex gap-0.5 md:flex-wrap md:items-center md:justify-center ${correlatives.length > 0 ? 'pointer' : 'default:'}`}
          onClick={handleClick}
        >
          {correlatives.length === 0 && (
            <span className="text-theme-first-color text-lg select-none">
              {'-'}
            </span>
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
            <span className="text-theme-first-color cursor-pointer text-lg select-none">
              {'...'}
            </span>
          )}
        </div>
      </>
    )
  }
)
