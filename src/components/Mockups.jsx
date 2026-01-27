import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../context/ThemeContext'

// ScrollTrigger is registered globally in main.jsx

const mockups = [
  {
    title: 'Mobile App',
    type: 'iOS / Android',
    icon: '📱',
    gradient: 'from-violet-600 to-purple-700',
    features: ['Push Notifications', 'Offline Mode', 'Touch ID'],
    mockupContent: (
      <div className="flex flex-col h-full">
        <div className="bg-black/20 px-3 py-1 flex justify-between text-xs">
          <span>9:41</span>
          <span>📶 100%</span>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-3">
          <div className="h-8 bg-white/20 rounded-lg w-3/4" />
          <div className="h-24 bg-white/10 rounded-xl" />
          <div className="h-12 bg-white/20 rounded-lg" />
          <div className="h-12 bg-white/20 rounded-lg" />
        </div>
        <div className="h-14 bg-black/20 flex justify-around items-center">
          <span>🏠</span>
          <span>🔍</span>
          <span>👤</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Desktop App',
    type: 'Electron / Tauri',
    icon: '🖥️',
    gradient: 'from-cyan-600 to-blue-700',
    features: ['Native APIs', 'Auto Updates', 'System Tray'],
    mockupContent: (
      <div className="flex flex-col h-full">
        <div className="h-8 bg-black/30 flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs flex-1 text-center opacity-60">MyApp</span>
        </div>
        <div className="flex flex-1">
          <div className="w-16 bg-black/20 p-2 flex flex-col gap-2">
            <div className="h-8 bg-white/20 rounded" />
            <div className="h-8 bg-white/10 rounded" />
            <div className="h-8 bg-white/10 rounded" />
          </div>
          <div className="flex-1 p-3">
            <div className="h-6 bg-white/20 rounded w-1/2 mb-3" />
            <div className="h-32 bg-white/10 rounded-lg" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Admin Dashboard',
    type: 'Web Application',
    icon: '📊',
    gradient: 'from-emerald-600 to-teal-700',
    features: ['Real-time Data', 'Analytics', 'User Management'],
    mockupContent: (
      <div className="flex flex-col h-full">
        <div className="h-10 bg-black/20 flex items-center px-4 justify-between">
          <div className="h-4 bg-white/30 rounded w-20" />
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-white/20 rounded-full" />
          </div>
        </div>
        <div className="flex flex-1">
          <div className="w-12 bg-black/10 p-2 flex flex-col gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 bg-white/20 rounded" />
            ))}
          </div>
          <div className="flex-1 p-3 grid grid-cols-2 gap-2">
            <div className="bg-white/10 rounded-lg p-2">
              <div className="h-3 bg-white/30 rounded w-12 mb-2" />
              <div className="h-8 bg-white/20 rounded" />
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <div className="h-3 bg-white/30 rounded w-12 mb-2" />
              <div className="h-8 bg-white/20 rounded" />
            </div>
            <div className="col-span-2 bg-white/10 rounded-lg p-2">
              <div className="h-16 bg-white/20 rounded" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

export default function Mockups() {
  const { currentTheme } = useTheme()
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, rotateY: -10 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="mockups" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Platform <span style={{ color: currentTheme.accent }}>Expertise</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: currentTheme.muted }}>
            Capable of building for any platform your project requires
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {mockups.map((mockup, index) => (
            <div
              key={mockup.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group"
            >
              {/* Mockup preview */}
              <div
                className={`h-64 rounded-2xl mb-4 overflow-hidden bg-gradient-to-br ${mockup.gradient} text-white shadow-lg group-hover:scale-[1.02] transition-transform duration-300`}
              >
                {mockup.mockupContent}
              </div>

              {/* Info */}
              <div className="text-center">
                <span className="text-3xl mb-2 block">{mockup.icon}</span>
                <h3 className="text-xl font-bold mb-1" style={{ color: currentTheme.text }}>
                  {mockup.title}
                </h3>
                <p className="text-sm mb-3" style={{ color: currentTheme.muted }}>
                  {mockup.type}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {mockup.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs rounded-full"
                      style={{
                        backgroundColor: `${currentTheme.accent}22`,
                        color: currentTheme.accent,
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
