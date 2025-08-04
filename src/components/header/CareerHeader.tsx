import React from 'react'
import { type CareerHeaderInfo } from '../../types/types'

interface Props {
  careerHeaderInfo: CareerHeaderInfo
}

const CareerHeader: React.FC<Props> = ({ careerHeaderInfo }) => {
  const { name, duration, intermediateDegree, intermediateDegreeDuration } =
    careerHeaderInfo

  return (
    <div
      className={
        'order-1 flex flex-col justify-center px-4 sm:px-0 md:flex-row md:gap-4 lg:items-center'
      }
    >
      <div className="text-white dark:text-stone-200">
        <h1
          className="mt-1 text-xl font-extrabold tracking-wide text-pretty sm:mt-0 lg:text-2xl"
          id="titleCareer"
        >
          {name}
        </h1>
        <p className="text-sm" id="duration">
          {`DURACIÓN: ${duration} AÑOS`}
        </p>
      </div>
      <div className="text-white dark:text-stone-200">
        <h2
          className="mt-0.5 text-xl font-extrabold tracking-wide sm:mt-0 lg:text-2xl"
          id="subCareer"
        >
          {intermediateDegree}
        </h2>
        <p className="lg:text-md text-sm" id="intermediateDegreeDuration">
          {`DURACIÓN: ${intermediateDegreeDuration} AÑOS`}
        </p>
      </div>
    </div>
  )
}

export default React.memo(
  CareerHeader,
  (prevProps, nextProps) =>
    prevProps.careerHeaderInfo.name === nextProps.careerHeaderInfo.name
)
