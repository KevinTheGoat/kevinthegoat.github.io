import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'

export default function Hero() {
  const { currentTheme } = useTheme()
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        titleRef.current.children,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          '-=0.3'
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: currentTheme.accent }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: currentTheme.secondary || currentTheme.accent }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div ref={titleRef} className="overflow-hidden">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="block">Full Stack</span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.secondary || currentTheme.accent})`,
              }}
            >
              Developer
            </span>
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10"
          style={{ color: currentTheme.muted }}
        >
          Building exceptional digital experiences across Web, Mobile, Desktop & Backend.
          Turning ideas into reality with clean code and stunning design.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: currentTheme.accent,
              color: currentTheme.bg,
            }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-300 hover:scale-105"
            style={{
              borderColor: currentTheme.accent,
              color: currentTheme.accent,
            }}
          >
            Get In Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: currentTheme.muted }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
