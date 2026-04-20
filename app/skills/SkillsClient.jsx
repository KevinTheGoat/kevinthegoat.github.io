'use client'

import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import Footer from '../../components/Footer'

const toolkit = [
  {
    title: 'Languages & Core',
    icon: 'ph:code-bold',
    description: 'The day-to-day languages and runtimes we reach for.',
    tools: [
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'JavaScript', icon: 'logos:javascript' },
      { name: 'Python', icon: 'logos:python' },
      { name: 'Swift', icon: 'logos:swift' },
      { name: 'Kotlin', icon: 'logos:kotlin-icon' },
      { name: 'Node.js', icon: 'logos:nodejs-icon' },
      { name: 'HTML5', icon: 'logos:html-5' },
      { name: 'CSS3', icon: 'logos:css-3' },
    ],
  },
  {
    title: 'Frontend & Web',
    icon: 'ph:browser-bold',
    description: 'Modern, responsive interfaces across the web stack.',
    tools: [
      { name: 'React', icon: 'logos:react' },
      { name: 'Next.js', icon: 'logos:nextjs-icon' },
      { name: 'Vue', icon: 'logos:vue' },
      { name: 'Angular', icon: 'logos:angular-icon' },
      { name: 'Tailwind', icon: 'logos:tailwindcss-icon' },
      { name: 'GSAP', icon: 'logos:greensock-icon' },
      { name: 'Framer Motion', icon: 'logos:framer' },
      { name: 'Vite', icon: 'logos:vitejs' },
    ],
  },
  {
    title: 'Mobile & Desktop',
    icon: 'ph:device-mobile-bold',
    description: 'Cross-platform and native apps users actually open.',
    tools: [
      { name: 'React Native', icon: 'logos:react' },
      { name: 'Expo', icon: 'logos:expo-icon' },
      { name: 'Flutter', icon: 'logos:flutter' },
      { name: 'iOS', icon: 'logos:swift' },
      { name: 'Android', icon: 'logos:kotlin-icon' },
      { name: 'Electron', icon: 'logos:electron' },
      { name: 'Tauri', icon: 'logos:tauri' },
    ],
  },
  {
    title: 'E-commerce & CMS',
    icon: 'ph:shopping-cart-bold',
    description: 'Storefronts and content systems we build on and migrate from.',
    tools: [
      { name: 'Shopify', icon: 'logos:shopify' },
      { name: 'WooCommerce', icon: 'logos:woocommerce-icon' },
      { name: 'Magento', icon: 'logos:magento' },
      { name: 'WordPress', icon: 'logos:wordpress-icon' },
      { name: 'Sanity', icon: 'logos:sanity' },
      { name: 'Payload', icon: 'simple-icons:payloadcms' },
    ],
  },
  {
    title: 'Backend, Data & APIs',
    icon: 'ph:database-bold',
    description: 'Scalable services, databases, and the wiring between them.',
    tools: [
      { name: 'Node.js', icon: 'logos:nodejs-icon' },
      { name: 'Express', icon: 'simple-icons:express' },
      { name: 'PostgreSQL', icon: 'logos:postgresql' },
      { name: 'MongoDB', icon: 'logos:mongodb-icon' },
      { name: 'MySQL', icon: 'logos:mysql-icon' },
      { name: 'Redis', icon: 'logos:redis' },
      { name: 'GraphQL', icon: 'logos:graphql' },
      { name: 'REST APIs', icon: 'ph:plugs-connected-bold' },
    ],
  },
  {
    title: 'Integrations',
    icon: 'ph:plug-bold',
    description: 'The third-party systems we plug your product into.',
    tools: [
      { name: 'Stripe', icon: 'logos:stripe' },
      { name: 'PayPal', icon: 'logos:paypal' },
      { name: 'Razorpay', icon: 'simple-icons:razorpay' },
      { name: 'QuickBooks', icon: 'simple-icons:quickbooks' },
      { name: 'Xero', icon: 'simple-icons:xero' },
      { name: 'HubSpot', icon: 'logos:hubspot-icon' },
      { name: 'Zapier', icon: 'logos:zapier-icon' },
      { name: 'Twilio', icon: 'logos:twilio-icon' },
    ],
  },
  {
    title: 'AI & Automation',
    icon: 'ph:sparkle-bold',
    description: 'LLMs, RAG, and automation to replace manual work.',
    tools: [
      { name: 'Claude (Anthropic)', icon: 'simple-icons:anthropic' },
      { name: 'OpenAI', icon: 'simple-icons:openai' },
      { name: 'Vercel AI SDK', icon: 'logos:vercel-icon' },
      { name: 'LangChain', icon: 'simple-icons:langchain' },
      { name: 'pgvector / Pinecone', icon: 'ph:database-bold' },
      { name: 'Zapier', icon: 'logos:zapier-icon' },
      { name: 'Power Automate', icon: 'logos:microsoft-icon' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'ph:cloud-bold',
    description: 'Where we deploy and how we keep things running.',
    tools: [
      { name: 'AWS', icon: 'logos:aws' },
      { name: 'Google Cloud', icon: 'logos:google-cloud' },
      { name: 'Azure', icon: 'logos:microsoft-azure' },
      { name: 'Vercel', icon: 'logos:vercel-icon' },
      { name: 'Cloudflare', icon: 'logos:cloudflare' },
      { name: 'Docker', icon: 'logos:docker-icon' },
      { name: 'GitHub Actions', icon: 'logos:github-actions' },
      { name: 'Git', icon: 'logos:git-icon' },
    ],
  },
  {
    title: 'Design & UI',
    icon: 'ph:paint-brush-bold',
    description: 'Taste and process behind every interface we ship.',
    tools: [
      { name: 'Figma', icon: 'logos:figma' },
      { name: 'Adobe XD', icon: 'logos:adobe-xd' },
      { name: 'Photoshop', icon: 'logos:adobe-photoshop' },
      { name: 'Illustrator', icon: 'logos:adobe-illustrator' },
      { name: 'Lottie / Motion', icon: 'ph:film-strip-bold' },
    ],
  },
]

export default function SkillsClient() {
  const { theme } = useTheme()
  const pageRef = useRef(null)
  const cardsRevealRef = useScrollReveal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-header',
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
          <div className="skills-header opacity-0 max-w-3xl mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Icon icon="ph:toolbox-bold" className="w-4 h-4" style={{ color: theme.accent }} />
              <span className="text-sm font-medium" style={{ color: theme.muted }}>
                Our toolkit
              </span>
            </div>
            <h1 className="font-display font-bold text-display-lg mb-6 leading-[1.05]">
              The full stack <br />
              <span className="gradient-text">we build with.</span>
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: theme.muted }}>
              Every job has the right tool. Here's the full shelf, grouped by what it solves.
              We pick the best fit for your project, not the flavor of the month.
            </p>
          </div>

          {/* Toolkit Grid */}
          <div ref={cardsRevealRef} className="grid md:grid-cols-2 gap-6">
            {toolkit.map((category, idx) => (
              <div
                key={category.title}
                data-animate
                data-animate-delay={`${idx * 0.06}s`}
                className="p-7 rounded-3xl"
                style={{
                  backgroundColor: theme.surface,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${theme.accent}25, ${theme.accentAlt}25)`,
                    }}
                  >
                    <Icon
                      icon={category.icon}
                      className="w-6 h-6"
                      style={{
                        background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-xl mb-1 leading-tight">
                      {category.title}
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool) => (
                    <span
                      key={tool.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                      style={{
                        backgroundColor: theme.elevated,
                        border: `1px solid ${theme.border}`,
                      }}
                    >
                      <Icon icon={tool.icon} className="w-4 h-4" />
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className="mt-20 p-12 rounded-3xl text-center"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}15, ${theme.accentAlt}15)`,
              border: `1px solid ${theme.accent}33`,
            }}
          >
            <h3 className="font-display font-bold text-display-sm mb-4">
              Don't see your stack?
            </h3>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: theme.muted }}>
              We adapt. Tell us what you're running and we'll tell you honestly whether we're the right fit.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
                color: theme.bg,
              }}
            >
              Get in Touch
              <Icon icon="ph:arrow-right-bold" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
