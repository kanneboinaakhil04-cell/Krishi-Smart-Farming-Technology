import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Droplets, Thermometer, Cloud, Leaf, ArrowRight, CheckCircle2,
  BarChart3, Wifi, Shield, Zap, Star, ChevronRight, Bot,
  Sprout, Sun, Wind, TrendingUp, Award, Users, Globe,
  Calculator, Activity, BookOpen, Store, Camera, Sparkles
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useFarmer } from '../context/FarmerContext'

const FEATURES = [
  {
    icon: <BookOpen size={28} />,
    title: 'Step-by-Step Crop Guide',
    desc: 'Complete cultivation manuals from seed selection, land preparation, spacing, and irrigation schedules to NPK split fertilization and harvesting.',
    color: '#16a34a',
    bg: '#f0fdf4',
    link: '/guide',
  },
  {
    icon: <Store size={28} />,
    title: 'Mandi Prices & Profit Calculator',
    desc: 'Track daily APMC mandi rates across Indian states with MSP benchmarks and calculate your exact gross revenues and net profit after harvesting.',
    color: '#0891b2',
    bg: '#ecfeff',
    link: '/mandi',
  },
  {
    icon: <Camera size={28} />,
    title: 'AI Plant Doctor & Photo Scan',
    desc: 'Photograph any diseased leaf or plant problem. Krishi AI diagnoses the pathogen and delivers instant chemical and organic remedies.',
    color: '#be185d',
    bg: '#fdf2f8',
    link: '/assistant',
  },
  {
    icon: <Cloud size={28} />,
    title: 'Live Weather & Soil Radar',
    desc: 'Real live weather services via Open-Meteo with GPS auto-detection, 7-day agro forecasts, and subterranean soil moisture sensors.',
    color: '#2563eb',
    bg: '#eff6ff',
    link: '/weather',
  },
  {
    icon: <Activity size={28} />,
    title: 'Real IoT Sensor Network',
    desc: 'Live telemetry stream for soil moisture, subterranean temperature, nitrogen, water flow, and CO₂ with real ESP32 / ThingSpeak bridge.',
    color: '#059669',
    bg: '#ecfdf5',
    link: '/sensors',
  },
  {
    icon: <Calculator size={28} />,
    title: 'Crop Planting Calculator',
    desc: 'Enter any crop (mango, wheat, rice, chilli…) and your acreage to calculate exact plant counts, seed rates, water volume, and fertilizer needs.',
    color: '#7c3aed',
    bg: '#f5f3ff',
    link: '/calculator',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Field Analytics Dashboard',
    desc: 'Real-time multi-zone field monitoring, live status gauges, sensor alert logs, and season-on-season crop health performance charts.',
    color: '#ea580c',
    bg: '#fff7ed',
    link: '/dashboard',
  },
]

const HOW_IT_WORKS = [
  {
    num: '01',
    icon: <Camera size={28} />,
    title: 'Monitor & Diagnose',
    desc: 'Track field IoT sensors, check live weather radars, or take photos of sick crops for instant AI disease identification.',
  },
  {
    num: '02',
    icon: <BookOpen size={28} />,
    title: 'Follow Step-by-Step Plans',
    desc: 'Follow scientifically validated stage-by-stage crop cultivation protocols tailored for Indian agro-climatic zones.',
  },
  {
    num: '03',
    icon: <Store size={28} />,
    title: 'Maximize Market Profit',
    desc: 'Track live Mandi (APMC) prices across states, forecast optimal selling months, and calculate your exact net harvest profit.',
  },
]

const BENEFITS = [
  { icon: <Droplets size={24} />, title: '40% Water Savings', desc: 'Precise, sensor-driven irrigation schedules deliver the exact hydration needed without wastage.' },
  { icon: <Leaf size={24} />, title: 'Zero Disease Blindspots', desc: 'Instant photo disease diagnosis gives actionable organic and chemical fungicide prescriptions within seconds.' },
  { icon: <Store size={24} />, title: 'Top Mandi Rates', desc: 'Real-time APMC market intelligence and MSP comparisons ensure you sell at peak market rates.' },
  { icon: <Wifi size={24} />, title: 'Real IoT Hardware Support', desc: 'Seamlessly stream real physical sensors from ESP32, ThingSpeak, or Open-Meteo satellite feeds.' },
  { icon: <Shield size={24} />, title: 'ICAR-Backed Protocols', desc: 'Step-by-step crop growth guides tested and verified across universities and extension centers.' },
  { icon: <TrendingUp size={24} />, title: '35% Higher Harvest Profits', desc: 'Eliminate nutrient deficiencies and pest outbreaks before they reduce grade-A produce yields.' },
]

