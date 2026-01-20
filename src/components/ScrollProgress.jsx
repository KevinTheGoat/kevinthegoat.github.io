import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../context/ThemeContext'
import { useDemo } from '../context/DemoContext'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const { theme } = useTheme()
  const { isInDemoMode, activeDemo } = useDemo()
  const [progress, setProgress] = useState(0)

  const currentTheme = isInDemoMode && activeDemo ? activeDemo.theme : theme

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrollPercent)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent"
      style={{ backgroundColor: `${currentTheme.border}40` }}
    >
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${currentTheme.accent}, ${currentTheme.accentAlt})`,
          boxShadow: `0 0 10px ${currentTheme.accent}80`,
        }}
      />
    </div>
  )
}
