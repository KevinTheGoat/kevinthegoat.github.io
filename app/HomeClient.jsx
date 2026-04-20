'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'
import AnimatedCounter from '../components/AnimatedCounter'

const stats = [
  { value: '8+', label: 'Years Shipping' },
  { value: '100%', label: 'Client Satisfaction' },
  
  { value: '24/7', label: 'Support & Maintenance' },
]

const industries = [
  'Auto Body',
  'Dental & Healthcare',
  'E-commerce',
  'Trades & Home Services',
  'HOA & Community',
]

const integrations = [
  { name: 'Shopify', icon: 'logos:shopify' },
  { name: 'WooCommerce', icon: 'logos:woocommerce-icon' },
  { name: 'WordPress', icon: 'logos:wordpress-icon' },
  { name: 'Sanity', icon: 'logos:sanity' },
  { name: 'Stripe', icon: 'logos:stripe' },
  { name: 'PayPal', icon: 'logos:paypal' },
  { name: 'QuickBooks', icon: 'simple-icons:quickbooks' },
  { name: 'Xero', icon: 'simple-icons:xero' },
  { name: 'HubSpot', icon: 'logos:hubspot-icon' },
  { name: 'Zapier', icon: 'logos:zapier-icon' },
  { name: 'OpenAI', icon: 'simple-icons:openai' },
  { name: 'Claude', icon: 'simple-icons:anthropic' },
]

const clouds = [
  { name: 'AWS', icon: 'logos:aws' },
  { name: 'Google Cloud', icon: 'logos:google-cloud' },
  { name: 'Azure', icon: 'logos:microsoft-azure' },
  { name: 'Vercel', icon: 'logos:vercel-icon' },
  { name: 'Cloudflare', icon: 'logos:cloudflare' },
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
  {
    icon: 'ph:sparkle-bold',
    title: 'AI Engineering',
    description: 'Embedding LLMs, chatbots, and RAG into your product, from prototype to production.',
  },
]

