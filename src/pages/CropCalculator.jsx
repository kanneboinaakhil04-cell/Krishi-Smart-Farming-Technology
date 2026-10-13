import React, { useState, useMemo } from 'react'
import {
  Leaf, Droplets, Sun, Thermometer, Wind, FlaskConical,
  Calculator, ArrowRight, CheckCircle, Info, AlertTriangle,
  Sprout, TreePine, Grid3x3, Zap, Bug, Calendar, ChevronDown
} from 'lucide-react'
import {
  CROP_DB, calculateWaterNeeds, calculatePlantCount
} from '../data/cropDatabase'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts'

const AREA_PRESETS = [
  { label: '¼ Acre', value: 0.25 },
  { label: '½ Acre', value: 0.5 },
  { label: '1 Acre', value: 1 },
  { label: '2 Acres', value: 2 },
  { label: '5 Acres', value: 5 },
  { label: '10 Acres', value: 10 },
]

const CATEGORIES = ['All', 'Cereal', 'Vegetable', 'Fruit', 'Cash Crop', 'Legume']

function SensorThresholdBar({ label, value, min, max, optimal, unit, color }) {
  const pct = ((value - min) / (max - min)) * 100
  const optLow = ((optimal[0] - min) / (max - min)) * 100
  const optHigh = ((optimal[1] - min) / (max - min)) * 100

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.8rem' }}>
        <span style={{ fontWeight: 600, color: 'var(--text)' }}>{label}</span>
        <span style={{ color, fontWeight: 700 }}>{optimal[0]}–{optimal[1]} {unit}</span>
      </div>
      <div style={{ position: 'relative', height: 10, background: '#e2e8f0', borderRadius: 5 }}>
        {/* Optimal zone */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `${optLow}%`, width: `${optHigh - optLow}%`,
          background: `${color}30`, borderRadius: 5,
          border: `1px solid ${color}50`,
        }} />
        {/* Labels */}
        <div style={{
          position: 'absolute', top: -18, left: `${optLow}%`,
          fontSize: '0.65rem', color: 'var(--text-muted)', transform: 'translateX(-50%)'
        }}>min</div>
        <div style={{
          position: 'absolute', top: -18, left: `${optHigh}%`,
          fontSize: '0.65rem', color: 'var(--text-muted)', transform: 'translateX(-50%)'
        }}>max</div>
      </div>
    </div>
  )
}

function InfoBadge({ icon, label, value, color, bg }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 14px', background: bg, borderRadius: 12,
      border: `1px solid ${color}30`,
    }}>
      <span style={{ color, fontSize: '1.2rem' }}>{icon}</span>
      <div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
        <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)' }}>{value}</div>
      </div>
    </div>
  )
}