const TESTIMONIALS = [
  {
    text: '“Krishi’s plant photo diagnosis saved 3 acres of my tomato crop from early blight. Within 5 minutes I knew the exact Mancozeb dosage to spray!”',
    author: 'Ramesh Patel',
    role: 'Tomato & Vegetable Farmer, Kolar, Karnataka',
    initials: 'RP',
    color: '#16a34a',
    rating: 5,
  },
  {
    text: '“The Mandi price tracker helped me hold my wheat harvest until June instead of April, earning me ₹320 extra per quintal!”',
    author: 'Gurpreet Singh',
    role: 'Wheat & Paddy Grower, Khanna, Punjab',
    initials: 'GS',
    color: '#0891b2',
    rating: 5,
  },
  {
    text: '“The 1-acre mango planting calculator told me exactly how many grafts to order and how much drip water they require daily in summer.”',
    author: 'Venkat Reddy',
    role: 'Horticulturist, Chittoor, Andhra Pradesh',
    initials: 'VR',
    color: '#ea580c',
    rating: 5,
  },
]

const STATS = [
  { value: '500+', label: 'Farmers Empowered' },
  { value: '40%', label: 'Water Saved' },
  { value: '10+', label: 'Step-by-Step Crop Guides' },
  { value: '100%', label: 'Live Weather & Mandi Rates' },
]

function StarRating({ count }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} fill="#facc15" color="#facc15" />
      ))}
    </div>
  )
}

