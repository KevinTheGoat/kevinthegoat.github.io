import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

export default function ApiDemo() {
  const { currentTheme } = useTheme()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [apiType, setApiType] = useState('joke')

  const apis = {
    joke: {
      name: 'Random Joke',
      url: 'https://official-joke-api.appspot.com/random_joke',
      render: (data) => (
        <div className="text-center">
          <p className="text-xl mb-4">{data.setup}</p>
          <p className="text-2xl font-bold" style={{ color: currentTheme.accent }}>
            {data.punchline}
          </p>
        </div>
      ),
    },
    quote: {
      name: 'Random Quote',
      url: 'https://api.quotable.io/random',
      render: (data) => (
        <div className="text-center">
          <p className="text-xl italic mb-4">"{data.content}"</p>
          <p className="font-semibold" style={{ color: currentTheme.accent }}>
            — {data.author}
          </p>
        </div>
      ),
    },
    activity: {
      name: 'Random Activity',
      url: 'https://www.boredapi.com/api/activity/',
      render: (data) => (
        <div className="text-center">
          <p className="text-xl mb-4">{data.activity}</p>
          <div className="flex justify-center gap-4 text-sm" style={{ color: currentTheme.muted }}>
            <span>Type: {data.type}</span>
            <span>Participants: {data.participants}</span>
          </div>
        </div>
      ),
    },
  }

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const response = await fetch(apis[apiType].url)
      if (!response.ok) throw new Error('API request failed')
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p className="text-center mb-6" style={{ color: currentTheme.muted }}>
        Demonstrating API integration with different public endpoints
      </p>

      {/* API selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {Object.entries(apis).map(([key, api]) => (
          <button
            key={key}
            onClick={() => {
              setApiType(key)
              setData(null)
            }}
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
            style={{
              backgroundColor: apiType === key ? currentTheme.accent : currentTheme.surface,
              color: apiType === key ? currentTheme.bg : currentTheme.text,
              border: `1px solid ${currentTheme.accent}44`,
            }}
          >
            {api.name}
          </button>
        ))}
      </div>

      {/* Fetch button */}
      <div className="text-center mb-6">
        <button
          onClick={fetchData}
          disabled={loading}
          className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
          style={{
            backgroundColor: currentTheme.accent,
            color: currentTheme.bg,
          }}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Fetching...
            </span>
          ) : (
            '🔌 Fetch Data'
          )}
        </button>
      </div>

      {/* Results */}
      <div
        className="min-h-[150px] p-6 rounded-xl flex items-center justify-center"
        style={{
          backgroundColor: currentTheme.surface,
          border: `1px solid ${currentTheme.accent}22`,
        }}
      >
        {error && (
          <p className="text-red-500">Error: {error}</p>
        )}
        {data && apis[apiType].render(data)}
        {!data && !error && !loading && (
          <p style={{ color: currentTheme.muted }}>
            Click the button above to fetch data from the API
          </p>
        )}
      </div>

      {/* Code preview */}
      <div className="mt-4 p-4 rounded-lg font-mono text-sm overflow-x-auto" style={{ backgroundColor: currentTheme.surface }}>
        <code style={{ color: currentTheme.muted }}>
          fetch('{apis[apiType].url}')
        </code>
      </div>
    </div>
  )
}
