import React from 'react'
import { type CareerHeaderInfo } from '../types/types'

interface Props {
  careerHeaderInfo: CareerHeaderInfo
}

const CareerHeader: React.FC<Props> = ({ careerHeaderInfo }) => {
  const { name, duration, intermediateDegree, intermediateDegreeDuration } =
    careerHeaderInfo

  return (
    <div
      className={
        'order-1 flex flex-col justify-center px-4 md:flex-row md:gap-8 lg:items-center'
      }
    >
      <div>
        <h1
          className="mt-1 text-xl font-extrabold tracking-wide text-pretty text-white sm:mt-0 lg:text-2xl"
          id="titleCareer"
        >
          {name}
        </h1>
        <p className="text-sm text-white" id="duration">
          {`DURACIÓN: ${duration} AÑOS`}
        </p>
      </div>
      <div>
        <h2
          className="mt-0.5 text-xl font-extrabold tracking-wide text-white sm:mt-0 lg:text-2xl"
          id="subCareer"
        >
          {intermediateDegree}
        </h2>
        <p
          className="lg:text-md text-sm text-white"
          id="intermediateDegreeDuration"
        >
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
