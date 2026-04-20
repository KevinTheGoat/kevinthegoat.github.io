'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import Footer from '../../components/Footer'

const pillars = [
  {
    number: '01',
    id: 'web',
    title: 'Websites & E-commerce',
    icon: 'ph:globe-bold',
    intro:
      'Custom-designed sites that load fast, rank well, and sell. From brochure sites to full storefronts. We ship the build, the copy, and the plumbing.',
    services: [
      'Custom website design & builds, responsive across desktop, tablet, mobile',
      'E-commerce development on Shopify, WooCommerce, and Magento',
      'CMS builds on WordPress, Sanity, and Payload',
      'Redesigns & modernization of existing sites',
      'SEO, performance, and accessibility tuning',
      'Hosting, domain setup, and ongoing maintenance packages',
    ],
    tools: [
      { name: 'Next.js', icon: 'logos:nextjs-icon' },
      { name: 'React', icon: 'logos:react' },
      { name: 'Shopify', icon: 'logos:shopify' },
      { name: 'WooCommerce', icon: 'logos:woocommerce-icon' },
      { name: 'WordPress', icon: 'logos:wordpress-icon' },
      { name: 'Sanity', icon: 'logos:sanity' },
      { name: 'Tailwind', icon: 'logos:tailwindcss-icon' },
      { name: 'Framer Motion', icon: 'logos:framer' },
    ],
  },
  {
    number: '02',
    id: 'apps',
    title: 'Apps & Integrations',
    icon: 'ph:squares-four-bold',
    intro:
      'Custom software that replaces spreadsheets, manual work, and disconnected tools. Web, mobile, or desktop, wired into the systems you already run.',
    services: [
      'Custom web applications in React, Next.js, and Angular',
      'Mobile apps for iOS, Android, React Native, Flutter, and Expo',
      'Desktop applications with Electron and Tauri',
      'Payment integrations with Stripe, PayPal, and Razorpay',
      'Accounting & ERP integrations: QuickBooks, Xero, NetSuite, SAP, Oracle',
      'Database design, data migrations, and custom pipelines',
      'Internal tools, admin dashboards, and custom CRMs',
    ],
    tools: [
      { name: 'React', icon: 'logos:react' },
      { name: 'React Native', icon: 'logos:react' },
      { name: 'Node.js', icon: 'logos:nodejs-icon' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'Stripe', icon: 'logos:stripe' },
      { name: 'PostgreSQL', icon: 'logos:postgresql' },
      { name: 'MongoDB', icon: 'logos:mongodb-icon' },
      { name: 'QuickBooks', icon: 'simple-icons:quickbooks' },
    ],
  },
  {
    number: '03',
    id: 'ai',
    title: 'AI & Automation',
    icon: 'ph:sparkle-bold',
    intro:
      'Intelligent features that actually move the needle. 24/7 customer assistants trained on your docs, automated workflows that replace repetitive work, and predictive insights on top of your data.',
    services: [
      'AI-powered chatbots & assistants for 24/7 customer support, trained on your docs',
      'RAG pipelines over your product catalog, PDFs, and internal wikis',
      'Business process automation for approvals, notifications, and cross-system sync',
      'E-commerce automation: inventory sync, dynamic ads, order fulfillment',
      'Browser automation for scraping, form submission, and data pipelines',
      'Predictive analytics and custom LLM integrations (Claude, GPT, open-source)',
    ],
    tools: [
      { name: 'Claude', icon: 'simple-icons:anthropic' },
      { name: 'OpenAI', icon: 'simple-icons:openai' },
      { name: 'Vercel AI SDK', icon: 'logos:vercel-icon' },
      { name: 'LangChain', icon: 'simple-icons:langchain' },
      { name: 'Zapier', icon: 'logos:zapier-icon' },
      { name: 'Python', icon: 'logos:python' },
    ],
  },
]

const industries = [
  { name: 'Auto Body & Automotive', icon: 'ph:car-bold', example: 'Stuttgart International Collision' },
  { name: 'Dental & Healthcare', icon: 'ph:heartbeat-bold', example: 'HIPAA-aware patient portals' },
  { name: 'E-commerce & Retail', icon: 'ph:shopping-bag-bold', example: 'Panda Depot (wholesale)' },
  { name: 'Trades & Home Services', icon: 'ph:wrench-bold', example: 'Titan Plumbing' },
  { name: 'Legal & Insurance', icon: 'ph:scales-bold', example: 'Accident Assist Network' },
  { name: 'Logistics & Freight', icon: 'ph:truck-bold', example: 'Monexus Logistics' },
  { name: 'HOA & Community', icon: 'ph:buildings-bold', example: 'Florida HOA-compliant portals' },
  { name: 'Construction & Contractors', icon: 'ph:hard-hat-bold', example: 'Bid systems & project portals' },
]

const process = [
  {
    step: 'Discover',
    description:
      'We start with a 30-minute call. No forms, no sales pitch. Just an honest conversation about what you need and whether we are the right fit.',
  },
  {
    step: 'Scope & Quote',
    description:
      'Within 48 hours you get a written scope, a timeline, and a fixed quote. No surprises, no hourly guesswork.',
  },
  {
    step: 'Design & Build',
    description:
      'Weekly check-ins with working builds you can click through. You stay in the loop the whole way. No black boxes.',
  },
  {
    step: 'Ship & Support',
    description:
      'We launch, measure, and stay on. Maintenance packages keep your site secure, fast, and current long after go-live.',
  },
]

