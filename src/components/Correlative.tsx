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
        <span className="bg-first-color invisible absolute bottom-4 left-full z-50 ml-2 rounded-sm border-2 border-white px-1.5 py-1 text-center whitespace-nowrap text-white group-hover:visible">
          {name}
        </span>
      </div>
    </>
  )
}

interface ListOfCorrelativesProps {
  correlatives: Correlatives
  changeShowAll: () => void
}

export const ListOfCorrelatives: React.FC<ListOfCorrelativesProps> = ({
  correlatives,
  changeShowAll
}) => {
  const maxCorrelativesToShow = 2
  const handleShowAllClick = (): void => changeShowAll()

  return (
    <>
      <div className="flex gap-0.5 md:flex-wrap md:items-center md:justify-center">
        {correlatives
          .slice(0, maxCorrelativesToShow)
          .map((correlative, index) => (
            <Fragment key={correlative}>
              <Correlative correlative={correlative} />
              {index < correlatives.length - 1 && <span> - </span>}
            </Fragment>
          ))}
        {correlatives.length > maxCorrelativesToShow && (
          <span
            className="cursor-pointer select-none"
            onClick={handleShowAllClick}
          >
            {' ...'}
          </span>
        )}
      </div>
    </>
  )
}
