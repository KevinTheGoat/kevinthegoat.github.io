import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
  style = {},
}) {
  const counterRef = useRef(null)
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Check if value is a special format like "24/7" that shouldn't be animated
  const isSpecialFormat = value.includes('/') || !/^\d+[+%]?$/.test(value.replace(/\s/g, ''))

  // Extract numeric value from string like "8+" or "100%"
  const numericValue = isSpecialFormat ? 0 : (parseInt(value.replace(/[^0-9]/g, ''), 10) || 0)
  const originalSuffix = isSpecialFormat ? '' : (value.replace(/[0-9]/g, '') || suffix)

  useEffect(() => {
    const element = counterRef.current
    if (!element || hasAnimated || isSpecialFormat) return

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated) return
        setHasAnimated(true)

        const obj = { val: 0 }
        gsap.to(obj, {
          val: numericValue,
          duration: duration,
          ease: 'power2.out',
          onUpdate: () => {
            setDisplayValue(Math.floor(obj.val))
          },
        })
      },
    })

    return () => trigger.kill()
  }, [numericValue, duration, hasAnimated, isSpecialFormat])

  // For special formats, just display the value as-is
  if (isSpecialFormat) {
    return (
      <span ref={counterRef} className={className} style={style}>
        {prefix}{value}{suffix}
      </span>
    )
  }

  return (
    <span ref={counterRef} className={className} style={style}>
      {prefix}
      {displayValue}
      {originalSuffix}
    </span>
  )
}
