import React, { useState, useCallback } from 'react'
import {
  Droplets, Thermometer, AlertTriangle, CheckCircle, Info,
  Power, Sliders, TrendingDown, TrendingUp, Wifi
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine
} from 'recharts'

/* ──────────────────────────────────────
   Generate simulated hourly moisture data
────────────────────────────────────────── */
function genData(base = 55) {
  const hours = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
  return hours.map((h, i) => ({
    time: h,
    moisture: Math.max(18, Math.min(88, base + Math.sin(i * 1.1) * 18 + (Math.random() - 0.5) * 8)),
  }))
}

const ZONES = [
  { id: 'A', name: 'Zone A — North Field', moisture: 58, area: '2.4 acres' },
  { id: 'B', name: 'Zone B — South Field', moisture: 34, area: '1.8 acres' },
  { id: 'C', name: 'Zone C — Greenhouse', moisture: 71, area: '0.6 acres' },
]

function MoistureGauge({ value, threshold }) {
  const r = 82
  const circumference = 2 * Math.PI * r
  const angle = (value / 100) * circumference
  const color = value >= threshold ? '#22c55e' : value >= threshold * 0.7 ? '#f59e0b' : '#ef4444'

  return (
    <div className="moisture-gauge">
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* Background ring */}
        <circle
          cx="100" cy="100" r={r}
          fill="none"
          stroke="#f0fdf4"
          strokeWidth="14"
        />
        {/* Threshold arc */}
        <circle
          cx="100" cy="100" r={r}
          fill="none"
          stroke="#dcfce7"
          strokeWidth="14"
          strokeDasharray={`${(threshold / 100) * circumference} ${circumference}`}
          className="moisture-ring"
          strokeLinecap="round"
        />
        {/* Value arc */}
        <circle
          cx="100" cy="100" r={r}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeDasharray={`${angle} ${circumference}`}
          className="moisture-ring"
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease, stroke 0.5s ease' }}
        />
      </svg>
      <div className="gauge-text">
        <span className="gauge-value" style={{ color }}>{value.toFixed(1)}%</span>
        <span className="gauge-label">Soil Moisture</span>
      </div>
    </div>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'white', border: '1px solid #d1fae5', borderRadius: 10,
      padding: '10px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: '0.82rem'
    }}>
      <p style={{ color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>{label}</p>
      <p style={{ color: payload[0]?.color }}>Moisture: <strong>{payload[0]?.value?.toFixed(1)}%</strong></p>
    </div>
  )
}

