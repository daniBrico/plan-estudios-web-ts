import { createContext, useContext } from 'react'
import { type ThemeType } from '../types/types'

interface ThemeContextType {
  theme: ThemeType
  changeTheme: (newValue: ThemeType) => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext)

  if (!context)
    throw new Error('useThemeContext must be used within an AuthProvider')

  return context
}
