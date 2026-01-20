import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const GOLD_COLORS = [
  { r: 197, g: 160, b: 89 },   // #C5A059
  { r: 219, g: 193, b: 132 },  // #DBC184
  { r: 184, g: 147, b: 74 },   // #B8934A
  { r: 229, g: 212, b: 161 },  // #E5D4A1
  { r: 168, g: 137, b: 61 },   // #A8893D
]
const PARTICLE_COUNT = 180
const EMBER_COUNT = 50

// Helper to create rgba string
const rgba = (color, alpha) => `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
const rgb = (color) => `rgb(${color.r}, ${color.g}, ${color.b})`

export default function IntroAnimation({ onComplete }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const logoRef = useRef(null)
  const textRef = useRef(null)
  const particlesRef = useRef([])
  const embersRef = useRef([])
  const animationRef = useRef(null)
  const [phase, setPhase] = useState('particles') // particles -> reveal -> transition

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    ctx.scale(dpr, dpr)

    const centerX = width / 2
    const centerY = height / 2
    const scale = Math.min(width, height) * 0.003

    // Create K shape target points
    const kShapePoints = generateKShapePoints(centerX, centerY, scale)

    // Initialize particles scattered around the screen
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const targetPoint = kShapePoints[i % kShapePoints.length]
      const angle = Math.random() * Math.PI * 2
      const distance = 200 + Math.random() * Math.max(width, height) * 0.6

      return {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        targetX: targetPoint.x + (Math.random() - 0.5) * 15,
        targetY: targetPoint.y + (Math.random() - 0.5) * 15,
        size: Math.random() * 3 + 2,
        color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
        velocity: { x: 0, y: 0 },
        delay: Math.random() * 0.3,
        glow: Math.random() * 0.5 + 0.5,
        trail: [],
        angle: angle,
        orbitSpeed: (Math.random() - 0.5) * 0.02,
      }
    })

    // Initialize embers (floating sparks)
    embersRef.current = Array.from({ length: EMBER_COUNT }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 1.5 + 0.5,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.03 + 0.01,
      opacity: Math.random() * 0.6 + 0.2,
      color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
    }))

    let startTime = Date.now()
    const totalDuration = 3400 // Animation duration before logo reveal

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / totalDuration, 1)

      // Clear with subtle motion blur effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.15)'
      ctx.fillRect(0, 0, width, height)

      // Full clear every few frames to prevent buildup
      if (Math.random() < 0.05) {
        ctx.fillStyle = '#0a0a0a'
        ctx.fillRect(0, 0, width, height)
      }

      // Draw embers (background)
      drawEmbers(ctx, width, height, progress)

      if (progress < 0.35) {
        // Phase 1: Swirling particles
        drawSwirlPhase(ctx, progress / 0.35, centerX, centerY)
      } else if (progress < 0.75) {
        // Phase 2: Coalesce into K shape
        drawCoalescePhase(ctx, (progress - 0.35) / 0.4, centerX, centerY)
      } else if (progress < 1) {
        // Phase 3: Solidify with glow pulse
        drawSolidifyPhase(ctx, (progress - 0.75) / 0.25, centerX, centerY)
      } else {
        // Animation complete, show logo
        setPhase('reveal')
        return
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    const drawSwirlPhase = (ctx, progress, cx, cy) => {
      particlesRef.current.forEach((p) => {
        // Swirling orbit motion
        p.angle += p.orbitSpeed * (1 + progress)
        const dist = Math.hypot(p.x - cx, p.y - cy)
        const targetDist = dist * (1 - progress * 0.3)

        p.x = cx + Math.cos(p.angle) * targetDist + (Math.random() - 0.5) * 3
        p.y = cy + Math.sin(p.angle) * targetDist + (Math.random() - 0.5) * 3

        // Store trail
        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 6) p.trail.shift()

        // Draw trail
        p.trail.forEach((t, i) => {
          const alpha = (i / p.trail.length) * 0.4
          ctx.beginPath()
          ctx.arc(t.x, t.y, p.size * 0.4, 0, Math.PI * 2)
          ctx.fillStyle = rgba(p.color, alpha)
          ctx.fill()
        })

        // Draw particle with glow
        drawGlowingParticle(ctx, p.x, p.y, p.size, p.color, p.glow)
      })
    }

    const drawCoalescePhase = (ctx, progress, cx, cy) => {
      const easeProgress = easeOutQuart(progress)

      particlesRef.current.forEach((p) => {
        // Move towards target position
        const dx = p.targetX - p.x
        const dy = p.targetY - p.y

        p.x += dx * easeProgress * 0.12
        p.y += dy * easeProgress * 0.12

        // Reduce trail
        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 4) p.trail.shift()

        // Draw fading trail
        p.trail.forEach((t, i) => {
          const alpha = (i / p.trail.length) * 0.2 * (1 - progress * 0.7)
          ctx.beginPath()
          ctx.arc(t.x, t.y, p.size * 0.3, 0, Math.PI * 2)
          ctx.fillStyle = rgba(p.color, alpha)
          ctx.fill()
        })

        // Glow decreases as particles solidify
        const glowIntensity = p.glow * (1 - progress * 0.4)
        drawGlowingParticle(ctx, p.x, p.y, p.size, p.color, glowIntensity)
      })

      // Molten drip effect
      if (progress > 0.6) {
        const dripProgress = (progress - 0.6) / 0.4
        for (let i = 0; i < 5; i++) {
          const dripX = cx + (Math.random() - 0.5) * 80
          const dripY = cy + 60 + dripProgress * 40 + Math.random() * 30
          const dripSize = (1 - dripProgress) * 2.5

          if (dripSize > 0.5) {
            ctx.beginPath()
            ctx.arc(dripX, dripY, dripSize, 0, Math.PI * 2)
            ctx.fillStyle = rgba(GOLD_COLORS[0], 0.4 * (1 - dripProgress))
            ctx.fill()
          }
        }
      }
    }

    const drawSolidifyPhase = (ctx, progress, cx, cy) => {
      // Pulsing glow effect
      const pulse = Math.sin(progress * Math.PI * 6) * 0.2 + 0.8

      particlesRef.current.forEach((p) => {
        // Final position lock
        const lockProgress = Math.min(progress * 2, 1)
        p.x = p.x + (p.targetX - p.x) * lockProgress * 0.3
        p.y = p.y + (p.targetY - p.y) * lockProgress * 0.3

        drawGlowingParticle(ctx, p.x, p.y, p.size * pulse, p.color, p.glow * pulse)
      })

      // Bright flash near the end
      if (progress > 0.7) {
        const flashAlpha = (progress - 0.7) / 0.3 * 0.4
        ctx.fillStyle = `rgba(219, 193, 132, ${flashAlpha})`
        ctx.fillRect(0, 0, width, height)
      }
    }

    const drawGlowingParticle = (ctx, x, y, size, color, glowIntensity) => {
      // Outer glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3)
      gradient.addColorStop(0, rgba(color, 0.8 * glowIntensity))
      gradient.addColorStop(0.4, rgba(color, 0.3 * glowIntensity))
      gradient.addColorStop(1, rgba(color, 0))

      ctx.beginPath()
      ctx.arc(x, y, size * 3, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Core
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fillStyle = rgb(color)
      ctx.fill()

      // Bright center
      ctx.beginPath()
      ctx.arc(x, y, size * 0.4, 0, Math.PI * 2)
      ctx.fillStyle = rgba({ r: 255, g: 240, b: 200 }, 0.6)
      ctx.fill()
    }

    const drawEmbers = (ctx, w, h, progress) => {
      embersRef.current.forEach((ember) => {
        ember.y -= ember.speed
        ember.wobble += ember.wobbleSpeed
        ember.x += Math.sin(ember.wobble) * 0.3

        if (ember.y < -10) {
          ember.y = h + 10
          ember.x = Math.random() * w
        }

        const fadeOut = progress > 0.8 ? 1 - (progress - 0.8) / 0.2 : 1
        const alpha = ember.opacity * fadeOut

        // Small glow
        const gradient = ctx.createRadialGradient(ember.x, ember.y, 0, ember.x, ember.y, ember.size * 4)
        gradient.addColorStop(0, rgba(ember.color, alpha * 0.5))
        gradient.addColorStop(1, rgba(ember.color, 0))
        ctx.beginPath()
        ctx.arc(ember.x, ember.y, ember.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2)
        ctx.fillStyle = rgba(ember.color, alpha)
        ctx.fill()
      })
    }

    // Start animation
    // Initial full clear
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, width, height)
    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Handle logo reveal and transition
  useEffect(() => {
    if (phase === 'reveal' && logoRef.current && textRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setPhase('transition'), 400)
        }
      })

      // Logo appears with golden flash
      tl.fromTo(
        logoRef.current,
        { scale: 1.2, opacity: 0, filter: 'brightness(3) blur(20px)' },
        { scale: 1, opacity: 1, filter: 'brightness(1) blur(0px)', duration: 0.6, ease: 'power2.out' }
      )

      // Text reveals with stagger
      tl.fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
    }
  }, [phase])

  // Handle final transition to nav
  useEffect(() => {
    if (phase === 'transition' && containerRef.current && logoRef.current) {
      const tl = gsap.timeline({
        onComplete: () => onComplete?.()
      })

      // Fade out text first
      tl.to(textRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: 'power2.in'
      })

      // Logo shrinks and moves to top-left nav position
      tl.to(
        logoRef.current,
        {
          x: -window.innerWidth / 2 + 100,
          y: -window.innerHeight / 2 + 50,
          scale: 0.25,
          opacity: 0.8,
          duration: 0.5,
          ease: 'power3.inOut'
        },
        '-=0.1'
      )

      // Fade out entire container
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        },
        '-=0.2'
      )
    }
  }, [phase, onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: phase === 'particles' ? 1 : 0 }}
      />

      {/* Ambient glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.08) 0%, transparent 60%)',
          opacity: phase === 'particles' ? 1 : 0,
          transition: 'opacity 0.5s'
        }}
      />

      {/* Logo Container */}
      {(phase === 'reveal' || phase === 'transition') && (
        <div className="relative z-10 flex flex-col items-center">
          <div
            ref={logoRef}
            className="relative"
            style={{ filter: 'drop-shadow(0 0 40px rgba(197, 160, 89, 0.6))' }}
          >
            <img
              src="/images/kevco-logo4.svg"
              alt="KevCo"
              className="h-36 md:h-52"
            />
          </div>

          <p
            ref={textRef}
            className="mt-8 text-sm md:text-base tracking-[0.4em] uppercase font-light"
            style={{ color: '#C5A059' }}
          >
            Digital Craftsman
          </p>
        </div>
      )}

      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase opacity-30 hover:opacity-60 transition-opacity duration-300"
        style={{ color: '#C5A059' }}
      >
        Click to skip
      </button>
    </div>
  )
}

// Generate points that form a K shape
function generateKShapePoints(cx, cy, scale) {
  const points = []
  const s = scale * 50

  // Vertical bar of K (left side)
  for (let i = 0; i < 35; i++) {
    points.push({
      x: cx - s * 1.5 + (Math.random() - 0.5) * s * 0.25,
      y: cy - s * 2 + (i / 35) * s * 4
    })
  }

  // Upper diagonal (going up-right)
  for (let i = 0; i < 25; i++) {
    const t = i / 25
    points.push({
      x: cx - s * 1.3 + t * s * 2,
      y: cy - t * s * 2
    })
  }

  // Lower diagonal (going down-right)
  for (let i = 0; i < 25; i++) {
    const t = i / 25
    points.push({
      x: cx - s * 1.3 + t * s * 2,
      y: cy + t * s * 2
    })
  }

  // Add some fill points inside the K
  for (let i = 0; i < 20; i++) {
    points.push({
      x: cx - s * 1.2 + Math.random() * s * 0.5,
      y: cy + (Math.random() - 0.5) * s * 3
    })
  }

  return points
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4)
}
