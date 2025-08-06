import React from 'react'
import { type Correlatives } from '../../types/types'
import Correlative from './Correlative'

interface ListOfCorrelativesProps {
  correlatives: Correlatives
  // changeShowModal: (newValue: boolean) => void
}

const ListOfCorrelatives: React.FC<ListOfCorrelativesProps> = ({
  correlatives /* changeShowModal */
}) => {
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
          <span className="text-lg select-none">-</span>
        )}
        {correlatives.length <= maxCorrelativesToShow &&
          correlatives.map((correlative) => (
            <Correlative
              correlative={correlative}
              tooltip={true}
              cssClasess="font-thin sm:font-normal cursor-pointer"
              key={correlative}
            />
          ))}
        {correlatives.length > maxCorrelativesToShow && (
          <span className="cursor-pointer text-lg select-none">{'...'}</span>
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
