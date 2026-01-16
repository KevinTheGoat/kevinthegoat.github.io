import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '../../context/ThemeContext'

export default function AnimationDemo() {
  const { currentTheme } = useTheme()
  const boxRef = useRef(null)
  const containerRef = useRef(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const animations = [
    {
      name: 'Bounce',
      action: () => {
        gsap.to(boxRef.current, {
          y: -100,
          duration: 0.4,
          ease: 'power2.out',
          yoyo: true,
          repeat: 3,
        })
      },
    },
    {
      name: 'Spin',
      action: () => {
        gsap.to(boxRef.current, {
          rotation: '+=360',
          duration: 0.8,
          ease: 'power2.inOut',
        })
      },
    },
    {
      name: 'Scale Pulse',
      action: () => {
        gsap.to(boxRef.current, {
          scale: 1.5,
          duration: 0.3,
          ease: 'power2.out',
          yoyo: true,
          repeat: 3,
        })
      },
    },
    {
      name: 'Color Shift',
      action: () => {
        const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', currentTheme.accent]
        gsap.to(boxRef.current, {
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          duration: 0.5,
          ease: 'power2.inOut',
        })
      },
    },
    {
      name: 'Shake',
      action: () => {
        gsap.to(boxRef.current, {
          x: 20,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: 'power2.inOut',
        })
      },
    },
    {
      name: 'Morph',
      action: () => {
        gsap.to(boxRef.current, {
          borderRadius: '50%',
          duration: 0.5,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: 1,
        })
      },
    },
  ]

  const runAnimation = (animationFn) => {
    if (isAnimating) return
    setIsAnimating(true)
    animationFn()
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const runSequence = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    })

    tl.to(boxRef.current, { y: -50, duration: 0.3, ease: 'power2.out' })
      .to(boxRef.current, { rotation: 180, duration: 0.4 })
      .to(boxRef.current, { scale: 1.3, duration: 0.2 })
      .to(boxRef.current, { borderRadius: '50%', duration: 0.3 })
      .to(boxRef.current, { borderRadius: '12px', scale: 1, rotation: 360, y: 0, duration: 0.5, ease: 'back.out' })
  }

  return (
    <div>
      <p className="text-center mb-6" style={{ color: currentTheme.muted }}>
        Click buttons to trigger GSAP animations on the element below
      </p>

      {/* Animation target */}
      <div
        ref={containerRef}
        className="flex justify-center items-center h-48 mb-8 rounded-xl"
        style={{ backgroundColor: `${currentTheme.accent}11` }}
      >
        <div
          ref={boxRef}
          className="w-24 h-24 rounded-xl flex items-center justify-center text-3xl"
          style={{ backgroundColor: currentTheme.accent }}
        >
          ✨
        </div>
      </div>

      {/* Animation buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {animations.map((anim) => (
          <button
            key={anim.name}
            onClick={() => runAnimation(anim.action)}
            disabled={isAnimating}
            className="px-4 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
            style={{
              backgroundColor: currentTheme.surface,
              color: currentTheme.text,
              border: `1px solid ${currentTheme.accent}44`,
            }}
          >
            {anim.name}
          </button>
        ))}
      </div>

      {/* Sequence button */}
      <button
        onClick={runSequence}
        disabled={isAnimating}
        className="w-full px-4 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
        style={{
          backgroundColor: currentTheme.accent,
          color: currentTheme.bg,
        }}
      >
        🎬 Run Full Sequence
      </button>
    </div>
  )
}
