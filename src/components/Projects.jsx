import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../context/ThemeContext'

// ScrollTrigger is registered globally in main.jsx

const projects = [
  {
    title: 'Stuttgart International Collision',
    description: 'Professional auto body and collision repair service website with modern design and seamless user experience.',
    url: 'https://stuttgartinternationalcollision.com/',
    tags: ['Web Design', 'Responsive', 'Business'],
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    title: 'Accident Assist Network',
    description: 'Comprehensive accident assistance platform connecting users with legal and medical professionals.',
    url: 'https://accidentassistnetwork.com/',
    tags: ['Web App', 'Healthcare', 'Legal Tech'],
    gradient: 'from-emerald-600 to-teal-800',
  },
]

export default function Projects() {
  const { currentTheme } = useTheme()
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          x: index % 2 === 0 ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Live <span style={{ color: currentTheme.accent }}>Projects</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: currentTheme.muted }}>
            Real-world websites and applications currently in production
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (cardsRef.current[index] = el)}
              className="group block rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              style={{
                backgroundColor: currentTheme.surface,
                border: `1px solid ${currentTheme.accent}22`,
              }}
            >
              {/* Preview gradient placeholder */}
              <div
                className={`h-48 sm:h-64 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/80 text-center">
                    <svg
                      className="w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    <span className="text-sm">Visit Live Site</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>

              <div className="p-6">
                <h3
                  className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform"
                  style={{ color: currentTheme.text }}
                >
                  {project.title}
                  <svg
                    className="inline-block w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: currentTheme.accent }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </h3>
                <p className="mb-4" style={{ color: currentTheme.muted }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full font-medium"
                      style={{
                        backgroundColor: `${currentTheme.accent}22`,
                        color: currentTheme.accent,
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
      </div>
    </section>
  )
}
