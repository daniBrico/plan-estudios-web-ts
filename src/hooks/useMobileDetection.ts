import { useState, useEffect } from 'react'

const useMobileDetection = (): boolean | null => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  // Based on the display width
  useEffect(() => {
    if (!isMobile) setIsMobile(window.innerWidth <= 768)

    const handleResize = (): void => setIsMobile(window.innerWidth <= 768)

    window.addEventListener('resize', handleResize)

    return (): void => window.removeEventListener('resize', handleResize)
  }, [isMobile])

  return isMobile
}

export default useMobileDetection
