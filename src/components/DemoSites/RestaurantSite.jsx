import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import DemoFooter from '../DemoFooter'

const menuItems = [
  { name: 'Truffle Risotto', description: 'Arborio rice, black truffle, parmesan', price: 38, category: 'Mains', image: '/images/restaurant/truffle-risotto.jpg' },
  { name: 'Wagyu Carpaccio', description: 'A5 wagyu, capers, aged balsamic', price: 45, category: 'Starters', image: '/images/restaurant/beef-carpaccio.jpg' },
  { name: 'Lobster Thermidor', description: 'Maine lobster, cognac cream, gruyère', price: 68, category: 'Mains', image: '/images/restaurant/lobster-thermidor.jpg' },
  { name: 'Chocolate Soufflé', description: 'Valrhona chocolate, crème anglaise', price: 18, category: 'Desserts', image: '/images/restaurant/chocolate-lava-cake.jpg' },
]

export default function RestaurantSite({ theme }) {
  const containerRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.resto-hero-text',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.resto-menu-item',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.4, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen" style={{ backgroundColor: theme.bg, color: theme.text }}>
      {/* Hero */}
      <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 70%, ${theme.accent}20, transparent 50%)`,
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: theme.accent }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p
            className="resto-hero-text text-sm tracking-[0.5em] uppercase mb-6"
            style={{ color: theme.accent }}
          >
            Fine Dining Experience
          </p>
          <h1 className="resto-hero-text text-6xl md:text-8xl font-serif mb-6" style={{ fontStyle: 'italic' }}>
            Savoria
          </h1>
          <p className="resto-hero-text text-xl mb-10 max-w-xl mx-auto" style={{ color: theme.muted }}>
            Where culinary artistry meets unforgettable moments
          </p>
          <div className="resto-hero-text flex flex-wrap justify-center gap-4">
            <button
              className="px-10 py-4 rounded-full font-medium transition-all duration-500 hover:scale-105"
              style={{ backgroundColor: theme.accent, color: theme.bg }}
            >
              <Icon icon="ph:calendar-bold" className="w-5 h-5 inline mr-2" />
              Reserve Table
            </button>
            <button
              className="px-10 py-4 rounded-full font-medium transition-all duration-500 hover:scale-105"
              style={{ border: `2px solid ${theme.border}`, color: theme.text }}
            >
              View Menu
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase" style={{ color: theme.muted }}>Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 flex justify-center" style={{ borderColor: theme.border }}>
            <div
              className="w-1.5 h-3 mt-2 rounded-full animate-bounce"
              style={{ backgroundColor: theme.accent }}
            />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-24 px-6" style={{ backgroundColor: theme.surface }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: theme.accent }}>
              Our Menu
            </p>
            <h2 className="text-4xl md:text-5xl font-serif">Culinary Masterpieces</h2>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {['All', 'Starters', 'Mains', 'Desserts'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  backgroundColor: activeCategory === cat ? theme.accent : 'transparent',
                  color: activeCategory === cat ? theme.bg : theme.muted,
                  border: `1px solid ${activeCategory === cat ? theme.accent : theme.border}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="space-y-6">
            {menuItems
              .filter((item) => activeCategory === 'All' || item.category === activeCategory)
              .map((item, i) => (
                <div
                  key={item.name}
                  className="resto-menu-item group flex items-center justify-between p-6 rounded-2xl transition-all duration-300 hover:scale-[1.01] overflow-hidden"
                  style={{ backgroundColor: theme.elevated }}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">{item.name}</h3>
                      <p className="text-sm" style={{ color: theme.muted }}>{item.description}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-serif flex-shrink-0 ml-4" style={{ color: theme.accent }}>
                    ${item.price}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <Icon icon="ph:star-bold" className="w-12 h-12 mx-auto mb-6" style={{ color: theme.accent }} />
          <h2 className="text-4xl font-serif mb-6">Experience Excellence</h2>
          <p className="text-lg mb-10" style={{ color: theme.muted }}>
            Join us for an unforgettable dining journey. Reserve your table today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="text"
              placeholder="Your name"
              className="px-6 py-4 rounded-xl outline-none text-center sm:text-left"
              style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
            />
            <input
              type="text"
              placeholder="Date & time"
              className="px-6 py-4 rounded-xl outline-none text-center sm:text-left"
              style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
            />
            <button
              className="px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: theme.accent, color: theme.bg }}
            >
              Reserve
            </button>
          </div>
        </div>
      </section>

      <DemoFooter theme={theme} />
    </div>
  )
}
