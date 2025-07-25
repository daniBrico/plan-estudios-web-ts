import { useEffect } from 'react'

interface UseProps {
  isOpen: boolean
  onClose: () => void
  ref: React.RefObject<HTMLDivElement | null>
}

const useCloseOnScrollOrClickOutside = ({
  isOpen,
  onClose,
  ref
}: UseProps): void => {
  useEffect(() => {
    const handleScroll = (): void => {
      if (isOpen) onClose()
    }

    const handleOutsideClick = (e: MouseEvent): void => {
      if (ref?.current && !ref?.current.contains(e.target as Node)) onClose()
    }

    window.addEventListener('scroll', handleScroll)

    if (isOpen) document.addEventListener('mousedown', handleOutsideClick)

    return (): void => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])
}

export default useCloseOnScrollOrClickOutside
