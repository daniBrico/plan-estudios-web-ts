import React from 'react'
import { type CareerHeaderInfo } from '../types/types'
import { CareerHeader } from './CareerHeader'

interface HeaderProps {
  careerHeaderInfo?: CareerHeaderInfo | null
}

export const Header: React.FC<HeaderProps> = ({ careerHeaderInfo }) => {
  return (
    <header className="bg-first-color shadow-shadow-select px-4 py-2 lg:px-0">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 px-2 sm:flex-row sm:items-center sm:gap-16 md:min-w-4xl lg:justify-between">
        <div className="order-0 mx-auto sm:mx-0">
          <a
            href="https://www.uno.edu.ar/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              className="hidden w-28 sm:block sm:w-24"
              src="../src/assets/logoUNO.svg"
              alt="Logo de la Universidad Nacional del Oeste"
            />
            <span className="inline-block border-y-2 text-center text-3xl font-extrabold tracking-wide text-white sm:hidden">
              UNO
            </span>
          </a>
        </div>
        {careerHeaderInfo && (
          <CareerHeader careerHeaderInfo={careerHeaderInfo} />
        )}
      </div>
    </header>
  )
}