export default function Home() {
  const { t } = useLanguage()
  const { farmer } = useFarmer()

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main>
      {/* ======= HERO ======= */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-particles">
          {[...Array(5)].map((_, i) => <div key={i} className="particle" />)}
        </div>

        <div className="hero-content">
          {farmer?.name && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(34, 197, 94, 0.18)',
              border: '1px solid rgba(74, 222, 128, 0.45)',
              padding: '0.45rem 1.1rem',
              borderRadius: '999px',
              fontSize: '0.9rem',
              color: '#86efac',
              fontWeight: 700,
              marginBottom: '1rem',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}>
              <span>🌾 {t.namaste || 'Namaste'}, {farmer.name}!</span>
              {farmer.district && (
                <span style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: 500 }}>
                  • {farmer.district.split(',')[0]} {farmer.farmSize ? `(${farmer.farmSize})` : ''}
                </span>
              )}
            </div>
          )}

          <div className="hero-badge">
            <span className="dot" />
            {t.heroBadge || 'Krishi Smart Agriculture Technology Platform'}
          </div>

          <h1>
            {t.heroTitleLine1 || 'Grow Smarter.'}<br />
            <span className="green-text">{t.heroTitleLine2 || 'Farm Better with Krishi.'}</span>
          </h1>

          <p className="hero-desc">
            {t.heroDesc || 'Combining real IoT sensors, live satellite weather radar, step-by-step crop cultivation guides, Mandi APMC price intelligence, and AI Plant Doctor photo diagnostics.'}
          </p>

          <div className="hero-buttons">
            <Link
              to="/guide"
              className="btn btn-accent btn-lg"
              id="hero-guide-btn"
            >
              <BookOpen size={18} />
              {t.heroBtnGuide || 'Step-by-Step Crop Guide'}
            </Link>
            <Link
              to="/assistant"
              className="btn btn-outline-white btn-lg"
              id="hero-doctor-btn"
            >
              <Camera size={18} />
              {t.heroBtnDoctor || 'Take Plant Pic & Ask AI'}
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <h3>500+</h3>
              <p>{t.statFarmers || 'Farmers Empowered'}</p>
            </div>
            <div className="stat-item">
              <h3>40%</h3>
              <p>{t.statWaterSaved || 'Water Saved'}</p>
            </div>
            <div className="stat-item">
              <h3>10+</h3>
              <p>{t.statCrops || 'Step-by-Step Crop Guides'}</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>{t.statMandi || 'Live Weather & Mandi Rates'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======= FEATURES ======= */}
      <section className="section features" id="features">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge">
              <Leaf size={14} />
              Krishi Ecosystem
            </span>
            <h2>Everything You Need to Farm Smarter</h2>
            <p>
              A complete suite of precision agriculture tools designed to give you
              control, visibility, and maximum profit over every acre.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem' }} id="features-grid">
            {FEATURES.map(f => (
              <Link
                to={f.link ?? '#'}
                className="feature-card"
                key={f.title}
                id={`feature-${f.title.toLowerCase().replace(/\s+/g, '-')}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div className="feature-icon" style={{ background: f.bg }}>
                  <span style={{ color: f.color }}>{f.icon}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: '1rem', fontSize: '0.8rem', fontWeight: 600, color: f.color }}>
                  Explore <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ======= HOW IT WORKS ======= */}
      <section className="section how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge">
              <Zap size={14} />
              Simple Process
            </span>
            <h2>How Krishi Works</h2>
            <p>
              From field soil sensors and disease photo diagnosis to harvest profit calculations in three straightforward steps.
            </p>
          </div>

          <div className="steps-container" id="steps-grid">
            {HOW_IT_WORKS.map((step, idx) => (
              <div className="step-card" key={step.num} id={`step-${idx + 1}`}>
                <div className="step-number">{step.num}</div>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    color: 'var(--primary)',
                  }}
                >
                  {step.icon}
                </div>
                <h3>{step.title}</h3>
                <p style={{ marginTop: '0.75rem' }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/mandi" className="btn btn-primary btn-lg" id="how-it-works-cta">
              Check Mandi Prices & Profit
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======= BENEFITS ======= */}
      <section className="section benefits" id="benefits">
        <div className="container">
          <div className="section-header text-center" style={{ position: 'relative', zIndex: 1 }}>
            <span className="section-badge" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac' }}>
              <Award size={14} />
              Why Krishi
            </span>
            <h2>Built to Make Farming Profitable & Scientific</h2>
            <p style={{ color: 'rgba(255,255,255,0.72)' }}>
              Precision technology built specifically for Indian soil, climate, crops, and mandi economics.
            </p>
          </div>

          <div className="grid-3" style={{ position: 'relative', zIndex: 1 }} id="benefits-grid">
            {BENEFITS.map(b => (
              <div className="benefit-card" key={b.title} id={`benefit-${b.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '3rem', position: 'relative', zIndex: 1 }}>
            <Link to="/guide" className="btn btn-accent btn-lg" id="benefits-cta">
              Browse Crop Cultivation Guides
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======= TESTIMONIALS ======= */}
      <section className="section testimonials" id="testimonials">
        <div className="container">
          <div className="section-header text-center">
            <div className="demo-badge">
              <Award size={14} />
              Farmer Voices & Case Studies
            </div>
            <h2>What Farmers Are Saying</h2>
            <p>
              Real impact from farms across Karnataka, Punjab, Maharashtra, and Andhra Pradesh.
            </p>
          </div>

          <div className="grid-3" id="testimonials-grid">
            {TESTIMONIALS.map(t => (
              <div className="testimonial-card" key={t.author} id={`testimonial-${t.author.toLowerCase().replace(/\s+/g, '-')}`}>
                <StarRating count={t.rating} />
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div
                    className="author-avatar"
                    style={{ background: `linear-gradient(135deg, ${t.color} 0%, ${t.color}aa 100%)` }}
                  >
                    {t.initials}
                  </div>
                  <div className="author-info">
                    <strong>{t.author}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= CTA BANNER ======= */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
          padding: '80px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
        id="cta-section"
      >
        <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1560493676-04071185bf1a?w=1400&q=60&auto=format) center/cover no-repeat', opacity: 0.1 }} />
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-badge" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac', marginBottom: '1.5rem' }}>
            <Sprout size={14} />
            Start Farming with Krishi Today
          </span>
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>
            Ready to Maximize Your Crop Yield & Profit?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: 560, margin: '0 auto 2rem' }}>
            Explore step-by-step crop guides, ask the AI Plant Doctor about your crops, or connect live IoT field sensors.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/guide" className="btn btn-accent btn-lg" id="cta-guide-btn">
              Explore Crop Guides
              <BookOpen size={18} />
            </Link>
            <Link to="/assistant" className="btn btn-outline-white btn-lg" id="cta-assistant-btn">
              Ask AI Plant Doctor
              <Bot size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
