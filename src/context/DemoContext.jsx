import { createContext, useContext, useState, useCallback } from 'react'

// Demo site configurations with unique themes
export const demoSites = [
  {
    id: 'ecommerce',
    name: 'LuxeCart',
    category: 'E-Commerce',
    description: 'Premium shopping experience',
    icon: 'ph:shopping-bag-bold',
    theme: {
      bg: '#0a0a0a',
      surface: '#141414',
      elevated: '#1a1a1a',
      text: '#fafafa',
      muted: '#a3a3a3',
      accent: '#d4af37',
      accentAlt: '#f5d76e',
      border: '#262626',
    },
    navItems: ['Shop', 'Collections', 'New Arrivals', 'Sale', 'Cart'],
  },
  {
    id: 'saas',
    name: 'AnalyticsPro',
    category: 'SaaS Dashboard',
    description: 'Data analytics platform',
    icon: 'ph:chart-line-bold',
    theme: {
      bg: '#0f172a',
      surface: '#1e293b',
      elevated: '#334155',
      text: '#f8fafc',
      muted: '#94a3b8',
      accent: '#3b82f6',
      accentAlt: '#60a5fa',
      border: '#475569',
    },
    navItems: ['Dashboard', 'Analytics', 'Reports', 'Settings', 'Team'],
  },
  {
    id: 'restaurant',
    name: 'Savoria',
    category: 'Restaurant',
    description: 'Fine dining experience',
    icon: 'ph:fork-knife-bold',
    theme: {
      bg: '#1c1917',
      surface: '#292524',
      elevated: '#44403c',
      text: '#fafaf9',
      muted: '#a8a29e',
      accent: '#dc2626',
      accentAlt: '#f87171',
      border: '#57534e',
    },
    navItems: ['Menu', 'Reservations', 'Catering', 'About', 'Contact'],
  },
  {
    id: 'fitness',
    name: 'FitForge',
    category: 'Fitness App',
    description: 'Personal training platform',
    icon: 'ph:barbell-bold',
    theme: {
      bg: '#09090b',
      surface: '#18181b',
      elevated: '#27272a',
      text: '#fafafa',
      muted: '#a1a1aa',
      accent: '#22c55e',
      accentAlt: '#4ade80',
      border: '#3f3f46',
    },
    navItems: ['Workouts', 'Programs', 'Nutrition', 'Progress', 'Community'],
  },
  {
    id: 'agency',
    name: 'Paradigm',
    category: 'Creative Agency',
    description: 'Design studio portfolio',
    icon: 'ph:palette-bold',
    theme: {
      bg: '#faf5ff',
      surface: '#f3e8ff',
      elevated: '#e9d5ff',
      text: '#1e1b4b',
      muted: '#6b21a8',
      accent: '#9333ea',
      accentAlt: '#a855f7',
      border: '#d8b4fe',
    },
    navItems: ['Work', 'Services', 'Studio', 'Journal', 'Contact'],
  },
]

const DemoContext = createContext()

export function DemoProvider({ children }) {
  const [activeDemo, setActiveDemo] = useState(null)
  const [isInDemoMode, setIsInDemoMode] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionDemo, setTransitionDemo] = useState(null)

  const enterDemo = useCallback((demoId) => {
    const demo = demoSites.find(d => d.id === demoId)
    if (demo) {
      setTransitionDemo(demo)
      setIsTransitioning(true)
      // Small delay for the transition overlay to appear
      setTimeout(() => {
        setActiveDemo(demo)
        setIsInDemoMode(true)
        // Keep transition visible briefly while content loads
        setTimeout(() => {
          setIsTransitioning(false)
          setTransitionDemo(null)
        }, 400)
      }, 300)
    }
  }, [])

  const exitDemo = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveDemo(null)
      setIsInDemoMode(false)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
    }, 300)
  }, [])

  const switchDemo = useCallback((demoId) => {
    const demo = demoSites.find(d => d.id === demoId)
    if (demo && demo.id !== activeDemo?.id) {
      setTransitionDemo(demo)
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveDemo(demo)
        setTimeout(() => {
          setIsTransitioning(false)
          setTransitionDemo(null)
        }, 400)
      }, 300)
    }
  }, [activeDemo])

  return (
    <DemoContext.Provider value={{
      activeDemo,
      isInDemoMode,
      isTransitioning,
      transitionDemo,
      demoSites,
      enterDemo,
      exitDemo,
      switchDemo,
    }}>
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  const context = useContext(DemoContext)
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider')
  }
  return context
}
