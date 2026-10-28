import React, { useState } from 'react'
import {
  Sprout, Droplets, FlaskConical, Tractor, MoveRight, Scissors,
  ShieldAlert, BadgePercent, CheckCircle2, AlertCircle, Info,
  Printer, ChevronDown, ChevronRight, Calendar, Layers,
  Clock, Thermometer, Sparkles, BookOpen, Search, CheckSquare,
  HelpCircle, Lightbulb
} from 'lucide-react'
import { CROP_GROWTH_GUIDES, CROP_SEASONS, CROP_GROWTH_GUIDES_TE, CROP_SEASONS_TE } from '../data/cropGrowthData'
import { useLanguage } from '../context/LanguageContext'
import { useFarmer } from '../context/FarmerContext'

const ICON_MAP = {
  Tractor: Tractor,
  Sprout: Sprout,
  MoveRight: MoveRight,
  Droplets: Droplets,
  FlaskConical: FlaskConical,
  Scissors: Scissors,
  ShieldAlert: ShieldAlert,
  BadgePercent: BadgePercent
}

export default function CropGuidePage() {
  const { lang, t } = useLanguage()
  const { farmer } = useFarmer()
  const [selectedCropId, setSelectedCropId] = useState('rice')
  const [seasonFilter, setSeasonFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState({})

  // Pick dataset based on language
  const cropListSource = lang === 'te' ? CROP_GROWTH_GUIDES_TE : CROP_GROWTH_GUIDES
  const cropSeasonsSource = lang === 'te' ? CROP_SEASONS_TE : CROP_SEASONS

  const filteredCrops = cropListSource.filter(crop => {
    const matchesSeason = seasonFilter === 'all' || crop.season.toLowerCase().includes(seasonFilter.toLowerCase())
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          crop.marketCategory.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSeason && matchesSearch
  })

  const currentCrop = cropListSource.find(c => c.id === selectedCropId) || cropListSource[0]

  const toggleStepDone = (stepNum) => {
    setCompletedSteps(prev => ({
      ...prev,
      [`${currentCrop.id}_${stepNum}`]: !prev[`${currentCrop.id}_${stepNum}`]
    }))
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(20, 83, 45, 0.95), rgba(15, 23, 42, 0.95))',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem 2rem',
        marginBottom: '2.5rem',
        color: '#fff',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(34, 197, 94, 0.2)', padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem', color: '#4ade80', marginBottom: '1rem', fontWeight: 600 }}>
            <BookOpen size={16} /> {farmer?.name ? `${farmer.name} • ` : ''}{lang === 'te' ? 'కృషి వ్యవసాయ మాస్టర్‌క్లాస్ • సమగ్ర సాగు మార్గదర్శకాలు' : 'Krishi Agronomy Masterclass • Complete Cultivation Guides'}
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            {lang === 'te' ? 'పంటల సాగు పూర్తి గైడ్ — స్టెప్-బై-స్టెప్ విధానం' : 'How to Grow Crops — Step-by-Step Field Guide'}
          </h1>
          <p style={{ color: '#cbd5e1', maxWidth: '750px', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {lang === 'te'
              ? 'రైతుల కోసం శాస్త్రీయంగా ధృవీకరించిన సమగ్ర వ్యవసాయ పద్ధతులు. వేసవి దుక్కులు, విత్తన శుద్ధి, డ్రిప్ సాగునీటి నిర్వహణ నుండి NPK ఎరువుల షెడ్యూల్, చీడపీడల నివారణ మరియు గరిష్ట దిగుబడి సాధించే కోత వరకు స్పష్టమైన మార్గదర్శకం.'
              : 'Detailed, scientifically verified field operations for farmers. Follow clear stage-by-stage instructions: from deep soil preparation, seed treatment, and drip irrigation scheduling to NPK split fertilization, pest defense, and harvesting for maximum yield.'}
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            >
              <Printer size={16} /> {lang === 'te' ? 'గైడ్ ముద్రించు / భద్రపరుచు' : 'Print / Save Field Guide'}
            </button>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: '#86efac' }}>
              <Sparkles size={16} /> {lang === 'te' ? 'ICAR & రాష్ట్ర వ్యవసాయ విశ్వవిద్యాలయ మార్గదర్శకాల ఆధారంగా' : 'Verified by ICAR & State Agricultural University Guidelines'}
            </div>
          </div>
        </div>
      </div>

      {/* Crop Selector & Filter Bar */}
      <div className="crop-guide-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Crop List & Filters */}
        <div>
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                {lang === 'te' ? 'పంటను శోధించండి' : 'Search Crop'}
              </label>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder={lang === 'te' ? 'ఉదా: వరి, టమాట, ప్రత్తి, మిరప...' : 'e.g. Rice, Tomato, Cotton, Chilli...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem 0.6rem 2.25rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            {/* Season Filter Chips */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                {lang === 'te' ? 'సీజన్ వారీగా ఫిల్టర్' : 'Filter by Season'}
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {cropSeasonsSource.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSeasonFilter(s.id)}
                    style={{
                      background: seasonFilter === s.id ? 'var(--primary)' : 'var(--bg-secondary)',
                      color: seasonFilter === s.id ? '#fff' : 'var(--text-secondary)',
                      border: '1px solid ' + (seasonFilter === s.id ? 'var(--primary)' : 'var(--border-color)'),
                      padding: '0.35rem 0.65rem',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Crop List */}
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              {lang === 'te' ? `అధ్యయనం చేయాల్సిన పంటలు (${filteredCrops.length})` : `Select Crop to Study (${filteredCrops.length})`}
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '480px', overflowY: 'auto', paddingRight: '0.25rem' }}>
              {filteredCrops.map(crop => {
                const isSelected = crop.id === selectedCropId
                return (
                  <button
                    key={crop.id}
                    onClick={() => {
                      setSelectedCropId(crop.id)
                      setActiveStepIndex(0)
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(34, 197, 94, 0.12)' : 'var(--bg-secondary)',
                      border: '1px solid ' + (isSelected ? 'var(--primary)' : 'transparent'),
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      width: '100%'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.4rem' }}>{crop.image}</span>
                      <div>
                        <div style={{ fontWeight: 700, color: isSelected ? 'var(--primary)' : 'var(--text-primary)', fontSize: '0.95rem' }}>
                          {crop.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {crop.season} • {crop.durationDays}
                        </div>
                      </div>
                    </div>
                    {isSelected ? <ChevronDown size={18} color="var(--primary)" /> : <ChevronRight size={16} color="var(--text-secondary)" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Practical Farmer Growth Checklist */}
          <div className="card" style={{ padding: '1.5rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckSquare size={18} color="var(--primary)" /> {lang === 'te' ? 'దశల వారీ పురోగతి ట్రాకర్' : 'Stage Completion Tracker'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
              {lang === 'te'
                ? 'పొలంలో ఒక్కో పని పూర్తయిన తర్వాత ఆ దశను ఇక్కడ నమోదు చేసి పర్యవేక్షించండి.'
                : 'Track your farm operations stage-by-stage as you complete them in the field.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {currentCrop.steps.map((st) => {
                const isDone = !!completedSteps[`${currentCrop.id}_${st.stepNumber}`]
                return (
                  <div
                    key={st.stepNumber}
                    onClick={() => toggleStepDone(st.stepNumber)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      background: isDone ? 'rgba(34, 197, 94, 0.1)' : 'var(--bg-secondary)',
                      border: '1px solid ' + (isDone ? '#22c55e' : 'var(--border-color)'),
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    <span style={{ fontWeight: isDone ? 700 : 500, color: isDone ? '#22c55e' : 'var(--text-primary)' }}>
                      {lang === 'te' ? `దశ ${st.stepNumber}:` : `Step ${st.stepNumber}:`} {st.title.split(' ')[0]} {st.title.split(' ')[1] || ''}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: isDone ? '#22c55e' : 'var(--text-secondary)' }}>
                      {isDone ? (lang === 'te' ? '✓ పూర్తయింది' : '✓ Completed') : (lang === 'te' ? 'పెండింగ్' : 'Pending')}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Active Crop Detailed Step-by-Step Flow */}
        <div>
          {/* Active Crop Meta Header */}
          <div className="card" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2.5rem', background: 'var(--bg-secondary)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-lg)' }}>
                  {currentCrop.image}
                </span>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>{currentCrop.name}</h2>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.2rem' }}>
                    {currentCrop.scientificName} • Family: {currentCrop.family}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', padding: '0.35rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  {currentCrop.marketCategory}
                </span>
                <span style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', padding: '0.35rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  {currentCrop.durationDays}
                </span>
              </div>
            </div>

            {/* Grid of Key Agronomic Factors */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Droplets size={14} color="#38bdf8" /> {lang === 'te' ? 'నీటి అవసరం' : 'Water Requirement'}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '0.2rem' }}>{currentCrop.waterRequirement}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Layers size={14} color="#fbbf24" /> {lang === 'te' ? 'అనుకూలమైన నేల' : 'Ideal Soil Type'}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '0.2rem' }}>{currentCrop.idealSoil}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Thermometer size={14} color="#f87171" /> {lang === 'te' ? 'అనుకూల ఉష్ణోగ్రత' : 'Optimal Temperature'}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '0.2rem' }}>{currentCrop.temperatureRange}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <BadgePercent size={14} color="#34d399" /> {lang === 'te' ? 'సగటు ఆశించే దిగుబడి' : 'Average Expected Yield'}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '0.2rem', color: 'var(--primary)' }}>{currentCrop.averageYield}</div>
              </div>
            </div>
          </div>

          {/* Interactive Step Timeline Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            {currentCrop.steps.map((step, idx) => {
              const isActive = idx === activeStepIndex
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 0.9rem',
                    borderRadius: 'var(--radius-md)',
                    background: isActive ? 'var(--primary)' : 'var(--bg-secondary)',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    border: '1px solid ' + (isActive ? 'var(--primary)' : 'var(--border-color)'),
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    flexShrink: 0
                  }}
                >
                  <span style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem'
                  }}>
                    {step.stepNumber}
                  </span>
                  <span>{step.title.split(' ')[0]} {step.title.split(' ')[1] || ''}</span>
                </button>
              )
            })}
          </div>

          {/* Detailed Step Cards (All steps with current highlighted) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {currentCrop.steps.map((step, idx) => {
              const StepIcon = ICON_MAP[step.icon] || Sprout
              const isSelected = idx === activeStepIndex

              return (
                <div
                  key={step.stepNumber}
                  className="card"
                  style={{
                    padding: '2rem',
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: isSelected ? 'rgba(34, 197, 94, 0.03)' : 'var(--card-bg)',
                    boxShadow: isSelected ? '0 10px 25px -5px rgba(34, 197, 94, 0.15)' : 'none',
                    transition: 'all 0.3s'
                  }}
                >
                  {/* Step Title Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: 'var(--radius-md)',
                        background: isSelected ? 'var(--primary)' : 'var(--bg-secondary)',
                        color: isSelected ? '#fff' : 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <StepIcon size={24} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {lang === 'te' ? `దశ ${step.stepNumber}` : `Stage ${step.stepNumber}`}
                          </span>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>•</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Clock size={12} /> {step.duration}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.2rem 0 0 0' }}>{step.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Summary Overview */}
                  <div style={{
                    background: 'var(--bg-secondary)',
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: '4px solid var(--primary)',
                    marginBottom: '1.5rem',
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.5,
                    fontWeight: 500
                  }}>
                    {step.summary}
                  </div>

                  {/* Step Actionable Items: Clearly Explained Key Field Operations & Instructions */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      marginBottom: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      borderBottom: '1px solid var(--border-color)',
                      paddingBottom: '0.5rem'
                    }}>
                      <CheckCircle2 size={18} color="var(--primary)" />
                      {lang === 'te' ? 'పొలంలో చేయాల్సిన పనులు మరియు స్పష్టమైన సూచనలు:' : 'Key Field Operations & Step-by-Step Instructions:'}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {step.details.map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.85rem',
                            padding: '0.85rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            lineHeight: 1.6
                          }}
                        >
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: 'rgba(34, 197, 94, 0.15)',
                            color: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            flexShrink: 0,
                            marginTop: '0.1rem'
                          }}>
                            {dIdx + 1}
                          </div>
                          <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                            {detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Agronomist Pro-Tip */}
                  {step.tips && (
                    <div style={{
                      background: 'rgba(59, 130, 246, 0.08)',
                      borderLeft: '4px solid #3b82f6',
                      padding: '0.9rem 1.15rem',
                      borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                      fontSize: '0.88rem',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      lineHeight: 1.5
                    }}>
                      <Lightbulb size={20} color="#3b82f6" style={{ flexShrink: 0 }} />
                      <div>
                        <strong style={{ color: '#3b82f6' }}>{lang === 'te' ? 'కృషి నిపుణుల సలహా:' : 'Krishi Expert Agronomist Note:'}</strong> {step.tips}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
