import React from 'react'
import useCareerStore from '../store/careerStore'

interface LoadingSpinnerProps {
  message?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  // context
  // careerStore
  const careerIsLoading = useCareerStore((state) => state.careerIsLoading)
  const localStorageIsLoading = useCareerStore(
    (state) => state.localStorageIsLoading
  )

  return (
    <>
      {(careerIsLoading || localStorageIsLoading) && (
        <div className="absolute flex h-full w-full flex-col items-center justify-center gap-2">
          <div className="animate-loading-spinner border-t-theme-first-color mx-auto box-border h-11 w-11 rounded-full border-[10px] border-solid border-transparent md:h-14 md:w-14 xl:h-16 xl:w-16" />
          {message && (
            <p className="text-theme-first-color text-sm md:text-base">
              {message}
            </p>
          )}
        </div>
      )}
    </>
  )
}
