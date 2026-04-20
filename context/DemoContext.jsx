'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'

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
  {
    id: 'ai-assistant',
    name: 'Lumen Assistant',
    category: 'AI Chatbot',
    description: 'Smart business assistant chatbot',
    icon: 'ph:sparkle-bold',
    theme: {
      bg: '#0b0f1a',
      surface: '#111827',
      elevated: '#1f2937',
      text: '#f9fafb',
      muted: '#9ca3af',
      accent: '#06b6d4',
      accentAlt: '#a78bfa',
      border: '#374151',
    },
    navItems: ['Chat', 'Knowledge', 'History', 'Settings'],
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
    if (!demo) return

    // Only push a back-button marker when we're already on /demos (user clicked a
    // demo card on the grid). When entering from another route, the caller's
    // router.push('/demos') owns the history entry — pressing back takes them to
    // the origin route, which our popstate listener treats as "exit demo."
    if (typeof window !== 'undefined' && window.location.pathname === '/demos') {
      window.history.pushState({ kevcoDemo: demoId }, '', `/demos#${demoId}`)
    }

    setTransitionDemo(demo)
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveDemo(demo)
      setIsInDemoMode(true)
      setTimeout(() => {
        setIsTransitioning(false)
        setTransitionDemo(null)
      }, 400)
    }, 300)
  }, [])

  const exitDemo = useCallback((opts = {}) => {
    // Pop the marker entry only if we pushed one (i.e. we're on /demos#<id>).
    // Don't call history.back when triggered by popstate — browser already moved.
    if (
      !opts.fromPopState &&
      typeof window !== 'undefined' &&
      window.history.state?.kevcoDemo &&
      window.location.pathname === '/demos'
    ) {
      window.history.back()
    }

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
    if (!demo || demo.id === activeDemo?.id) return

    // Replace (not push) so browser-back still goes to the grid, not the previous demo.
    if (typeof window !== 'undefined' && window.location.pathname === '/demos') {
      window.history.replaceState({ kevcoDemo: demoId }, '', `/demos#${demoId}`)
    }

    setTransitionDemo(demo)
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveDemo(demo)
      setTimeout(() => {
        setIsTransitioning(false)
        setTransitionDemo(null)
      }, 400)
    }, 300)
  }, [activeDemo])

  // Listen for back/forward navigation. Exit demo whenever the user lands somewhere
  // that isn't a live demo state (either not on /demos, or on /demos without our
  // kevcoDemo marker — i.e. they backed out to the grid).
  useEffect(() => {
    const onPopState = () => {
      if (!isInDemoMode) return
      const onDemosPath = window.location.pathname === '/demos'
      const hasMarker = window.history.state?.kevcoDemo
      if (!onDemosPath || !hasMarker) {
        exitDemo({ fromPopState: true })
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [isInDemoMode, exitDemo])

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
