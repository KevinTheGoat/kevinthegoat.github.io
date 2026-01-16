import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useTheme } from '../../context/ThemeContext'

const harmonyTypes = [
  { id: 'random', name: 'Random', icon: 'ph:shuffle-bold' },
  { id: 'monochromatic', name: 'Monochromatic', icon: 'ph:circle-bold' },
  { id: 'analogous', name: 'Analogous', icon: 'ph:circles-three-bold' },
  { id: 'complementary', name: 'Complementary', icon: 'ph:arrows-out-line-horizontal-bold' },
  { id: 'triadic', name: 'Triadic', icon: 'ph:triangle-bold' },
  { id: 'tetradic', name: 'Tetradic', icon: 'ph:square-bold' },
]

function hslToHex(h, s, l) {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function generatePalette(harmonyType, baseHue = null) {
  const h = baseHue ?? Math.floor(Math.random() * 360)
  const s = 65 + Math.random() * 20
  const l = 50 + Math.random() * 15

  switch (harmonyType) {
    case 'monochromatic':
      return [
        { h, s: s - 20, l: l + 30 },
        { h, s: s - 10, l: l + 15 },
        { h, s, l },
        { h, s: s + 10, l: l - 15 },
        { h, s: s + 15, l: l - 25 },
      ].map((c) => hslToHex(c.h, Math.max(0, Math.min(100, c.s)), Math.max(10, Math.min(90, c.l))))

    case 'analogous':
      return [-30, -15, 0, 15, 30].map((offset) =>
        hslToHex((h + offset + 360) % 360, s, l)
      )

    case 'complementary':
      return [
        hslToHex(h, s, l + 20),
        hslToHex(h, s, l),
        hslToHex(h, s, l - 15),
        hslToHex((h + 180) % 360, s, l),
        hslToHex((h + 180) % 360, s, l - 15),
      ]

    case 'triadic':
      return [
        hslToHex(h, s, l),
        hslToHex(h, s - 15, l + 15),
        hslToHex((h + 120) % 360, s, l),
        hslToHex((h + 240) % 360, s, l),
        hslToHex((h + 240) % 360, s - 15, l + 15),
      ]

    case 'tetradic':
      return [
        hslToHex(h, s, l),
        hslToHex((h + 90) % 360, s, l),
        hslToHex((h + 180) % 360, s, l),
        hslToHex((h + 270) % 360, s, l),
        hslToHex(h, s - 20, l + 20),
      ]

    default: // random
      return Array(5)
        .fill(0)
        .map(() => hslToHex(Math.random() * 360, 50 + Math.random() * 40, 40 + Math.random() * 30))
  }
}

export default function ColorGenerator() {
  const { theme } = useTheme()
  const [colors, setColors] = useState(() => generatePalette('random'))
  const [harmonyType, setHarmonyType] = useState('random')
  const [lockedColors, setLockedColors] = useState([])
  const [copied, setCopied] = useState(null)

  const generateNew = () => {
    const newColors = generatePalette(harmonyType)
    setColors(
      colors.map((c, i) => (lockedColors.includes(i) ? c : newColors[i]))
    )
  }

  const toggleLock = (index) => {
    setLockedColors(
      lockedColors.includes(index)
        ? lockedColors.filter((i) => i !== index)
        : [...lockedColors, index]
    )
  }

  const copyColor = (color, index) => {
    navigator.clipboard.writeText(color.toUpperCase())
    setCopied(index)
    setTimeout(() => setCopied(null), 1500)
  }

  const copyAll = () => {
    const text = colors.map((c) => c.toUpperCase()).join(', ')
    navigator.clipboard.writeText(text)
    setCopied('all')
    setTimeout(() => setCopied(null), 1500)
  }

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && !e.target.closest('input, textarea')) {
        e.preventDefault()
        generateNew()
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [harmonyType, lockedColors, colors])

  return (
    <div>
      {/* Harmony Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {harmonyTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => {
              setHarmonyType(type.id)
              setColors(generatePalette(type.id))
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              backgroundColor: harmonyType === type.id ? theme.accent : theme.elevated,
              color: harmonyType === type.id ? theme.bg : theme.text,
            }}
          >
            <Icon icon={type.icon} className="w-4 h-4" />
            {type.name}
          </button>
        ))}
      </div>

      {/* Color Palette */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {colors.map((color, index) => (
          <div key={index} className="relative group">
            <div
              className="aspect-[3/4] rounded-2xl cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: color }}
              onClick={() => copyColor(color, index)}
            />

            {/* Lock button */}
            <button
              onClick={() => toggleLock(index)}
              className="absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: lockedColors.includes(index) ? theme.accent : 'white',
              }}
            >
              <Icon
                icon={lockedColors.includes(index) ? 'ph:lock-bold' : 'ph:lock-open-bold'}
                className="w-4 h-4"
              />
            </button>

            {/* Copy feedback */}
            {copied === index && (
              <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-black/50">
                <span className="text-white text-sm font-medium">Copied!</span>
              </div>
            )}

            {/* Color code */}
            <div
              className="mt-2 text-center text-sm font-mono"
              style={{ color: theme.muted }}
            >
              {color.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={generateNew}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
          style={{ backgroundColor: theme.accent, color: theme.bg }}
        >
          <Icon icon="ph:shuffle-bold" className="w-5 h-5" />
          Generate New
        </button>
        <button
          onClick={copyAll}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
          style={{ backgroundColor: theme.elevated, color: theme.text, border: `1px solid ${theme.border}` }}
        >
          <Icon icon="ph:copy-bold" className="w-5 h-5" />
          {copied === 'all' ? 'Copied!' : 'Copy All'}
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="mt-6 text-center">
        <span
          className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg"
          style={{ backgroundColor: theme.elevated, color: theme.muted }}
        >
          <Icon icon="ph:keyboard-bold" className="w-4 h-4" />
          Press <kbd className="px-2 py-0.5 rounded bg-black/20 font-mono">Space</kbd> to generate
        </span>
      </div>

      {/* CSS Export */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: theme.muted }}>
            CSS Variables
          </span>
          <button
            onClick={() => {
              const css = colors.map((c, i) => `--color-${i + 1}: ${c};`).join('\n')
              navigator.clipboard.writeText(`:root {\n  ${css}\n}`)
              setCopied('css')
              setTimeout(() => setCopied(null), 1500)
            }}
            className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{ backgroundColor: theme.elevated, color: theme.text }}
          >
            {copied === 'css' ? 'Copied!' : 'Copy CSS'}
          </button>
        </div>
        <pre
          className="p-4 rounded-xl text-sm font-mono overflow-x-auto"
          style={{ backgroundColor: theme.elevated, color: theme.muted }}
        >
          {`:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`}
        </pre>
      </div>
    </div>
  )
}
