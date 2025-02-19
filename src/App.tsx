import { useEffect, useMemo, useState, type JSX } from 'react'
import Select from 'react-select'
import useGetCareerNames from './hooks/useGetCareerNames'
import { getCareer } from './api/careerApi'
import { type Career } from './types/types'
import { CareerDetails } from './components/CareerDetails'
import { Header } from './components/Header'
import { SubjectProvider } from './context/SubjectContext'

function App(): JSX.Element {
  const { careerNames: careerNamesApi, careerNamesError } = useGetCareerNames()

  const [careerSelected, setCareerSelected] = useState<string | null>(null)
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

  useEffect(() => {
    if (!careerSelected) return

    const initilizeCareer = async (): Promise<void> => {
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
      <Header careerHeaderInfo={careerHeaderInfo} />
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
          <SubjectProvider>
            <CareerDetails subjectsByYear={career.subjectsByYear} />
          </SubjectProvider>
        ) : null}
        {error && <div className="text-center text-red-500">{error}</div>}
      </main>
    </>
  )
}

export default App
