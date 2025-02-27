import React, { Fragment } from 'react'
import { type Correlatives } from '../types/types'
import useSubjectState from '../hooks/useSubjectState'
// import Tooltip from './Tooltip'

interface CorrelativeProps {
  correlative: string
  name: string
}

const Correlative: React.FC<CorrelativeProps> = ({ correlative, name }) => {
  const { actualState, setClassForState } = useSubjectState(correlative)

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
  name: string
}

export const ListOfCorrelatives: React.FC<ListOfCorrelativesProps> = ({
  correlatives,
  name
}) => {
  return (
    <>
      {correlatives.map((correlative, index) => (
        <Fragment key={correlative}>
          <Correlative correlative={correlative} name={name} />
          {index < correlatives.length - 1 && <span> - </span>}
        </Fragment>
      ))}
    </>
  )
}