export default function IrrigationPage() {
  const [threshold, setThreshold] = useState(50)
  const [selectedZone, setSelectedZone] = useState(ZONES[0])
  const [soilMoisture, setSoilMoisture] = useState(55.0)
  const [irrigationOn, setIrrigationOn] = useState(false)
  const [historyData, setHistoryData] = useState(genData(55))

  const handleZoneChange = useCallback((zone) => {
    setSelectedZone(zone)
    setSoilMoisture(zone.moisture + (Math.random() - 0.5) * 4)
    setHistoryData(genData(zone.moisture))
    setIrrigationOn(false)
  }, [])

  const needsIrrigation = soilMoisture < threshold
  const recommendation = needsIrrigation
    ? `⚠️ Soil moisture (${soilMoisture.toFixed(1)}%) is below your threshold (${threshold}%). Irrigation is recommended.`
    : `✅ Soil moisture (${soilMoisture.toFixed(1)}%) is at or above your threshold (${threshold}%). No irrigation needed right now.`

  const simulate = () => {
    const newVal = Math.max(18, Math.min(88, soilMoisture + (Math.random() - 0.5) * 12))
    setSoilMoisture(newVal)
    setHistoryData(genData(newVal))
  }

  return (
    <div className="irrigation-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <span className="section-badge" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac', marginBottom: '1rem' }}>
            <Droplets size={14} />
            Smart Irrigation
          </span>
          <h1>Irrigation Management</h1>
          <p>
            Monitor soil moisture, set your irrigation threshold, and control watering
            in simulation mode.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 64 }}>
        {/* Demo notice */}
        <div className="demo-alert" style={{ marginBottom: '2rem' }} id="irrigation-demo-notice">
          <AlertTriangle size={18} />
          <span>
            <strong>Simulation Mode.</strong> All moisture readings and irrigation controls are simulated.
            Real hardware integration requires compatible IoT sensors and a secure backend connection.
          </span>
        </div>

        {/* Zone Selector */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }} id="zone-selector-card">
          <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Wifi size={18} color="var(--primary)" />
            Select Field Zone
          </h4>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {ZONES.map(z => (
              <button
                key={z.id}
                id={`zone-btn-${z.id}`}
                onClick={() => handleZoneChange(z)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 12,
                  border: selectedZone.id === z.id ? '2px solid var(--primary)' : '2px solid var(--border)',
                  background: selectedZone.id === z.id ? 'linear-gradient(135deg, #dcfce7, #f0fdf4)' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', marginBottom: 4 }}>
                  {z.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {z.area} · ~{z.moisture}% moisture
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid-2" style={{ gap: '1.5rem' }}>
          {/* Left: Gauge + Controls */}
          <div>
            {/* Moisture Gauge */}
            <div className="card text-center" style={{ padding: '2rem', marginBottom: '1.5rem' }} id="moisture-gauge-card">
              <h4 style={{ marginBottom: '0.5rem' }}>{selectedZone.name}</h4>
              <p style={{ fontSize: '0.82rem', marginBottom: '1.5rem' }}>Current soil moisture level</p>
              <MoistureGauge value={soilMoisture} threshold={threshold} />

              {/* Status pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  borderRadius: 50,
                  background: needsIrrigation ? '#fef3c7' : '#dcfce7',
                  color: needsIrrigation ? '#92400e' : '#166534',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  marginTop: '1rem',
                  border: needsIrrigation ? '1px solid #fde68a' : '1px solid #86efac',
                }}
                id="moisture-status-pill"
              >
                {needsIrrigation
                  ? <><TrendingDown size={16} /> Moisture Low</>
                  : <><TrendingUp size={16} /> Moisture OK</>
                }
              </div>
            </div>

            {/* Threshold Control */}
            <div className="card" style={{ padding: '1.75rem' }} id="threshold-card">
              <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sliders size={18} color="var(--primary)" />
                Moisture Threshold
              </h4>
              <p style={{ fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                Set the minimum moisture level below which irrigation is recommended.
              </p>
              <div className="threshold-control">
                <input
                  id="threshold-slider"
                  type="range"
                  min={20}
                  max={80}
                  value={threshold}
                  onChange={e => setThreshold(Number(e.target.value))}
                  className="range-input"
                  style={{ flex: 1 }}
                />
                <div
                  style={{
                    minWidth: 64,
                    textAlign: 'center',
                    padding: '8px 14px',
                    background: '#dcfce7',
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: 'var(--primary)',
                  }}
                  id="threshold-display"
                >
                  {threshold}%
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                Drag the slider to adjust the threshold. Readings below this level will trigger an irrigation recommendation.
              </p>
            </div>
          </div>

          {/* Right: Chart + Irrigation Controls */}
          <div>
            {/* Recommendation Box */}
            <div
              style={{
                background: needsIrrigation
                  ? 'linear-gradient(135deg, #fef3c7, #fffbeb)'
                  : 'linear-gradient(135deg, #dcfce7, #f0fdf4)',
                border: needsIrrigation ? '1px solid #fde68a' : '1px solid #86efac',
                borderRadius: 16,
                padding: '1.5rem',
                marginBottom: '1.5rem',
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
              }}
              id="irrigation-recommendation"
            >
              {needsIrrigation
                ? <AlertTriangle size={22} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
                : <CheckCircle size={22} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
              }
              <div>
                <p style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontSize: '0.95rem' }}>
                  {needsIrrigation ? 'Irrigation Recommended' : 'No Irrigation Needed'}
                </p>
                <p style={{ fontSize: '0.86rem', margin: 0 }}>{recommendation}</p>
              </div>
            </div>

            {/* Moisture history chart */}
            <div className="chart-card" style={{ marginBottom: '1.5rem' }} id="irrigation-chart">
              <h4>Soil Moisture History — Today</h4>
              <p>Hourly readings for {selectedZone.name} (simulated)</p>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={historyData}>
                  <defs>
                    <linearGradient id="iGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={threshold} stroke="#f59e0b" strokeDasharray="5 3" label={{ value: `Threshold ${threshold}%`, fill: '#92400e', fontSize: 11 }} />
                  <Area
                    type="monotone"
                    dataKey="moisture"
                    name="Moisture"
                    stroke="#22c55e"
                    strokeWidth={2.5}
                    fill="url(#iGrad)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Manual Controls */}
            <div className="card" style={{ padding: '1.75rem' }} id="irrigation-controls-card">
              <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Power size={18} color="#2563eb" />
                Manual Irrigation Control
              </h4>

              <div className={`irrigation-status ${irrigationOn ? 'irrigation-on' : 'irrigation-off'}`} style={{ marginBottom: '1rem' }}>
                <Power size={18} />
                System: <strong>{irrigationOn ? 'IRRIGATING — Water flowing' : 'STANDBY — Not irrigating'}</strong>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  id="irrigation-main-toggle"
                  className={`btn ${irrigationOn ? 'btn-danger' : 'btn-success'}`}
                  onClick={() => setIrrigationOn(v => !v)}
                >
                  <Power size={16} />
                  {irrigationOn ? 'Stop Irrigation' : 'Start Irrigation'}
                </button>
                <button
                  id="simulate-reading-btn"
                  className="btn btn-secondary btn-sm"
                  onClick={simulate}
                >
                  Simulate Reading
                </button>
              </div>

              <div
                style={{
                  marginTop: '1rem',
                  padding: '12px 14px',
                  background: '#f8fafc',
                  borderRadius: 8,
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  border: '1px solid #e2e8f0',
                }}
              >
                <Info size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                Real-world irrigation control requires compatible field hardware, actuators, and a secure
                backend API. This interface is for simulation and demonstration purposes only.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
