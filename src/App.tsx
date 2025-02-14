import { type JSX } from 'react'
import { getCareer } from './services/getCareer'
import { Header } from './components/Header'
import { CareerDetails } from './components/CareerDetails'

function App(): JSX.Element {
  const career = getCareer()
  const { careerName, careerDuration, subCareerName, subCareerDuration } =
    career

  const careerInforHeader = {
    careerName,
    careerDuration,
    subCareerName,
    subCareerDuration
  }

  return (
    <>
      <Header careerInfoHeader={careerInforHeader} isLoading={false} />
      <main>
        {career.listOfSubjectsForYear ? (
          <CareerDetails listOfSubjectsForYear={career.listOfSubjectsForYear} />
        ) : null}
      </main>
    </>
  )
}

export default App
