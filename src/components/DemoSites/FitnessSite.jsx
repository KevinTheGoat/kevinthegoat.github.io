import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import DemoFooter from '../DemoFooter'

const workouts = [
  { name: 'HIIT Blast', duration: '30 min', calories: 450, level: 'Advanced', icon: 'ph:fire-bold' },
  { name: 'Strength Builder', duration: '45 min', calories: 380, level: 'Intermediate', icon: 'ph:barbell-bold' },
  { name: 'Yoga Flow', duration: '60 min', calories: 200, level: 'Beginner', icon: 'ph:person-simple-bold' },
  { name: 'Core Crusher', duration: '25 min', calories: 280, level: 'Intermediate', icon: 'ph:lightning-bold' },
]

const weekProgress = [
  { day: 'Mon', completed: true, workout: 'HIIT' },
  { day: 'Tue', completed: true, workout: 'Strength' },
  { day: 'Wed', completed: true, workout: 'Yoga' },
  { day: 'Thu', completed: false, workout: 'Rest' },
  { day: 'Fri', completed: false, workout: 'HIIT' },
  { day: 'Sat', completed: false, workout: 'Strength' },
  { day: 'Sun', completed: false, workout: 'Rest' },
]

export default function FitnessSite({ theme }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fit-hero',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.fit-stat',
        { y: 40, opacity: 0, rotateX: -30 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.fit-workout',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.5, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.fit-day',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.7, ease: 'back.out(1.7)' }
      )
      // Mobile mockup animation
      gsap.fromTo(
        '.mobile-mockup',
        { y: 60, opacity: 0, rotateY: -15 },
        { y: 0, opacity: 1, rotateY: 0, duration: 1, delay: 0.4, ease: 'power3.out' }
      )
      // Floating animation for mobile mockup
      gsap.to('.mobile-mockup', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.4
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen" style={{ backgroundColor: theme.bg, color: theme.text }}>
      {/* Hero Stats */}
      <section className="pt-24 pb-10 px-6 relative">
        <div className="max-w-6xl mx-auto xl:pr-80">
          {/* Mobile Mockup - Hidden on mobile, visible on xl screens */}
          <div className="mobile-mockup hidden xl:block absolute right-4 top-32 z-10" style={{ perspective: '1000px' }}>
            {/* Phone Frame */}
            <div
              className="relative w-72 h-[600px] rounded-[3rem] p-3 shadow-2xl"
              style={{
                backgroundColor: theme.elevated,
                border: `8px solid ${theme.surface}`,
                boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${theme.accent}30`,
              }}
            >
              {/* Notch */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 rounded-b-2xl z-20"
                style={{ backgroundColor: theme.surface }}
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full" style={{ backgroundColor: theme.bg }} />
              </div>

              {/* Screen Content */}
              <div
                className="w-full h-full rounded-[2.5rem] overflow-hidden"
                style={{ backgroundColor: theme.bg }}
              >
                <div className="p-6 h-full flex flex-col">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between mb-6 text-xs">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <Icon icon="ph:wifi-high-bold" className="w-4 h-4" />
                      <Icon icon="ph:battery-charging-bold" className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Header */}
                  <div className="mb-6">
                    <p className="text-xs mb-1" style={{ color: theme.muted }}>Today</p>
                    <h2 className="text-xl font-bold">Your Progress</h2>
                  </div>

                  {/* Circular Progress */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-32 h-32">
                      {/* Background Circle */}
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke={theme.surface}
                          strokeWidth="12"
                          fill="none"
                        />
                        {/* Progress Circle */}
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke={theme.accent}
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray="352"
                          strokeDashoffset="88"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">75%</span>
                        <span className="text-xs" style={{ color: theme.muted }}>Complete</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { icon: 'ph:fire-bold', label: 'Calories', value: '450', color: '#ef4444' },
                      { icon: 'ph:footprints-bold', label: 'Steps', value: '8.2k', color: '#3b82f6' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="p-3 rounded-2xl"
                        style={{ backgroundColor: theme.surface }}
                      >
                        <Icon icon={stat.icon} className="w-5 h-5 mb-2" style={{ color: stat.color }} />
                        <p className="text-lg font-bold">{stat.value}</p>
                        <p className="text-xs" style={{ color: theme.muted }}>{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Current Workout */}
                  <div
                    className="p-4 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs mb-1 opacity-80" style={{ color: theme.bg }}>Active Workout</p>
                        <p className="font-bold" style={{ color: theme.bg }}>HIIT Blast</p>
                      </div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.bg }}>
                        <Icon icon="ph:play-fill" className="w-5 h-5" style={{ color: theme.accent }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Welcome */}
          <div className="fit-hero mb-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm" style={{ color: theme.muted }}>Good morning,</p>
                <h1 className="text-3xl font-bold">Alex!</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.surface }}>
                  <Icon icon="ph:fire-bold" className="w-6 h-6" style={{ color: theme.accent }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: theme.muted }}>Streak</p>
                  <p className="font-bold" style={{ color: theme.accent }}>12 days</p>
                </div>
              </div>
            </div>

            {/* Today's Goal Card */}
            <div
              className="p-6 rounded-3xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
              }}
            >
              <div className="relative z-10">
                <p className="text-sm opacity-80 mb-2" style={{ color: theme.bg }}>Today's Goal</p>
                <h2 className="text-2xl font-bold mb-4" style={{ color: theme.bg }}>Complete HIIT Blast</h2>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Icon icon="ph:clock-bold" className="w-4 h-4" style={{ color: theme.bg }} />
                    <span style={{ color: theme.bg }}>30 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="ph:fire-bold" className="w-4 h-4" style={{ color: theme.bg }} />
                    <span style={{ color: theme.bg }}>450 cal</span>
                  </div>
                </div>
              </div>
              <button
                className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                style={{ backgroundColor: theme.bg }}
              >
                <Icon icon="ph:play-fill" className="w-8 h-8 ml-1" style={{ color: theme.accent }} />
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Calories', value: '1,842', icon: 'ph:fire-bold', color: '#ef4444' },
              { label: 'Minutes', value: '127', icon: 'ph:timer-bold', color: '#3b82f6' },
              { label: 'Workouts', value: '8', icon: 'ph:barbell-bold', color: theme.accent },
            ].map((stat) => (
              <div
                key={stat.label}
                className="fit-stat p-4 rounded-2xl text-center"
                style={{ backgroundColor: theme.surface }}
              >
                <Icon icon={stat.icon} className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs" style={{ color: theme.muted }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Week Progress */}
          <div className="mb-10">
            <h3 className="font-bold mb-4">This Week</h3>
            <div className="flex justify-between">
              {weekProgress.map((day) => (
                <div key={day.day} className="fit-day flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: day.completed ? theme.accent : theme.surface,
                      border: `2px solid ${day.completed ? theme.accent : theme.border}`,
                    }}
                  >
                    {day.completed ? (
                      <Icon icon="ph:check-bold" className="w-5 h-5" style={{ color: theme.bg }} />
                    ) : (
                      <Icon icon="ph:barbell-bold" className="w-5 h-5" style={{ color: theme.muted }} />
                    )}
                  </div>
                  <span className="text-xs font-medium" style={{ color: day.completed ? theme.text : theme.muted }}>
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Workouts */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Recommended Workouts</h3>
              <button className="text-sm" style={{ color: theme.accent }}>View all</button>
            </div>
            <div className="space-y-3">
              {workouts.map((workout) => (
                <div
                  key={workout.name}
                  className="fit-workout flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  style={{ backgroundColor: theme.surface }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: theme.accent + '20' }}
                  >
                    <Icon icon={workout.icon} className="w-7 h-7" style={{ color: theme.accent }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{workout.name}</h4>
                    <div className="flex items-center gap-4 text-xs" style={{ color: theme.muted }}>
                      <span>{workout.duration}</span>
                      <span>{workout.calories} cal</span>
                      <span
                        className="px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor:
                            workout.level === 'Beginner'
                              ? '#22c55e20'
                              : workout.level === 'Intermediate'
                              ? '#f59e0b20'
                              : '#ef444420',
                          color:
                            workout.level === 'Beginner'
                              ? '#22c55e'
                              : workout.level === 'Intermediate'
                              ? '#f59e0b'
                              : '#ef4444',
                        }}
                      >
                        {workout.level}
                      </span>
                    </div>
                  </div>
                  <Icon icon="ph:play-circle-bold" className="w-8 h-8" style={{ color: theme.accent }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DemoFooter theme={theme} />
    </div>
  )
}
