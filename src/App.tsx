import { type JSX } from 'react'
import useGetCareer from './hooks/useGetCareer'
import { Header } from './components/Header'
import { CareerDetails } from './components/CareerDetails'

function App(): JSX.Element {
  const { career, loading, error } = useGetCareer('66b3e77034ae56bad455a0f9')

  if (loading) return <div>Cargando...</div>

  if (error) return <div>Error: {error.message}</div>

  if (!career) return <div>No se encontró información de la carrera.</div>

  const {
    name,
    duration,
    intermediateDegree,
    intermediateDegreeDuration,
    subjectsByYear
  } = career

  const careerHeaderInfo = {
    name,
    duration,
    intermediateDegree,
    intermediateDegreeDuration
  }

  return (
    <>
      <Header careerHeaderInfo={careerHeaderInfo} isLoading={false} />
      <main>
        {career.subjectsByYear ? (
          <CareerDetails subjectsByYear={subjectsByYear} />
        ) : null}
      </main>
    </>
  )
}

export default App
