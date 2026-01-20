import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext()

export const themes = {
  dark: {
    id: 'dark',
    name: 'Gold Reign',
    bg: '#000000',
    surface: '#0a0a0a',
    elevated: '#141414',
    accent: '#C5A059',
    accentAlt: '#DBC184',
    accentRgb: '197, 160, 89',
    text: '#F5F5DC',
    muted: '#B8A480',
    border: '#3d3525',
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
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    bg: '#0a1628',
    surface: '#0f1d32',
    elevated: '#162a46',
    accent: '#38bdf8',
    accentAlt: '#06b6d4',
    accentRgb: '56, 189, 248',
    text: '#e0f2fe',
    muted: '#7dd3fc',
    border: '#1e3a5f',
  },
  rose: {
    id: 'rose',
    name: 'Rose',
    bg: '#1a0a10',
    surface: '#2a1018',
    elevated: '#3d1a25',
    accent: '#f472b6',
    accentAlt: '#a855f7',
    accentRgb: '244, 114, 182',
    text: '#fdf2f8',
    muted: '#f9a8d4',
    border: '#4a2030',
  },
  forest: {
    id: 'forest',
    name: 'Forest',
    bg: '#0a1410',
    surface: '#0f1f18',
    elevated: '#162e22',
    accent: '#4ade80',
    accentAlt: '#facc15',
    accentRgb: '74, 222, 128',
    text: '#ecfdf5',
    muted: '#86efac',
    border: '#1a3d2a',
  },
  lavender: {
    id: 'lavender',
    name: 'Lavender',
    bg: '#0f0a1a',
    surface: '#1a1028',
    elevated: '#261a3d',
    accent: '#a78bfa',
    accentAlt: '#f472b6',
    accentRgb: '167, 139, 250',
    text: '#f5f3ff',
    muted: '#c4b5fd',
    border: '#3b2d5c',
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    bg: '#1a0a0a',
    surface: '#2a1010',
    elevated: '#3d1818',
    accent: '#fb923c',
    accentAlt: '#f43f5e',
    accentRgb: '251, 146, 60',
    text: '#fff7ed',
    muted: '#fdba74',
    border: '#4a2020',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    bg: '#020617',
    surface: '#0f172a',
    elevated: '#1e293b',
    accent: '#818cf8',
    accentAlt: '#ec4899',
    accentRgb: '129, 140, 248',
    text: '#e2e8f0',
    muted: '#94a3b8',
    border: '#334155',
  },
}

function applyTheme(theme, animate = false) {
  const root = document.documentElement

  if (animate) {
    // Add transition class for smooth color changes
    root.style.setProperty('--theme-transition', '0.5s')
  }

  root.style.setProperty('--bg', theme.bg)
  root.style.setProperty('--surface', theme.surface)
  root.style.setProperty('--elevated', theme.elevated)
  root.style.setProperty('--accent', theme.accent)
  root.style.setProperty('--accent-alt', theme.accentAlt)
  root.style.setProperty('--accent-rgb', theme.accentRgb)
  root.style.setProperty('--text', theme.text)
  root.style.setProperty('--muted', theme.muted)
  root.style.setProperty('--border', theme.border)

  if (animate) {
    // Remove transition after animation completes
    setTimeout(() => {
      root.style.setProperty('--theme-transition', '0s')
    }, 500)
  }
}

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState('dark')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const theme = themes[themeKey]

  useEffect(() => {
    const saved = localStorage.getItem('kevco-theme')
    if (saved && themes[saved]) {
      setThemeKey(saved)
      applyTheme(themes[saved], false)
    } else {
      applyTheme(theme, false)
    }
  }, [])

  const setTheme = useCallback((key) => {
    if (themes[key] && key !== themeKey) {
      setIsTransitioning(true)
      localStorage.setItem('kevco-theme', key)
      applyTheme(themes[key], true)
      setThemeKey(key)

      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }
  }, [themeKey])

  const cycleTheme = useCallback(() => {
    const keys = Object.keys(themes)
    const currentIndex = keys.indexOf(themeKey)
    const nextIndex = (currentIndex + 1) % keys.length
    setTheme(keys[nextIndex])
  }, [themeKey, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, themeKey, setTheme, cycleTheme, themes, isTransitioning }}>
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
