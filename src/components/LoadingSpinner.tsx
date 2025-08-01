import React from 'react'
import useCareerStore from '../store/careerStore'

interface LoadingSpinnerProps {
  message?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  const careerIsLoading = useCareerStore((state) => state.careerIsLoading)
  const localStorageIsLoading = useCareerStore(
    (state) => state.localStorageIsLoading
  )

  return (
    <>
      {(careerIsLoading || localStorageIsLoading) && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <div className="animate-loading-spinner border-t-primary mx-auto box-border h-11 w-11 rounded-full border-[10px] border-solid border-transparent md:h-14 md:w-14 xl:h-16 xl:w-16 dark:border-t-stone-800" />
          {message && (
            <p className="text-primary text-sm md:text-base dark:text-stone-500">
              {message}
            </p>
          )}
        </div>
      )}
    </>
  )
}
