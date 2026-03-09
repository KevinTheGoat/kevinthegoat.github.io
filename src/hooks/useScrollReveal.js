import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const elements = container.querySelectorAll('[data-animate]')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      elements.forEach(el => el.classList.add('reveal-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Apply stagger delay based on data-animate-delay attribute
            const delay = entry.target.getAttribute('data-animate-delay')
            if (delay) {
              entry.target.style.transitionDelay = delay
            }
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}
