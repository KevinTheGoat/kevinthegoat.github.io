import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../context/ThemeContext'

// ScrollTrigger is registered globally in main.jsx

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/KevinTheGoat',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:hello@kevco.co',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const { currentTheme } = useTheme()
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', force3D: true,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-6 theme-transition"
      style={{ backgroundColor: currentTheme.surface }}
    >
      <div className="opacity-0 max-w-3xl mx-auto text-center" ref={contentRef}>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Let's <span style={{ color: currentTheme.accent }}>Connect</span>
        </h2>
        <p className="text-lg mb-10" style={{ color: currentTheme.muted }}>
          Have a project in mind? Let's build something amazing together.
        </p>

        {/* CTA Button */}
        <a
          href="mailto:hello@kevco.co"
          className="inline-block px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 mb-12"
          style={{
            backgroundColor: currentTheme.accent,
            color: currentTheme.bg,
          }}
        >
          Get In Touch
        </a>

        {/* Social Links */}
        <div className="flex justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: currentTheme.bg,
                color: currentTheme.text,
                border: `1px solid ${currentTheme.accent}22`,
              }}
              title={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Availability badge */}
        <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: `${currentTheme.accent}22` }}>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm" style={{ color: currentTheme.text }}>
            Available for new projects
          </span>
        </div>
      </div>
    </section>
  )
}
