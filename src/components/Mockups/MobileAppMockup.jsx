import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'

const apps = [
  {
    name: 'Finance Tracker',
    category: 'Banking',
    theme: { bg: '#0a0a0a', accent: '#10b981', text: '#ffffff', muted: '#6b7280' },
    screens: ['Dashboard', 'Transactions', 'Analytics'],
  },
  {
    name: 'Social Connect',
    category: 'Social Media',
    theme: { bg: '#111827', accent: '#ec4899', text: '#ffffff', muted: '#9ca3af' },
    screens: ['Feed', 'Profile', 'Messages'],
  },
  {
    name: 'Health Monitor',
    category: 'Healthcare',
    theme: { bg: '#f8fafc', accent: '#0ea5e9', text: '#0f172a', muted: '#64748b' },
    screens: ['Vitals', 'Activity', 'Reports'],
  },
]

export default function MobileAppMockup({ theme }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mobile-phone',
        { y: 60, opacity: 0, rotateY: -15 },
        { y: 0, opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef}>
      <div className="text-center mb-12">
        <h3 className="text-2xl font-display font-bold mb-3">Mobile Applications</h3>
        <p style={{ color: theme.muted }}>
          Native iOS & Android apps with stunning UI and smooth performance
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 justify-items-center">
        {apps.map((app, i) => (
          <div
            key={app.name}
            className="mobile-phone group"
            style={{ perspective: '1000px' }}
          >
            {/* Phone Frame */}
            <div
              className="relative w-64 rounded-[3rem] p-3 transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundColor: '#1a1a1a',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
              }}
            >
              {/* Notch */}
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 rounded-full z-20"
                style={{ backgroundColor: '#000' }}
              />

              {/* Screen */}
              <div
                className="relative rounded-[2.5rem] overflow-hidden"
                style={{ backgroundColor: app.theme.bg }}
              >
                {/* Status Bar */}
                <div className="flex items-center justify-between px-8 pt-12 pb-4">
                  <span className="text-xs font-medium" style={{ color: app.theme.text }}>9:41</span>
                  <div className="flex items-center gap-1">
                    <Icon icon="ph:wifi-high-bold" className="w-4 h-4" style={{ color: app.theme.text }} />
                    <Icon icon="ph:battery-full-bold" className="w-5 h-5" style={{ color: app.theme.text }} />
                  </div>
                </div>

                {/* App Content */}
                <div className="px-6 pb-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs" style={{ color: app.theme.muted }}>Welcome back</p>
                      <h4 className="font-bold text-lg" style={{ color: app.theme.text }}>Dashboard</h4>
                    </div>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: app.theme.accent + '20' }}
                    >
                      <Icon icon="ph:user-bold" className="w-5 h-5" style={{ color: app.theme.accent }} />
                    </div>
                  </div>

                  {/* Balance Card */}
                  <div
                    className="p-5 rounded-2xl mb-6"
                    style={{ backgroundColor: app.theme.accent }}
                  >
                    <p className="text-xs opacity-80 mb-1" style={{ color: app.theme.bg }}>Total Balance</p>
                    <p className="text-2xl font-bold" style={{ color: app.theme.bg }}>$24,562.00</p>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {['Send', 'Receive', 'More'].map((action) => (
                      <div
                        key={action}
                        className="p-3 rounded-xl text-center"
                        style={{ backgroundColor: app.theme.muted + '20' }}
                      >
                        <Icon
                          icon={
                            action === 'Send'
                              ? 'ph:paper-plane-tilt-bold'
                              : action === 'Receive'
                              ? 'ph:download-bold'
                              : 'ph:dots-three-bold'
                          }
                          className="w-5 h-5 mx-auto mb-1"
                          style={{ color: app.theme.accent }}
                        />
                        <span className="text-xs" style={{ color: app.theme.text }}>{action}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recent */}
                  <div>
                    <p className="text-xs font-medium mb-3" style={{ color: app.theme.muted }}>Recent</p>
                    {[1, 2].map((item) => (
                      <div key={item} className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: app.theme.muted + '20' }}
                        >
                          <Icon icon="ph:shopping-bag-bold" className="w-5 h-5" style={{ color: app.theme.accent }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium" style={{ color: app.theme.text }}>Shopping</p>
                          <p className="text-xs" style={{ color: app.theme.muted }}>Today</p>
                        </div>
                        <span className="text-sm font-medium" style={{ color: app.theme.text }}>-$45.00</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Nav */}
                <div
                  className="flex justify-around py-4 border-t"
                  style={{ borderColor: app.theme.muted + '30' }}
                >
                  {['ph:house-bold', 'ph:chart-bar-bold', 'ph:credit-card-bold', 'ph:gear-bold'].map((icon, idx) => (
                    <Icon
                      key={icon}
                      icon={icon}
                      className="w-6 h-6"
                      style={{ color: idx === 0 ? app.theme.accent : app.theme.muted }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* App Info */}
            <div className="text-center mt-6">
              <h4 className="font-semibold">{app.name}</h4>
              <p className="text-sm" style={{ color: theme.muted }}>{app.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
