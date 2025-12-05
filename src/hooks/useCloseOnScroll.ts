import { useEffect } from 'react'

interface UseProps {
  isOpen: boolean
  onClose: (currentTarget?: Node) => void
}

const useCloseOnScroll = ({ isOpen, onClose }: UseProps): void => {
  useEffect(() => {
    if (!isOpen) return

    const handleScroll = (): void => onClose()

    window.addEventListener('scroll', handleScroll)

    return (): void => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isOpen])
}

export default useCloseOnScroll
