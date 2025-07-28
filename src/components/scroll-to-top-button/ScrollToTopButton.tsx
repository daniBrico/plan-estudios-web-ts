import { useState, useEffect, type JSX, useCallback, useRef } from 'react'
import ArrowUpIconSvg from '../svg-components/ArrowUpIconSvg'

const ArrowLeftIcon = (): JSX.Element => (
  <div className="flex items-center justify-center p-1">
    <span className="text-xl">{'<'}</span>
  </div>
)

const defaultClasses =
  'bg-theme-first-color fixed z-[200] cursor-pointer items-center justify-center text-white shadow-xl duration-300 select-none'

const mobileDefaultClasses =
  'right-0 bottom-26 flex h-16 rounded-tl-lg rounded-bl-lg sm:hidden'

const ScrollToTopButton = (): JSX.Element => {
  const [showButton, setShowButton] = useState(false)
  const [arrowUpIsOpen, setArrowUpIsOpen] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = (): void => {
      // Gets the current scroll position
      const scrollY = window.scrollY || window.pageYOffset

      setShowButton(scrollY > 600)
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

  const handleOpenArrowUp = useCallback((): void => {
    setArrowUpIsOpen(true)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setArrowUpIsOpen(false)
    }, 2000)
  }, [])

  useEffect(() => {
    if (!showButton) setArrowUpIsOpen(false)
  }, [showButton])

  useEffect(() => {
    return (): void => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <>
      <button
        className={`${defaultClasses} ${mobileDefaultClasses} transition-opacity ${showButton ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={handleOpenArrowUp}
      >
        {ArrowLeftIcon()}
      </button>
      <button
        className={`${defaultClasses} ${mobileDefaultClasses} w-12 transition-transform ease-in ${arrowUpIsOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={handleButtonToTop}
      >
        <ArrowUpIconSvg />
      </button>

      <button
        className={`${defaultClasses} right-8 bottom-20 hidden h-13 w-13 rounded-4xl border border-white transition-transform hover:scale-110 sm:flex ${showButton ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={handleButtonToTop}
      >
        <ArrowUpIconSvg />
      </button>
    </>
  )
}

export default ScrollToTopButton
