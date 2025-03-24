import { useState, useEffect, type JSX, useCallback } from 'react'
import useMobileDetection from '../../hooks/useMobileDetection'
import { Button } from './Button'

const arrowUpIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"
      fill="#fff"
    />
  </svg>
)

const ArrowLeftIcon = (): JSX.Element => (
  <div className="flex items-center justify-center p-1">
    <span className="text-xl">{'<'}</span>
  </div>
)

const ScrollToTopButton = (): JSX.Element => {
  const [showButton, setShowButton] = useState(false)
  const [arrowUpIsOpen, setArrowUpIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = (): void => {
      // Gets the current scroll position
      const scrollY = window.scrollY || window.pageYOffset

      if (scrollY > 600) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return (): void => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleButtonToTop = useCallback(
    (): void =>
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      }),
    []
  )

  const isMobile = useMobileDetection()

  const handleOpenArrowUp = useCallback((): void => {
    setArrowUpIsOpen(true)

    setTimeout(() => {
      setArrowUpIsOpen(false)
    }, 2000)
  }, [])

  useEffect(() => {
    if (!showButton) setArrowUpIsOpen(false)
  }, [showButton])

  return (
    <>
      {isMobile ? (
        <>
          <Button
            children={ArrowLeftIcon()}
            handleClickCallback={handleOpenArrowUp}
            cssClasses={`right-0 bottom-16 h-16 rounded-tl-lg rounded-bl-lg ${showButton ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          />
          {
            <Button
              children={<div className="w-12">{arrowUpIcon()}</div>}
              handleClickCallback={handleButtonToTop}
              cssClasses={`right-0 bottom-16 h-16 w-18 rounded-tl-lg rounded-bl-lg ease-in transition-transform ${arrowUpIsOpen ? 'translate-x-0' : 'translate-x-full'}`}
            />
          }
        </>
      ) : (
        <Button
          children={arrowUpIcon()}
          handleClickCallback={handleButtonToTop}
          cssClasses={`right-8 bottom-16 h-13 w-13 rounded-4xl hover:opacity-90 ${showButton ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        />
      )}
    </>
  )
}

export default ScrollToTopButton
