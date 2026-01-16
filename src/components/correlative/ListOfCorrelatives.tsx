import React from 'react'
import { type Correlatives } from '../../types/types'
import Correlative from './Correlative'
import classNames from 'classnames'

interface ListOfCorrelativesProps {
  correlatives: Correlatives
}

const ListOfCorrelatives: React.FC<ListOfCorrelativesProps> = ({
  correlatives
}) => {
  const maxCorrelativesToShow = 3

  return (
    <>
      <div
        className={classNames(
          'relative z-130 flex gap-0.5 md:flex-wrap md:items-center md:justify-center',
          { pointer: correlatives.length > 0 }
        )}
      >
        {correlatives.length === 0 && (
          <span className="text-lg select-none">-</span>
        )}
        {correlatives.length <= maxCorrelativesToShow &&
          correlatives.map((correlative) => (
            <Correlative
              correlative={correlative}
              tooltip={true}
              cssClasess="font-thin sm:font-normal cursor-pointer"
              key={correlative.code}
            />
          ))}
        {correlatives.length > maxCorrelativesToShow && (
          <span className="text-1 cursor-pointer font-extralight select-none group-hover/td:underline hover:underline">
            {'ver más'}
          </span>
        )}
      </div>
    </>
  )
}

export default React.memo(ListOfCorrelatives, (prevProps, nextProps) => {
  if (prevProps.correlatives.length === 0) return true

  const prev = prevProps.correlatives
  const next = nextProps.correlatives

  const equals = prev.every((val, idx) => val === next[idx])

  return equals
})
