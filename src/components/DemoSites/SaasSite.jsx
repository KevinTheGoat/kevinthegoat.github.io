import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'

const stats = [
  { label: 'Total Revenue', value: '$84,254', change: '+12.5%', icon: 'ph:currency-dollar-bold' },
  { label: 'Active Users', value: '24,521', change: '+8.2%', icon: 'ph:users-bold' },
  { label: 'Conversion Rate', value: '3.24%', change: '+2.1%', icon: 'ph:chart-line-up-bold' },
  { label: 'Avg. Session', value: '4m 32s', change: '-0.8%', icon: 'ph:clock-bold' },
]

const chartData = [35, 58, 42, 75, 68, 90, 85, 95, 78, 88, 92, 85]

export default function SaasSite({ theme }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.saas-stat',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.saas-chart-bar',
        { scaleY: 0 },
        { scaleY: 1, duration: 0.6, stagger: 0.05, delay: 0.3, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.saas-panel',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.4, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen" style={{ backgroundColor: theme.bg, color: theme.text }}>
      {/* Dashboard Content */}
      <div className="flex pt-20">
        {/* Sidebar */}
        <aside
          className="hidden lg:block w-64 min-h-screen p-6 pt-8"
          style={{ backgroundColor: theme.surface, borderRight: `1px solid ${theme.border}` }}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.accent }}>
              <Icon icon="ph:chart-pie-slice-bold" className="w-5 h-5" style={{ color: theme.bg }} />
            </div>
            <span className="font-bold text-lg">AnalyticsPro</span>
          </div>
          <nav className="space-y-2">
            {[
              { icon: 'ph:house-bold', label: 'Overview', active: true },
              { icon: 'ph:chart-bar-bold', label: 'Analytics' },
              { icon: 'ph:users-bold', label: 'Customers' },
              { icon: 'ph:folder-bold', label: 'Projects' },
              { icon: 'ph:gear-bold', label: 'Settings' },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: item.active ? theme.accent + '20' : 'transparent',
                  color: item.active ? theme.accent : theme.muted,
                }}
              >
                <Icon icon={item.icon} className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-2xl font-bold mb-1">Dashboard Overview</h1>
              <p style={{ color: theme.muted }}>Welcome back! Here's what's happening.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-xl outline-none w-48"
                  style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
                />
                <Icon icon="ph:magnifying-glass" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: theme.muted }} />
              </div>
              <button
                className="w-10 h-10 rounded-xl flex items-center justify-center relative"
                style={{ backgroundColor: theme.surface }}
              >
                <Icon icon="ph:bell-bold" className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="saas-stat p-6 rounded-2xl"
                style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: theme.accent + '20' }}
                  >
                    <Icon icon={stat.icon} className="w-6 h-6" style={{ color: theme.accent }} />
                  </div>
                  <span
                    className="text-sm font-medium px-2 py-1 rounded-lg"
                    style={{
                      backgroundColor: stat.change.startsWith('+') ? '#22c55e20' : '#ef444420',
                      color: stat.change.startsWith('+') ? '#22c55e' : '#ef4444',
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm" style={{ color: theme.muted }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Chart */}
            <div
              className="saas-panel lg:col-span-2 p-6 rounded-2xl"
              style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Revenue Over Time</h3>
                <div className="flex gap-2">
                  {['Week', 'Month', 'Year'].map((period) => (
                    <button
                      key={period}
                      className="px-3 py-1 text-sm rounded-lg transition-all"
                      style={{
                        backgroundColor: period === 'Month' ? theme.accent : 'transparent',
                        color: period === 'Month' ? theme.bg : theme.muted,
                      }}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-64 flex items-end gap-3">
                {chartData.map((value, i) => (
                  <div
                    key={i}
                    className="saas-chart-bar flex-1 rounded-t-lg transition-all duration-300 hover:opacity-80 origin-bottom"
                    style={{
                      height: `${value}%`,
                      backgroundColor: theme.accent,
                      opacity: 0.6 + (value / 200),
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs" style={{ color: theme.muted }}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div
              className="saas-panel p-6 rounded-2xl"
              style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
            >
              <h3 className="font-semibold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { user: 'Sarah K.', action: 'upgraded to Pro', time: '2m ago', icon: 'ph:crown-bold' },
                  { user: 'Mike R.', action: 'completed onboarding', time: '15m ago', icon: 'ph:check-circle-bold' },
                  { user: 'Team Alpha', action: 'created new project', time: '1h ago', icon: 'ph:folder-plus-bold' },
                  { user: 'Lisa T.', action: 'invited 3 members', time: '3h ago', icon: 'ph:user-plus-bold' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: theme.elevated }}
                    >
                      <Icon icon={item.icon} className="w-5 h-5" style={{ color: theme.accent }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{item.user}</span>{' '}
                        <span style={{ color: theme.muted }}>{item.action}</span>
                      </p>
                      <p className="text-xs" style={{ color: theme.muted }}>{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
