import { useEffect } from 'react'

interface UseProps {
  isOpen: boolean
  onClose: (currentTarget?: Node) => void
  ref: React.RefObject<HTMLElement | null>
  excludeRefs?: React.RefObject<HTMLElement | null>[]
}

const useCloseOnClickOutside = ({
  isOpen,
  onClose,
  ref,
  excludeRefs = []
}: UseProps): void => {
  useEffect(() => {
    if (!isOpen) return

    const handleOutsideClick = (e: MouseEvent): void => {
      const target = e.target as Node | null
      const element = ref?.current

      if (!element || !target) return

      if (element.contains(target)) return

      const clickedInsideExcluded = excludeRefs.some((excludeRef) => {
        const el = excludeRef.current
        return el ? el.contains(target) : false
      })

      if (clickedInsideExcluded) return

      onClose(target)
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return (): void =>
      document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen])
}

export default useCloseOnClickOutside
