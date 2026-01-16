import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../context/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: 'ph:browser-bold',
    description: 'Creating stunning, responsive user interfaces with modern frameworks and tools.',
    skills: [
      { name: 'React', icon: 'logos:react', level: 95 },
      { name: 'Next.js', icon: 'logos:nextjs-icon', level: 90 },
      { name: 'Vue.js', icon: 'logos:vue', level: 85 },
      { name: 'TypeScript', icon: 'logos:typescript-icon', level: 90 },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', level: 95 },
      { name: 'GSAP', icon: 'logos:greensock-icon', level: 88 },
    ],
  },
  {
    title: 'Mobile Development',
    icon: 'ph:device-mobile-bold',
    description: 'Building native and cross-platform mobile applications.',
    skills: [
      { name: 'React Native', icon: 'logos:react', level: 88 },
      { name: 'iOS (Swift)', icon: 'logos:swift', level: 75 },
      { name: 'Android (Kotlin)', icon: 'logos:kotlin-icon', level: 70 },
      { name: 'Expo', icon: 'logos:expo-icon', level: 85 },
    ],
  },
  {
    title: 'Desktop Development',
    icon: 'ph:desktop-bold',
    description: 'Creating powerful cross-platform desktop applications.',
    skills: [
      { name: 'Electron', icon: 'logos:electron', level: 85 },
      { name: 'Tauri', icon: 'logos:tauri', level: 80 },
      { name: 'Node.js', icon: 'logos:nodejs-icon', level: 90 },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: 'ph:database-bold',
    description: 'Architecting scalable server-side solutions and APIs.',
    skills: [
      { name: 'Node.js', icon: 'logos:nodejs-icon', level: 92 },
      { name: 'Python', icon: 'logos:python', level: 80 },
      { name: 'PostgreSQL', icon: 'logos:postgresql', level: 85 },
      { name: 'MongoDB', icon: 'logos:mongodb-icon', level: 88 },
      { name: 'GraphQL', icon: 'logos:graphql', level: 82 },
      { name: 'REST APIs', icon: 'ph:plugs-connected-bold', level: 95 },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: 'ph:gear-bold',
    description: 'Deployment, automation, and development tooling.',
    skills: [
      { name: 'Git', icon: 'logos:git-icon', level: 95 },
      { name: 'Docker', icon: 'logos:docker-icon', level: 82 },
      { name: 'AWS', icon: 'logos:aws', level: 78 },
      { name: 'Vercel', icon: 'logos:vercel-icon', level: 90 },
      { name: 'GitHub Actions', icon: 'logos:github-actions', level: 85 },
    ],
  },
  {
    title: 'Design & UI/UX',
    icon: 'ph:paint-brush-bold',
    description: 'Crafting beautiful, user-centered designs.',
    skills: [
      { name: 'Figma', icon: 'logos:figma', level: 88 },
      { name: 'Adobe XD', icon: 'logos:adobe-xd', level: 75 },
      { name: 'UI Design', icon: 'ph:layout-bold', level: 85 },
      { name: 'Motion Design', icon: 'ph:film-strip-bold', level: 80 },
    ],
  },
]

export default function Skills() {
  const { theme } = useTheme()
  const pageRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.skills-header',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )

      // Cards animation with scroll trigger
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Animate skill bars inside each card
        const bars = card.querySelectorAll('.skill-bar-fill')
        bars.forEach((bar) => {
          gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="skills-header max-w-3xl mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Icon icon="ph:lightning-bold" className="w-4 h-4" style={{ color: theme.accent }} />
            <span className="text-sm font-medium" style={{ color: theme.muted }}>
              Technical Expertise
            </span>
          </div>
          <h1 className="font-display font-bold text-display-lg mb-6">
            Skills & <span style={{ color: theme.accent }}>Technologies</span>
          </h1>
          <p className="text-xl" style={{ color: theme.muted }}>
            A comprehensive toolkit for building modern digital products across all platforms.
            Years of experience refined into expertise.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              ref={(el) => (cardsRef.current[categoryIndex] = el)}
              className="p-8 rounded-3xl transition-all duration-500"
              style={{
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
              }}
            >
              {/* Category Header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${theme.accent}20` }}
                >
                  <Icon
                    icon={category.icon}
                    className="w-7 h-7"
                    style={{ color: theme.accent }}
                  />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-2xl mb-1">
                    {category.title}
                  </h2>
                  <p className="text-sm" style={{ color: theme.muted }}>
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Icon icon={skill.icon} className="w-5 h-5" />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span
                        className="text-sm font-mono"
                        style={{ color: theme.muted }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: theme.elevated }}
                    >
                      <div
                        className="skill-bar-fill h-full rounded-full origin-left transition-all duration-300 group-hover:brightness-110"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentAlt})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-20 p-12 rounded-3xl text-center"
          style={{
            background: `linear-gradient(135deg, ${theme.accent}15, ${theme.accentAlt}15)`,
            border: `1px solid ${theme.border}`,
          }}
        >
          <h3 className="font-display font-bold text-display-sm mb-4">
            Have a project in mind?
          </h3>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: theme.muted }}>
            Let's discuss how my skills can help bring your vision to life.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: theme.accent, color: theme.bg }}
          >
            Get in Touch
            <Icon icon="ph:arrow-right-bold" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
