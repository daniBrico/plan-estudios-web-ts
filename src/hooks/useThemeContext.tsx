import { createContext, useContext } from 'react'

interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext)

  if (!context)
    throw new Error('useThemeContext must be used within an AuthProvider')

  return context
}
