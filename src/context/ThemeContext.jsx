import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const themes = {
  dark: {
    id: 'dark',
    name: 'Midnight',
    bg: '#030303',
    surface: '#0a0a0a',
    elevated: '#141414',
    accent: '#0ea5e9',
    accentAlt: '#6366f1',
    accentRgb: '14, 165, 233',
    text: '#fafafa',
    muted: '#737373',
    border: '#262626',
  },
  light: {
    id: 'light',
    name: 'Daylight',
    bg: '#fafafa',
    surface: '#ffffff',
    elevated: '#f5f5f5',
    accent: '#0f172a',
    accentAlt: '#334155',
    accentRgb: '15, 23, 42',
    text: '#0f172a',
    muted: '#64748b',
    border: '#e2e8f0',
  },
  neon: {
    id: 'neon',
    name: 'Cyber',
    bg: '#0a0a0f',
    surface: '#0f0f1a',
    elevated: '#1a1a2e',
    accent: '#00ff88',
    accentAlt: '#ff00ff',
    accentRgb: '0, 255, 136',
    text: '#ffffff',
    muted: '#6b7280',
    border: '#2d2d44',
  },
  warm: {
    id: 'warm',
    name: 'Ember',
    bg: '#0c0a09',
    surface: '#1c1917',
    elevated: '#292524',
    accent: '#f59e0b',
    accentAlt: '#ef4444',
    accentRgb: '245, 158, 11',
    text: '#fafaf9',
    muted: '#a8a29e',
    border: '#44403c',
  },
}

function applyTheme(theme) {
  const root = document.documentElement
  root.style.setProperty('--bg', theme.bg)
  root.style.setProperty('--surface', theme.surface)
  root.style.setProperty('--elevated', theme.elevated)
  root.style.setProperty('--accent', theme.accent)
  root.style.setProperty('--accent-alt', theme.accentAlt)
  root.style.setProperty('--accent-rgb', theme.accentRgb)
  root.style.setProperty('--text', theme.text)
  root.style.setProperty('--muted', theme.muted)
  root.style.setProperty('--border', theme.border)
}

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState('dark')
  const theme = themes[themeKey]

  useEffect(() => {
    const saved = localStorage.getItem('kevco-theme')
    if (saved && themes[saved]) {
      setThemeKey(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('kevco-theme', themeKey)
    applyTheme(theme)
  }, [themeKey, theme])

  const setTheme = (key) => {
    if (themes[key]) {
      setThemeKey(key)
    }
  }

  const cycleTheme = () => {
    const keys = Object.keys(themes)
    const currentIndex = keys.indexOf(themeKey)
    const nextIndex = (currentIndex + 1) % keys.length
    setThemeKey(keys[nextIndex])
  }

  return (
    <ThemeContext.Provider value={{ theme, themeKey, setTheme, cycleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
