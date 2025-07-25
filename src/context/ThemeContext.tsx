import { type JSX, type ReactNode, useEffect, useState } from 'react'
import { ThemeContext } from '../hooks/useThemeContext'

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  // useState
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // useEffects
  useEffect(() => {
    // const root = window.document.documentElement
  }, [theme])

  // Functions
  const toggleTheme = (): void => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const data = {
    theme,
    toggleTheme
  }

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
