import React, { Fragment } from 'react'
import { type Correlatives } from '../types/types'
import useSubjectState from '../hooks/useSubjectState'

interface CorrelativeProps {
  correlative: string
}

const Correlative: React.FC<CorrelativeProps> = ({ correlative }) => {
  const { actualState, setClassForState } = useSubjectState(correlative)

  return (
    <>
      <span className={`${setClassForState(actualState)}`}>{correlative}</span>
    </>
  )
}

interface ListOfCorrelativesProps {
  correlatives: Correlatives
}

export const ListOfCorrelatives: React.FC<ListOfCorrelativesProps> = ({
  correlatives
}) => {
  return (
    <>
      {correlatives.map((correlative, index) => (
        <Fragment key={correlative}>
          <Correlative correlative={correlative} />
          {index < correlatives.length - 1 && <span> - </span>}
        </Fragment>
      ))}
    </>
  )
}
