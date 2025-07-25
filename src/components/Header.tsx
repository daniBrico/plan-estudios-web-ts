import React, { useEffect, useState } from 'react'
import CareerHeader from './CareerHeader'
import logoUNO from '../assets/logoUNO.svg'
import Navbar from './Navbar'
import useCareerStore from '../store/careerStore'
import { type ID, type CareerHeaderInfo } from '../types/types'
import { getFromLocalStorage } from '../utils/storage'
import ThemeToggle from './ThemeToggle'

const Header: React.FC = () => {
  // useState
  const [careerHeaderInfo, setCareerHeaderInfo] =
    useState<null | CareerHeaderInfo>(null)

  // cotext
  // careerStore
  const career = useCareerStore((state) => state.career)
  const setCareerSelectedID = useCareerStore(
    (state) => state.setCareerSelectedID
  )

  useEffect(() => {
    if (career === null) {
      setCareerHeaderInfo(null)

      return
    }

    setCareerHeaderInfo({
      name: career.name,
      duration: career.duration,
      intermediateDegree: career.intermediateDegree,
      intermediateDegreeDuration: career.intermediateDegreeDuration
    })
  }, [career])

  useEffect(() => {
    const careerIDFromLS: ID | null = getFromLocalStorage('career-selected-id')

    if (careerIDFromLS === null) return

    setCareerSelectedID(careerIDFromLS)
  }, [])

  return (
    <>
      <header className="bg-theme-first-color py-5 sm:px-6 lg:px-0">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-16 lg:justify-between">
          <div className="relative order-0 flex w-full items-center justify-center sm:mx-0">
            <a
              href="https://www.uno.edu.ar/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                className="hidden w-28 sm:block sm:w-24"
                src={logoUNO}
                alt="Logo de la Universidad Nacional del Oeste"
              />
              <span className="w-full border-y-2 text-center text-3xl font-extrabold tracking-wide text-white sm:hidden">
                UNO
              </span>
            </a>
            <ThemeToggle />
          </div>
          {careerHeaderInfo && (
            <CareerHeader careerHeaderInfo={careerHeaderInfo} />
          )}
        </div>
      </header>
      <Navbar />
    </>
  )
}

export default Header
