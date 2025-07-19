import { type JSX } from 'react'
import { LoadingSpinner } from '../components/LoadingSpinner'
import CareerDetails from '../components/CareerDetails'
import CareerSelect from '../components/CareerSelect'

export const PlanEstudiosPage = (): JSX.Element => {
  return (
    <>
      <div className="absolute top-0 right-0 w-full">
        <CareerSelect />
      </div>
      <LoadingSpinner message="Cargando Plan de Estudios" />
      <CareerDetails />
    </>
  )
}
