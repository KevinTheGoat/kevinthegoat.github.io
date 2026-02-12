import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../context/ThemeContext'
import Calculator from './Demos/Calculator'
import AnimationDemo from './Demos/AnimationDemo'
import ApiDemo from './Demos/ApiDemo'

// ScrollTrigger is registered globally in main.jsx

const demoTabs = [
  { id: 'calculator', name: 'Calculator', icon: '🧮' },
  { id: 'animation', name: 'GSAP Animation', icon: '✨' },
  { id: 'api', name: 'API Integration', icon: '🔌' },
]

export default function Demos() {
  const { currentTheme } = useTheme()
  const [activeDemo, setActiveDemo] = useState('calculator')
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

  const renderDemo = () => {
    switch (activeDemo) {
      case 'calculator':
        return <Calculator />
      case 'animation':
        return <AnimationDemo />
      case 'api':
        return <ApiDemo />
      default:
        return null
    }
  }

  return (
    <section
      id="demos"
      ref={sectionRef}
      className="py-24 px-6 theme-transition"
      style={{ backgroundColor: currentTheme.surface }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Interactive <span style={{ color: currentTheme.accent }}>Demos</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: currentTheme.muted }}>
            Try out these live demos showcasing different technical skills
          </p>
        </div>

        <div ref={contentRef} className="opacity-0">
          {/* Demo tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {demoTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDemo(tab.id)}
                className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
                style={{
                  backgroundColor:
                    activeDemo === tab.id ? currentTheme.accent : `${currentTheme.bg}`,
                  color: activeDemo === tab.id ? currentTheme.bg : currentTheme.text,
                  border: `1px solid ${currentTheme.accent}44`,
                }}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>

          {/* Demo content */}
          <div
            className="rounded-2xl p-6 sm:p-8 min-h-[400px]"
            style={{
              backgroundColor: currentTheme.bg,
              border: `1px solid ${currentTheme.accent}22`,
            }}
          >
            {renderDemo()}
          </div>
        </div>
      </div>
    </section>
  )
}
