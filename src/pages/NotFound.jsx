import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'
import SEO from '../components/SEO'

export default function NotFound() {
  const { theme } = useTheme()
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate 404 number
      gsap.from('.error-number', {
        scale: 0,
        rotation: -10,
        duration: 0.8,
        ease: 'back.out(1.7)',
        clearProps: 'all',
      })

      // Animate text content
      gsap.from('.error-content', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: 'power3.out',
        clearProps: 'all',
      })

      // Animate buttons
      gsap.from('.error-buttons', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.5,
        ease: 'power3.out',
        clearProps: 'all',
      })

      // Floating animation for decorative elements
      gsap.to('.float-element', {
        y: -20,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <SEO
        title="404 - Page Not Found | KevCo"
        description="Oops! The page you're looking for doesn't exist. Let's get you back on track."
        canonicalPath="/404"
      />
      <div
        ref={pageRef}
        className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="float-element absolute top-1/4 left-1/4 w-20 h-20 rounded-2xl opacity-20"
            style={{ backgroundColor: theme.accent, transform: 'rotate(12deg)' }}
          />
          <div
            className="float-element absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full opacity-15"
            style={{ backgroundColor: theme.accentAlt }}
          />
          <div
            className="float-element absolute top-1/3 right-1/3 w-12 h-12 rounded-xl opacity-10"
            style={{ backgroundColor: theme.accent, transform: 'rotate(-6deg)' }}
          />
        </div>

        <div className="text-center relative z-10 max-w-2xl">
          {/* 404 Number */}
          <div className="error-number mb-8">
            <span
              className="font-display font-bold text-[12rem] sm:text-[16rem] leading-none"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: `0 0 80px ${theme.accent}40`,
              }}
            >
              404
            </span>
          </div>

          {/* Content */}
          <div className="error-content mb-10">
            <h1 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-lg max-w-md mx-auto" style={{ color: theme.muted }}>
              The page you're looking for seems to have wandered off into the digital void.
              Let's get you back to familiar territory.
            </p>
          </div>

          {/* Buttons */}
          <div className="error-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: theme.accent, color: theme.bg }}
            >
              <Icon icon="ph:house-bold" className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 hover:scale-105"
              style={{ borderColor: theme.border, color: theme.text }}
            >
              <Icon icon="ph:envelope-bold" className="w-5 h-5" />
              Contact Support
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-12 pt-8 border-t" style={{ borderColor: theme.border }}>
            <p className="text-sm mb-4" style={{ color: theme.muted }}>
              Or check out these pages:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'Projects', path: '/projects', icon: 'ph:folders-bold' },
                { label: 'Skills', path: '/skills', icon: 'ph:lightning-bold' },
                { label: 'Demos', path: '/demos', icon: 'ph:play-circle-bold' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.surface,
                    color: theme.text,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <Icon icon={link.icon} className="w-4 h-4" style={{ color: theme.accent }} />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
