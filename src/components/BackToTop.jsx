import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'
import { useDemo } from '../context/DemoContext'

export default function BackToTop() {
  const { theme } = useTheme()
  const { isInDemoMode, activeDemo } = useDemo()
  const [isVisible, setIsVisible] = useState(false)

  const currentTheme = isInDemoMode && activeDemo ? activeDemo.theme : theme

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: 'power3.inOut',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 shadow-lg ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{
        backgroundColor: currentTheme.accent,
        color: currentTheme.bg,
        boxShadow: `0 4px 20px ${currentTheme.accent}50`,
      }}
      aria-label="Back to top"
    >
      <Icon icon="ph:arrow-up-bold" className="w-5 h-5" />
    </button>
  )
}
