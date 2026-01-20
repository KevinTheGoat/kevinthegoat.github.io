import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import DemoFooter from '../DemoFooter'

const products = [
  { id: 1, name: 'Royal Gold Chronograph', price: 12499, category: 'Watches', image: '/images/luxcart/gold-watch-set.png' },
  { id: 2, name: 'Heritage Leather Kelly', price: 8999, category: 'Bags', image: '/images/luxcart/leather-handbag.png' },
  { id: 3, name: 'Solitaire Diamond Ring', price: 15299, category: 'Jewelry', image: '/images/luxcart/diamond-ring.png' },
  { id: 4, name: 'Emerald Diamond Bracelet', price: 24999, category: 'Jewelry', image: '/images/luxcart/emerald-bracelet.png' },
]

export default function EcommerceSite({ theme }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ecom-hero-text',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.ecom-product',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, delay: 0.3, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen" style={{ backgroundColor: theme.bg, color: theme.text }}>
      {/* Hero */}
      <section className="relative min-h-[80vh] pt-20 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${theme.accent}15, transparent 50%)`,
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p
            className="ecom-hero-text text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: theme.accent }}
          >
            New Collection 2024
          </p>
          <h1 className="ecom-hero-text text-5xl md:text-7xl font-serif font-light mb-6 tracking-tight">
            Timeless <span style={{ color: theme.accent }}>Luxury</span>
          </h1>
          <p className="ecom-hero-text text-lg mb-8" style={{ color: theme.muted }}>
            Discover our curated selection of premium accessories and apparel
          </p>
          <button
            className="ecom-hero-text px-10 py-4 text-sm tracking-widest uppercase transition-all duration-500 hover:scale-105"
            style={{ backgroundColor: theme.accent, color: theme.bg }}
          >
            Shop Collection
          </button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif">Featured Products</h2>
            <button className="text-sm tracking-widest uppercase flex items-center gap-2" style={{ color: theme.accent }}>
              View All <Icon icon="ph:arrow-right" className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="ecom-product group cursor-pointer"
              >
                <div
                  className="aspect-square rounded-lg mb-4 overflow-hidden transition-all duration-500 group-hover:scale-[1.02]"
                  style={{ backgroundColor: theme.surface }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: theme.muted }}>
                  {product.category}
                </p>
                <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                <p style={{ color: theme.accent }}>${product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6" style={{ backgroundColor: theme.surface }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-4">Join Our World</h2>
          <p className="mb-8" style={{ color: theme.muted }}>
            Subscribe for exclusive access to new arrivals, private sales, and luxury insights.
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-lg outline-none"
              style={{ backgroundColor: theme.elevated, color: theme.text, border: `1px solid ${theme.border}` }}
            />
            <button
              className="px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: theme.accent, color: theme.bg }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <DemoFooter theme={theme} />
    </div>
  )
}
