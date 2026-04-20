'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import Footer from '../../components/Footer'

const projects = [
  {
    id: 1,
    title: 'Stuttgart International Collision',
    description:
      'A premium auto body and collision repair service website featuring modern design, seamless animations, and an intuitive booking system.',
    url: 'https://stuttgart-international.pages.dev/',
    image: '/images/projects/stuttgart-collision.png',
    tags: ['Web Design', 'React', 'Responsive', 'Business'],
    industry: 'Auto Body',
    gradient: 'from-blue-600 via-blue-700 to-indigo-800',
    features: ['Custom Animations', 'Booking System', 'Mobile Optimized', 'SEO Ready'],
  },
  {
    id: 2,
    title: 'Panda Depot Inc',
    description:
      'A wholesale restaurant supply company website serving South Florida with containers, packaging, groceries, and more for restaurants.',
    url: 'https://panda-depot.pages.dev/',
    image: '/images/projects/panda-depot.png',
    tags: ['Web Design', 'React', 'Responsive', 'Business'],
    industry: 'E-commerce',
    gradient: 'from-red-600 via-orange-600 to-yellow-700',
    features: ['Product Catalog', 'Bilingual Support', 'Mobile Optimized', 'Contact System'],
  },
  {
    id: 3,
    title: 'Titan Plumbing',
    description:
      'A professional plumbing service website for South Florida\'s trusted plumbing professionals, featuring emergency repairs and full remodeling services.',
    url: 'https://plumbing-showcase.pages.dev/',
    image: '/images/projects/titan-plumbing.png',
    tags: ['Web Design', 'React', 'Responsive', 'Business'],
    industry: 'Trades',
    gradient: 'from-amber-700 via-amber-800 to-slate-900',
    features: ['Emergency Services', 'Service Catalog', 'Mobile Optimized', 'Contact System'],
  },
  {
    id: 4,
    title: 'Accident Assist Network',
    description:
      'A comprehensive accident assistance platform that connects users with legal and medical professionals through an intelligent matching system.',
    url: 'https://accident-assist.pages.dev/',
    image: '/images/projects/accident-assist.png',
    tags: ['Web App', 'Healthcare', 'Legal Tech', 'Platform'],
    industry: 'Healthcare & Legal',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    features: ['User Dashboard', 'Provider Matching', 'Case Management', 'Secure Portal'],
  },
  {
    id: 5,
    title: 'Monexus Logistics',
    description:
      'A professional logistics and freight forwarding platform providing reliable shipping solutions from Miami to the Bahamas and beyond.',
    url: 'https://harborlink-logistics.pages.dev/',
    image: '/images/projects/monexus-logistics.png',
    tags: ['Web Design', 'Logistics', 'Responsive', 'Business'],
    industry: 'Logistics',
    gradient: 'from-cyan-600 via-blue-600 to-indigo-700',
    features: ['Freight Tracking', 'Quote System', 'Route Planning', 'Client Portal'],
  },
]

const industries = ['All', 'Auto Body', 'E-commerce', 'Trades', 'Healthcare & Legal', 'Logistics']

export default function ProjectsClient() {
  const { theme } = useTheme()
  const pageRef = useRef(null)
  const [activeIndustry, setActiveIndustry] = useState('All')
  const [hoveredProject, setHoveredProject] = useState(null)
  const projectsRevealRef = useScrollReveal()

  const filteredProjects =
    activeIndustry === 'All'
      ? projects
      : projects.filter((p) => p.industry === activeIndustry)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo(
        '.projects-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', force3D: true }
      )
        .fromTo(
          '.category-btn',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out', force3D: true },
          '-=0.3'
        )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <div ref={pageRef} className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="projects-header opacity-0 max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Icon icon="ph:folders-bold" className="w-4 h-4" style={{ color: theme.accent }} />
            <span className="text-sm font-medium" style={{ color: theme.muted }}>
              Featured Work
            </span>
          </div>
          <h1 className="font-display font-bold text-display-lg mb-6">
            Selected <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl" style={{ color: theme.muted }}>
            Real work for real businesses across auto body, e-commerce, trades, healthcare, and logistics. Pick an industry to see how we've shipped in yours.
          </p>
        </div>

        {/* Industry Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {industries.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveIndustry(cat)}
              className={`category-btn opacity-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeIndustry === cat ? '' : 'hover:bg-white/5'
              }`}
              style={{
                backgroundColor: activeIndustry === cat ? theme.accent : 'transparent',
                color: activeIndustry === cat ? theme.bg : theme.text,
                border: `1px solid ${activeIndustry === cat ? theme.accent : theme.border}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={projectsRevealRef} className="grid lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <a
              key={project.id}
              href={project.url}
              target={project.isDemo ? undefined : '_blank'}
              rel={project.isDemo ? undefined : 'noopener noreferrer'}
              data-animate
              data-animate-delay={`${index * 0.1}s`}
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
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.description.slice(0, 80)}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
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
                )}

                {/* Hover overlay with view button */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                  <span className="text-sm font-medium px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                    {project.isDemo ? 'Demo Project' : 'View Live Site'}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md"
                    style={{
                      backgroundColor: `${theme.accent}15`,
                      color: theme.accent,
                      border: `1px solid ${theme.accent}33`,
                    }}
                  >
                    <Icon icon="ph:buildings-bold" className="w-3 h-3" />
                    {project.industry}
                  </span>
                </div>
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
                        background: `linear-gradient(135deg, ${theme.accent}20, ${theme.accentAlt}20)`,
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
            Interested in working together?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
              color: theme.bg,
            }}
          >
            <Icon icon="ph:envelope-bold" className="w-6 h-6" />
            Get in Touch
          </Link>
        </div>
      </div>
    </div>

    {/* Footer */}
    <Footer />
    </>
  )
}
