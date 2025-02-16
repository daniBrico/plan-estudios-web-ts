import { type CareerHeaderInfo } from '../types/types'

interface Props {
  careerHeaderInfo: CareerHeaderInfo
  isLoading: boolean
}

export const Header: React.FC<Props> = ({ careerHeaderInfo, isLoading }) => {
  const { name, duration, intermediateDegree, intermediateDegreeDuration } =
    careerHeaderInfo

  return (
    <header className="bg-fourth-color shadow-shadow-select px-4 py-2">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center lg:gap-8">
        <div
          className={`order-1 flex flex-col justify-center lg:flex-row lg:items-center lg:gap-4 ${
            isLoading ? 'invisible hidden' : ''
          }`}
        >
          <div>
            <h1
              className="mt-1 text-2xl font-extrabold tracking-wide text-pretty text-white lg:mt-0"
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
              className="mt-0.5 text-xl font-extrabold tracking-wide text-white lg:mt-0 lg:text-2xl"
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
        <div className="order-0 mx-auto sm:mx-0">
          <a
            href="https://www.uno.edu.ar/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              className="hidden w-28 sm:block sm:w-24"
              src="../src/assets/logoUNO.svg"
              alt="Logo de la Universidad Nacional del Oeste"
            />
            <span className="inline-block border-y-2 text-center text-3xl font-extrabold tracking-wide text-white sm:hidden">
              UNO
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
