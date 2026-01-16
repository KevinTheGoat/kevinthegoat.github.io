import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../context/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'Stuttgart International Collision',
    description:
      'A premium auto body and collision repair service website featuring modern design, seamless animations, and an intuitive booking system.',
    url: 'https://stuttgartinternationalcollision.com/',
    tags: ['Web Design', 'React', 'Responsive', 'Business'],
    category: 'Web',
    gradient: 'from-blue-600 via-blue-700 to-indigo-800',
    features: ['Custom Animations', 'Booking System', 'Mobile Optimized', 'SEO Ready'],
  },
  {
    id: 2,
    title: 'Accident Assist Network',
    description:
      'A comprehensive accident assistance platform that connects users with legal and medical professionals through an intelligent matching system.',
    url: 'https://accidentassistnetwork.com/',
    tags: ['Web App', 'Healthcare', 'Legal Tech', 'Platform'],
    category: 'Web App',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    features: ['User Dashboard', 'Provider Matching', 'Case Management', 'Secure Portal'],
  },
  {
    id: 3,
    title: 'FinTrack Mobile',
    description:
      'A sophisticated personal finance tracking application with real-time analytics, budget management, and investment portfolio tracking.',
    url: '#',
    tags: ['Mobile App', 'React Native', 'Finance', 'Analytics'],
    category: 'Mobile',
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-700',
    features: ['Expense Tracking', 'Budget Alerts', 'Investment View', 'Bank Sync'],
    isDemo: true,
  },
  {
    id: 4,
    title: 'CloudSync Desktop',
    description:
      'A powerful cross-platform desktop application for seamless file synchronization across devices with end-to-end encryption.',
    url: '#',
    tags: ['Desktop App', 'Electron', 'Cloud', 'Security'],
    category: 'Desktop',
    gradient: 'from-orange-500 via-amber-500 to-yellow-600',
    features: ['Auto Sync', 'E2E Encryption', 'Version History', 'Selective Sync'],
    isDemo: true,
  },
]

const categories = ['All', 'Web', 'Web App', 'Mobile', 'Desktop']

export default function Projects() {
  const { theme } = useTheme()
  const pageRef = useRef(null)
  const projectsRef = useRef([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredProject, setHoveredProject] = useState(null)

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.projects-header',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )

      // Category buttons animation
      gsap.fromTo(
        '.category-btn',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.3, ease: 'power3.out' }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // Animate projects on filter change
    gsap.fromTo(
      projectsRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    )
  }, [activeCategory])

  return (
    <div ref={pageRef} className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="projects-header max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Icon icon="ph:folders-bold" className="w-4 h-4" style={{ color: theme.accent }} />
            <span className="text-sm font-medium" style={{ color: theme.muted }}>
              Featured Work
            </span>
          </div>
          <h1 className="font-display font-bold text-display-lg mb-6">
            Selected <span style={{ color: theme.accent }}>Projects</span>
          </h1>
          <p className="text-xl" style={{ color: theme.muted }}>
            A showcase of my best work across web, mobile, and desktop platforms.
            Each project is crafted with attention to detail and performance.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-btn px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === cat ? '' : 'hover:bg-white/5'
              }`}
              style={{
                backgroundColor: activeCategory === cat ? theme.accent : 'transparent',
                color: activeCategory === cat ? theme.bg : theme.text,
                border: `1px solid ${activeCategory === cat ? theme.accent : theme.border}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <a
              key={project.id}
              href={project.url}
              target={project.isDemo ? undefined : '_blank'}
              rel={project.isDemo ? undefined : 'noopener noreferrer'}
              ref={(el) => (projectsRef.current[index] = el)}
              className="group block rounded-3xl overflow-hidden transition-all duration-500 card-hover"
              style={{
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Preview */}
              <div className={`h-64 lg:h-80 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                                       radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
                      backgroundSize: '40px 40px',
                    }}
                  />
                </div>

                {/* Center icon/content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/90">
                  <Icon
                    icon={
                      project.category === 'Mobile'
                        ? 'ph:device-mobile-bold'
                        : project.category === 'Desktop'
                        ? 'ph:desktop-bold'
                        : 'ph:globe-bold'
                    }
                    className="w-16 h-16 mb-4 transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                    {project.isDemo ? 'Demo Project' : 'View Live Site'}
                  </span>
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                />
              </div>

              {/* Project Info */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display font-bold text-2xl group-hover:translate-x-1 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <Icon
                    icon="ph:arrow-up-right-bold"
                    className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0"
                    style={{ color: theme.accent }}
                  />
                </div>

                <p className="mb-6" style={{ color: theme.muted }}>
                  {project.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.features.map((feature) => (
                    <span
                      key={feature}
                      className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg"
                      style={{ backgroundColor: theme.elevated, color: theme.text }}
                    >
                      <Icon icon="ph:check-circle-bold" className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full font-medium"
                      style={{
                        backgroundColor: `${theme.accent}20`,
                        color: theme.accent,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg mb-6" style={{ color: theme.muted }}>
            Want to see more of my work?
          </p>
          <a
            href="https://github.com/KevinTheGoat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: theme.surface,
              color: theme.text,
              border: `1px solid ${theme.border}`,
            }}
          >
            <Icon icon="mdi:github" className="w-6 h-6" />
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  )
}
