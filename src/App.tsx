import { useEffect, useMemo, useState, type JSX } from 'react'
import Select from 'react-select'
import useGetCareerNames from './hooks/useGetCareerNames'
import { CareerHeader } from './components/CareerHeader'
import { getCareer } from './api/careerApi'
import { type Career } from './types/types'
import { CareerDetails } from './components/CareerDetails'

function App(): JSX.Element {
  const { careerNames: careerNamesApi, careerNamesError } = useGetCareerNames()

  const [careerSelected, setCareerSelected] = useState<string | null>(null)
  // const [careerNames, setCareerNames] = useState<
  //   { label: string; value: string }[]
  // >([])
  const [career, setCareer] = useState<Career | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSelectNames = (
    selectedOption: {
      value: string
      label: string
    } | null
  ): void => {
    if (selectedOption) {
      setCareerSelected(selectedOption.value)
    } else {
      setCareerSelected(null)
      setCareer(null)
    }
  }

  const careerNames = useMemo(() => {
    return careerNamesApi
      .filter((el) => el && el.name && el._id)
      .map((el) => ({ label: el.name, value: el._id }))
  }, [careerNamesApi])

  // useEffect(() => {
  //   if (!careerNamesApi.length) return

  //   const careerNames: { label: string; value: string }[] = []

  //   careerNamesApi.forEach((el) => {
  //     if (el && el.name && el._id)
  //       careerNames.push({ label: el.name, value: el._id })
  //   })

  //   setCareerNames(careerNames)
  // }, [careerNamesApi])

  useEffect(() => {
    const initilizeCareer = async (): Promise<void> => {
      if (!careerSelected) return

      try {
        const careerData = await getCareer(careerSelected)
        setCareer(careerData)
        setError(null)
      } catch (err) {
        setError('Error al cargar los datos de la carrera')
        console.log(`Error al inicializar los datos de la carrera: ${err}`)
      }
    }

    initilizeCareer()
  }, [careerSelected])

  if (careerNamesError) console.log(`Error: ${careerNamesError.message}`)

  const careerHeaderInfo = career
    ? {
        name: career.name,
        duration: career.duration,
        intermediateDegree: career.intermediateDegree,
        intermediateDegreeDuration: career.intermediateDegreeDuration
      }
    : null

  return (
    <>
      <header className="bg-fourth-color shadow-shadow-select px-4 py-2 lg:px-0">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 px-2 sm:flex-row sm:items-center sm:gap-16 md:min-w-4xl lg:justify-between">
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
          {careerHeaderInfo && (
            <CareerHeader careerHeaderInfo={careerHeaderInfo} />
          )}
        </div>
      </header>
      <main>
        <div className="w-full">
          <Select
            className="mx-auto my-8 w-xs sm:w-sm"
            options={careerNames}
            onChange={handleSelectNames}
            placeholder={'Seleccione la carrera'}
            isClearable={true}
          />
        </div>
        {career && career.subjectsByYear ? (
          <CareerDetails subjectsByYear={career.subjectsByYear} />
        ) : null}
        {error && <div className="text-center text-red-500">{error}</div>}
      </main>
    </>
  )
}

export default App
