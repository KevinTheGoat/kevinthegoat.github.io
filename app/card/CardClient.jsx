'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'

const BRAND = {
  bg: '#000000',
  surface: '#0a0a0a',
  accent: '#C5A059',
  accentAlt: '#DBC184',
  text: '#F5F5DC',
  muted: '#B8A480',
  border: '#3d3525',
}

const VCARD_STRING = `BEGIN:VCARD
VERSION:3.0
N:Moreau;Kevin;;;
FN:Kevin Moreau
ORG:KevCo
TITLE:Software Engineer / Architect
TEL;TYPE=CELL:+17865414691
EMAIL;TYPE=INTERNET:kevinmoreau@kevco.co
URL:https://kevco.co
END:VCARD`

const actions = [
  { icon: 'ph:phone-bold', href: 'tel:+17865414691', label: 'Call' },
  { icon: 'ph:envelope-bold', href: 'mailto:kevinmoreau@kevco.co', label: 'Email' },
  { icon: 'ph:globe-bold', href: 'https://kevco.co', label: 'Website' },
]

export default function CardClient() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const nameRef = useRef(null)
  const titleRef = useRef(null)
  const dividerRef = useRef(null)
  const saveRef = useRef(null)
  const actionsRef = useRef(null)
  const portfolioRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', force3D: true } })

      tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
        .fromTo(logoRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.2)
        .fromTo(nameRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 0.4)
        .fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 0.5)
        .fromTo(dividerRef.current, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.4 }, 0.6)
        .fromTo(saveRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 0.7)
        .fromTo(
          actionsRef.current?.children || [],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 },
          0.8
        )
        .fromTo(portfolioRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.0)
    })

    return () => ctx.revert()
  }, [mounted])

  // Auto-download attempt for Android
  useEffect(() => {
    const downloadTimer = setTimeout(() => {
      try {
        const blob = new Blob([VCARD_STRING], { type: 'text/vcard' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Kevin-Moreau.vcf'
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } catch {
        // iOS blocks programmatic downloads — silent fallback to button
      }
    }, 600)

    // Auto-redirect to portfolio after 4 seconds
    const redirectTimer = setTimeout(() => {
      router.push('/')
    }, 2000)

    return () => {
      clearTimeout(downloadTimer)
      clearTimeout(redirectTimer)
    }
  }, [])

  if (!mounted) return null

  const overlay = (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center opacity-0"
      style={{ backgroundColor: BRAND.bg, zIndex: 9999 }}
    >
      <div className="flex flex-col items-center px-6 w-full max-w-sm text-center">
        {/* Logo */}
        <img
          ref={logoRef}
          src="/images/kevco-logo4.svg"
          alt="KevCo"
          className="w-24 h-24 mb-6 opacity-0"
          style={{ filter: 'drop-shadow(0 0 12px rgba(197, 160, 89, 0.4))' }}
        />

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-3xl font-bold tracking-tight mb-1 opacity-0"
          style={{ color: BRAND.text, fontFamily: 'Syne, sans-serif' }}
        >
          Kevin Moreau
        </h1>

        {/* Title */}
        <p
          ref={titleRef}
          className="text-sm tracking-widest uppercase mb-6 opacity-0"
          style={{ color: BRAND.muted }}
        >
          Software Engineer / Architect
        </p>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="w-16 h-px mb-8 opacity-0"
          style={{ backgroundColor: BRAND.accent }}
        />

        {/* Save Contact Button */}
        <a
          ref={saveRef}
          href="/kevin-moreau.vcf"
          download="Kevin-Moreau.vcf"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mb-6 opacity-0"
          style={{
            backgroundColor: BRAND.accent,
            color: BRAND.bg,
          }}
        >
          <Icon icon="ph:download-simple-bold" width={18} />
          Save Contact
        </a>

        {/* Quick Actions */}
        <div ref={actionsRef} className="grid grid-cols-3 gap-3 w-full mb-10">
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 py-4 rounded-xl text-xs font-medium tracking-wide uppercase transition-all duration-200 hover:scale-[1.03]"
              style={{
                backgroundColor: BRAND.surface,
                color: BRAND.text,
                border: `1px solid ${BRAND.border}`,
              }}
            >
              <Icon icon={action.icon} width={22} style={{ color: BRAND.accent }} />
              {action.label}
            </a>
          ))}
        </div>

        {/* View Portfolio Link */}
        <button
          ref={portfolioRef}
          onClick={() => router.push('/')}
          className="text-sm tracking-wide transition-colors duration-200 opacity-0 bg-transparent border-none cursor-pointer"
          style={{ color: BRAND.muted }}
          onMouseEnter={(e) => (e.currentTarget.style.color = BRAND.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = BRAND.muted)}
        >
          View Portfolio &rarr;
        </button>
      </div>
    </div>
  )

  return createPortal(overlay, document.body)
}
