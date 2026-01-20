import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { Icon } from '@iconify/react'
import { useTheme } from './context/ThemeContext'
import { useDemo } from './context/DemoContext'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Demos from './pages/Demos'
import Contact from './pages/Contact'

export default function App() {
  const { theme } = useTheme()
  const { isTransitioning, transitionDemo, activeDemo, isInDemoMode } = useDemo()
  const location = useLocation()
  const navigate = useNavigate()
  const pageRef = useRef(null)
  const transitionRef = useRef(null)

  // Handle redirect from 404.html (GitHub Pages SPA routing)
  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect')
    if (redirect) {
      sessionStorage.removeItem('redirect')
      navigate(redirect, { replace: true })
    }
  }, [navigate])

  // Page transition animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
    })

    return () => ctx.revert()
  }, [location.pathname])

  // Demo transition animation
  useEffect(() => {
    if (transitionRef.current) {
      if (isTransitioning) {
        gsap.fromTo(
          transitionRef.current,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' }
        )
        gsap.fromTo(
          transitionRef.current.querySelector('.transition-icon'),
          { scale: 0, rotate: -180 },
          { scale: 1, rotate: 0, duration: 0.4, ease: 'back.out(1.7)', delay: 0.1 }
        )
        gsap.fromTo(
          transitionRef.current.querySelector('.transition-text'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out', delay: 0.2 }
        )
      } else {
        gsap.to(transitionRef.current, { opacity: 0, duration: 0.3, ease: 'power3.in' })
      }
    }
  }, [isTransitioning])

  // Get the theme to use for the background
  const currentTheme = isInDemoMode && activeDemo ? activeDemo.theme : theme

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      {/* Background gradient orbs - hide during demo mode for cleaner look */}
      {!isInDemoMode && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[140px] opacity-25 animate-float"
            style={{ backgroundColor: theme.accent }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-[120px] opacity-15 animate-float"
            style={{ backgroundColor: theme.accentAlt, animationDelay: '-3s' }}
          />
        </div>
      )}

      {/* Demo Transition Overlay */}
      {isTransitioning && (
        <div
          ref={transitionRef}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: transitionDemo?.theme.bg || currentTheme.bg }}
        >
          <div
            className="transition-icon w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
            style={{ backgroundColor: transitionDemo?.theme.accent || currentTheme.accent }}
          >
            <Icon
              icon={transitionDemo?.icon || 'ph:rocket-bold'}
              className="w-12 h-12"
              style={{ color: transitionDemo?.theme.bg || currentTheme.bg }}
            />
          </div>
          <div className="transition-text text-center">
            <h2
              className="text-2xl font-display font-bold mb-2"
              style={{ color: transitionDemo?.theme.text || currentTheme.text }}
            >
              {transitionDemo ? `Loading ${transitionDemo.name}` : 'Returning to Portfolio'}
            </h2>
            <p style={{ color: transitionDemo?.theme.muted || currentTheme.muted }}>
              {transitionDemo?.category || 'KevCo'}
            </p>
          </div>
          {/* Loading dots animation */}
          <div className="flex gap-2 mt-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: transitionDemo?.theme.accent || currentTheme.accent,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navigation />

      {/* Main content with page transitions */}
      <main ref={pageRef} className="page-transition relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/demos" element={<Demos />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}
