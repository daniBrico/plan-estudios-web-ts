import { useState, useEffect } from 'react'

const useScrollPosition = (threshold: number = 600): boolean => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollY = window.scrollY || window.pageYOffset

      if (scrollY > threshold) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return (): void => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return showButton
}

export default useScrollPosition
