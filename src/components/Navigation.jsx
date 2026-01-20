import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'
import { useDemo, demoSites } from '../context/DemoContext'

const navLinks = [
  { path: '/', label: 'Home', icon: 'ph:house-bold' },
  { path: '/skills', label: 'Skills', icon: 'ph:lightning-bold' },
  { path: '/projects', label: 'Projects', icon: 'ph:folders-bold' },
  { path: '/demos', label: 'Demos', icon: 'ph:play-circle-bold', hasDropdown: true },
  { path: '/contact', label: 'Contact', icon: 'ph:envelope-bold' },
]

export default function Navigation() {
  const { theme, themeKey, setTheme, themes } = useTheme()
  const { activeDemo, isInDemoMode, enterDemo, exitDemo, switchDemo } = useDemo()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const dropdownRef = useRef(null)
  const demoDropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setDemoDropdownOpen(false)
  }, [location.pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedOutsideMain = dropdownRef.current && !dropdownRef.current.contains(e.target)
      const clickedOutsideDemo = demoDropdownRef.current && !demoDropdownRef.current.contains(e.target)

      // Close if clicked outside both dropdown refs
      if ((clickedOutsideMain || !dropdownRef.current) && (clickedOutsideDemo || !demoDropdownRef.current)) {
        setDemoDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && menuRef.current) {
      // Use transform-based animation for better mobile performance
      gsap.set(menuRef.current, {
        visibility: 'visible',
        opacity: 0,
      })
      gsap.to(menuRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.fromTo(
        menuRef.current.querySelectorAll('.nav-item'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
      )
    }
  }, [isOpen])

  // Origami Unfold Animation
  useEffect(() => {
    if (demoDropdownOpen && dropdownRef.current) {
      const dropdown = dropdownRef.current.querySelector('.desktop-dropdown')
      const items = dropdown?.querySelectorAll('.dropdown-item')
      const header = dropdown?.querySelector('.dropdown-header')

      if (dropdown && items) {
        // Add class to trigger shadow animation
        dropdown.classList.add('unfolding')

        const tl = gsap.timeline()

        // Container unfolds like opening a lid
        tl.to(dropdown, {
          rotateX: 0,
          duration: 0.45,
          ease: 'power2.out'
        })

        // Header unfolds first (top panel)
        if (header) {
          tl.to(header, {
            opacity: 1,
            rotateX: 0,
            duration: 0.35,
            ease: 'power2.inOut'
          }, 0.1)
        }

        // Items unfold sequentially - starts while header is still unfolding for continuous flow
        items.forEach((item, i) => {
          tl.to(item, {
            opacity: 1,
            rotateX: 0,
            duration: 0.4,
            ease: 'power2.inOut'
          }, 0.25 + (i * 0.08))
        })
      }
    }
  }, [demoDropdownOpen])

  const handleDemoClick = (demoId) => {
    enterDemo(demoId)
    navigate('/demos')
    setDemoDropdownOpen(false)
  }

  // Get the current theme to use (demo theme or main theme)
  const currentTheme = isInDemoMode && activeDemo ? activeDemo.theme : theme

  return (
    <>
      {/* Demo Mode Navigation */}
      {isInDemoMode && activeDemo && (
        <nav
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
          style={{ backgroundColor: `${activeDemo.theme.bg}ee` }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Demo Site Logo */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110"
                style={{ backgroundColor: activeDemo.theme.accent }}
              >
                <Icon icon={activeDemo.icon} className="w-5 h-5" style={{ color: activeDemo.theme.bg }} />
              </div>
              <div>
                <span className="font-display font-bold text-lg" style={{ color: activeDemo.theme.text }}>
                  {activeDemo.name}
                </span>
                <span className="hidden sm:inline text-xs ml-2 px-2 py-0.5 rounded-full" style={{ backgroundColor: activeDemo.theme.accent + '30', color: activeDemo.theme.accent }}>
                  Demo
                </span>
              </div>
            </div>

            {/* Demo Site Nav Items (non-functional, just for show) */}
            <div className="hidden lg:flex items-center gap-1">
              {activeDemo.navItems.map((item, i) => (
                <button
                  key={item}
                  className="px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: i === 0 ? activeDemo.theme.accent : 'transparent',
                    color: i === 0 ? activeDemo.theme.bg : activeDemo.theme.muted,
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Demo Switcher & Exit */}
            <div className="flex items-center gap-3">
              {/* Demo Switcher Dropdown */}
              <div className="relative" ref={demoDropdownRef}>
                <button
                  onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300"
                  style={{
                    backgroundColor: activeDemo.theme.elevated,
                    color: activeDemo.theme.text,
                    border: `1px solid ${activeDemo.theme.border}`,
                  }}
                >
                  <Icon icon="ph:swap-bold" className="w-4 h-4" />
                  Switch Demo
                  <Icon
                    icon="ph:caret-down-bold"
                    className={`w-3 h-3 transition-transform duration-300 ${demoDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {demoDropdownOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-72 rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                      backgroundColor: activeDemo.theme.surface,
                      border: `1px solid ${activeDemo.theme.border}`,
                    }}
                  >
                    {demoSites.map((demo) => (
                      <button
                        key={demo.id}
                        onClick={() => {
                          switchDemo(demo.id)
                          setDemoDropdownOpen(false)
                        }}
                        className={`dropdown-item w-full flex items-center gap-4 px-4 py-3 transition-all duration-300 ${
                          activeDemo.id === demo.id ? '' : 'hover:bg-white/5'
                        }`}
                        style={{
                          backgroundColor: activeDemo.id === demo.id ? activeDemo.theme.accent + '20' : 'transparent',
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: demo.theme.accent }}
                        >
                          <Icon icon={demo.icon} className="w-5 h-5" style={{ color: demo.theme.bg }} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium" style={{ color: activeDemo.theme.text }}>{demo.name}</div>
                          <div className="text-xs" style={{ color: activeDemo.theme.muted }}>{demo.category}</div>
                        </div>
                        {activeDemo.id === demo.id && (
                          <Icon icon="ph:check-circle-bold" className="w-5 h-5 ml-auto" style={{ color: activeDemo.theme.accent }} />
                        )}
                      </button>
                    ))}

                    {/* View All Demos Button */}
                    <div
                      className="border-t mt-2 pt-2"
                      style={{ borderColor: activeDemo.theme.border }}
                    >
                      <button
                        onClick={() => {
                          exitDemo()
                          navigate('/demos')
                          setDemoDropdownOpen(false)
                        }}
                        className="dropdown-item w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 hover:bg-white/5"
                      >
                        <Icon
                          icon="ph:grid-four-bold"
                          className="w-5 h-5"
                          style={{ color: activeDemo.theme.accent }}
                        />
                        <span className="font-medium" style={{ color: activeDemo.theme.text }}>
                          View All Demos
                        </span>
                        <Icon
                          icon="ph:arrow-right-bold"
                          className="w-4 h-4 ml-auto"
                          style={{ color: activeDemo.theme.muted }}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Exit Demo Button */}
              <button
                onClick={exitDemo}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: activeDemo.theme.accent,
                  color: activeDemo.theme.bg,
                }}
              >
                <Icon icon="ph:x-bold" className="w-4 h-4" />
                Exit
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Navigation (hidden when in demo mode) */}
      {!isInDemoMode && (
        <>
          <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
              scrolled ? 'py-4' : 'py-6'
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
              {/* Logo */}
              <NavLink
                to="/"
                className="relative z-50 flex items-center gap-2 group"
              >
                <div className="px-4 py-2 rounded-xl glass transition-all duration-300 group-hover:bg-white/10">
                  <img
                    src="/images/kevco-logo4.svg"
                    alt="KevCo"
                    className="h-10 md:h-12 transition-transform duration-300 group-hover:scale-105"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(197, 160, 89, 0.3))' }}
                  />
                </div>
              </NavLink>

              {/* Desktop Links */}
              <div
                className={`hidden lg:flex items-center gap-1 px-2 py-2 rounded-2xl transition-all duration-500 ${
                  scrolled ? 'glass-strong' : ''
                }`}
              >
                {navLinks.map((link) => (
                  <div key={link.path} className="relative">
                    {link.hasDropdown ? (
                      <div ref={dropdownRef}>
                        <button
                          onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                          className="relative px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:bg-white/5"
                          style={{ color: location.pathname === '/demos' ? theme.bg : theme.text, backgroundColor: location.pathname === '/demos' ? theme.accent : 'transparent' }}
                        >
                          <Icon icon={link.icon} className="w-4 h-4" />
                          {link.label}
                          <Icon
                            icon="ph:caret-down-bold"
                            className={`w-3 h-3 transition-transform duration-300 ${demoDropdownOpen ? 'rotate-180' : ''}`}
                          />
                        </button>

                        {demoDropdownOpen && (
                          <div
                            className="desktop-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 rounded-2xl overflow-hidden shadow-2xl"
                            style={{
                              backgroundColor: theme.surface,
                              border: `1px solid ${theme.border}`,
                            }}
                          >
                            <div className="dropdown-header p-4 border-b" style={{ borderColor: theme.border }}>
                              <h3 className="font-display font-semibold text-sm" style={{ color: theme.muted }}>
                                Interactive Demo Sites
                              </h3>
                            </div>
                            {demoSites.map((demo) => (
                              <button
                                key={demo.id}
                                onClick={() => handleDemoClick(demo.id)}
                                className="dropdown-item w-full flex items-center gap-4 px-4 py-3 transition-all duration-300 hover:bg-white/5"
                              >
                                <div
                                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                  style={{ backgroundColor: demo.theme.accent }}
                                >
                                  <Icon icon={demo.icon} className="w-6 h-6" style={{ color: demo.theme.bg }} />
                                </div>
                                <div className="text-left flex-1">
                                  <div className="font-medium" style={{ color: theme.text }}>{demo.name}</div>
                                  <div className="text-xs" style={{ color: theme.muted }}>{demo.description}</div>
                                </div>
                                <Icon icon="ph:arrow-right-bold" className="w-4 h-4" style={{ color: theme.muted }} />
                              </button>
                            ))}
                            <NavLink
                              to="/demos"
                              className="block w-full px-4 py-3 text-center font-medium text-sm border-t transition-all duration-300 hover:bg-white/5"
                              style={{ borderColor: theme.border, color: theme.accent }}
                              onClick={() => setDemoDropdownOpen(false)}
                            >
                              View All Demos & Mockups
                            </NavLink>
                          </div>
                        )}
                      </div>
                    ) : (
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `relative px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                            isActive ? '' : 'hover:bg-white/5'
                          }`
                        }
                        style={({ isActive }) =>
                          isActive
                            ? { backgroundColor: theme.accent, color: theme.bg }
                            : { color: theme.text }
                        }
                      >
                        <Icon icon={link.icon} className="w-4 h-4" />
                        {link.label}
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>

              {/* Right side: Theme switcher + Mobile menu button */}
              <div className="flex items-center gap-3">
                {/* Theme Switcher */}
                <div className="hidden sm:grid grid-cols-5 gap-1 p-1.5 rounded-xl glass">
                  {Object.entries(themes).map(([key, t]) => (
                    <button
                      key={key}
                      onClick={() => setTheme(key)}
                      className={`w-6 h-6 rounded-md transition-all duration-300 flex items-center justify-center ${
                        themeKey === key ? 'scale-110 ring-2 ring-white/30' : 'opacity-50 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: t.accent }}
                      title={t.name}
                    >
                      {themeKey === key && (
                        <Icon icon="ph:check-bold" className="w-3 h-3" style={{ color: t.bg }} />
                      )}
                    </button>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden relative z-50 w-12 h-12 rounded-xl flex items-center justify-center glass"
                  aria-label="Toggle menu"
                >
                  <div className="w-5 h-4 flex flex-col justify-between">
                    <span
                      className={`block h-0.5 rounded-full transition-all duration-300 ${
                        isOpen ? 'rotate-45 translate-y-[7px]' : ''
                      }`}
                      style={{ backgroundColor: theme.text }}
                    />
                    <span
                      className={`block h-0.5 rounded-full transition-all duration-300 ${
                        isOpen ? 'opacity-0 scale-0' : ''
                      }`}
                      style={{ backgroundColor: theme.text }}
                    />
                    <span
                      className={`block h-0.5 rounded-full transition-all duration-300 ${
                        isOpen ? '-rotate-45 -translate-y-[7px]' : ''
                      }`}
                      style={{ backgroundColor: theme.text }}
                    />
                  </div>
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Overlay */}
          {isOpen && (
            <div
              ref={menuRef}
              className="fixed inset-0 z-40 lg:hidden flex flex-col items-center justify-center"
              style={{
                backgroundColor: theme.surface,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
              }}
            >
              <div className="flex flex-col items-center gap-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className="nav-item flex items-center gap-4 px-8 py-4 rounded-2xl text-2xl font-display font-semibold transition-all duration-300"
                    style={({ isActive }) =>
                      isActive
                        ? { backgroundColor: theme.accent, color: theme.bg }
                        : { color: theme.text }
                    }
                  >
                    <Icon icon={link.icon} className="w-7 h-7" />
                    {link.label}
                  </NavLink>
                ))}

                {/* Mobile Theme Switcher */}
                <div className="nav-item grid grid-cols-5 gap-2 mt-8 p-3 rounded-xl glass">
                  {Object.entries(themes).map(([key, t]) => (
                    <button
                      key={key}
                      onClick={() => setTheme(key)}
                      className={`w-10 h-10 rounded-lg transition-all duration-300 flex items-center justify-center ${
                        themeKey === key ? 'scale-110 ring-2 ring-white/30' : 'opacity-50'
                      }`}
                      style={{ backgroundColor: t.accent }}
                      title={t.name}
                    >
                      {themeKey === key && (
                        <Icon icon="ph:check-bold" className="w-4 h-4" style={{ color: t.bg }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
