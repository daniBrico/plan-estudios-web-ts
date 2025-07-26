import { type JSX, type ReactNode, useEffect, useState } from 'react'
import { ThemeContext } from '../hooks/useThemeContext'
import { type ThemeType } from '../types/types'

interface ThemeProviderProps {
  children: ReactNode
}

const HTMLElement = document.documentElement
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  // useState
  const [theme, setTheme] = useState<ThemeType>(
    (localStorage.getItem('theme') ?? 'system') as ThemeType
  )

  const cleanHTMLElClasses = (): void => {
    HTMLElement.classList.remove('dark', 'light', 'system')
  }

  // useEffects
  useEffect(() => {
    const changeHandler = (): void => {
      if (theme !== 'system') return

      cleanHTMLElClasses()
    }

    darkQuery.addEventListener('change', changeHandler)

    return (): void => {
      darkQuery.removeEventListener('change', changeHandler)
    }
  }, [])

  useEffect(() => {
    if (theme === 'system') {
      if (darkQuery.matches) {
        HTMLElement.classList.add('dark')
      } else {
        HTMLElement.classList.add('light')
      }

      localStorage.setItem('theme', 'system')

      return
    }

    cleanHTMLElClasses()

    localStorage.setItem('theme', theme)

    HTMLElement.classList.add(theme)
  }, [theme])

  // Functions
  const changeTheme = (newThemeValue: ThemeType): void => {
    if (newThemeValue === theme) return

    setTheme(newThemeValue)
  }

  const data = {
    theme,
    changeTheme
  }

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