export default function ServicesClient() {
  const { theme } = useTheme()
  const pageRef = useRef(null)
  const pillarsRevealRef = useScrollReveal()
  const industriesRevealRef = useScrollReveal()
  const processRevealRef = useScrollReveal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-header',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', force3D: true }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <div ref={pageRef} className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="services-header opacity-0 max-w-3xl mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Icon icon="ph:compass-bold" className="w-4 h-4" style={{ color: theme.accent }} />
              <span className="text-sm font-medium" style={{ color: theme.muted }}>
                What we do
              </span>
            </div>
            <h1 className="font-display font-bold text-display-lg mb-6 leading-[1.05]">
              One partner.{' '}
              <span className="gradient-text">Everything</span>
              <br />
              your business ships.
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: theme.muted }}>
              KevCo is your digital partner. We design, build, integrate, and maintain websites,
              apps, AI assistants, and the systems that wire them to the rest of your business.
            </p>
          </div>

          {/* Pillars */}
          <div ref={pillarsRevealRef} className="space-y-32 mb-32">
            {pillars.map((p, idx) => (
              <article
                key={p.id}
                data-animate
                data-animate-delay={`${idx * 0.05}s`}
                className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16"
              >
                {/* Left column: number, icon, title, intro */}
                <div className="lg:sticky lg:top-32 lg:self-start">
                  <div
                    className="font-display text-[5rem] lg:text-[7rem] leading-none font-bold mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${theme.accent}40, ${theme.accentAlt}10)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {p.number}
                  </div>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: `linear-gradient(135deg, ${theme.accent}25, ${theme.accentAlt}25)`,
                    }}
                  >
                    <Icon
                      icon={p.icon}
                      className="w-7 h-7"
                      style={{
                        background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    />
                  </div>
                  <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4 leading-tight">
                    {p.title}
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: theme.muted }}>
                    {p.intro}
                  </p>
                </div>

                {/* Right column: service list + tools */}
                <div>
                  <ul className="space-y-3 mb-10">
                    {p.services.map((s, i) => (
                      <li
                        key={i}
                        className="flex gap-3 pb-3 text-base leading-relaxed border-b"
                        style={{ borderColor: `${theme.border}80`, color: theme.text }}
                      >
                        <Icon
                          icon="ph:check-bold"
                          className="w-4 h-4 mt-1.5 flex-shrink-0"
                          style={{ color: theme.accent }}
                        />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <div
                      className="text-xs uppercase tracking-[0.2em] font-semibold mb-4"
                      style={{ color: theme.muted }}
                    >
                      Tools we trust
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.tools.map((t) => (
                        <span
                          key={t.name}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
                          style={{
                            backgroundColor: theme.elevated,
                            border: `1px solid ${theme.border}`,
                          }}
                        >
                          <Icon icon={t.icon} className="w-4 h-4" />
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Industries */}
          <section className="mb-32">
            <div className="max-w-3xl mb-12">
              <div
                className="text-xs uppercase tracking-[0.2em] font-semibold mb-3"
                style={{ color: theme.muted }}
              >
                Industries
              </div>
              <h2 className="font-display font-bold text-4xl lg:text-5xl mb-5 leading-tight">
                Built with your <span className="gradient-text">industry</span> in mind.
              </h2>
              <p className="text-lg" style={{ color: theme.muted }}>
                We come prepared for the quirks of each sector (compliance, workflows, customer expectations) so you're not paying us to learn your industry on the clock.
              </p>
            </div>

            <div
              ref={industriesRevealRef}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {industries.map((ind, idx) => (
                <div
                  key={ind.name}
                  data-animate
                  data-animate-delay={`${idx * 0.05}s`}
                  className="group p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: theme.surface,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <Icon
                    icon={ind.icon}
                    className="w-6 h-6 mb-3 transition-colors"
                    style={{ color: theme.accent }}
                  />
                  <div className="font-display font-semibold text-base mb-1.5 leading-snug">
                    {ind.name}
                  </div>
                  <div className="text-xs" style={{ color: theme.muted }}>
                    {ind.example}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="mb-32">
            <div className="max-w-3xl mb-12">
              <div
                className="text-xs uppercase tracking-[0.2em] font-semibold mb-3"
                style={{ color: theme.muted }}
              >
                How we work
              </div>
              <h2 className="font-display font-bold text-4xl lg:text-5xl mb-5 leading-tight">
                Fixed scope, fixed price, <span className="gradient-text">no surprises.</span>
              </h2>
            </div>

            <div ref={processRevealRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {process.map((p, idx) => (
                <div
                  key={p.step}
                  data-animate
                  data-animate-delay={`${idx * 0.08}s`}
                  className="relative p-6 rounded-2xl"
                  style={{
                    backgroundColor: theme.elevated,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <div
                    className="text-xs font-mono mb-3"
                    style={{ color: theme.accent }}
                  >
                    {String(idx + 1).padStart(2, '0')} /
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{p.step}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section
            className="p-10 lg:p-16 rounded-3xl text-center"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}15, ${theme.accentAlt}15)`,
              border: `1px solid ${theme.accent}33`,
            }}
          >
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-5 leading-tight">
              Not sure which pillar you need?
            </h2>
            <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: theme.muted }}>
              Most projects touch two or three. Tell us what you're building. We'll map it out and
              come back with a plan, timeline, and fixed quote in 48 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
                color: theme.bg,
              }}
            >
              <Icon icon="ph:paper-plane-tilt-bold" className="w-5 h-5" />
              Start a conversation
            </Link>
          </section>
        </div>
      </div>

      <Footer />
    </>
  )
}
