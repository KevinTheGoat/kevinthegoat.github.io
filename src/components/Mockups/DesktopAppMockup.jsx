import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'

const desktopApps = [
  {
    name: 'CodeForge IDE',
    category: 'Development',
    theme: { bg: '#1e1e2e', surface: '#313244', accent: '#89b4fa', text: '#cdd6f4', muted: '#6c7086' },
  },
  {
    name: 'MediaStudio Pro',
    category: 'Video Editing',
    theme: { bg: '#0f0f0f', surface: '#1a1a1a', accent: '#a855f7', text: '#fafafa', muted: '#737373' },
  },
]

export default function DesktopAppMockup({ theme }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.desktop-window',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.3, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef}>
      <div className="text-center mb-12">
        <h3 className="text-2xl font-display font-bold mb-3">Desktop Applications</h3>
        <p style={{ color: theme.muted }}>
          Powerful cross-platform desktop apps built with Electron and native technologies
        </p>
      </div>

      <div className="space-y-12">
        {desktopApps.map((app, i) => (
          <div key={app.name} className="desktop-window group">
            {/* Window Frame */}
            <div
              className="rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              style={{
                backgroundColor: app.theme.bg,
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              }}
            >
              {/* Title Bar */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ backgroundColor: app.theme.surface }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="ml-4 text-sm font-medium" style={{ color: app.theme.text }}>{app.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Icon icon="ph:magnifying-glass" className="w-4 h-4" style={{ color: app.theme.muted }} />
                  <Icon icon="ph:gear" className="w-4 h-4" style={{ color: app.theme.muted }} />
                </div>
              </div>

              {/* App Content */}
              {app.name === 'CodeForge IDE' ? (
                <div className="flex h-96">
                  {/* Sidebar */}
                  <div className="w-56 p-4 border-r" style={{ borderColor: app.theme.surface }}>
                    <div className="flex items-center gap-2 mb-4">
                      <Icon icon="ph:folder-bold" className="w-4 h-4" style={{ color: app.theme.accent }} />
                      <span className="text-sm font-medium" style={{ color: app.theme.text }}>Project Files</span>
                    </div>
                    <div className="space-y-1 pl-2">
                      {['src/', '├── components/', '│   ├── App.jsx', '│   └── Header.jsx', '├── styles/', '│   └── main.css', '└── index.js'].map((file, idx) => (
                        <div
                          key={idx}
                          className="text-xs font-mono py-1 px-2 rounded"
                          style={{
                            color: file.includes('.jsx') ? app.theme.accent : app.theme.muted,
                            backgroundColor: idx === 2 ? app.theme.accent + '20' : 'transparent',
                          }}
                        >
                          {file}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Editor */}
                  <div className="flex-1 p-4">
                    <div className="flex items-center gap-4 mb-4">
                      {['App.jsx', 'Header.jsx', 'styles.css'].map((tab, idx) => (
                        <span
                          key={tab}
                          className="text-xs px-3 py-1 rounded"
                          style={{
                            backgroundColor: idx === 0 ? app.theme.surface : 'transparent',
                            color: idx === 0 ? app.theme.text : app.theme.muted,
                          }}
                        >
                          {tab}
                        </span>
                      ))}
                    </div>
                    <div className="font-mono text-xs space-y-1">
                      {[
                        { num: 1, code: 'import React from "react"', color: app.theme.accent },
                        { num: 2, code: 'import { Header } from "./Header"', color: app.theme.accent },
                        { num: 3, code: '', color: app.theme.muted },
                        { num: 4, code: 'export default function App() {', color: '#f472b6' },
                        { num: 5, code: '  return (', color: app.theme.text },
                        { num: 6, code: '    <div className="app">', color: '#22d3ee' },
                        { num: 7, code: '      <Header />', color: '#22d3ee' },
                        { num: 8, code: '      <main>Hello World</main>', color: '#22d3ee' },
                        { num: 9, code: '    </div>', color: '#22d3ee' },
                        { num: 10, code: '  )', color: app.theme.text },
                        { num: 11, code: '}', color: '#f472b6' },
                      ].map((line) => (
                        <div key={line.num} className="flex">
                          <span className="w-8 text-right mr-4" style={{ color: app.theme.muted }}>{line.num}</span>
                          <span style={{ color: line.color }}>{line.code}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Panel */}
                  <div className="w-48 p-4 border-l" style={{ borderColor: app.theme.surface }}>
                    <div className="text-xs font-medium mb-3" style={{ color: app.theme.text }}>Terminal</div>
                    <div className="font-mono text-xs space-y-1" style={{ color: app.theme.muted }}>
                      <div>{'>'} npm run dev</div>
                      <div style={{ color: '#22c55e' }}>✓ Ready in 234ms</div>
                      <div>Local: http://localhost:3000</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-96">
                  {/* Media Library Sidebar */}
                  <div className="w-48 p-4 border-r" style={{ borderColor: app.theme.surface }}>
                    <div className="text-xs font-medium mb-4" style={{ color: app.theme.text }}>Media Library</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                          key={item}
                          className="aspect-video rounded flex items-center justify-center"
                          style={{ backgroundColor: app.theme.surface }}
                        >
                          <Icon icon="ph:film-strip-bold" className="w-6 h-6" style={{ color: app.theme.muted }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: '#000' }}>
                      <div className="text-center">
                        <Icon icon="ph:play-circle-bold" className="w-16 h-16 mx-auto mb-2" style={{ color: app.theme.accent }} />
                        <span className="text-sm" style={{ color: app.theme.muted }}>Preview Window</span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="p-4" style={{ backgroundColor: app.theme.surface }}>
                      <div className="flex items-center gap-4 mb-3">
                        <Icon icon="ph:skip-back-bold" className="w-4 h-4" style={{ color: app.theme.muted }} />
                        <Icon icon="ph:play-bold" className="w-5 h-5" style={{ color: app.theme.accent }} />
                        <Icon icon="ph:skip-forward-bold" className="w-4 h-4" style={{ color: app.theme.muted }} />
                        <span className="text-xs font-mono" style={{ color: app.theme.muted }}>00:32:15 / 02:15:00</span>
                      </div>
                      <div className="space-y-2">
                        {['Video Track 1', 'Video Track 2', 'Audio Track'].map((track, idx) => (
                          <div key={track} className="flex items-center gap-3">
                            <span className="text-xs w-24 truncate" style={{ color: app.theme.muted }}>{track}</span>
                            <div className="flex-1 h-6 rounded" style={{ backgroundColor: app.theme.bg }}>
                              <div
                                className="h-full rounded"
                                style={{
                                  width: idx === 0 ? '80%' : idx === 1 ? '60%' : '100%',
                                  backgroundColor: idx === 2 ? '#22c55e' : app.theme.accent,
                                  opacity: 0.7,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tools */}
                  <div className="w-16 py-4 flex flex-col items-center gap-3 border-l" style={{ borderColor: app.theme.surface }}>
                    {['ph:selection-bold', 'ph:scissors-bold', 'ph:text-t-bold', 'ph:waveform-bold', 'ph:magic-wand-bold'].map((icon) => (
                      <button
                        key={icon}
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-white/5"
                      >
                        <Icon icon={icon} className="w-5 h-5" style={{ color: app.theme.muted }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* App Info */}
            <div className="flex items-center justify-between mt-6 px-4">
              <div>
                <h4 className="font-semibold text-lg">{app.name}</h4>
                <p className="text-sm" style={{ color: theme.muted }}>{app.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="ph:apple-logo-bold" className="w-5 h-5" style={{ color: theme.muted }} />
                <Icon icon="ph:windows-logo-bold" className="w-5 h-5" style={{ color: theme.muted }} />
                <Icon icon="ph:linux-logo-bold" className="w-5 h-5" style={{ color: theme.muted }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
