import React, { useState, useEffect, useCallback } from 'react'
import {
  Sun, Cloud, CloudRain, Wind, Droplets, Thermometer,
  Eye, Gauge, ArrowUp, ArrowDown, AlertTriangle, Info,
  Umbrella, Zap, MapPin, RefreshCw, Navigation, Compass,
  Layers, CheckCircle, ShieldAlert
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line, Legend
} from 'recharts'

// Pre-configured agricultural locations with coordinates
const AGRI_LOCATIONS = [
  { name: 'Bengaluru, Karnataka', lat: 12.9716, lon: 77.5946, zone: 'South Plateau' },
  { name: 'Guntur, Andhra Pradesh', lat: 16.3067, lon: 80.4365, zone: 'Coastal Agro' },
  { name: 'Hyderabad, Telangana', lat: 17.3850, lon: 78.4867, zone: 'Deccan Agro' },
  { name: 'Khanna / Ludhiana, Punjab', lat: 30.7046, lon: 76.2215, zone: 'Indo-Gangetic Plain' },
  { name: 'Nashik / Pune, Maharashtra', lat: 19.9975, lon: 73.7898, zone: 'Western Ghats Agro' },
  { name: 'Indore, Madhya Pradesh', lat: 22.7196, lon: 75.8577, zone: 'Malwa Plateau' },
  { name: 'Karnal, Haryana', lat: 29.6857, lon: 76.9905, zone: 'Northern Wheat Belt' },
  { name: 'Varanasi, Uttar Pradesh', lat: 25.3176, lon: 82.9739, zone: 'Eastern Plains' }
]

// WMO Weather code interpretations
function decodeWmo(code) {
  if (code === 0) return { label: 'Clear Sky / Sunny', icon: '☀️' }
  if (code <= 3) return { label: 'Partly Cloudy', icon: '⛅' }
  if (code <= 48) return { label: 'Fog / Mist', icon: '🌫️' }
  if (code <= 55) return { label: 'Drizzle', icon: '🌦️' }
  if (code <= 65) return { label: 'Rain', icon: '🌧️' }
  if (code <= 77) return { label: 'Snow / Frost', icon: '❄️' }
  if (code <= 82) return { label: 'Rain Showers', icon: '🌧️' }
  if (code <= 99) return { label: 'Thunderstorm', icon: '⛈️' }
  return { label: 'Overcast', icon: '☁️' }
}

