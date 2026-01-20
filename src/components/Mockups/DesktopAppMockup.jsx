import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'

const desktopApps = [
  {
    name: 'TaskFlow Pro',
    category: 'Project Management',
    theme: { bg: '#0f172a', surface: '#1e293b', accent: '#3b82f6', text: '#f8fafc', muted: '#94a3b8' },
  },
  {
    name: 'NoteSphere',
    category: 'Note-Taking & Knowledge',
    theme: { bg: '#18181b', surface: '#27272a', accent: '#a855f7', text: '#fafafa', muted: '#a1a1aa' },
  },
  {
    name: 'MediaStudio Pro',
    category: 'Video Editing',
    theme: { bg: '#0f0f0f', surface: '#1a1a1a', accent: '#10b981', text: '#fafafa', muted: '#737373' },
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
              {app.name === 'TaskFlow Pro' ? (
                <div className="flex h-96">
                  {/* Sidebar */}
                  <div className="w-56 p-4 border-r" style={{ borderColor: app.theme.surface }}>
                    <div className="text-xs font-medium mb-4" style={{ color: app.theme.text }}>Workspaces</div>
                    <div className="space-y-2">
                      {[
                        { icon: 'ph:briefcase-bold', name: 'Marketing Campaign', active: true },
                        { icon: 'ph:code-bold', name: 'Website Redesign', active: false },
                        { icon: 'ph:users-bold', name: 'Team Onboarding', active: false },
                      ].map((workspace) => (
                        <div
                          key={workspace.name}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer"
                          style={{
                            backgroundColor: workspace.active ? app.theme.accent + '20' : 'transparent',
                            color: workspace.active ? app.theme.accent : app.theme.muted,
                          }}
                        >
                          <Icon icon={workspace.icon} className="w-4 h-4" />
                          <span className="text-xs truncate">{workspace.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t" style={{ borderColor: app.theme.surface }}>
                      <div className="text-xs font-medium mb-3" style={{ color: app.theme.text }}>Team</div>
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((member) => (
                          <div
                            key={member}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-2"
                            style={{
                              backgroundColor: app.theme.accent,
                              color: app.theme.bg,
                              ringColor: app.theme.bg,
                            }}
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Board */}
                  <div className="flex-1 p-4 overflow-x-auto">
                    <div className="flex gap-4 h-full">
                      {['To Do', 'In Progress', 'Review', 'Done'].map((column, colIdx) => (
                        <div key={column} className="flex-shrink-0 w-56">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    colIdx === 0 ? '#94a3b8' : colIdx === 1 ? app.theme.accent : colIdx === 2 ? '#f59e0b' : '#22c55e',
                                }}
                              />
                              <span className="text-xs font-medium" style={{ color: app.theme.text }}>
                                {column}
                              </span>
                            </div>
                            <span className="text-xs" style={{ color: app.theme.muted }}>
                              {colIdx === 0 ? 5 : colIdx === 1 ? 3 : colIdx === 2 ? 2 : 8}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {(colIdx === 0 ? [1, 2] : colIdx === 1 ? [1] : colIdx === 2 ? [1] : [1, 2]).map((card) => (
                              <div
                                key={card}
                                className="p-3 rounded-lg cursor-pointer hover:brightness-110 transition-all"
                                style={{ backgroundColor: app.theme.surface }}
                              >
                                <div className="text-xs font-medium mb-2" style={{ color: app.theme.text }}>
                                  {colIdx === 0 && card === 1 && 'Design landing page'}
                                  {colIdx === 0 && card === 2 && 'User research'}
                                  {colIdx === 1 && 'Build API endpoints'}
                                  {colIdx === 2 && 'Code review session'}
                                  {colIdx === 3 && card === 1 && 'Set up database'}
                                  {colIdx === 3 && card === 2 && 'Write documentation'}
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex gap-1">
                                    <span
                                      className="text-xs px-2 py-0.5 rounded"
                                      style={{
                                        backgroundColor: app.theme.accent + '30',
                                        color: app.theme.accent,
                                      }}
                                    >
                                      High
                                    </span>
                                  </div>
                                  <Icon icon="ph:clock-bold" className="w-3 h-3" style={{ color: app.theme.muted }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : app.name === 'NoteSphere' ? (
                <div className="flex h-96">
                  {/* Notebook Sidebar */}
                  <div className="w-56 p-4 border-r" style={{ borderColor: app.theme.surface }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium" style={{ color: app.theme.text }}>Notebooks</span>
                      <Icon icon="ph:plus-bold" className="w-4 h-4 cursor-pointer" style={{ color: app.theme.accent }} />
                    </div>
                    <div className="space-y-1">
                      {[
                        { icon: 'ph:note-bold', name: 'Personal Notes', count: 24, active: false },
                        { icon: 'ph:briefcase-bold', name: 'Work', count: 18, active: true },
                        { icon: 'ph:book-bold', name: 'Learning', count: 31, active: false },
                        { icon: 'ph:star-bold', name: 'Favorites', count: 12, active: false },
                      ].map((notebook) => (
                        <div
                          key={notebook.name}
                          className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer"
                          style={{
                            backgroundColor: notebook.active ? app.theme.accent + '20' : 'transparent',
                            color: notebook.active ? app.theme.accent : app.theme.text,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Icon icon={notebook.icon} className="w-4 h-4" />
                            <span className="text-xs">{notebook.name}</span>
                          </div>
                          <span className="text-xs" style={{ color: app.theme.muted }}>{notebook.count}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t" style={{ borderColor: app.theme.surface }}>
                      <div className="text-xs font-medium mb-3" style={{ color: app.theme.text }}>Tags</div>
                      <div className="flex flex-wrap gap-1">
                        {['Ideas', 'Todo', 'Important'].map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: app.theme.surface,
                              color: app.theme.muted,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Notes List */}
                  <div className="w-64 border-r" style={{ borderColor: app.theme.surface }}>
                    <div className="p-4 border-b" style={{ borderColor: app.theme.surface }}>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: app.theme.surface }}>
                        <Icon icon="ph:magnifying-glass-bold" className="w-4 h-4" style={{ color: app.theme.muted }} />
                        <input
                          type="text"
                          placeholder="Search notes..."
                          className="flex-1 bg-transparent text-xs outline-none"
                          style={{ color: app.theme.text }}
                        />
                      </div>
                    </div>
                    <div className="overflow-y-auto">
                      {[
                        { title: 'Project Requirements', preview: 'List of features needed for the new dashboard...', time: '2h ago', active: true },
                        { title: 'Meeting Notes', preview: 'Discussed Q4 roadmap and team goals...', time: '5h ago', active: false },
                        { title: 'Design Ideas', preview: 'Exploring new color schemes and typography...', time: '1d ago', active: false },
                      ].map((note) => (
                        <div
                          key={note.title}
                          className="p-4 border-b cursor-pointer hover:bg-white/5 transition-colors"
                          style={{
                            borderColor: app.theme.surface,
                            backgroundColor: note.active ? app.theme.surface : 'transparent',
                          }}
                        >
                          <div className="font-medium text-sm mb-1" style={{ color: app.theme.text }}>{note.title}</div>
                          <div className="text-xs mb-2 line-clamp-2" style={{ color: app.theme.muted }}>{note.preview}</div>
                          <div className="text-xs" style={{ color: app.theme.muted }}>{note.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Editor */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 p-4 border-b" style={{ borderColor: app.theme.surface }}>
                      {['ph:text-bolder', 'ph:text-italic', 'ph:text-underline', 'ph:list-bullets', 'ph:list-numbers', 'ph:code'].map((icon) => (
                        <button
                          key={icon}
                          className="w-8 h-8 rounded flex items-center justify-center hover:bg-white/5 transition-colors"
                        >
                          <Icon icon={icon} className="w-4 h-4" style={{ color: app.theme.muted }} />
                        </button>
                      ))}
                    </div>
                    <div className="flex-1 p-6">
                      <h2 className="text-xl font-bold mb-4" style={{ color: app.theme.text }}>Project Requirements</h2>
                      <div className="space-y-3 text-sm" style={{ color: app.theme.text }}>
                        <p style={{ color: app.theme.muted }}>Last edited 2 hours ago</p>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Icon icon="ph:check-square-bold" className="w-5 h-5 mt-0.5" style={{ color: app.theme.accent }} />
                            <span>User authentication system</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Icon icon="ph:square-bold" className="w-5 h-5 mt-0.5" style={{ color: app.theme.muted }} />
                            <span>Dashboard analytics</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Icon icon="ph:square-bold" className="w-5 h-5 mt-0.5" style={{ color: app.theme.muted }} />
                            <span>Real-time notifications</span>
                          </div>
                        </div>
                      </div>
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
