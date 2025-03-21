import { useState, useEffect, type JSX } from 'react'

const ScrollToTopButton = (): JSX.Element => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = (): void => {
      // Calcula la posición actual del scroll
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

  const handleButtonToTop = (): void =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

  return (
    <>
      <button
        className={`bg-first-color fixed right-[15%] bottom-[5%] z-1100 flex h-13 w-13 cursor-pointer items-center justify-center rounded-4xl border-0 text-white shadow-xl outline-0 transition-opacity duration-300 select-none hover:opacity-90 sm:right-[5%] sm:bottom-[5%] ${showButton ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={handleButtonToTop}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"
            fill="#fff"
          />
        </svg>
      </button>
    </>
  )
}

export default ScrollToTopButton
