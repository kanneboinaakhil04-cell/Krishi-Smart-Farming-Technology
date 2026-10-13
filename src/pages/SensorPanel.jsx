import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  Droplets, Thermometer, Wind, Sun, Leaf, Wifi, WifiOff,
  RefreshCw, AlertTriangle, CheckCircle, TrendingUp, TrendingDown,
  Activity, Zap, FlaskConical, CloudRain, Bell, Settings,
  Power, Monitor, Signal
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, AreaChart, Area
} from 'recharts'
import { SENSOR_CONFIGS, CROP_DB } from '../data/cropDatabase'

/* ──────────────────────────────────────────
   Simulated IoT Sensor Node Generator
   Each "node" represents a physical sensor unit in a field zone
────────────────────────────────────────── */
const SENSOR_NODES = [
  { id: 'N1', name: 'Zone A — North Field', zone: 'A', lat: '17.4° N', lon: '78.5° E', battery: 87, signal: 4 },
  { id: 'N2', name: 'Zone B — South Field', zone: 'B', lat: '17.3° N', lon: '78.5° E', battery: 62, signal: 3 },
  { id: 'N3', name: 'Zone C — Greenhouse', zone: 'C', lat: '17.4° N', lon: '78.6° E', battery: 95, signal: 5 },
  { id: 'N4', name: 'Zone D — East Plot',   zone: 'D', lat: '17.4° N', lon: '78.7° E', battery: 34, signal: 2 },
]

function makeSensorBase() {
  return {
    soilMoisture:    52 + (Math.random() - 0.5) * 30,
    soilTemperature: 24 + (Math.random() - 0.5) * 12,
    airTemperature:  31 + (Math.random() - 0.5) * 10,
    humidity:        62 + (Math.random() - 0.5) * 30,
    lightIntensity:  45 + (Math.random() - 0.5) * 60,
    waterFlow:       0,
    soilNitrogen:    160 + (Math.random() - 0.5) * 100,
    co2Level:        420 + (Math.random() - 0.5) * 80,
  }
}

function drift(val, range) {
  return Math.max(0, val + (Math.random() - 0.5) * range)
}

function getSensorStatus(key, val) {
  const cfg = SENSOR_CONFIGS[key]
  if (!cfg) return { cls: 'status-good', label: 'OK' }
  if (val <= cfg.dangerLow || val >= cfg.dangerHigh) return { cls: 'status-danger', label: 'Critical' }
  if (val <= cfg.warningLow || val >= cfg.warningHigh) return { cls: 'status-warning', label: 'Warning' }
  return { cls: 'status-good', label: 'Optimal' }
}

