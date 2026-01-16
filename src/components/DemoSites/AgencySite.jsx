import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'

const projects = [
  { name: 'Nova Brand Identity', category: 'Branding', year: '2024' },
  { name: 'Quantum App Design', category: 'UI/UX', year: '2024' },
  { name: 'Stellar Campaign', category: 'Marketing', year: '2023' },
  { name: 'Echo Website', category: 'Development', year: '2023' },
]

const services = [
  { icon: 'ph:paint-brush-bold', title: 'Brand Design', count: '50+' },
  { icon: 'ph:devices-bold', title: 'Web Design', count: '120+' },
  { icon: 'ph:megaphone-bold', title: 'Marketing', count: '80+' },
  { icon: 'ph:code-bold', title: 'Development', count: '90+' },
]

export default function AgencySite({ theme }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.agency-letter',
        { y: 100, opacity: 0, rotateX: 90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.agency-fade',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.5, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.agency-project',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, delay: 0.8, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="agency-letter inline-block" style={{ transformStyle: 'preserve-3d' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <div ref={containerRef} className="min-h-screen" style={{ backgroundColor: theme.bg, color: theme.text }}>
      {/* Hero */}
      <section className="min-h-screen flex items-center px-6 pt-28 pb-20 relative overflow-hidden">
        {/* Background decorations */}
        <div
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: theme.accent }}
        />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: theme.accentAlt }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="agency-fade text-sm tracking-[0.3em] uppercase mb-6"
                style={{ color: theme.accent }}
              >
                Creative Studio
              </p>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight" style={{ perspective: '1000px' }}>
                <span className="block">{splitText('We Create')}</span>
                <span className="block" style={{ color: theme.accent }}>{splitText('Digital')}</span>
                <span className="block">{splitText('Experiences')}</span>
              </h1>
              <p className="agency-fade text-xl mb-10 max-w-lg" style={{ color: theme.muted }}>
                Award-winning creative studio crafting memorable brands and digital products since 2015.
              </p>
              <div className="agency-fade flex flex-wrap gap-4">
                <button
                  className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: theme.accent, color: theme.bg }}
                >
                  Start a Project
                </button>
                <button
                  className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  style={{ border: `2px solid ${theme.border}` }}
                >
                  <Icon icon="ph:play-fill" className="w-5 h-5" />
                  Watch Reel
                </button>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-4">
              {services.map((service, i) => (
                <div
                  key={service.title}
                  className="agency-fade p-6 rounded-3xl transition-all duration-500 hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: theme.surface,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <Icon icon={service.icon} className="w-10 h-10 mb-4" style={{ color: theme.accent }} />
                  <h3 className="font-semibold mb-1">{service.title}</h3>
                  <p className="text-sm" style={{ color: theme.muted }}>{service.count} projects</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="py-24 px-6" style={{ backgroundColor: theme.surface }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: theme.accent }}>Portfolio</p>
              <h2 className="text-4xl md:text-5xl font-bold">Selected Work</h2>
            </div>
            <button
              className="hidden md:flex items-center gap-2 font-medium"
              style={{ color: theme.accent }}
            >
              View All Projects
              <Icon icon="ph:arrow-right-bold" className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {projects.map((project, i) => (
              <div
                key={project.name}
                className="agency-project group flex items-center justify-between p-8 rounded-3xl transition-all duration-500 cursor-pointer hover:scale-[1.02]"
                style={{ backgroundColor: theme.elevated }}
              >
                <div className="flex items-center gap-8">
                  <span className="text-5xl font-bold opacity-20">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm" style={{ color: theme.muted }}>
                      <span>{project.category}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: theme.accent }}
                >
                  <Icon icon="ph:arrow-up-right-bold" className="w-6 h-6" style={{ color: theme.bg }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '150+', label: 'Projects Completed' },
              { value: '45', label: 'Awards Won' },
              { value: '12', label: 'Years Experience' },
              { value: '98%', label: 'Client Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="p-8 rounded-3xl" style={{ backgroundColor: theme.surface }}>
                <div className="text-4xl font-bold mb-2" style={{ color: theme.accent }}>{stat.value}</div>
                <div style={{ color: theme.muted }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-6"
        style={{
          background: `linear-gradient(135deg, ${theme.accent}20, ${theme.accentAlt}20)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Create Something <span style={{ color: theme.accent }}>Amazing</span>
          </h2>
          <p className="text-xl mb-10" style={{ color: theme.muted }}>
            Ready to transform your brand? Get in touch and let's discuss your project.
          </p>
          <button
            className="px-12 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: theme.accent, color: theme.bg }}
          >
            Start a Conversation
          </button>
        </div>
      </section>
    </div>
  )
}
