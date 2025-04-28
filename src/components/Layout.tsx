import { type JSX } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { ScrollToTopButton } from './scroll-to-top-button/ScrollToTopButton'
import { useCareerContext } from '../hooks/useCareerContext'

export const Layout = (): JSX.Element => {
  const { career } = useCareerContext()

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
      <main className="flex flex-col items-center">
        <Outlet />
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  )
}
