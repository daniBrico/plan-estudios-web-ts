import React, { useEffect } from 'react'
import CareerHeader from './CareerHeader'
import Navbar from './navbar/Navbar'
import useCareerStore from '../../store/careerStore'
import { type ID, type CareerHeaderInfo } from '../../types/types'
import { getFromLocalStorage } from '../../utils/storage'
import LogoUNOSvg from '../svg-components/LogoUNOSvg'
import ThemeToggle from './ThemeToggle'

const Header: React.FC = () => {
  const career = useCareerStore((state) => state.career)
  const setCareerSelectedID = useCareerStore(
    (state) => state.setCareerSelectedID
  )

  useEffect(() => {
    const careerIDFromLS: ID | null = getFromLocalStorage('career-selected-id')

    if (careerIDFromLS === null) return

    setCareerSelectedID(careerIDFromLS)
  }, [])

  const careerHeaderInfo: CareerHeaderInfo | null = career
    ? {
        name: career.name,
        duration: career.duration,
        intermediateDegree: career.intermediateDegree,
        intermediateDegreeDuration: career.intermediateDegreeDuration
      }
    : null

  return (
    <>
      <header className="bg-carnation-400 py-5 shadow-lg sm:px-6 lg:px-0 dark:bg-stone-900 dark:shadow-stone-950/30">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-16 md:justify-between md:gap-2">
          <div className="relative order-0 flex w-full items-center justify-center sm:static sm:mx-0 sm:w-auto md:w-auto">
            <a
              href="https://www.uno.edu.ar/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="hidden w-28 sm:block sm:w-26">
                <LogoUNOSvg />
              </div>
              <span className="w-full border-y-2 text-center text-3xl font-extrabold tracking-wide text-white sm:hidden dark:border-stone-300 dark:text-stone-300">
                UNO
              </span>
            </a>
            <div className="absolute right-0 mr-4 sm:hidden">
              <ThemeToggle />
            </div>
          </div>
          {careerHeaderInfo && (
            <CareerHeader careerHeaderInfo={careerHeaderInfo} />
          )}
          <div className="order-1 hidden sm:block">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <Navbar />
    </>
  )
}

export default Header
