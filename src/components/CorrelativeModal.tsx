import React, { useEffect, useRef } from 'react'
import { CancelIcon } from './svg-components/CancelIcon'
import { type Correlatives, type Name } from '../types/types'
import { Correlative } from './Correlative'
import { useSubjectStateContext } from '../hooks/useSubjectContext'

interface CorrelativeModalProps {
  name: Name
  correlatives: Correlatives
  changeShowModal: (newValue: boolean) => void
  showModal: boolean
  correlativesContainerRef: React.RefObject<HTMLDivElement | null>
}

export const CorrelativeModal: React.FC<CorrelativeModalProps> = React.memo(
  ({
    name,
    correlatives,
    changeShowModal,
    showModal,
    correlativesContainerRef
  }) => {
    const modalRef = useRef<HTMLDivElement>(null)

    const { getSubjectNameFromCode } = useSubjectStateContext()

    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent): void => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node))
          if (showModal) changeShowModal(false)
      }

      if (showModal) document.addEventListener('mousedown', handleOutsideClick)

      return (): void =>
        document.removeEventListener('mousedown', handleOutsideClick)
    }, [showModal, changeShowModal])

    return (
      <div
        className={`bg-theme-second-color/40 fixed top-0 left-0 z-[1000] flex h-dvh w-dvw items-center justify-center transition-opacity duration-300 ease-in-out ${showModal ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div className="absolute h-full w-full" />
        <div
          ref={modalRef}
          className={`bg-theme-first-color z-200 flex w-[75%] flex-col gap-2.5 rounded-lg border-2 border-white p-2 text-white shadow-lg shadow-black/40 duration-300 ease-in-out sm:w-[60%] md:w-[50%] lg:w-[40%] ${showModal ? 'animate-expand-element opacity-100' : 'animate-shrink-element opacity-0'}`}
        >
          <div className="relative flex items-center justify-center">
            <p className="text-md py-0.5 font-bold sm:text-lg">
              {name.longName}
            </p>
            <div
              className="transition-rotate absolute top-0 right-0 w-6 cursor-pointer rounded-full bg-white p-1 transition-transform duration-300 hover:scale-110 hover:rotate-180 sm:w-7"
              onClick={() => changeShowModal(false)}
            >
              <CancelIcon />
            </div>
          </div>
          {/* correlativas */}
          {
            <div
              ref={correlativesContainerRef}
              className="bg-theme-third-color flex max-h-64 flex-col gap-1 overflow-y-auto rounded-sm border-2 border-white px-1.5 py-1 lg:max-h-90"
            >
              {correlatives.map((correlative) => {
                const subjectNameFromCode =
                  getSubjectNameFromCode(correlative) || ''

                const subjectName =
                  (subjectNameFromCode as Name).shortName ||
                  (subjectNameFromCode as Name).longName

                return (
                  <div key={correlative}>
                    <div className="flex items-center gap-2">
                      <Correlative
                        correlative={correlative}
                        tooltip={false}
                        cssClasess="font-light min-w-12"
                      />
                      <p className="grow-2 text-left text-black">{`${subjectName}`}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          }
        </div>
      </div>
    )
  }
)
