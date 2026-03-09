import { useTheme } from '../context/ThemeContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

const skillCategories = [
  {
    title: 'Web Development',
    icon: '\u{1F310}',
    skills: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    description: 'Modern, responsive web applications with cutting-edge frameworks',
  },
  {
    title: 'Mobile Apps',
    icon: '\u{1F4F1}',
    skills: ['React Native', 'iOS', 'Android', 'Cross-Platform', 'App Store', 'Play Store'],
    description: 'Native and cross-platform mobile experiences for iOS & Android',
  },
  {
    title: 'Desktop Apps',
    icon: '\u{1F5A5}\uFE0F',
    skills: ['Electron', 'Tauri', 'Windows', 'macOS', 'Linux', 'Native APIs'],
    description: 'Powerful desktop applications with native performance',
  },
  {
    title: 'Backend & APIs',
    icon: '\u26A1',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST', 'GraphQL'],
    description: 'Scalable backend systems and robust API architectures',
  },
]

export default function Skills() {
  const { currentTheme } = useTheme()
  const sectionRef = useScrollReveal()

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
              data-animate
              data-animate-delay={`${index * 0.1}s`}
              className="p-6 rounded-2xl transition-all duration-300 hover:scale-105 cursor-default group"
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
