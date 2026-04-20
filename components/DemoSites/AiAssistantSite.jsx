'use client'

import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import DemoFooter from '../DemoFooter'

const conversation = [
  {
    role: 'user',
    text: 'What time do you open on Saturdays?',
    time: '10:42 AM',
  },
  {
    role: 'assistant',
    text: "We're open 7am – 4pm on Saturdays at our Northstar Roastery on Main St. Our downtown bar opens a little later at 8am. Would you like directions to either location?",
    time: '10:42 AM',
  },
  {
    role: 'user',
    text: 'Do you do wholesale for cafes?',
    time: '10:43 AM',
  },
  {
    role: 'assistant',
    text: "Yes — we partner with cafés across the region for wholesale beans, espresso programs, and barista training. Minimums start at 12 lbs/week. I can hand you off to our wholesale lead, Maya, or send our wholesale deck — which would you prefer?",
    time: '10:43 AM',
    actions: ['Talk to Maya', 'Email me the deck'],
  },
]

const conversationList = [
  { name: 'Saturday hours + wholesale', time: 'now', active: true, unread: 0 },
  { name: 'Subscription pause request', time: '2h', active: false, unread: 0 },
  { name: 'Order #4821 — espresso beans', time: '5h', active: false, unread: 1 },
  { name: 'Catering for office event', time: 'yesterday', active: false, unread: 0 },
  { name: 'Gift card balance', time: '2d', active: false, unread: 0 },
]

const suggestedPrompts = [
  'What roasts do you recommend?',
  'Do you ship to Canada?',
  'Can I pause my subscription?',
]

const knowledgeStats = [
  { label: 'Documents indexed', value: '142' },
  { label: 'Avg. response time', value: '0.8s' },
  { label: 'Resolved without handoff', value: '87%' },
]

const STREAM_MESSAGE =
  "Yes — we partner with cafés across the region for wholesale beans, espresso programs, and barista training. Minimums start at 12 lbs/week. I can hand you off to our wholesale lead, Maya, or send our wholesale deck — which would you prefer?"

