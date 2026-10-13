import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Leaf, Menu, X, LayoutDashboard, Calculator, Activity,
  Cloud, Droplets, Bot, Info, Phone, ChevronDown, BookOpen,
  Store, Sparkles, LogOut, User
} from 'lucide-react'

const FEATURES_LINKS = [
  { to: '/guide',      icon: <BookOpen size={16} />,        label: 'Step-by-Step Crop Guide', sub: 'How to grow crops 0-100%' },
  { to: '/mandi',      icon: <Store size={16} />,           label: 'Mandi Prices & Profit',   sub: 'APMC market rates & revenue' },
  { to: '/assistant',  icon: <Bot size={16} />,             label: 'AI Plant Doctor & Chat',  sub: 'Photo diagnosis & plant cure' },
  { to: '/weather',    icon: <Cloud size={16} />,           label: 'Live Weather & Radar',    sub: 'Real GPS & soil telemetry' },
  { to: '/sensors',    icon: <Activity size={16} />,        label: 'Real IoT Sensor Panel',   sub: 'Hardware & ground sensors' },
  { to: '/calculator', icon: <Calculator size={16} />,      label: 'Planting Calculator',     sub: 'Water, seeds & plants / acre' },
  { to: '/dashboard',  icon: <LayoutDashboard size={16} />, label: 'Farm Dashboard',          sub: 'Multi-zone field overview' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setFeaturesOpen(false)
  }, [location])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setFeaturesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isHome = location.pathname === '/home'

  return (
    <>
      <nav className={`navbar ${scrolled || !isHome ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* Logo - Renamed to Krishi */}
          <Link to="/home" className="navbar-logo" id="nav-logo">
            <div className="logo-icon" style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', color: '#fff' }}>
              <Leaf size={20} />
            </div>
            Krishi<span className="accent" style={{ color: '#22c55e', fontSize: '0.85em', marginLeft: '2px' }}>Smart</span>
          </Link>

          {/* Desktop Links */}
          <ul className="navbar-links">
            <li>
              <NavLink to="/home" end className={({ isActive }) => isActive ? 'active' : ''} id="nav-home">Home</NavLink>
            </li>

            {/* Direct Quick Link to Crop Guide */}
            <li>
              <NavLink to="/guide" className={({ isActive }) => isActive ? 'active' : ''} id="nav-guide" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <BookOpen size={15} />
                Crop Guide
              </NavLink>
            </li>

            {/* Direct Quick Link to Mandi Prices */}
            <li>
              <NavLink to="/mandi" className={({ isActive }) => isActive ? 'active' : ''} id="nav-mandi" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Store size={15} />
                Mandi Prices
              </NavLink>
            </li>

            {/* Direct Quick Link to AI Plant Doctor */}
            <li>
              <NavLink to="/assistant" className={({ isActive }) => isActive ? 'active' : ''} id="nav-assistant" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Bot size={15} />
                Plant Doctor AI
              </NavLink>
            </li>

            {/* Features Mega Dropdown */}
            <li style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                id="nav-features-dropdown"
                onClick={() => setFeaturesOpen(v => !v)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '8px 16px', borderRadius: 8,
                  border: 'none', background: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.9rem',
                  color: featuresOpen ? 'var(--primary)' : 'var(--text)',
                  background: featuresOpen ? '#dcfce7' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                All Tools
                <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: featuresOpen ? 'rotate(180deg)' : 'none' }} />
              </button>

              {featuresOpen && (
                <div
                  style={{
                    position: 'absolute', top: 'calc(100% + 8px)', left: '-120px',
                    background: 'white', borderRadius: 16, padding: '1rem',
                    boxShadow: '0 20px 60px rgba(22,101,52,0.18), 0 8px 24px rgba(0,0,0,0.08)',
                    border: '1px solid var(--border-light)',
                    width: 480, zIndex: 200,
                    animation: 'fadeInUp 0.2s ease',
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem',
                  }}
                  id="features-dropdown"
                >
                  {FEATURES_LINKS.map(fl => (
                    <NavLink
                      key={fl.to}
                      to={fl.to}
                      id={`nav-${fl.label.toLowerCase().replace(/\s+/g, '-')}`}
                      style={({ isActive }) => ({
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                        padding: '10px 12px', borderRadius: 10, textDecoration: 'none',
                        background: isActive ? '#f0fdf4' : 'transparent',
                        border: isActive ? '1px solid #bbf7d0' : '1px solid transparent',
                        transition: 'all 0.15s',
                      })}
                      onMouseEnter={e => { if (!e.currentTarget.style.background?.includes('f0fdf4')) e.currentTarget.style.background = '#f8faf5' }}
                      onMouseLeave={e => { e.currentTarget.style.background = '' }}
                    >
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: 'linear-gradient(135deg,#dcfce7,#f0fdf4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0, border: '1px solid #bbf7d0' }}>
                        {fl.icon}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text)' }}>{fl.label}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 1 }}>{fl.sub}</div>
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </li>

            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} id="nav-about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} id="nav-contact">Contact</NavLink>
            </li>

            {/* Logout / Switch Farmer button */}
            <li>
              <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#ef4444', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, padding: '6px 12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.08)' }} title="Switch / Logout Farmer">
                <LogOut size={14} />
                Exit / Login
              </Link>
            </li>

            <li>
              <Link to="/assistant" className="btn-nav" id="nav-doctor-cta" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>
                <Sparkles size={14} />
                Ask Plant Doctor
              </Link>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button className="navbar-menu-btn" id="nav-menu-toggle" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobile-menu">
        <NavLink to="/home" end id="mobile-home">🏠 Home</NavLink>
        <NavLink to="/guide" id="mobile-guide">📖 How to Grow Crops (Step-by-Step)</NavLink>
        <NavLink to="/mandi" id="mobile-mandi">💰 Mandi Prices & Profit Calculator</NavLink>
        <NavLink to="/assistant" id="mobile-plant-doctor">🩺 AI Plant Doctor & Leaf Scanner</NavLink>
        <div style={{ padding: '8px 16px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>All Features</div>
        {FEATURES_LINKS.map(fl => (
          <NavLink key={fl.to} to={fl.to} id={`mobile-${fl.label.toLowerCase().replace(/\s+/g, '-')}`} style={{ paddingLeft: '2rem' }}>
            {fl.label}
          </NavLink>
        ))}
        <NavLink to="/about" id="mobile-about">About</NavLink>
        <NavLink to="/contact" id="mobile-contact">Contact</NavLink>
        <NavLink to="/login" id="mobile-logout" style={{ color: '#ef4444' }}>🚪 Farmer Login / Switch</NavLink>
        <Link to="/assistant" className="btn btn-primary" style={{ marginTop: 8, justifyContent: 'center' }}>
          <Sparkles size={16} />
          Ask Plant Doctor AI
        </Link>
      </div>
    </>
  )
}
