import { useMemo, type JSX } from 'react'
import Select from 'react-select'
import useGetCareerNames from './hooks/useGetCareerNames'
import { CareerDetails } from './components/CareerDetails'
import { Header } from './components/Header'
import { useCareerContext } from './hooks/useCareerContext'

function App(): JSX.Element {
  const { careerNames: careerNamesApi, careerNamesError } = useGetCareerNames()
  const { changeCareerSelected, career, error } = useCareerContext()

  const handleSelectNames = (
    selectedOption: {
      value: string
      label: string
    } | null
  ): void => {
    if (selectedOption) {
      changeCareerSelected(selectedOption.value)
    } else {
      changeCareerSelected(null)
    }
  }

  const careerNames = useMemo(() => {
    return careerNamesApi
      .filter((el) => el && el.name && el._id)
      .map((el) => ({ label: el.name, value: el._id }))
  }, [careerNamesApi])

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
          <CareerDetails subjectsByYear={career.subjectsByYear} />
        ) : null}
        {error && <div className="text-center text-red-500">{error}</div>}
      </main>
    </>
  )
}

export default App
