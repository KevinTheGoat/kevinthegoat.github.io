import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'
import SEO from '../components/SEO'

const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support & Maintenance' },
]

const services = [
  {
    icon: 'ph:globe-bold',
    title: 'Web Development',
    description: 'Cutting-edge web applications with React, Next.js, and modern frameworks.',
  },
  {
    icon: 'ph:device-mobile-bold',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile experiences for iOS and Android.',
  },
  {
    icon: 'ph:desktop-bold',
    title: 'Desktop Apps',
    description: 'Powerful desktop applications with Electron and native technologies.',
  },
  {
    icon: 'ph:database-bold',
    title: 'Backend & APIs',
    description: 'Scalable server architectures and robust API development.',
  },
]

export default function Home() {
  const { theme } = useTheme()
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const statsRef = useRef(null)
  const servicesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title animation
      const chars = titleRef.current.querySelectorAll('.char')
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.03,
          ease: 'power3.out',
        }
      )

      // Subtitle and CTA animation
      gsap.fromTo(
        '.hero-fade',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, delay: 0.5, ease: 'power3.out' }
      )

      // Stats animation
      gsap.fromTo(
        statsRef.current?.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 1, ease: 'power3.out' }
      )

      // Services animation
      gsap.fromTo(
        servicesRef.current?.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 1.2,
          ease: 'power3.out',
        }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Split text into chars
  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ transformStyle: 'preserve-3d' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <>
      <SEO
        title="KevCo | Professional Web, Mobile & Desktop Development"
        description="Expert full-stack developer specializing in React, React Native, and Electron. Building premium web applications, mobile apps, and desktop software. Based in the Bahamas, serving clients worldwide."
        canonicalPath="/"
      />
      <div ref={heroRef}>
        {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text content */}
            <div>
              {/* Badge */}
              <div className="hero-fade inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: '#22c55e' }}
                />
                <span className="text-sm font-medium" style={{ color: theme.muted }}>
                  Available for new projects
                </span>
              </div>

              {/* Title */}
              <h1
                ref={titleRef}
                className="font-display font-bold text-display-xl mb-6 perspective-1000"
              >
                <span className="block">{splitText('Digital')}</span>
                <span className="block gradient-text">{splitText('Craftsman')}</span>
              </h1>

              {/* Subtitle */}
              <p
                className="hero-fade text-xl lg:text-2xl mb-10 max-w-xl leading-relaxed"
                style={{ color: theme.muted }}
              >
                Building exceptional digital experiences across{' '}
                <span style={{ color: theme.text }}>Web</span>,{' '}
                <span style={{ color: theme.text }}>Mobile</span>,{' '}
                <span style={{ color: theme.text }}>Desktop</span> &{' '}
                <span style={{ color: theme.text }}>Backend</span>.
              </p>

              {/* CTAs */}
              <div className="hero-fade flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: theme.accent, color: theme.bg }}
                >
                  View Work
                  <Icon
                    icon="ph:arrow-right-bold"
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 hover:scale-105"
                  style={{ borderColor: theme.border, color: theme.text }}
                >
                  <Icon icon="ph:envelope-bold" className="w-5 h-5" />
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Right: Visual element */}
            <div className="hero-fade hidden lg:flex justify-center items-center">
              <div className="relative">
                {/* Animated geometric shape */}
                <div
                  className="w-80 h-80 rounded-3xl rotate-12 animate-float"
                  style={{
                    background: `linear-gradient(135deg, ${theme.accent}40, ${theme.accentAlt}40)`,
                    backdropFilter: 'blur(40px)',
                  }}
                />
                <div
                  className="absolute inset-8 rounded-2xl -rotate-6 animate-float"
                  style={{
                    background: `linear-gradient(225deg, ${theme.accent}60, ${theme.accentAlt}60)`,
                    animationDelay: '-2s',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon
                    icon="ph:code-bold"
                    className="w-32 h-32"
                    style={{ color: theme.accent }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t"
            style={{ borderColor: theme.border }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div
                  className="font-display font-bold text-4xl lg:text-5xl mb-2"
                  style={{ color: theme.accent }}
                >
                  {stat.value}
                </div>
                <div style={{ color: theme.muted }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section
        className="py-24 px-6"
        style={{ backgroundColor: theme.surface }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              <h2 className="font-display font-bold text-display-md mb-4">
                What I <span style={{ color: theme.accent }}>Build</span>
              </h2>
              <p className="text-lg max-w-xl" style={{ color: theme.muted }}>
                Full-stack solutions tailored to your needs, from concept to deployment.
              </p>
            </div>
            <Link
              to="/skills"
              className="mt-6 lg:mt-0 inline-flex items-center gap-2 link-underline font-medium"
              style={{ color: theme.accent }}
            >
              View all skills
              <Icon icon="ph:arrow-right-bold" className="w-4 h-4" />
            </Link>
          </div>

          <div ref={servicesRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group p-8 rounded-2xl transition-all duration-500 card-hover cursor-default"
                style={{
                  backgroundColor: theme.elevated,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${theme.accent}20` }}
                >
                  <Icon
                    icon={service.icon}
                    className="w-7 h-7"
                    style={{ color: theme.accent }}
                  />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3">
                  {service.title}
                </h3>
                <p style={{ color: theme.muted }}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-bold text-display-md mb-6">
            Ready to build something{' '}
            <span className="gradient-text">amazing</span>?
          </h2>
          <p className="text-xl mb-10" style={{ color: theme.muted }}>
            Let's discuss your project and bring your vision to life.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-semibold text-xl transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: theme.accent, color: theme.bg }}
          >
            Start a Project
            <Icon icon="ph:rocket-launch-bold" className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 border-t"
        style={{ borderColor: theme.border }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ color: theme.muted }}>
            &copy; {new Date().getFullYear()} KevCo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/KevinTheGoat"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:opacity-80"
              style={{ color: theme.muted }}
            >
              <Icon icon="mdi:github" className="w-6 h-6" />
            </a>
            <a
              href="mailto:kevinmoreau@kevco.co"
              className="transition-colors duration-300 hover:opacity-80"
              style={{ color: theme.muted }}
            >
              <Icon icon="ph:envelope-bold" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}
