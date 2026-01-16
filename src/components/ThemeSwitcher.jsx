import { useTheme, themes } from '../context/ThemeContext'

export default function ThemeSwitcher() {
  const { theme, setTheme, currentTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm opacity-60 hidden sm:inline">Theme:</span>
      <div className="flex gap-1 p-1 rounded-lg glass">
        {Object.entries(themes).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            className={`w-8 h-8 rounded-md transition-all duration-300 flex items-center justify-center ${
              theme === key
                ? 'ring-2 ring-offset-2 ring-offset-transparent scale-110'
                : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              backgroundColor: value.accent,
              ringColor: value.accent,
            }}
            title={value.name}
          >
            {theme === key && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
