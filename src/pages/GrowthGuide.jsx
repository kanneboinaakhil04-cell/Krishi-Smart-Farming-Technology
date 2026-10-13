import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sprout, Calendar, Droplets, FlaskConical, Shield,
  Scissors, CheckCircle2, AlertTriangle, ArrowRight,
  Sparkles, Clock, MapPin, ChevronDown, ChevronUp,
  Compass, Award, Printer, BookOpen, Layers
} from 'lucide-react'
import { CROP_GROWTH_DATA } from '../data/cropGrowthData'

export default function GrowthGuide() {
  const cropKeys = Object.keys(CROP_GROWTH_DATA)
  const [selectedCropKey, setSelectedCropKey] = useState('Mango')
  const [sowingDate, setSowingDate] = useState(() => {
    const d = new Date()
    return d.toISOString().split('T')[0]
  })
  const [expandedStage, setExpandedStage] = useState(null)
  const [completedSteps, setCompletedSteps] = useState({})

  const crop = CROP_GROWTH_DATA[selectedCropKey]

  const toggleStep = (stepKey) => {
    setCompletedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }))
  }

  // Calculate projected milestones based on sowing date
  const baseDate = new Date(sowingDate)
  const addDays = (days) => {
    const res = new Date(baseDate)
    res.setDate(res.getDate() + days)
    return res.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="growth-guide-page" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Page Header */}
      <div style={{
        background: 'linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)',
        color: 'white',
        padding: '3.5rem 1rem 3rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(134, 239, 172, 0.15) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            padding: '6px 16px', borderRadius: 20, fontSize: '0.85rem',
            fontWeight: 600, marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <BookOpen size={16} /> Krishi Agronomy Masterclass
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
            How to Grow Crops: Step-by-Step Guide
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', maxWidth: 720, margin: '0 auto' }}>
            Complete commercial cultivation guides from land preparation to post-harvest storage.
            Follow expert practices to maximize your yields and profits.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1rem 4rem', maxWidth: 1200, margin: '0 auto' }}>
        {/* Crop Selection Bar */}
        <div style={{
          display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '0.5rem 0 1.25rem',
          scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch'
        }}>
          {cropKeys.map(key => {
            const c = CROP_GROWTH_DATA[key]
            const active = selectedCropKey === key
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedCropKey(key)
                  setExpandedStage(null)
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 20px', borderRadius: 14,
                  border: active ? '2px solid var(--primary)' : '1px solid var(--border)',
                  background: active ? '#ecfdf5' : 'white',
                  color: active ? 'var(--primary-dark)' : 'var(--text)',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  boxShadow: active ? '0 6px 16px rgba(22,101,52,0.15)' : '0 2px 6px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease',
                  fontSize: '0.95rem'
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>
                  {key === 'Mango' ? '🥭' : key === 'Rice' ? '🌾' : key === 'Wheat' ? '🌾' : key === 'Tomato' ? '🍅' : '🪴'}
                </span>
                <span>{c.name}</span>
              </button>
            )
          })}
        </div>

        {/* Selected Crop Overview Banner */}
        <div style={{
          background: 'white', borderRadius: 20, padding: '2rem',
          border: '1px solid var(--border)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '2.4rem' }}>
                  {crop.id === 'mango' ? '🥭' : crop.id === 'rice' ? '🌾' : crop.id === 'wheat' ? '🌾' : crop.id === 'tomato' ? '🍅' : '🪴'}
                </span>
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text)', margin: 0 }}>{crop.name}</h2>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic' }}>{crop.botanicalName} • {crop.category}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link
                to={`/calculator`}
                className="btn btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}
              >
                <Compass size={15} /> Open Plant Calculator
              </Link>
              <Link
                to={`/mandi-prices`}
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}
              >
                <Award size={15} /> Check Today's Mandi Price
              </Link>
            </div>
          </div>

          {/* Quick Specifications Cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9'
          }}>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Growth Cycle</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginTop: 4 }}>{crop.duration}</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Ideal Soil</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', marginTop: 4 }}>{crop.idealSoil}</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Water Demand</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0284c7', marginTop: 4 }}>{crop.waterRequirement}</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Expected Yield</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#16a34a', marginTop: 4 }}>{crop.expectedYield}</div>
            </div>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.88rem', color: '#475569' }}>
            <strong>Popular Commercial Varieties:</strong> {crop.popularVarieties.join(' • ')}
          </div>
        </div>

        {/* Personalized Crop Calendar Planner */}
        <div style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          borderRadius: 20, padding: '1.75rem', border: '1px solid #bbf7d0',
          marginBottom: '2.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-dark)' }}>
                  Interactive Sowing-to-Harvest Timeline
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#166534' }}>
                  Enter your planned planting date to generate your personalized farm activity calendar:
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <label htmlFor="sowing-date" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#166534' }}>
                Planting Date:
              </label>
              <input
                id="sowing-date"
                type="date"
                value={sowingDate}
                onChange={e => setSowingDate(e.target.value)}
                style={{
                  padding: '8px 14px', borderRadius: 10, border: '1px solid #86efac',
                  background: 'white', fontWeight: 600, color: '#0f172a', fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          {/* Timeline Milestones preview */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem', marginTop: '1.25rem'
          }}>
            <div style={{ background: 'white', borderRadius: 12, padding: '12px 16px', border: '1px solid #dcfce7' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>DAY 0 — Sowing / Planting</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#15803d', marginTop: 4 }}>{addDays(0)}</div>
              <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: 2 }}>Basal dose & root treatment</div>
            </div>
            <div style={{ background: 'white', borderRadius: 12, padding: '12px 16px', border: '1px solid #dcfce7' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                {crop.id === 'mango' ? 'MONTH 1' : 'DAY 21'} — Critical Stage 1
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#15803d', marginTop: 4 }}>
                {addDays(crop.id === 'mango' ? 30 : 21)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: 2 }}>First irrigation & weeding</div>
            </div>
            <div style={{ background: 'white', borderRadius: 12, padding: '12px 16px', border: '1px solid #dcfce7' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                {crop.id === 'mango' ? 'YEAR 1' : 'DAY 45'} — Vegetative Boost
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#15803d', marginTop: 4 }}>
                {addDays(crop.id === 'mango' ? 365 : 45)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: 2 }}>Nitrogen top-dressing & canopy care</div>
            </div>
            <div style={{ background: 'white', borderRadius: 12, padding: '12px 16px', border: '1px solid #dcfce7' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                {crop.id === 'mango' ? 'FLOWERING' : 'DAY 80'} — Flowering Peak
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#15803d', marginTop: 4 }}>
                {addDays(crop.id === 'mango' ? 1200 : 80)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: 2 }}>Pest scouting & Micronutrient spray</div>
            </div>
            <div style={{ background: 'white', borderRadius: 12, padding: '12px 16px', border: '1px solid #dcfce7' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                FINAL HARVEST WINDOW
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#b45309', marginTop: 4 }}>
                {addDays(crop.durationDays > 365 ? 1825 : crop.durationDays)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: 2 }}>Maturity indices & Mandi transport</div>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', margin: 0 }}>
              7 Complete Cultivation Stages
            </h3>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>
              Click on any stage to see step-by-step procedures, recommended chemicals, dosages, and pro agronomy tips.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 10, border: '1px solid var(--border)',
              background: 'white', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600
            }}
          >
            <Printer size={15} /> Print Stage Checklist
          </button>
        </div>

        {/* 7 Stages Accordion / Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {crop.stages.map((stage) => {
            const isExpanded = expandedStage === stage.step || expandedStage === null
            return (
              <div
                key={stage.step}
                style={{
                  background: 'white',
                  borderRadius: 18,
                  border: '1px solid var(--border)',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Stage Header */}
                <div
                  onClick={() => setExpandedStage(prev => prev === stage.step ? -1 : stage.step)}
                  style={{
                    padding: '1.25rem 1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    background: isExpanded ? '#fafaf9' : 'white',
                    borderBottom: isExpanded ? '1px solid #f1f5f9' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: stage.color, color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: '1.1rem', flexShrink: 0
                    }}>
                      0{stage.step}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{
                          background: `${stage.color}18`, color: stage.color,
                          padding: '2px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700
                        }}>
                          {stage.badge}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
                          ⏱️ {stage.timeline}
                        </span>
                      </div>
                      <h4 style={{ margin: '4px 0 0', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>
                        {stage.title}
                      </h4>
                      <p style={{ margin: '2px 0 0', fontSize: '0.88rem', color: '#64748b' }}>
                        {stage.summary}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {isExpanded ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                  </div>
                </div>

                {/* Stage Expanded Body */}
                {isExpanded && (
                  <div style={{ padding: '1.5rem 1.75rem 2rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#334155', marginBottom: '0.75rem' }}>
                      Key Field Actions & Guidelines:
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {stage.actionItems.map((action, idx) => {
                        const stepId = `${crop.id}-s${stage.step}-a${idx}`
                        const isDone = !!completedSteps[stepId]
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleStep(stepId)}
                            style={{
                              display: 'flex', alignItems: 'flex-start', gap: 12,
                              padding: '10px 14px', borderRadius: 12,
                              background: isDone ? '#f0fdf4' : '#f8fafc',
                              border: isDone ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
                              cursor: 'pointer', transition: 'all 0.15s ease'
                            }}
                          >
                            <div style={{ marginTop: 2 }}>
                              <CheckCircle2
                                size={18}
                                color={isDone ? '#16a34a' : '#94a3b8'}
                                fill={isDone ? '#bbf7d0' : 'transparent'}
                              />
                            </div>
                            <span style={{
                              fontSize: '0.9rem', color: isDone ? '#15803d' : '#1e293b',
                              lineHeight: 1.5, textDecoration: isDone ? 'line-through' : 'none'
                            }}>
                              {action}
                            </span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Pro Tip Box */}
                    {stage.proTip && (
                      <div style={{
                        background: '#fffbeb', border: '1px solid #fde68a',
                        borderRadius: 12, padding: '12px 16px',
                        display: 'flex', alignItems: 'flex-start', gap: 10
                      }}>
                        <Sparkles size={18} color="#b45309" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div style={{ fontSize: '0.86rem', color: '#92400e', lineHeight: 1.5 }}>
                          <strong>Agronomist Pro-Tip:</strong> {stage.proTip}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA to AI Doctor */}
        <div style={{
          marginTop: '3.5rem',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: 'white', borderRadius: 24, padding: '2.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '2rem'
        }}>
          <div style={{ maxWidth: 600 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#86efac', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <Shield size={16} /> Spot a strange leaf spot or pest in your field?
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.5rem' }}>
              Snap a Plant Photo in Krishi AI Plant Doctor
            </h3>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
              Upload or capture a photo of any diseased leaf. Our vision system diagnoses the disease,
              tells you the exact chemical / organic spray, and lets you ask follow-up questions directly.
            </p>
          </div>

          <Link
            to="/assistant"
            className="btn btn-accent btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            Open AI Plant Doctor <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
