import { useEffect, useRef } from 'react'

interface UseProps {
  isOpen: boolean
  onClose: (currentTarget?: Node) => void
  ref: React.RefObject<HTMLDivElement | null>
}

const useCloseOnScrollOrClickOutside = ({
  isOpen,
  onClose,
  ref
}: UseProps): void => {
  const scrollCount = useRef(0)

  useEffect(() => {
    if (!isOpen) return

    const handleScroll = (): void => {
      scrollCount.current += 1
      console.log(`Scroll handler ejecutado ${scrollCount.current} veces`)

      onClose()
    }

    const handleOutsideClick = (e: MouseEvent): void => {
      if (ref?.current && !ref?.current.contains(e.target as Node)) {
        if (e.target === null) {
          onClose()
          return
        }

        onClose(e.target as Node)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    window.addEventListener('scroll', handleScroll)

    return (): void => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])
}

export default useCloseOnScrollOrClickOutside