function WaterNeedsChart({ water, cropColor }) {
  const data = [
    { label: 'Day', value: water.dailyLitresTotal, fill: '#22c55e' },
    { label: 'Week', value: water.weeklyLitresTotal, fill: '#3b82f6' },
    { label: 'Season', value: water.seasonTotalLitres, fill: cropColor },
  ]
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
        <XAxis dataKey="label" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 10 }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
        <Tooltip
          formatter={(v) => [`${v.toLocaleString()} L`, 'Water needed']}
          contentStyle={{ borderRadius: 10, fontSize: '0.82rem' }}
        />
        {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default function CropCalculator() {
  const [selectedCrop, setSelectedCrop] = useState('Mango')
  const [areaAcres, setAreaAcres] = useState(1)
  const [category, setCategory] = useState('All')

  const crop = CROP_DB[selectedCrop]
  const waterData = useMemo(() => calculateWaterNeeds(selectedCrop, areaAcres), [selectedCrop, areaAcres])
  const plantData = useMemo(() => calculatePlantCount(selectedCrop, areaAcres), [selectedCrop, areaAcres])

  const filteredCrops = Object.entries(CROP_DB).filter(([, c]) =>
    category === 'All' || c.category === category
  )

  const fertilizerData = crop ? [
    { name: 'Nitrogen (N)', value: crop.fertilizerNPK.N * areaAcres, fill: '#22c55e' },
    { name: 'Phosphorus (P)', value: crop.fertilizerNPK.P * areaAcres, fill: '#3b82f6' },
    { name: 'Potassium (K)', value: crop.fertilizerNPK.K * areaAcres, fill: '#f59e0b' },
  ] : []

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, var(--bg) 100%)' }}>

      {/* Page Header */}
      <div className="page-header" id="calculator-header">
        <div className="container">
          <span className="section-badge" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac', marginBottom: '1rem' }}>
            <Calculator size={14} />
            Field Planning Tool
          </span>
          <h1>Crop Planting Calculator</h1>
          <p>
            Enter your crop and land area to get real-world planting density,
            water requirements, fertiliser needs, and IoT sensor thresholds.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>

        {/* ── STEP 1: Crop + Area Selector ── */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }} id="crop-area-selector">
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,var(--primary),var(--secondary))', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.85rem', fontWeight: 700 }}>1</span>
            Select Your Crop & Land Area
          </h3>
          <p style={{ fontSize: '0.88rem', marginBottom: '1.5rem' }}>Choose a crop and set the size of your field to receive personalised recommendations.</p>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {CATEGORIES.map(c => (
              <button
                key={c}
                id={`cat-filter-${c.toLowerCase()}`}
                onClick={() => setCategory(c)}
                style={{
                  padding: '6px 16px', borderRadius: 50,
                  border: category === c ? '2px solid var(--primary)' : '2px solid var(--border)',
                  background: category === c ? 'linear-gradient(135deg,#dcfce7,#f0fdf4)' : 'white',
                  color: category === c ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', transition: 'all 0.2s',
                }}
              >{c}</button>
            ))}
          </div>

          {/* Crop Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '1.75rem' }} id="crop-selector-grid">
            {filteredCrops.map(([name, data]) => (
              <button
                key={name}
                id={`crop-btn-${name.toLowerCase()}`}
                onClick={() => setSelectedCrop(name)}
                style={{
                  padding: '12px 10px', borderRadius: 12, cursor: 'pointer',
                  border: selectedCrop === name ? `2px solid ${data.color}` : '2px solid var(--border-light)',
                  background: selectedCrop === name ? data.bg : 'white',
                  transition: 'all 0.2s', textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <div style={{ fontSize: '1.6rem', marginBottom: 4 }}>{data.emoji}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: selectedCrop === name ? data.color : 'var(--text)', lineHeight: 1.2 }}>{name}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 2 }}>{data.category}</div>
              </button>
            ))}
          </div>

          {/* Area Input */}
          <div>
            <label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'block', marginBottom: '0.75rem' }}>
              Field Area (Acres): <span style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>{areaAcres} {areaAcres === 1 ? 'Acre' : 'Acres'}</span>
            </label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {AREA_PRESETS.map(p => (
                <button
                  key={p.value}
                  id={`area-preset-${p.value}`}
                  onClick={() => setAreaAcres(p.value)}
                  style={{
                    padding: '8px 16px', borderRadius: 50,
                    border: areaAcres === p.value ? '2px solid var(--primary)' : '2px solid var(--border)',
                    background: areaAcres === p.value ? 'linear-gradient(135deg,#dcfce7,#f0fdf4)' : 'white',
                    color: areaAcres === p.value ? 'var(--primary)' : 'var(--text-muted)',
                    fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                  }}
                >{p.label}</button>
              ))}
            </div>
            <input
              id="area-custom-input"
              type="number"
              min="0.1"
              max="1000"
              step="0.1"
              value={areaAcres}
              onChange={e => setAreaAcres(Math.max(0.1, Number(e.target.value)))}
              className="form-control"
              style={{ maxWidth: 200, display: 'inline-block', marginRight: 8 }}
            />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>or type a custom area</span>
          </div>
        </div>

        {crop && (
          <>
            {/* ── Crop Overview Header ── */}
            <div
              style={{
                background: `linear-gradient(135deg, ${crop.color}18 0%, ${crop.color}08 100%)`,
                border: `1px solid ${crop.color}30`,
                borderRadius: 20,
                padding: '1.75rem 2rem',
                marginBottom: '2rem',
                display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap',
              }}
              id="crop-overview-banner"
            >
              <div style={{ fontSize: '4rem', lineHeight: 1 }}>{crop.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                  <h2 style={{ margin: 0, color: crop.color }}>{selectedCrop}</h2>
                  <span style={{ background: crop.bg, color: crop.color, padding: '4px 12px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700, border: `1px solid ${crop.color}30` }}>
                    {crop.category}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>{crop.notes}</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center', padding: '10px 20px', background: 'white', borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: crop.color }}>{areaAcres}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Acres</div>
                </div>
                <div style={{ textAlign: 'center', padding: '10px 20px', background: 'white', borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#3b82f6' }}>{crop.growthDays}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Days to Harvest</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>

              {/* ── Planting Density ── */}
              <div className="card" style={{ padding: '2rem' }} id="planting-density-card">
                <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
                  <Grid3x3 size={18} color="var(--primary)" /> Planting Density
                </h4>
                {crop.isSeedling && plantData ? (
                  <>
                    <div style={{
                      background: 'linear-gradient(135deg, #dcfce7, #f0fdf4)',
                      borderRadius: 14, padding: '1.25rem', marginBottom: '1rem',
                      border: '1px solid #bbf7d0', textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                        {plantData.total.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
                        Total {selectedCrop} Plants for {areaAcres} Acre{areaAcres !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <InfoBadge icon="📏" label="Row Spacing" value={`${crop.rowSpacingM} m`} color="#7c3aed" bg="#f5f3ff" />
                      <InfoBadge icon="🌱" label="Plant Spacing" value={`${crop.plantSpacingM} m`} color="#0891b2" bg="#ecfeff" />
                      <InfoBadge icon="🌿" label="Plants / Acre" value={plantData.perAcre.toLocaleString()} color="var(--primary)" bg="#f0fdf4" />
                      <InfoBadge icon="📐" label="Area" value={`${(areaAcres * 4047).toFixed(0)} m²`} color="#d97706" bg="#fffbeb" />
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{
                      background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
                      borderRadius: 14, padding: '1.25rem', marginBottom: '1rem',
                      border: '1px solid #fde68a', textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#d97706', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                        {(crop.seedRateKgPerAcre * areaAcres).toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
                        kg of Seed for {areaAcres} Acre{areaAcres !== 1 ? 's' : ''} (broadcast)
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <InfoBadge icon="🌾" label="Seed / Acre" value={`${crop.seedRateKgPerAcre} kg`} color="#d97706" bg="#fffbeb" />
                      <InfoBadge icon="📐" label="Total Area" value={`${(areaAcres * 4047).toFixed(0)} m²`} color="#7c3aed" bg="#f5f3ff" />
                    </div>
                  </>
                )}
              </div>

              {/* ── Water Requirements ── */}
              <div className="card" style={{ padding: '2rem' }} id="water-requirements-card">
                <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
                  <Droplets size={18} color="#2563eb" /> Water Requirements
                </h4>
                {waterData && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1rem' }}>
                      <InfoBadge icon="💧" label="Daily Need" value={`${waterData.dailyLitresTotal.toLocaleString()} L`} color="#2563eb" bg="#eff6ff" />
                      <InfoBadge icon="📅" label="Weekly Need" value={`${waterData.weeklyLitresTotal.toLocaleString()} L`} color="#0891b2" bg="#ecfeff" />
                      <InfoBadge icon="🗓️" label="Season Total" value={`${(waterData.seasonTotalLitres / 1000).toFixed(1)} kL`} color="var(--primary)" bg="#f0fdf4" />
                      <InfoBadge icon="🚛" label="Tanker Loads" value={`~${waterData.seasonTotalTankers} ×5000L`} color="#7c3aed" bg="#f5f3ff" />
                    </div>
                    <WaterNeedsChart water={waterData} cropColor={crop.color} />
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>
                      * Based on {crop.waterMmPerSeasonTotal} mm total seasonal water requirement spread over ~150 growing days. Actual needs vary with local rainfall, soil type, and weather.
                    </p>
                  </>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>

              {/* ── IoT Sensor Thresholds ── */}
              <div className="card" style={{ padding: '2rem' }} id="sensor-thresholds-card">
                <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
                  <Zap size={18} color="#f59e0b" /> IoT Sensor Thresholds for {selectedCrop}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Configure your IoT sensors to these optimal ranges. Krishi will alert you when readings fall outside these windows.
                </p>

                {/* Soil Moisture */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.82rem' }}>
                    <span style={{ fontWeight: 700 }}>💧 Soil Moisture</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: 20, fontWeight: 700, fontSize: '0.75rem' }}>
                        Optimal: {crop.soilMoistureOptimal[0]}–{crop.soilMoistureOptimal[1]}%
                      </span>
                      <span style={{ background: '#fee2e2', color: '#991b1b', padding: '2px 8px', borderRadius: 20, fontWeight: 700, fontSize: '0.75rem' }}>
                        Min: {crop.soilMoistureMin}%
                      </span>
                    </div>
                  </div>
                  <div style={{ height: 12, background: 'linear-gradient(90deg, #fee2e2 0%, #fef3c7 30%, #dcfce7 55%, #bbf7d0 70%, #fef3c7 85%, #fee2e2 100%)', borderRadius: 6, position: 'relative' }}>
                    <div style={{
                      position: 'absolute', top: -1, bottom: -1,
                      left: `${crop.soilMoistureOptimal[0]}%`,
                      width: `${crop.soilMoistureOptimal[1] - crop.soilMoistureOptimal[0]}%`,
                      background: 'rgba(34,197,94,0.3)', border: '2px solid #22c55e', borderRadius: 6,
                    }} />
                  </div>
                </div>

                {[
                  { label: '🌡️ Temp (Min–Max)', val: `${crop.tempOptimalMin}°C – ${crop.tempOptimalMax}°C`, color: '#ea580c', bg: '#fff7ed' },
                  { label: '💨 Humidity', val: `${crop.humidityOptimalMin}% – ${crop.humidityOptimalMax}%`, color: '#0891b2', bg: '#ecfeff' },
                  { label: '🌱 Trigger Irrigation', val: `Soil moisture < ${crop.soilMoistureMin}%`, color: '#2563eb', bg: '#eff6ff' },
                  { label: '📅 Growing Season', val: crop.seasons[0], color: '#7c3aed', bg: '#f5f3ff' },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)' }}>{r.label}</span>
                    <span style={{ background: r.bg, color: r.color, padding: '4px 12px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700 }}>{r.val}</span>
                  </div>
                ))}
              </div>

              {/* ── Fertilizer Plan ── */}
              <div className="card" style={{ padding: '2rem' }} id="fertilizer-card">
                <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
                  <FlaskConical size={18} color="#7c3aed" /> Fertiliser Plan for {areaAcres} Acre{areaAcres !== 1 ? 's' : ''}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Approximate NPK requirements for a full season. Adjust based on soil test results.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: '1.25rem' }}>
                  {[
                    { label: 'Nitrogen (N)', val: (crop.fertilizerNPK.N * areaAcres).toFixed(0), unit: 'kg', color: '#22c55e', bg: '#f0fdf4', tip: 'Promotes leaf & shoot growth' },
                    { label: 'Phosphorus (P)', val: (crop.fertilizerNPK.P * areaAcres).toFixed(0), unit: 'kg', color: '#3b82f6', bg: '#eff6ff', tip: 'Root development & flowering' },
                    { label: 'Potassium (K)', val: (crop.fertilizerNPK.K * areaAcres).toFixed(0), unit: 'kg', color: '#f59e0b', bg: '#fffbeb', tip: 'Disease resistance & fruit quality' },
                  ].map(f => (
                    <div key={f.label} style={{ background: f.bg, borderRadius: 12, padding: '14px 12px', textAlign: 'center', border: `1px solid ${f.color}20` }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: f.color, fontFamily: 'var(--font-heading)' }}>{f.val}</div>
                      <div style={{ fontSize: '0.65rem', color: f.color, fontWeight: 700 }}>{f.unit}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.3 }}>{f.label}</div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 3, fontStyle: 'italic' }}>{f.tip}</div>
                    </div>
                  ))}
                </div>

                <ResponsiveContainer width="100%" height={130}>
                  <BarChart data={fertilizerData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} unit="kg" />
                    <Tooltip
                      formatter={(v, n) => [`${v} kg`, n]}
                      contentStyle={{ borderRadius: 10, fontSize: '0.8rem' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {fertilizerData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 8 }}>
                  ⚠️ Always conduct a soil test before applying fertilisers. Over-application causes runoff, groundwater contamination, and crop burn.
                </p>
              </div>
            </div>

            {/* ── Disease Risk & Calendar ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>

              {/* Diseases */}
              <div className="card" style={{ padding: '2rem' }} id="disease-risk-card">
                <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
                  <Bug size={18} color="#dc2626" /> Common Disease Risks — {selectedCrop}
                </h4>
                {crop.diseases.map((d, i) => (
                  <div key={d} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < crop.diseases.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                    <AlertTriangle size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)' }}>{d}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Monitor with IoT humidity & temperature sensors. High humidity + warm temps = elevated risk.</div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: '1rem', padding: '12px', background: '#fef3c7', borderRadius: 10, border: '1px solid #fde68a', fontSize: '0.78rem', color: '#92400e' }}>
                  <Info size={13} style={{ marginRight: 5, verticalAlign: 'middle' }} />
                  When soil humidity {'>'} {crop.humidityOptimalMax}% for more than 3 days, your Krishi dashboard will trigger a fungal disease risk alert automatically.
                </div>
              </div>

              {/* Growing Calendar */}
              <div className="card" style={{ padding: '2rem' }} id="growing-calendar-card">
                <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
                  <Calendar size={18} color="var(--primary)" /> Growing Calendar — {selectedCrop}
                </h4>
                {crop.seasons.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 0', borderBottom: i < crop.seasons.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: i === 0 ? '#dcfce7' : '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 800, color: i === 0 ? 'var(--primary)' : '#2563eb' }}>
                      {i + 1}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem' }}>{s}</p>
                  </div>
                ))}
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>Harvest Timeline</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, height: 8, background: 'linear-gradient(90deg, #22c55e, #facc15)', borderRadius: 4 }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#d97706' }}>{crop.growthDays} days</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    <span>🌱 Planting</span>
                    <span>🌿 Growing</span>
                    <span>🌾 Harvest</span>
                  </div>
                </div>

                {/* Quick summary box */}
                <div style={{ marginTop: '1.25rem', background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderRadius: 12, padding: '1rem', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 6 }}>📋 Quick Summary for {areaAcres} acre{areaAcres !== 1 ? 's' : ''} of {selectedCrop}</div>
                  {[
                    crop.isSeedling && plantData ? `🌱 Plant ${plantData.total.toLocaleString()} seedlings at ${crop.rowSpacingM}m × ${crop.plantSpacingM}m` : `🌾 Sow ${(crop.seedRateKgPerAcre * areaAcres).toFixed(0)} kg of seed`,
                    `💧 Water ${waterData?.dailyLitresTotal.toLocaleString()} L/day (${waterData?.weeklyLitresTotal.toLocaleString()} L/week)`,
                    `🌡️ Keep temp ${crop.tempOptimalMin}–${crop.tempOptimalMax}°C`,
                    `🔔 Irrigate if soil moisture drops below ${crop.soilMoistureMin}%`,
                    `⏱️ Expect harvest in ~${crop.growthDays} days`,
                  ].map((tip, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, padding: '4px 0', fontSize: '0.8rem', color: 'var(--text)' }}>
                      <CheckCircle size={13} color="#22c55e" style={{ flexShrink: 0, marginTop: 2 }} />
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── Data Disclaimer ── */}
        <div className="demo-alert" style={{ borderRadius: 12 }} id="calculator-disclaimer">
          <Info size={18} />
          <span>
            <strong>Educational Guidance.</strong> Water and fertiliser figures are based on standard agronomic references for Indian conditions. Actual requirements vary with soil type, variety, climate, and farm management. Always consult your local agricultural extension officer or a certified agronomist before making major farming decisions.
          </span>
        </div>
      </div>
    </div>
  )
}
