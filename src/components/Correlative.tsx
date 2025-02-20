import React, { Fragment, useEffect, useState } from 'react'
import { type Correlatives } from '../types/types'
import { useSubjectContext } from '../hooks/useSubjectContext'

interface CorrelativeProps {
  correlative: string
}

const Correlative: React.FC<CorrelativeProps> = ({ correlative }) => {
  const [subjectState, setSubjectState] = useState('')
  const { subjectStateChange, getSubjectState } = useSubjectContext()

  useEffect(() => {
    const newSubjectState = getSubjectState(correlative)

    setSubjectState(newSubjectState)
  }, [subjectStateChange, correlative, getSubjectState])

  const stateClasses: Record<string, string> = {
    Aprobada: 'text-green-500',
    Regular: 'text-yellow-500',
    '': 'text-first-color'
  }

  return (
    <>
      <span className={`${stateClasses[subjectState] || 'text-first-color'}`}>
        {correlative}
      </span>
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
