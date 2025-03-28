import { useEffect, useMemo, useState, type JSX } from 'react'
import Select from 'react-select'
import useGetCareerNames from './hooks/useGetCareerNames'
import { CareerDetails } from './components/CareerDetails'
import { Header } from './components/Header'
import { useCareerContext } from './hooks/useCareerContext'
import {
  getFromLocalStorage,
  removeStoredValue,
  saveToLocalStorage
} from './utils/storage'
import { type ID } from './types/types'
import { LoadingSpinner } from './components/LoadingSpinner'
import ScrollToTopButton from './components/scroll-to-top-button/ScrollToTopButton'
import Footer from './components/Footer'

function App(): JSX.Element {
  const { careerNames: careerNamesApi, careerNamesError } = useGetCareerNames()
  const {
    changeCareerSelected,
    career,
    error,
    careerIsLoading,
    cleanValuesAndLocalStorage
  } = useCareerContext()
  const [initialSelectedOp, setInitialSelectedOp] = useState<{
    value: string
    label: string
  } | null>(null)

  const handleSelectNames = (
    selectedOption: {
      value: string
      label: string
    } | null
  ): void => {
    if (selectedOption) {
      changeCareerSelected(selectedOption.value)
      saveToLocalStorage('career-selected-id', selectedOption.value)
    } else {
      changeCareerSelected(null)
      cleanValuesAndLocalStorage()
      removeStoredValue('career-selected-id')
      setInitialSelectedOp(null)
    }
  }

  const careerNames = useMemo(() => {
    return careerNamesApi
      .filter((el) => el && el.name && el._id)
      .map((el) => ({ label: el.name, value: el._id }))
  }, [careerNamesApi])

  useEffect(() => {
    const opFromLocalStorage: ID | null =
      getFromLocalStorage('career-selected-id')

    if (!opFromLocalStorage) return

    const selectedOption = careerNamesApi.find(
      (option) => option._id === opFromLocalStorage
    )

    if (selectedOption) {
      setInitialSelectedOp({
        value: selectedOption._id,
        label: selectedOption.name
      })
      changeCareerSelected(selectedOption._id)
    }
  }, [careerNamesApi, changeCareerSelected])

  if (careerNamesError) console.log(`Error: ${careerNamesError.message}`)

  const careerHeaderInfo = career
    ? {
        name: career.name,
        duration: career.duration,
        intermediateDegree: career.intermediateDegree,
        intermediateDegreeDuration: career.intermediateDegreeDuration
      }
    : null

  const handleScroll = (): void => {
    console.log('Esto escrolleando!')
  }

  return (
    <>
      <Header careerHeaderInfo={careerHeaderInfo} />
      <main className="" id="mainElement" onScroll={handleScroll}>
        <div className="w-full">
          <Select
            className="mx-auto my-8 w-xs sm:w-sm"
            options={careerNames}
            onChange={handleSelectNames}
            placeholder={'Seleccione la carrera'}
            isClearable={true}
            value={initialSelectedOp}
          />
        </div>
        {careerIsLoading && <LoadingSpinner />}
        {error && <div className="text-center text-red-500">{error}</div>}
        {career && career.subjectsByYear ? (
          <CareerDetails subjectsByYear={career.subjectsByYear} />
        ) : null}
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  )
}

export default App