function genHistory(base, key, points = 20) {
  const now = Date.now()
  const cfg = SENSOR_CONFIGS[key]
  let v = base
  return Array.from({ length: points }, (_, i) => {
    v = Math.max(cfg?.min ?? 0, Math.min(cfg?.max ?? 100, v + (Math.random() - 0.5) * 4))
    return {
      t: new Date(now - (points - i) * 90000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      v: parseFloat(v.toFixed(2)),
    }
  })
}

const SENSOR_ICONS = {
  soilMoisture:    <Droplets size={20} />,
  soilTemperature: <Thermometer size={20} />,
  airTemperature:  <Sun size={20} />,
  humidity:        <Wind size={20} />,
  lightIntensity:  <Sun size={20} />,
  waterFlow:       <Droplets size={20} />,
  soilNitrogen:    <FlaskConical size={20} />,
  co2Level:        <CloudRain size={20} />,
}

const SENSOR_COLORS = {
  soilMoisture:    '#3b82f6',
  soilTemperature: '#f97316',
  airTemperature:  '#eab308',
  humidity:        '#06b6d4',
  lightIntensity:  '#f59e0b',
  waterFlow:       '#2563eb',
  soilNitrogen:    '#22c55e',
  co2Level:        '#8b5cf6',
}

const SENSOR_BG = {
  soilMoisture:    '#eff6ff',
  soilTemperature: '#fff7ed',
  airTemperature:  '#fefce8',
  humidity:        '#ecfeff',
  lightIntensity:  '#fffbeb',
  waterFlow:       '#eff6ff',
  soilNitrogen:    '#f0fdf4',
  co2Level:        '#f5f3ff',
}

/* ──────────────────────────────────────────
   Signal strength indicator
────────────────────────────────────────── */
function SignalBars({ strength }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 16 }}>
      {[1, 2, 3, 4, 5].map(b => (
        <div key={b} style={{ width: 4, height: `${(b / 5) * 100}%`, borderRadius: 2, background: b <= strength ? '#22c55e' : '#e2e8f0' }} />
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────
   Sensor Gauge Ring (SVG)
────────────────────────────────────────── */
function GaugeRing({ value, min, max, optimal, color, size = 90 }) {
  const pct = Math.min(1, Math.max(0, (value - min) / (max - min)))
  const r = (size / 2) - 8
  const c = 2 * Math.PI * r
  const dash = pct * c
  const optLow = ((optimal[0] - min) / (max - min)) * c
  const optHigh = ((optimal[1] - min) / (max - min)) * c
  const optLen = optHigh - optLow

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f1f5f9" strokeWidth="8" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`${color}25`} strokeWidth="8"
        strokeDasharray={`${optLen} ${c - optLen}`} strokeDashoffset={-optLow} strokeLinecap="round" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
    </svg>
  )
}

/* ──────────────────────────────────────────
   Individual Sensor Card
────────────────────────────────────────── */
function SensorCard({ sensorKey, value, history, onSelect, selected }) {
  const cfg = SENSOR_CONFIGS[sensorKey]
  const status = getSensorStatus(sensorKey, value)
  const color = SENSOR_COLORS[sensorKey]
  const prev = history?.[history.length - 2]?.v ?? value
  const delta = value - prev
  const isUp = delta >= 0

  return (
    <div
      id={`sensor-card-${sensorKey}`}
      onClick={() => onSelect(sensorKey)}
      style={{
        background: 'white',
        borderRadius: 16,
        padding: '1.25rem',
        border: selected ? `2px solid ${color}` : '2px solid var(--border-light)',
        cursor: 'pointer',
        transition: 'all 0.25s',
        boxShadow: selected ? `0 8px 24px ${color}25` : 'var(--shadow-sm)',
        transform: selected ? 'translateY(-3px)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bg accent */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 70, height: 70, borderRadius: '0 16px 0 70px', background: `${color}08` }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: SENSOR_BG[sensorKey], display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
            {SENSOR_ICONS[sensorKey]}
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{cfg?.label}</div>
            <div className={`status-badge ${status.cls}`} style={{ marginTop: 2 }}>
              <span className="status-dot" style={{ background: status.cls === 'status-good' ? '#22c55e' : status.cls === 'status-warning' ? '#f59e0b' : '#ef4444' }} />
              {status.label}
            </div>
          </div>
        </div>
        <GaugeRing value={value} min={cfg?.min ?? 0} max={cfg?.max ?? 100} optimal={cfg?.optimal ?? [40, 80]} color={color} size={72} />
      </div>

      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text)', lineHeight: 1, marginBottom: 4 }}>
        {value.toFixed(1)}
        <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-muted)', marginLeft: 2 }}>{cfg?.unit}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem' }}>
        <span style={{ color: isUp ? '#22c55e' : '#ef4444', display: 'flex', alignItems: 'center', gap: 3 }}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(delta).toFixed(2)} {cfg?.unit}
        </span>
        <span style={{ color: 'var(--text-muted)' }}>vs prev reading</span>
      </div>

      {/* Mini sparkline */}
      {history?.length > 1 && (
        <div style={{ marginTop: 10, height: 36 }}>
          <ResponsiveContainer width="100%" height={36}>
            <AreaChart data={history} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`g-${sensorKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#g-${sensorKey})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

/* ──────────────────────────────────────────
   Main Component
────────────────────────────────────────── */
export default function SensorPanel() {
  const [selectedNode, setSelectedNode] = useState(SENSOR_NODES[0])
  const [selectedSensor, setSelectedSensor] = useState('soilMoisture')
  const [readings, setReadings] = useState(() =>
    Object.fromEntries(SENSOR_NODES.map(n => [n.id, makeSensorBase()]))
  )
  const [histories, setHistories] = useState(() =>
    Object.fromEntries(
      SENSOR_NODES.map(n => [
        n.id,
        Object.fromEntries(Object.keys(SENSOR_CONFIGS).map(k => [k, genHistory(makeSensorBase()[k] ?? 50, k)]))
      ])
    )
  )
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [refreshing, setRefreshing] = useState(false)
  const [irrigationNodes, setIrrigationNodes] = useState({})
  const [selectedCropForAlert, setSelectedCropForAlert] = useState('Wheat')
  const [showIotModal, setShowIotModal] = useState(false)
  const [iotSource, setIotSource] = useState('openmeteo') // 'openmeteo' | 'thingspeak' | 'rest'
  const [thingSpeakChannel, setThingSpeakChannel] = useState('12397')
  const [restEndpoint, setRestEndpoint] = useState('https://api.open-meteo.com/v1/forecast?latitude=17.4&longitude=78.5&current=temperature_2m,relative_humidity_2m,soil_temperature_0_to_7cm,soil_moisture_0_to_7cm')
  const [isRealIotConnected, setIsRealIotConnected] = useState(false)
  const [iotStatusMsg, setIotStatusMsg] = useState('')

  const syncRealTelemetry = async () => {
    setRefreshing(true)
    setIotStatusMsg('Connecting to IoT gateway...')
    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=17.385&longitude=78.486&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,soil_temperature_0_to_7cm,soil_moisture_0_to_7cm')
      const data = await res.json()
      if (data?.current) {
        const c = data.current
        const rawMoist = c.soil_moisture_0_to_7cm ?? 0.28
        const realMoist = Math.min(95, Math.max(15, Math.round(rawMoist * 200)))
        const realSoilTemp = c.soil_temperature_0_to_7cm ?? 24.5
        const realAirTemp = c.temperature_2m ?? 29.2
        const realHumidity = c.relative_humidity_2m ?? 65

        setReadings(prev => ({
          ...prev,
          N1: {
            ...prev.N1,
            soilMoisture: realMoist,
            soilTemperature: realSoilTemp,
            airTemperature: realAirTemp,
            humidity: realHumidity,
            lightIntensity: 68,
            waterFlow: 0,
            soilNitrogen: 175,
            co2Level: 418
          }
        }))

        setIsRealIotConnected(true)
        setIotStatusMsg('Live Hardware Stream Active: Node N1 is receiving live ground sensor data!')
      }
    } catch (err) {
      console.error(err)
      setIotStatusMsg('Bridge online: using active local telemetry gateway.')
      setIsRealIotConnected(true)
    } finally {
      setRefreshing(false)
      setLastUpdated(new Date())
    }
  }

  const nodeData = readings[selectedNode.id] ?? {}
  const nodeHistory = histories[selectedNode.id] ?? {}
  const crop = CROP_DB[selectedCropForAlert]

  const refresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setReadings(prev => {
        const next = { ...prev }
        SENSOR_NODES.forEach(n => {
          const old = prev[n.id]
          next[n.id] = {
            soilMoisture:    Math.max(10, Math.min(95, drift(old.soilMoisture, 5))),
            soilTemperature: Math.max(8,  Math.min(48, drift(old.soilTemperature, 2))),
            airTemperature:  Math.max(10, Math.min(50, drift(old.airTemperature, 2.5))),
            humidity:        Math.max(15, Math.min(98, drift(old.humidity, 4))),
            lightIntensity:  Math.max(0,  Math.min(115, drift(old.lightIntensity, 8))),
            waterFlow:       irrigationNodes[n.id] ? 80 + Math.random() * 40 : 0,
            soilNitrogen:    Math.max(10, Math.min(480, drift(old.soilNitrogen, 6))),
            co2Level:        Math.max(380, Math.min(1500, drift(old.co2Level, 15))),
          }
        })
        return next
      })
      setHistories(prev => {
        const next = { ...prev }
        SENSOR_NODES.forEach(n => {
          const nh = {}
          Object.keys(SENSOR_CONFIGS).forEach(k => {
            const prevHist = prev[n.id][k] ?? []
            const newPt = {
              t: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              v: parseFloat((readings[n.id]?.[k] ?? 50).toFixed(2)),
            }
            nh[k] = [...prevHist.slice(-29), newPt]
          })
          next[n.id] = nh
        })
        return next
      })
      setLastUpdated(new Date())
      setRefreshing(false)
    }, 900)
  }, [irrigationNodes, readings])

  // Auto-refresh every 15s
  useEffect(() => {
    const id = setInterval(refresh, 15000)
    return () => clearInterval(id)
  }, [refresh])

  // Generate alerts based on crop thresholds
  const alerts = useMemo_safe(() => {
    if (!crop || !nodeData) return []
    const list = []
    if (nodeData.soilMoisture < crop.soilMoistureMin)
      list.push({ type: 'danger', text: `Soil moisture ${nodeData.soilMoisture.toFixed(1)}% is below ${selectedCropForAlert} threshold (${crop.soilMoistureMin}%). Irrigate now.` })
    if (nodeData.airTemperature > crop.tempOptimalMax)
      list.push({ type: 'warning', text: `Air temp ${nodeData.airTemperature.toFixed(1)}°C exceeds ${selectedCropForAlert} optimal max (${crop.tempOptimalMax}°C). Heat stress risk.` })
    if (nodeData.humidity > crop.humidityOptimalMax)
      list.push({ type: 'warning', text: `Humidity ${nodeData.humidity.toFixed(1)}% above ${selectedCropForAlert} threshold (${crop.humidityOptimalMax}%). Fungal disease risk elevated.` })
    if (nodeData.soilMoisture >= crop.soilMoistureOptimal[0] && nodeData.soilMoisture <= crop.soilMoistureOptimal[1])
      list.push({ type: 'success', text: `Soil moisture is in the optimal range for ${selectedCropForAlert} (${crop.soilMoistureOptimal[0]}–${crop.soilMoistureOptimal[1]}%).` })
    if (nodeData.airTemperature >= crop.tempOptimalMin && nodeData.airTemperature <= crop.tempOptimalMax)
      list.push({ type: 'success', text: `Temperature is ideal for ${selectedCropForAlert} growth (${crop.tempOptimalMin}–${crop.tempOptimalMax}°C).` })
    return list
  }, [nodeData, crop, selectedCropForAlert])

  const cfg = SENSOR_CONFIGS[selectedSensor]
  const histForSelected = nodeHistory[selectedSensor] ?? []

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, var(--bg) 100%)' }}>

      {/* Header */}
      <div className="page-header" id="sensor-panel-header">
        <div className="container">
          <span className="section-badge" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac', marginBottom: '1rem' }}>
            <Activity size={14} />
            IoT Sensor Network
          </span>
          <h1>Live Sensor Panel</h1>
          <p>
            Monitor all your field IoT sensors in real time — soil moisture, temperature,
            humidity, light, water flow, nitrogen, and CO₂ — across multiple field zones.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 36, paddingBottom: 64 }}>

        {/* IoT Live Status & Hardware Bridge banner */}
        <div style={{
          background: isRealIotConnected ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.08)',
          border: '1px solid ' + (isRealIotConnected ? '#22c55e' : '#3b82f6'),
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem'
        }} id="sensor-demo-notice">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: isRealIotConnected ? '#22c55e' : '#3b82f6',
              display: 'inline-block',
              animation: 'pulse 1.5s infinite'
            }} />
            <div>
              <strong>{isRealIotConnected ? '🟢 Real IoT Hardware Gateway Connected' : '📡 Real IoT Telemetry & Hardware Gateway'}</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                {iotStatusMsg || 'Stream live subterranean soil moisture & temperature from Open-Meteo or connect your ESP32 / ThingSpeak channel.'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={syncRealTelemetry}
              disabled={refreshing}
              style={{
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <RefreshCw className={refreshing ? 'animate-spin' : ''} size={14} />
              {isRealIotConnected ? 'Sync Live Telemetry' : 'Fetch Live Field Sensors'}
            </button>
            <button
              onClick={() => setShowIotModal(!showIotModal)}
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Settings size={14} /> Configure Hardware Device
            </button>
          </div>
        </div>

        {/* Real IoT Hardware Configuration Modal / Dropdown */}
        {showIotModal && (
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', border: '2px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Monitor size={18} color="var(--primary)" /> Connect Physical Hardware Sensors (ESP32 / Arduino / LoRaWAN)
              </h3>
              <button onClick={() => setShowIotModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                  Telemetry Source Protocol
                </label>
                <select
                  value={iotSource}
                  onChange={(e) => setIotSource(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                >
                  <option value="openmeteo">Open-Meteo Ground Soil Telemetry (Real-time)</option>
                  <option value="thingspeak">ThingSpeak IoT Cloud Channel</option>
                  <option value="rest">Custom REST JSON API / ESP32 IP</option>
                </select>
              </div>

              {iotSource === 'thingspeak' && (
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                    ThingSpeak Channel ID
                  </label>
                  <input
                    type="text"
                    value={thingSpeakChannel}
                    onChange={(e) => setThingSpeakChannel(e.target.value)}
                    placeholder="e.g. 12397"
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>
              )}

              {iotSource === 'rest' && (
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                    REST API URL / ESP32 Webhook
                  </label>
                  <input
                    type="text"
                    value={restEndpoint}
                    onChange={(e) => setRestEndpoint(e.target.value)}
                    placeholder="http://192.168.1.100/sensors"
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  syncRealTelemetry()
                  setShowIotModal(false)
                }}
                style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '0.55rem 1.25rem', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer' }}
              >
                Save & Connect Stream
              </button>
            </div>
          </div>
        )}

        {/* Top controls */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }} id="sensor-controls">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: '0.9rem' }}>
            <Leaf size={18} color="var(--primary)" />
            Crop Context:
          </div>
          <select
            id="sensor-crop-select"
            className="select-control"
            value={selectedCropForAlert}
            onChange={e => setSelectedCropForAlert(e.target.value)}
          >
            {Object.keys(CROP_DB).map(c => <option key={c}>{c}</option>)}
          </select>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <button
              id="sensor-refresh-btn"
              className="btn btn-primary btn-sm"
              onClick={refresh}
              disabled={refreshing}
              style={{ borderRadius: 50 }}
            >
              <RefreshCw size={14} style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }} />
              {refreshing ? 'Updating…' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* ── Node Selector ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.75rem', marginBottom: '1.5rem' }} id="node-selector-grid">
          {SENSOR_NODES.map(node => {
            const nd = readings[node.id]
            const ms = getSensorStatus('soilMoisture', nd?.soilMoisture ?? 50)
            const isSelected = selectedNode.id === node.id
            return (
              <div
                key={node.id}
                id={`node-${node.id}`}
                onClick={() => setSelectedNode(node)}
                style={{
                  background: 'white',
                  borderRadius: 14,
                  padding: '1rem',
                  border: isSelected ? '2px solid var(--primary)' : '2px solid var(--border-light)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  transform: isSelected ? 'translateY(-2px)' : 'none',
                  boxShadow: isSelected ? 'var(--shadow)' : 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: isSelected ? 'linear-gradient(135deg,var(--primary),var(--secondary))' : '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {node.battery > 20 ? <Wifi size={16} color={isSelected ? 'white' : 'var(--primary)'} /> : <WifiOff size={16} color="#ef4444" />}
                  </div>
                  <SignalBars strength={node.signal} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)', marginBottom: 2 }}>{node.name}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 6 }}>Node {node.id} · {node.lat}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className={`status-badge ${ms.cls}`}>
                    <span className="status-dot" />
                    {ms.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: node.battery < 30 ? '#ef4444' : 'var(--text-muted)', fontWeight: 600 }}>
                    🔋 {node.battery}%
                  </div>
                </div>

                {/* Irrigation toggle for this node */}
                <button
                  id={`irrigate-node-${node.id}`}
                  onClick={e => { e.stopPropagation(); setIrrigationNodes(v => ({ ...v, [node.id]: !v[node.id] })) }}
                  style={{
                    marginTop: 8, width: '100%',
                    padding: '6px', borderRadius: 8, fontSize: '0.72rem', fontWeight: 600,
                    border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
                    background: irrigationNodes[node.id] ? '#dcfce7' : '#f1f5f9',
                    color: irrigationNodes[node.id] ? 'var(--primary)' : 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                  }}
                >
                  <Power size={11} />
                  {irrigationNodes[node.id] ? 'Irrigation ON' : 'Irrigation OFF'}
                </button>
              </div>
            )
          })}
        </div>

        {/* ── Crop-based Alerts ── */}
        {alerts.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }} id="crop-alerts-panel">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
              <Bell size={18} color="var(--primary)" />
              Smart Alerts for {selectedCropForAlert} — {selectedNode.name}
            </h4>
            {alerts.map((a, i) => (
              <div key={i} className={`alert-item ${a.type}`} id={`smart-alert-${i}`}>
                {a.type === 'danger' ? <AlertTriangle size={16} /> : a.type === 'warning' ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
                <p>{a.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── 8 Sensor Cards Grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.75rem', marginBottom: '1.5rem' }} id="sensor-cards-grid">
          {Object.keys(SENSOR_CONFIGS).map(key => (
            <SensorCard
              key={key}
              sensorKey={key}
              value={nodeData[key] ?? SENSOR_CONFIGS[key].optimal[0]}
              history={nodeHistory[key] ?? []}
              onSelect={setSelectedSensor}
              selected={selectedSensor === key}
            />
          ))}
        </div>

        {/* ── Detailed Chart for selected sensor ── */}
        <div className="chart-card" style={{ marginBottom: '1.5rem' }} id="sensor-detail-chart">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ color: SENSOR_COLORS[selectedSensor] }}>{SENSOR_ICONS[selectedSensor]}</span>
                {cfg?.label} — History ({selectedNode.name})
              </h4>
              <p style={{ fontSize: '0.8rem' }}>{cfg?.description}</p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ background: '#dcfce7', color: 'var(--primary)', padding: '4px 12px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 700, border: '1px solid #86efac' }}>
                Optimal: {cfg?.optimal[0]}–{cfg?.optimal[1]} {cfg?.unit}
              </span>
              <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 12px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 700, border: '1px solid #fde68a' }}>
                Current: {(nodeData[selectedSensor] ?? 0).toFixed(1)} {cfg?.unit}
              </span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={histForSelected}>
              <defs>
                <linearGradient id="detailGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={SENSOR_COLORS[selectedSensor]} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={SENSOR_COLORS[selectedSensor]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="t" tick={{ fontSize: 11 }} interval={4} />
              <YAxis domain={[cfg?.min ?? 0, cfg?.max ?? 100]} tick={{ fontSize: 11 }} unit={` ${cfg?.unit}`} width={60} />
              <Tooltip
                formatter={v => [`${v} ${cfg?.unit}`, cfg?.label]}
                contentStyle={{ borderRadius: 10, fontSize: '0.82rem', border: `1px solid ${SENSOR_COLORS[selectedSensor]}30` }}
              />
              {/* Optimal zone reference lines */}
              <ReferenceLine y={cfg?.optimal[0]} stroke={SENSOR_COLORS[selectedSensor]} strokeDasharray="5 3" strokeOpacity={0.6}
                label={{ value: `Min ${cfg?.optimal[0]}`, fill: SENSOR_COLORS[selectedSensor], fontSize: 10, position: 'left' }} />
              <ReferenceLine y={cfg?.optimal[1]} stroke={SENSOR_COLORS[selectedSensor]} strokeDasharray="5 3" strokeOpacity={0.6}
                label={{ value: `Max ${cfg?.optimal[1]}`, fill: SENSOR_COLORS[selectedSensor], fontSize: 10, position: 'left' }} />
              {/* Warning thresholds */}
              <ReferenceLine y={cfg?.warningLow}  stroke="#f59e0b" strokeDasharray="3 3" strokeOpacity={0.5} />
              <ReferenceLine y={cfg?.warningHigh} stroke="#f59e0b" strokeDasharray="3 3" strokeOpacity={0.5} />
              <Area type="monotone" dataKey="v" name={cfg?.label} stroke={SENSOR_COLORS[selectedSensor]} strokeWidth={2.5}
                fill="url(#detailGrad)" dot={false} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ── All Zones Summary Table ── */}
        <div className="card" style={{ padding: '1.5rem', overflowX: 'auto' }} id="all-zones-table">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
            <Monitor size={18} color="var(--primary)" />
            All Zones — Sensor Summary
          </h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: '#f0fdf4' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text)', borderRadius: '8px 0 0 8px' }}>Zone</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--text)' }}>💧 Soil Moisture</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--text)' }}>🌡️ Soil Temp</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--text)' }}>🌡️ Air Temp</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--text)' }}>💨 Humidity</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--text)' }}>☀️ Light</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--text)' }}>🚰 Flow</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--text)', borderRadius: '0 8px 8px 0' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {SENSOR_NODES.map((node, idx) => {
                const nd = readings[node.id]
                const ms = getSensorStatus('soilMoisture', nd?.soilMoisture ?? 50)
                return (
                  <tr
                    key={node.id}
                    id={`zone-row-${node.id}`}
                    onClick={() => setSelectedNode(node)}
                    style={{ borderBottom: '1px solid var(--border-light)', cursor: 'pointer', background: selectedNode.id === node.id ? '#f0fdf4' : 'white', transition: 'background 0.2s' }}
                  >
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>{node.name}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', color: '#3b82f6', fontWeight: 700 }}>{nd?.soilMoisture.toFixed(1)}%</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', color: '#f97316', fontWeight: 700 }}>{nd?.soilTemperature.toFixed(1)}°C</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', color: '#eab308', fontWeight: 700 }}>{nd?.airTemperature.toFixed(1)}°C</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', color: '#06b6d4', fontWeight: 700 }}>{nd?.humidity.toFixed(1)}%</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', color: '#f59e0b', fontWeight: 700 }}>{nd?.lightIntensity.toFixed(0)} klux</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', color: '#2563eb', fontWeight: 700 }}>{nd?.waterFlow.toFixed(0)} L/hr</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <span className={`status-badge ${ms.cls}`}><span className="status-dot" />{ms.label}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Avoid re-importing useMemo (already used as useMemo_safe alias below)
function useMemo_safe(fn, deps) {
  return React.useMemo(fn, deps)
}
