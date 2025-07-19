import { type JSX } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { ScrollToTopButton } from './scroll-to-top-button/ScrollToTopButton'
import useCareerStore from '../store/careerStore'

export const Layout = (): JSX.Element => {
  // context
  // careerStore
  const career = useCareerStore((state) => state.career)

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
      <main className="relative flex h-full flex-col items-center justify-center">
        <Outlet />
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  )
}
