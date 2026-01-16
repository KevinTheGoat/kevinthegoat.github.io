import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useTheme } from '../../context/ThemeContext'

const weatherIcons = {
  Clear: 'ph:sun-bold',
  Clouds: 'ph:cloud-bold',
  Rain: 'ph:cloud-rain-bold',
  Snow: 'ph:snowflake-bold',
  Thunderstorm: 'ph:lightning-bold',
  Drizzle: 'ph:cloud-rain-bold',
  Mist: 'ph:cloud-fog-bold',
  Fog: 'ph:cloud-fog-bold',
}

// Demo data since we can't use real API without key
const demoWeather = {
  'New York': {
    temp: 72,
    feels_like: 75,
    humidity: 65,
    wind: 12,
    condition: 'Clear',
    description: 'Clear sky',
    forecast: [
      { day: 'Mon', high: 74, low: 62, condition: 'Clear' },
      { day: 'Tue', high: 71, low: 58, condition: 'Clouds' },
      { day: 'Wed', high: 68, low: 55, condition: 'Rain' },
      { day: 'Thu', high: 70, low: 57, condition: 'Clouds' },
      { day: 'Fri', high: 73, low: 60, condition: 'Clear' },
    ],
  },
  'Los Angeles': {
    temp: 85,
    feels_like: 88,
    humidity: 45,
    wind: 8,
    condition: 'Clear',
    description: 'Sunny',
    forecast: [
      { day: 'Mon', high: 86, low: 68, condition: 'Clear' },
      { day: 'Tue', high: 84, low: 66, condition: 'Clear' },
      { day: 'Wed', high: 82, low: 65, condition: 'Clouds' },
      { day: 'Thu', high: 83, low: 66, condition: 'Clear' },
      { day: 'Fri', high: 85, low: 67, condition: 'Clear' },
    ],
  },
  'London': {
    temp: 58,
    feels_like: 55,
    humidity: 78,
    wind: 15,
    condition: 'Clouds',
    description: 'Overcast clouds',
    forecast: [
      { day: 'Mon', high: 60, low: 52, condition: 'Clouds' },
      { day: 'Tue', high: 57, low: 50, condition: 'Rain' },
      { day: 'Wed', high: 55, low: 48, condition: 'Rain' },
      { day: 'Thu', high: 58, low: 51, condition: 'Clouds' },
      { day: 'Fri', high: 61, low: 53, condition: 'Clear' },
    ],
  },
  'Tokyo': {
    temp: 68,
    feels_like: 70,
    humidity: 70,
    wind: 10,
    condition: 'Clouds',
    description: 'Partly cloudy',
    forecast: [
      { day: 'Mon', high: 70, low: 62, condition: 'Clouds' },
      { day: 'Tue', high: 72, low: 63, condition: 'Clear' },
      { day: 'Wed', high: 69, low: 60, condition: 'Rain' },
      { day: 'Thu', high: 67, low: 58, condition: 'Rain' },
      { day: 'Fri', high: 71, low: 61, condition: 'Clouds' },
    ],
  },
}

export default function WeatherApp() {
  const { theme } = useTheme()
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchWeather = async (e) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError('')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    const cityKey = Object.keys(demoWeather).find(
      (k) => k.toLowerCase() === city.toLowerCase()
    )

    if (cityKey) {
      setWeather({ ...demoWeather[cityKey], city: cityKey })
    } else {
      setError('City not found. Try: New York, Los Angeles, London, or Tokyo')
    }
    setLoading(false)
  }

  const quickCities = Object.keys(demoWeather)

  return (
    <div className="max-w-xl mx-auto">
      {/* Search */}
      <form onSubmit={searchWeather} className="mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Icon
              icon="ph:magnifying-glass-bold"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: theme.muted }}
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search city..."
              className="w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: theme.elevated,
                color: theme.text,
                border: `1px solid ${theme.border}`,
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 disabled:opacity-50"
            style={{ backgroundColor: theme.accent, color: theme.bg }}
          >
            {loading ? <Icon icon="ph:spinner" className="w-5 h-5 animate-spin" /> : 'Search'}
          </button>
        </div>
      </form>

      {/* Quick Select */}
      <div className="flex flex-wrap gap-2 mb-6">
        {quickCities.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCity(c)
              setWeather({ ...demoWeather[c], city: c })
              setError('')
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: weather?.city === c ? theme.accent : theme.elevated,
              color: weather?.city === c ? theme.bg : theme.text,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {error && (
        <div
          className="p-4 rounded-xl mb-6 flex items-center gap-3"
          style={{ backgroundColor: '#ef444420', color: '#ef4444' }}
        >
          <Icon icon="ph:warning-bold" className="w-5 h-5" />
          {error}
        </div>
      )}

      {weather && (
        <div className="space-y-6">
          {/* Current Weather */}
          <div
            className="p-6 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}30, ${theme.accentAlt}30)`,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">{weather.city}</h3>
                <p className="capitalize" style={{ color: theme.muted }}>
                  {weather.description}
                </p>
              </div>
              <Icon
                icon={weatherIcons[weather.condition] || 'ph:cloud-bold'}
                className="w-16 h-16"
                style={{ color: theme.accent }}
              />
            </div>

            <div className="text-6xl font-bold mb-4">{weather.temp}°F</div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-xl" style={{ backgroundColor: theme.elevated }}>
                <Icon icon="ph:thermometer-bold" className="w-5 h-5 mx-auto mb-1" style={{ color: theme.accent }} />
                <div className="text-sm" style={{ color: theme.muted }}>Feels like</div>
                <div className="font-semibold">{weather.feels_like}°F</div>
              </div>
              <div className="text-center p-3 rounded-xl" style={{ backgroundColor: theme.elevated }}>
                <Icon icon="ph:drop-bold" className="w-5 h-5 mx-auto mb-1" style={{ color: theme.accent }} />
                <div className="text-sm" style={{ color: theme.muted }}>Humidity</div>
                <div className="font-semibold">{weather.humidity}%</div>
              </div>
              <div className="text-center p-3 rounded-xl" style={{ backgroundColor: theme.elevated }}>
                <Icon icon="ph:wind-bold" className="w-5 h-5 mx-auto mb-1" style={{ color: theme.accent }} />
                <div className="text-sm" style={{ color: theme.muted }}>Wind</div>
                <div className="font-semibold">{weather.wind} mph</div>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div>
            <h4 className="font-semibold mb-4">5-Day Forecast</h4>
            <div className="grid grid-cols-5 gap-3">
              {weather.forecast.map((day) => (
                <div
                  key={day.day}
                  className="p-4 rounded-xl text-center"
                  style={{ backgroundColor: theme.elevated }}
                >
                  <div className="font-medium mb-2">{day.day}</div>
                  <Icon
                    icon={weatherIcons[day.condition] || 'ph:cloud-bold'}
                    className="w-8 h-8 mx-auto mb-2"
                    style={{ color: theme.accent }}
                  />
                  <div className="text-sm">
                    <span className="font-semibold">{day.high}°</span>
                    <span style={{ color: theme.muted }}> / {day.low}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!weather && !error && (
        <div className="text-center py-12" style={{ color: theme.muted }}>
          <Icon icon="ph:cloud-sun-bold" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Search for a city or select one above to see weather</p>
        </div>
      )}
    </div>
  )
}
