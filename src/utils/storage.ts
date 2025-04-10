type Key = string
type Data<T> = T

// Local Storage

export const saveToLocalStorage = <T>(key: Key, data: Data<T>): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const getFromLocalStorage = <T>(key: Key): T | null => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error getting from localStorage:', error)
    return null
  }
}

export const isInLocalStorage = (key: Key): boolean => {
  try {
    const data = localStorage.getItem(key)
    return data === null
  } catch (error) {
    console.error('Error getting from localStorage:', error)
    return false
  }
}

export const removeStoredValue = (key: Key): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(error)
  }
}

// Sessión Storage

export const saveToSessionStorage = <T>(key: Key, data: Data<T>): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving to sessionStorage:', error)
  }
}

export const getFromSessionStorage = <T>(key: Key): T | null => {
  try {
    const data = sessionStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error getting from sessionStorage:', error)
    return null
  }
}

export const removeFromSessionStorage = (key: Key): void => {
  try {
    sessionStorage.removeItem(key)
  } catch (error) {
    console.error(error)
  }
}