export default function AiAssistantSite({ theme }) {
  const containerRef = useRef(null)
  const [streamed, setStreamed] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ai-rail', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
      gsap.fromTo(
        '.ai-msg',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.1, delay: 0.15, ease: 'power3.out' }
      )
      gsap.fromTo('.ai-side', { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power3.out' })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    let i = 0
    let timeout
    const tick = () => {
      i += 1
      setStreamed(STREAM_MESSAGE.slice(0, i))
      if (i < STREAM_MESSAGE.length) {
        timeout = setTimeout(tick, 18 + Math.random() * 35)
      } else {
        timeout = setTimeout(() => {
          i = 0
          setStreamed('')
          timeout = setTimeout(tick, 600)
        }, 4500)
      }
    }
    timeout = setTimeout(tick, 800)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {/* Top header */}
      <header
        className="pt-24 pb-6 px-6 border-b"
        style={{ borderColor: theme.border, backgroundColor: theme.surface }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
              }}
            >
              <Icon icon="ph:sparkle-bold" className="w-6 h-6" style={{ color: theme.bg }} />
            </div>
            <div>
              <div className="font-bold text-lg leading-none">Lumen Assistant</div>
              <div className="text-xs mt-1" style={{ color: theme.muted }}>
                Northstar Coffee Roasters · Customer concierge
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${theme.accent}1a`,
              border: `1px solid ${theme.accent}40`,
              color: theme.accent,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: theme.accent }}
            />
            Powered by Claude · Live
          </div>
        </div>
      </header>

      {/* Main grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-6">
        {/* Left rail: conversations */}
        <aside
          className="ai-rail rounded-2xl p-4 hidden lg:block"
          style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
        >
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: theme.muted }}>
              Conversations
            </span>
            <Icon icon="ph:plus-bold" className="w-4 h-4" style={{ color: theme.accent }} />
          </div>
          <div className="space-y-1">
            {conversationList.map((c) => (
              <button
                key={c.name}
                className="w-full text-left px-3 py-2.5 rounded-xl transition-colors"
                style={{
                  backgroundColor: c.active ? `${theme.accent}18` : 'transparent',
                  border: c.active ? `1px solid ${theme.accent}33` : '1px solid transparent',
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span
                    className="text-sm font-medium truncate"
                    style={{ color: c.active ? theme.text : theme.muted }}
                  >
                    {c.name}
                  </span>
                  {c.unread > 0 && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: theme.accentAlt, color: theme.bg }}
                    >
                      {c.unread}
                    </span>
                  )}
                </div>
                <span className="text-[11px]" style={{ color: theme.muted }}>
                  {c.time}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Center: chat thread */}
        <section
          className="rounded-2xl flex flex-col overflow-hidden"
          style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
        >
          {/* Thread header */}
          <div
            className="px-6 py-4 border-b flex items-center justify-between"
            style={{ borderColor: theme.border }}
          >
            <div>
              <div className="font-semibold">Saturday hours + wholesale</div>
              <div className="text-xs" style={{ color: theme.muted }}>
                Visitor · Boise, ID · 4 messages
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: theme.muted, backgroundColor: theme.elevated }}
                aria-label="Search"
              >
                <Icon icon="ph:magnifying-glass-bold" className="w-4 h-4" />
              </button>
              <button
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: theme.muted, backgroundColor: theme.elevated }}
                aria-label="Options"
              >
                <Icon icon="ph:dots-three-vertical-bold" className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
            {conversation.map((m, idx) => {
              const isLast = idx === conversation.length - 1
              const isAssistant = m.role === 'assistant'
              return (
                <div
                  key={idx}
                  className={`ai-msg flex gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                    style={{
                      background: isAssistant
                        ? `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`
                        : theme.elevated,
                      color: isAssistant ? theme.bg : theme.muted,
                    }}
                  >
                    {isAssistant ? <Icon icon="ph:sparkle-bold" className="w-4 h-4" /> : 'YO'}
                  </div>
                  <div className={`max-w-[78%] ${isAssistant ? '' : 'items-end'} flex flex-col`}>
                    <div
                      className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                      style={{
                        backgroundColor: isAssistant ? theme.elevated : `${theme.accent}1f`,
                        border: isAssistant ? `1px solid ${theme.border}` : `1px solid ${theme.accent}33`,
                        borderTopLeftRadius: isAssistant ? 4 : undefined,
                        borderTopRightRadius: isAssistant ? undefined : 4,
                      }}
                    >
                      {isLast && isAssistant ? (
                        <>
                          {streamed}
                          {streamed.length < STREAM_MESSAGE.length && (
                            <span
                              className="inline-block w-1.5 h-4 align-middle ml-0.5 animate-pulse"
                              style={{ backgroundColor: theme.accent }}
                            />
                          )}
                        </>
                      ) : (
                        m.text
                      )}
                    </div>
                    {m.actions && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {m.actions.map((a) => (
                          <button
                            key={a}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                            style={{
                              backgroundColor: theme.elevated,
                              border: `1px solid ${theme.accent}55`,
                              color: theme.accent,
                            }}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    )}
                    <span
                      className={`text-[11px] mt-1.5 ${isAssistant ? '' : 'self-end'}`}
                      style={{ color: theme.muted }}
                    >
                      {m.time}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Suggested prompts */}
          <div className="px-6 pt-3 flex gap-2 flex-wrap" style={{ borderColor: theme.border }}>
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                className="text-xs px-3 py-1.5 rounded-full transition-colors"
                style={{
                  backgroundColor: theme.elevated,
                  border: `1px solid ${theme.border}`,
                  color: theme.muted,
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Composer */}
          <div className="p-4 border-t" style={{ borderColor: theme.border }}>
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{ backgroundColor: theme.elevated, border: `1px solid ${theme.border}` }}
            >
              <Icon icon="ph:paperclip-bold" className="w-5 h-5" style={{ color: theme.muted }} />
              <input
                type="text"
                placeholder="Ask Lumen anything…"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: theme.text }}
              />
              <button
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
                }}
                aria-label="Send"
              >
                <Icon icon="ph:paper-plane-tilt-bold" className="w-4 h-4" style={{ color: theme.bg }} />
              </button>
            </div>
          </div>
        </section>

        {/* Right side: knowledge & sources */}
        <aside className="ai-side space-y-4 hidden lg:block">
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="ph:books-bold" className="w-4 h-4" style={{ color: theme.accent }} />
              <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: theme.muted }}>
                Knowledge base
              </span>
            </div>
            <div className="space-y-3">
              {knowledgeStats.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between">
                  <span className="text-xs" style={{ color: theme.muted }}>
                    {s.label}
                  </span>
                  <span className="font-bold" style={{ color: theme.text }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Icon icon="ph:link-bold" className="w-4 h-4" style={{ color: theme.accent }} />
              <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: theme.muted }}>
                Sources cited
              </span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'wholesale-program.pdf', page: 'p. 2' },
                { name: 'Locations & hours', page: 'web' },
                { name: 'Barista training brief', page: 'p. 7' },
              ].map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg"
                  style={{ backgroundColor: theme.elevated }}
                >
                  <span className="text-xs truncate" style={{ color: theme.text }}>
                    {s.name}
                  </span>
                  <span className="text-[10px] font-mono" style={{ color: theme.muted }}>
                    {s.page}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl p-5"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}1a, ${theme.accentAlt}1a)`,
              border: `1px solid ${theme.accent}33`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="ph:lightning-bold" className="w-4 h-4" style={{ color: theme.accent }} />
              <span className="font-semibold text-sm">Want this on your site?</span>
            </div>
            <p className="text-xs mb-4 leading-relaxed" style={{ color: theme.muted }}>
              I build private chat assistants trained on your docs, orders, and product catalog. Plug it in this week.
            </p>
            <a
              href="mailto:kevinmoreau@kevco.co"
              className="inline-flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: theme.accent }}
            >
              Start a project
              <Icon icon="ph:arrow-right-bold" className="w-3 h-3" />
            </a>
          </div>
        </aside>
      </div>

      <DemoFooter theme={theme} />
    </div>
  )
}
