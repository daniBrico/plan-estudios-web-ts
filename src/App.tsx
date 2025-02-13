import { type JSX } from 'react'
import { getCareer } from './services/getCareer'
import { Header } from './components/Header'

function App(): JSX.Element {
  const career = getCareer()
  const { careerName, careerDuration, subCareerName, subCareerDuration } =
    career

  const careerInforHeader = {
    careerName,
    careerDuration,
    subCareerName,
    subCareerDuration,
  }

  return (
    <>
      <Header careerInfoHeader={careerInforHeader} isLoading={false} />
      <h1>Hola mundo</h1>
    </>
  )
}

export default App
