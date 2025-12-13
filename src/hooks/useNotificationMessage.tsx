import { useEffect, useState } from 'react'

interface UseNotificationMessageReturn {
  showMessage: boolean
  message: string
  showNotificationMessage: (newMessage: string) => void
}

export const useNotificationMessage = (): UseNotificationMessageReturn => {
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!showMessage) return

    const hideTimer = setTimeout(() => {
      setShowMessage(false)
    }, 3000)

    const clearMessageTimer = setTimeout(() => {
      setMessage('')
    }, 3300)

    return (): void => {
      clearTimeout(hideTimer)
      clearTimeout(clearMessageTimer)
    }
  }, [showMessage])

  const showNotificationMessage = (newMessage: string): void => {
    setMessage(newMessage)
    setShowMessage(true)
  }

  return { showMessage, message, showNotificationMessage }
}
