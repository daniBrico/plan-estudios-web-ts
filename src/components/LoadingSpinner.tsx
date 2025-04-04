import React from 'react'

interface LoadingSpinnerProps {
  message?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <>
      <div className="absolute flex w-full flex-col items-center justify-center gap-2">
        <div className="animate-loading-spinner border-t-first-color mx-auto box-border h-11 w-11 rounded-full border-[10px] border-solid border-transparent md:h-14 md:w-14 xl:h-16 xl:w-16" />
        {message && <p className="text-first-color">{message}</p>}
      </div>
    </>
  )
}
