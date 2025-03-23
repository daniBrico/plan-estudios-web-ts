import React, { Fragment } from 'react'
import { type Correlatives } from '../types/types'
import useSubjectState from '../hooks/useSubjectState'
import { useCareerContext } from '../hooks/useCareerContext'

interface CorrelativeProps {
  correlative: string
}

export const Correlative: React.FC<CorrelativeProps> = ({ correlative }) => {
  const { actualState, setClassForState } = useSubjectState(correlative)
  const { getSubjectNameFromCode } = useCareerContext()
  const name = getSubjectNameFromCode(correlative)

  return (
    <>
      <div className="group relative inline-block">
        <span className={`${setClassForState(actualState)} cursor-pointer`}>
          {correlative}
        </span>
        <span className="bg-first-color invisible absolute bottom-full left-1/2 z-50 -translate-x-1/2 transform rounded-sm border-2 border-white px-1.5 py-1 text-center whitespace-nowrap text-white group-hover:visible">
          {name?.shortName || name?.longName}
        </span>
      </div>
    </>
  )
}

interface ListOfCorrelativesProps {
  correlatives: Correlatives
}

export const ListOfCorrelatives: React.FC<ListOfCorrelativesProps> = ({
  correlatives
}) => {
  const maxCorrelativesToShow = 2

  return (
    <>
      <div className="flex gap-0.5 md:flex-wrap md:items-center md:justify-center">
        {correlatives.length === 0 && (
          <span className="text-first-color text-lg select-none">{'-'}</span>
        )}
        {correlatives.length <= maxCorrelativesToShow &&
          correlatives
            .slice(0, maxCorrelativesToShow)
            .map((correlative, index) => (
              <Fragment key={correlative}>
                <Correlative correlative={correlative} />
                {index < correlatives.length - 1 && <span> - </span>}
              </Fragment>
            ))}
        {correlatives.length > maxCorrelativesToShow && (
          <span className="text-first-color cursor-pointer text-lg select-none">
            {' ...'}
          </span>
        )}
      </div>
    </>
  )
}
