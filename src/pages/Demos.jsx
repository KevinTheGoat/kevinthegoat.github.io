import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'
import { useDemo, demoSites } from '../context/DemoContext'
import { EcommerceSite, SaasSite, RestaurantSite, FitnessSite, AgencySite } from '../components/DemoSites'
import MobileAppMockup from '../components/Mockups/MobileAppMockup'
import DesktopAppMockup from '../components/Mockups/DesktopAppMockup'
import SEO from '../components/SEO'
import Footer from '../components/Footer'

// Map demo IDs to components
const demoComponents = {
  ecommerce: EcommerceSite,
  saas: SaasSite,
  restaurant: RestaurantSite,
  fitness: FitnessSite,
  agency: AgencySite,
}

export default function Demos() {
  const { theme } = useTheme()
  const { activeDemo, isInDemoMode, enterDemo, exitDemo } = useDemo()
  const pageRef = useRef(null)
  const [activeTab, setActiveTab] = useState('websites')

  useEffect(() => {
    if (!isInDemoMode) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.demo-header',
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', force3D: true }
        )
        gsap.fromTo('.demo-card',
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.2, ease: 'power3.out', force3D: true }
        )
        gsap.fromTo('.demo-tab',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.4, ease: 'power3.out', force3D: true }
        )
      }, pageRef)

      return () => ctx.revert()
    }
  }, [isInDemoMode])

  // If in demo mode, render the active demo site
  if (isInDemoMode && activeDemo) {
    const DemoComponent = demoComponents[activeDemo.id]
    return DemoComponent ? <DemoComponent theme={activeDemo.theme} /> : null
  }

  const tabs = [
    { id: 'websites', label: 'Websites', icon: 'ph:globe-bold' },
    { id: 'mobile', label: 'Mobile Apps', icon: 'ph:device-mobile-bold' },
    { id: 'desktop', label: 'Desktop Apps', icon: 'ph:desktop-bold' },
  ]

  return (
    <>
      <SEO
        title="Interactive Demos | KevCo - Live Web, Mobile & Desktop App Showcases"
        description="Experience fully interactive demo websites, mobile app mockups, and desktop applications. Explore e-commerce sites, SaaS platforms, fitness apps, restaurants, and agency sites built with React, React Native, and Electron."
        keywords="interactive demos, web development demos, mobile app mockups, desktop app demos, React demos, e-commerce demo, SaaS demo, fitness app, restaurant website, agency portfolio"
        canonicalPath="/demos"
      />
      <div ref={pageRef} className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="demo-header max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Icon icon="ph:play-circle-bold" className="w-4 h-4" style={{ color: theme.accent }} />
            <span className="text-sm font-medium" style={{ color: theme.muted }}>
              Interactive Showcases
            </span>
          </div>
          <h1 className="font-display font-bold text-display-lg mb-6">
            Live <span className="gradient-text">Demos</span>
          </h1>
          <p className="text-xl" style={{ color: theme.muted }}>
            Explore fully interactive demo sites, mobile app mockups, and desktop applications.
            Click any demo to experience it in full with its unique theme and navigation.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="demo-tab flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: activeTab === tab.id ? theme.accent : theme.elevated,
                color: activeTab === tab.id ? theme.bg : theme.text,
                border: `1px solid ${activeTab === tab.id ? theme.accent : theme.border}`,
              }}
            >
              <Icon icon={tab.icon} className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'websites' && (
          <div>
            {/* Demo Sites Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {demoSites.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => enterDemo(demo.id)}
                  className="demo-card group text-left p-6 rounded-3xl transition-all duration-500 hover:scale-[1.02] overflow-hidden relative"
                  style={{
                    backgroundColor: theme.surface,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  {/* Preview gradient background */}
                  <div
                    className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                    style={{
                      background: `linear-gradient(135deg, ${demo.theme.accent}40, ${demo.theme.bg})`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{ backgroundColor: demo.theme.accent }}
                    >
                      <Icon icon={demo.icon} className="w-8 h-8" style={{ color: demo.theme.bg }} />
                    </div>

                    {/* Info */}
                    <div className="mb-4">
                      <span
                        className="text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block"
                        style={{ backgroundColor: theme.accent + '20', color: theme.accent }}
                      >
                        {demo.category}
                      </span>
                      <h3 className="font-display font-bold text-xl mb-2">{demo.name}</h3>
                      <p className="text-sm" style={{ color: theme.muted }}>{demo.description}</p>
                    </div>

                    {/* Theme preview colors */}
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-xs" style={{ color: theme.muted }}>Theme:</span>
                      <div className="flex gap-1">
                        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: demo.theme.bg }} />
                        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: demo.theme.accent }} />
                        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: demo.theme.surface }} />
                      </div>
                    </div>

                    {/* CTA */}
                    <div
                      className="flex items-center gap-2 font-medium transition-transform duration-300 group-hover:translate-x-2"
                      style={{ color: theme.accent }}
                    >
                      Launch Demo
                      <Icon icon="ph:arrow-right-bold" className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Features callout */}
            <div
              className="p-8 rounded-3xl"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}15, ${theme.accentAlt}15)`,
                border: `1px solid ${theme.border}`,
              }}
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <Icon icon="ph:info-bold" className="w-12 h-12 flex-shrink-0" style={{ color: theme.accent }} />
                <div>
                  <h3 className="font-display font-bold text-xl mb-2">Fully Interactive Experience</h3>
                  <p style={{ color: theme.muted }}>
                    Each demo site features its own unique theme, navigation, and content. When you launch a demo,
                    the entire navigation transforms to match that site's branding. Use the "Switch Demo" button
                    to seamlessly move between different sites, or click "Exit" to return to the portfolio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mobile' && (
          <div
            className="p-8 lg:p-12 rounded-3xl"
            style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
          >
            <MobileAppMockup theme={theme} />
          </div>
        )}

        {activeTab === 'desktop' && (
          <div
            className="p-8 lg:p-12 rounded-3xl"
            style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
          >
            <DesktopAppMockup theme={theme} />
          </div>
        )}

        {/* Tech Stack */}
        <div className="mt-16">
          <h3 className="font-display font-bold text-xl mb-8 text-center">Technologies Used</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: 'mdi:react', label: 'React' },
              { icon: 'mdi:react', label: 'React Native' },
              { icon: 'simple-icons:electron', label: 'Electron' },
              { icon: 'mdi:nodejs', label: 'Node.js' },
              { icon: 'simple-icons:swift', label: 'Swift' },
              { icon: 'simple-icons:kotlin', label: 'Kotlin' },
              { icon: 'mdi:tailwind', label: 'Tailwind' },
              { icon: 'simple-icons:greensock', label: 'GSAP' },
            ].map((tech) => (
              <div
                key={tech.label}
                className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${theme.elevated}, ${theme.surface})`,
                  border: `1px solid ${theme.border}`
                }}
              >
                <Icon
                  icon={tech.icon}
                  className="w-6 h-6"
                  style={{
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                />
                <span className="font-medium">{tech.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <Footer />
    </>
  )
}
