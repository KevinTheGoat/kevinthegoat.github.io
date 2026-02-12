import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../context/ThemeContext'

// ScrollTrigger is registered globally in main.jsx

const skillCategories = [
  {
    title: 'Web Development',
    icon: '🌐',
    skills: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    description: 'Modern, responsive web applications with cutting-edge frameworks',
  },
  {
    title: 'Mobile Apps',
    icon: '📱',
    skills: ['React Native', 'iOS', 'Android', 'Cross-Platform', 'App Store', 'Play Store'],
    description: 'Native and cross-platform mobile experiences for iOS & Android',
  },
  {
    title: 'Desktop Apps',
    icon: '🖥️',
    skills: ['Electron', 'Tauri', 'Windows', 'macOS', 'Linux', 'Native APIs'],
    description: 'Powerful desktop applications with native performance',
  },
  {
    title: 'Backend & APIs',
    icon: '⚡',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST', 'GraphQL'],
    description: 'Scalable backend systems and robust API architectures',
  },
]

export default function Skills() {
  const { currentTheme } = useTheme()
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean)
      gsap.set(cards, { y: 60, opacity: 0 })
      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: (batch) =>
          gsap.fromTo(batch,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', force3D: true }
          ),
        onLeaveBack: (batch) =>
          gsap.to(batch, { y: 60, opacity: 0, duration: 0.4, stagger: 0.05 }),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-6 theme-transition"
      style={{ backgroundColor: currentTheme.surface }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Skills & <span style={{ color: currentTheme.accent }}>Expertise</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: currentTheme.muted }}>
            A versatile developer with expertise across the full technology stack
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className="opacity-0 p-6 rounded-2xl transition-all duration-300 hover:scale-105 cursor-default group"
              style={{
                backgroundColor: currentTheme.bg,
                border: `1px solid ${currentTheme.accent}22`,
              }}
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3
                className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform"
                style={{ color: currentTheme.accent }}
              >
                {category.title}
              </h3>
              <p className="text-sm mb-4" style={{ color: currentTheme.muted }}>
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: `${currentTheme.accent}22`,
                      color: currentTheme.text,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