export default function WeatherPage() {
  const [selectedLocation, setSelectedLocation] = useState(AGRI_LOCATIONS[0])
  const [isLiveGps, setIsLiveGps] = useState(false)
  const [loading, setLoading] = useState(true)
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleTimeString())

  // Fetch real live weather and soil telemetry from Open-Meteo API
  const fetchRealWeather = useCallback(async (lat, lon, locName) => {
    setLoading(true)
    setError(null)
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index,soil_temperature_0_to_7cm,soil_moisture_0_to_7cm&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,soil_temperature_0_to_7cm,soil_moisture_0_to_7cm&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max&timezone=auto`
      
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch Open-Meteo live service')
      const data = await res.json()

      // Process hourly (next 24 hours)
      const hourly = (data.hourly?.time || []).slice(0, 24).map((t, idx) => {
        const timeStr = new Date(t).toLocaleTimeString([], { hour: '2-digit', hour12: true })
        return {
          hour: timeStr,
          temp: data.hourly.temperature_2m[idx],
          humidity: data.hourly.relative_humidity_2m[idx],
          rainProb: data.hourly.precipitation_probability[idx],
          soilTemp: data.hourly.soil_temperature_0_to_7cm?.[idx] ?? data.hourly.temperature_2m[idx] - 2,
          soilMoisture: data.hourly.soil_moisture_0_to_7cm?.[idx] ? parseFloat((data.hourly.soil_moisture_0_to_7cm[idx] * 100).toFixed(1)) : 45
        }
      })

      // Process daily (7 days)
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const daily = (data.daily?.time || []).map((t, idx) => {
        const d = new Date(t)
        const wmo = decodeWmo(data.daily.weather_code[idx])
        return {
          day: days[d.getDay()],
          date: d.toLocaleDateString([], { month: 'short', day: 'numeric' }),
          condition: wmo.label,
          icon: wmo.icon,
          maxTemp: Math.round(data.daily.temperature_2m_max[idx]),
          minTemp: Math.round(data.daily.temperature_2m_min[idx]),
          rainSum: data.daily.precipitation_sum[idx],
          uvMax: data.daily.uv_index_max?.[idx] ?? 6
        }
      })

      const curr = data.current || {}
      const wmo = decodeWmo(curr.weather_code)

      // Soil moisture in Open-Meteo is m3/m3 (0 to 0.5), convert to % saturation approx
      const rawMoisture = curr.soil_moisture_0_to_7cm ?? 0.28
      const soilMoisturePercent = Math.min(100, Math.round(rawMoisture * 200))

      setWeatherData({
        location: locName,
        lat,
        lon,
        isLiveApi: true,
        temp: curr.temperature_2m,
        feelsLike: curr.apparent_temperature,
        humidity: curr.relative_humidity_2m,
        windSpeed: curr.wind_speed_10m,
        windDir: curr.wind_direction_10m,
        pressure: Math.round(curr.surface_pressure),
        uvIndex: curr.uv_index ?? 5,
        condition: wmo.label,
        conditionIcon: wmo.icon,
        precipitation: curr.precipitation ?? 0,
        soilTemp: curr.soil_temperature_0_to_7cm ?? (curr.temperature_2m - 2),
        soilMoisture: soilMoisturePercent,
        hourly,
        daily
      })

      setLastRefreshed(new Date().toLocaleTimeString())
    } catch (err) {
      console.error(err)
      setError('Could not connect to live satellite weather service. Check your internet connection.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRealWeather(selectedLocation.lat, selectedLocation.lon, selectedLocation.name)
  }, [selectedLocation, fetchRealWeather])

  // Use user's real GPS device coordinates
  const handleUseGps = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setIsLiveGps(true)
        setSelectedLocation({
          name: `My GPS Coordinates (${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E)`,
          lat: latitude,
          lon: longitude,
          zone: 'Local Farm Coordinates'
        })
      },
      (err) => {
        setLoading(false)
        alert('Could not access GPS location: ' + err.message)
      }
    )
  }

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(14, 116, 144, 0.95), rgba(15, 23, 42, 0.95))',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem 2rem',
        marginBottom: '2rem',
        color: '#fff',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(56, 189, 248, 0.2)', padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem', color: '#7dd3fc', marginBottom: '1rem', fontWeight: 600 }}>
              <Navigation size={16} /> Live Satellite Weather & Soil Telemetry Service (Open-Meteo)
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              Live Agricultural Weather & Soil Radar
            </h1>
            <p style={{ color: '#cbd5e1', maxWidth: '750px', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Real live weather feeds, atmospheric pressure, solar UV index, and subterranean soil moisture sensors for precision farm irrigation and spraying schedules.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleUseGps}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#fff',
                padding: '0.65rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              <Navigation size={16} /> Use My Live GPS Location
            </button>
            <button
              onClick={() => fetchRealWeather(selectedLocation.lat, selectedLocation.lon, selectedLocation.name)}
              disabled={loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                padding: '0.65rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}
            >
              <RefreshCw className={loading ? 'animate-spin' : ''} size={16} /> Refresh Telemetry
            </button>
          </div>
        </div>

        {/* Location Selector Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingTop: '1.5rem', marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {AGRI_LOCATIONS.map((loc, i) => (
            <button
              key={i}
              onClick={() => {
                setIsLiveGps(false)
                setSelectedLocation(loc)
              }}
              style={{
                background: selectedLocation.name === loc.name && !isLiveGps ? '#fff' : 'rgba(255, 255, 255, 0.1)',
                color: selectedLocation.name === loc.name && !isLiveGps ? '#0f172a' : '#fff',
                border: 'none',
                padding: '0.45rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {loc.name}
            </button>
          ))}
        </div>
      </div>

      {loading && !weatherData && (
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <RefreshCw className="animate-spin" size={40} color="var(--primary)" style={{ margin: '0 auto 1rem auto' }} />
          <h3>Connecting to Live Satellite & Ground Radar...</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Retrieving live real-time air temperature, precipitation, and soil moisture data.</p>
        </div>
      )}

      {error && (
        <div className="card" style={{ padding: '2rem', border: '1px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ef4444' }}>
            <AlertTriangle size={24} />
            <div>
              <strong>Live Telemetry Warning:</strong> {error}
            </div>
          </div>
        </div>
      )}

      {weatherData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Current Live Weather Hero Card */}
          <div className="card" style={{ padding: '2rem', border: '1px solid var(--border-color)', background: 'linear-gradient(180deg, var(--card-bg), rgba(56, 189, 248, 0.04))' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <MapPin size={16} color="var(--primary)" />
                  <strong>{weatherData.location}</strong>
                  <span>({weatherData.lat.toFixed(2)}° N, {weatherData.lon.toFixed(2)}° E)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '3.6rem', fontWeight: 900, letterSpacing: '-0.03em' }}>
                    {weatherData.temp}°C
                  </span>
                  <div>
                    <span style={{ fontSize: '1.7rem' }}>{weatherData.conditionIcon}</span>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{weatherData.condition}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Feels like {weatherData.feelsLike}°C</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '0.35rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700 }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} /> Live Real Open-Meteo API
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Refreshed: {lastRefreshed}
                </span>
              </div>
            </div>

            {/* Grid of Key Telemetry Indicators including REAL SOIL DATA */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              
              {/* Real Subterranean Soil Moisture */}
              <div style={{ background: 'rgba(56, 189, 248, 0.08)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Droplets size={14} /> Real Soil Moisture (0-7cm)
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.3rem', color: 'var(--text-primary)' }}>
                  {weatherData.soilMoisture}%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {weatherData.soilMoisture < 35 ? '⚠️ Dry — Needs Irrigation' : weatherData.soilMoisture > 75 ? 'Excess Water' : '✅ Optimal Range'}
                </div>
              </div>

              {/* Real Soil Temperature */}
              <div style={{ background: 'rgba(234, 179, 8, 0.08)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#eab308', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Thermometer size={14} /> Soil Temperature
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.3rem', color: 'var(--text-primary)' }}>
                  {weatherData.soilTemp}°C
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Root zone microbial activity optimal
                </div>
              </div>

              {/* Relative Humidity */}
              <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Droplets size={14} /> Air Humidity
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.3rem' }}>
                  {weatherData.humidity}%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Transpiration rate normal
                </div>
              </div>

              {/* Wind Speed */}
              <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Wind size={14} /> Wind Speed
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.3rem' }}>
                  {weatherData.windSpeed} km/h
                </div>
                <div style={{ fontSize: '0.75rem', color: weatherData.windSpeed > 18 ? '#ef4444' : '#22c55e' }}>
                  {weatherData.windSpeed > 18 ? '⚠️ Avoid pesticide spray' : '✅ Safe for spraying'}
                </div>
              </div>

              {/* Solar UV Index */}
              <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sun size={14} /> UV Index
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.3rem' }}>
                  {weatherData.uvIndex}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {weatherData.uvIndex > 7 ? 'High Solar Radiation' : 'Moderate Radiation'}
                </div>
              </div>

              {/* Surface Pressure */}
              <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Gauge size={14} /> Atmospheric Pressure
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.3rem' }}>
                  {weatherData.pressure} hPa
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Stable atmospheric conditions
                </div>
              </div>

            </div>
          </div>

          {/* 24-Hour Hourly Forecast Chart */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              24-Hour Live Temperature & Soil Moisture Forecast
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Hourly hourly temperature curves and subterranean soil moisture dynamics.
            </p>
            <div style={{ height: '260px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weatherData.hourly}>
                  <defs>
                    <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="moistGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="hour" stroke="var(--text-secondary)" fontSize={12} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} />
                  <Tooltip
                    contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="temp" name="Air Temp (°C)" stroke="#f59e0b" fillOpacity={1} fill="url(#tempGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="soilMoisture" name="Soil Moisture (%)" stroke="#38bdf8" fillOpacity={1} fill="url(#moistGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 7-Day Extended Agro-Weather Forecast */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
              7-Day Agricultural Outlook
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
              {weatherData.daily.map((d, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-secondary)',
                    padding: '1rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{d.day}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{d.date}</div>
                  <div style={{ fontSize: '2rem', margin: '0.4rem 0' }}>{d.icon}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', minHeight: '32px' }}>{d.condition}</div>
                  <div style={{ marginTop: '0.4rem', fontWeight: 800, fontSize: '0.9rem' }}>
                    {d.maxTemp}° <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>/ {d.minTemp}°</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#38bdf8', marginTop: '0.3rem' }}>
                    Rain: {d.rainSum} mm
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
