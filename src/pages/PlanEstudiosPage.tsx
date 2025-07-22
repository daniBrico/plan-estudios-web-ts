import { type JSX } from 'react'
import { LoadingSpinner } from '../components/LoadingSpinner'
import CareerDetails from '../components/CareerDetails'
import CareerSelect from '../components/CareerSelect'

export const PlanEstudiosPage = (): JSX.Element => {
  return (
    <>
      <CareerSelect />
      <LoadingSpinner message="Cargando Plan de Estudios" />
      <CareerDetails />
    </>
  )
}
