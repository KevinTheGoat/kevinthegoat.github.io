import { useEffect, useRef, useState, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useDemo } from '../context/DemoContext'

export default function CustomCursor() {
  const { theme } = useTheme()
  const { isInDemoMode, activeDemo } = useDemo()
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const mousePos = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  const currentTheme = isInDemoMode && activeDemo ? activeDemo.theme : theme

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = window.matchMedia('(hover: none)').matches
      const isSmallScreen = window.innerWidth < 1024
      setIsMobile(isTouchDevice || isSmallScreen)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const animate = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`
    }
    rafId.current = requestAnimationFrame(animate)
  }, [])

  const handleMouseMove = useCallback((e) => {
    mousePos.current.x = e.clientX
    mousePos.current.y = e.clientY
    if (!isVisible) setIsVisible(true)
  }, [isVisible])

  const handleMouseEnter = useCallback(() => setIsVisible(true), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])
  const handleMouseDown = useCallback(() => setIsClicking(true), [])
  const handleMouseUp = useCallback(() => setIsClicking(false), [])

  useEffect(() => {
    if (isMobile) return

    rafId.current = requestAnimationFrame(animate)

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isMobile, animate, handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp])

  useEffect(() => {
    if (isMobile) return

    const handleElementEnter = () => setIsHovering(true)
    const handleElementLeave = () => setIsHovering(false)

    const attachListeners = () => {
      const elements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .card-hover, .magnetic-btn'
      )
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleElementEnter)
        el.addEventListener('mouseleave', handleElementLeave)
      })
      return elements
    }

    let elements = attachListeners()

    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter)
        el.removeEventListener('mouseleave', handleElementLeave)
      })
      elements = attachListeners()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter)
        el.removeEventListener('mouseleave', handleElementLeave)
      })
    }
  }, [isMobile])

  if (isMobile) return null

  const size = isHovering ? 28 : 20
  const glowSize = isHovering ? 50 : 35

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
      }}
    >
      {/* Glow layer */}
      <div
        style={{
          position: 'absolute',
          top: -glowSize / 4,
          left: -glowSize / 4,
          width: glowSize,
          height: glowSize,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${currentTheme.accent}50 0%, ${currentTheme.accent}15 50%, transparent 70%)`,
          opacity: isVisible ? (isClicking ? 1 : 0.7) : 0,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          filter: 'blur(6px)',
        }}
      />
      {/* Arrow/Triangle cursor */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.15s ease, height 0.15s ease, opacity 0.15s ease',
          filter: `drop-shadow(0 0 ${isHovering ? 8 : 4}px ${currentTheme.accent})`,
          transform: isClicking ? 'scale(0.9)' : 'scale(1)',
        }}
      >
        {/* Arrow pointer shape */}
        <path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z"
          fill={currentTheme.accent}
        />
      </svg>
    </div>
  )
}