export default function HomeClient() {
  const { theme } = useTheme()
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const statsRef = useRef(null)
  const shapesRef = useRef(null)
  const servicesRevealRef = useScrollReveal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = titleRef.current.querySelectorAll('.char')

      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo(
        chars,
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.03, ease: 'power3.out', force3D: true }
      )
        .fromTo(
          '.hero-fade',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', force3D: true },
          '-=0.4'
        )
        .fromTo(
          statsRef.current?.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', force3D: true },
          '-=0.3'
        )

      // Parallax effect for hero shapes
      if (shapesRef.current && window.innerWidth >= 1024) {
        const shapes = shapesRef.current.querySelectorAll('.parallax-shape')
        shapes.forEach((shape, index) => {
          gsap.to(shape, {
            y: (index + 1) * -80,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Split text into chars, keeping words together
  const splitText = (text) => {
    return text.split(' ').map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap">
        {word.split('').map((char, charIndex) => (
          <span key={charIndex} className="char inline-block opacity-0" style={{ transformStyle: 'preserve-3d' }}>
            {char}
          </span>
        ))}
        {wordIndex < text.split(' ').length - 1 && <span className="char inline-block">&nbsp;</span>}
      </span>
    ))
  }

  return (
    <div ref={heroRef}>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text content */}
            <div>
              {/* Badge */}
              <div className="hero-fade opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: '#22c55e' }}
                />
                <span className="text-sm font-medium" style={{ color: theme.muted }}>
                  KevCo · Your digital partner
                </span>
              </div>

              {/* Title */}
              <h1
                ref={titleRef}
                className="font-display font-bold text-display-lg mb-6 perspective-1000"
              >
                <span className="block">{splitText('Websites, Apps')}</span>
                <span className="block">{splitText('& AI Integrations')}</span>
                <span className="block" style={{
                  background: `linear-gradient(135deg, var(--accent), var(--accent-alt))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>{splitText('for real businesses.')}</span>
              </h1>

              {/* Subtitle */}
              <p
                className="hero-fade text-xl lg:text-2xl mb-8 max-w-xl leading-relaxed"
                style={{ color: theme.muted }}
              >
                KevCo is your digital partner. We design, build, and maintain{' '}
                <span style={{ color: theme.text }}>websites</span>,{' '}
                <span style={{ color: theme.text }}>apps</span>,{' '}
                <span style={{ color: theme.text }}>AI features</span>, and the{' '}
                <span style={{ color: theme.text }}>integrations</span> that tie your business together.
              </p>

              {/* Industries served */}
              <div className="hero-fade opacity-0 flex flex-wrap gap-2 mb-10">
                {industries.map((industry) => (
                  <span
                    key={industry}
                    className="text-xs font-medium tracking-wide uppercase px-3 py-1.5 rounded-full"
                    style={{
                      color: theme.muted,
                      border: `1px solid ${theme.border}`,
                      backgroundColor: `${theme.surface}99`,
                    }}
                  >
                    {industry}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="hero-fade opacity-0 flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
                    color: theme.bg
                  }}
                >
                  See Our Work
                  <Icon
                    icon="ph:arrow-right-bold"
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(${theme.bg}, ${theme.bg}) padding-box, linear-gradient(135deg, ${theme.accent}60, ${theme.accentAlt}60) border-box`,
                    border: '2px solid transparent',
                    color: theme.text
                  }}
                >
                  <Icon icon="ph:envelope-bold" className="w-5 h-5" style={{ color: theme.accent }} />
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Right: Visual element with parallax */}
            <div ref={shapesRef} className="hero-fade opacity-0 hidden lg:flex justify-center items-center">
              <div className="relative">
                {/* Animated geometric shape with parallax */}
                <div
                  className="parallax-shape w-80 h-80 rounded-3xl rotate-12 animate-float"
                  style={{
                    background: `linear-gradient(135deg, ${theme.accent}40, ${theme.accentAlt}40)`,
                    backdropFilter: 'blur(40px)',
                  }}
                />
                <div
                  className="parallax-shape absolute inset-8 rounded-2xl -rotate-6 animate-float"
                  style={{
                    background: `linear-gradient(225deg, ${theme.accent}60, ${theme.accentAlt}60)`,
                    animationDelay: '-2s',
                  }}
                />
                <div className="parallax-shape absolute inset-0 flex items-center justify-center">
                  <Icon
                    icon="ph:code-bold"
                    className="w-32 h-32"
                    style={{ color: theme.accent }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats with Animated Counters */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t relative"
            style={{ borderColor: theme.border }}
          >
            {/* Gradient border overlay */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentAlt}, ${theme.accent})`,
                opacity: 0.6
              }}
            />
            {stats.map((stat, index) => (
              <div key={stat.label} className="opacity-0 text-center lg:text-left">
                <AnimatedCounter
                  value={stat.value}
                  duration={2}
                  className="font-display font-bold text-4xl lg:text-5xl mb-2 stat-value"
                  style={{
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                />
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
                What We <span className="gradient-text">Build</span>
              </h2>
              <p className="text-lg max-w-xl" style={{ color: theme.muted }}>
                End-to-end: from first wireframe to production, integrations, and ongoing support.
              </p>
            </div>
            <Link
              href="/services"
              className="mt-6 lg:mt-0 inline-flex items-center gap-2 link-underline font-medium"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Full service list
              <Icon icon="ph:arrow-right-bold" className="w-4 h-4" style={{ color: theme.accent }} />
            </Link>
          </div>

          <div ref={servicesRevealRef} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                data-animate
                data-animate-delay={`${index * 0.1}s`}
                className="group p-8 rounded-2xl transition-all duration-500 card-hover cursor-default"
                style={{
                  backgroundColor: theme.elevated,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${theme.accent}25, ${theme.accentAlt}25)`,
                  }}
                >
                  <Icon
                    icon={service.icon}
                    className="w-7 h-7"
                    style={{
                      background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
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

      {/* Integrations & Platforms */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="text-xs uppercase tracking-[0.2em] font-semibold"
              style={{ color: theme.muted }}
            >
              Platforms & Integrations
            </span>
            <h2 className="font-display font-semibold text-3xl lg:text-4xl mt-3 mb-3">
              We plug into the tools your business{' '}
              <span className="gradient-text">already runs on.</span>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: theme.muted }}>
              From storefronts and payments to CMS, CRM, and accounting. We wire it together so your site, apps, and back office actually talk.
            </p>
          </div>

          <div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-px rounded-2xl overflow-hidden"
            style={{ backgroundColor: theme.border }}
          >
            {integrations.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col items-center justify-center gap-2 py-6 px-3 transition-colors duration-300 hover:brightness-110"
                style={{ backgroundColor: theme.surface }}
              >
                <Icon icon={tool.icon} className="w-7 h-7" />
                <span className="text-[11px] font-medium" style={{ color: theme.muted }}>
                  {tool.name}
                </span>
              </div>
            ))}
          </div>

          {/* Deployed On row */}
          <div
            className="mt-10 flex flex-col md:flex-row items-center md:justify-between gap-6 px-6 py-5 rounded-2xl"
            style={{
              backgroundColor: theme.elevated,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent}25, ${theme.accentAlt}25)`,
                }}
              >
                <Icon icon="ph:cloud-bold" className="w-5 h-5" style={{ color: theme.accent }} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: theme.muted }}>
                  Deployed on
                </div>
                <div className="text-sm font-medium">Production infrastructure we know</div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 justify-center">
              {clouds.map((c) => (
                <div key={c.name} className="flex items-center gap-2">
                  <Icon icon={c.icon} className="w-5 h-5" />
                  <span className="text-sm font-medium" style={{ color: theme.muted }}>
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-bold text-display-md mb-6">
            Have a project in{' '}
            <span className="gradient-text">mind?</span>
          </h2>
          <p className="text-xl mb-10" style={{ color: theme.muted }}>
            Tell us what you're building. We'll come back with a plan, a timeline, and a quote, usually within 48 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-semibold text-xl transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
              color: theme.bg
            }}
          >
            Start a Project
            <Icon icon="ph:rocket-launch-bold" className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
