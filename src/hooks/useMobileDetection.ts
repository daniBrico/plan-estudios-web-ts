import { useState, useEffect } from 'react'

const useMobileDetection = (): boolean => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0

    setIsMobile(isTouchDevice)
  }, [])

  return isMobile
}

export default useMobileDetection
