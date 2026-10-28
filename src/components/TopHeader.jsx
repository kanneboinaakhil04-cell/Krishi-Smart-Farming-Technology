import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu, X, Bell, User, MapPin, Sparkles, LogOut,
  Droplets, ShieldCheck, Camera, Edit2, Check, ChevronDown, Layers, Phone
} from 'lucide-react'
import LanguageSelector from './LanguageSelector'
import ThemeToggle from './ThemeToggle'
import { useLanguage } from '../context/LanguageContext'
import { useFarmer, getFarmerInitials } from '../context/FarmerContext'

export default function TopHeader({ collapsed, setCollapsed }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { t, lang } = useLanguage()
  const { farmer, updateFarmerProfile, logout } = useFarmer()
  const [profileOpen, setProfileOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(farmer?.name || '')
  const [editDistrict, setEditDistrict] = useState(farmer?.district || '')
  const [editFarmSize, setEditFarmSize] = useState(farmer?.farmSize || '')
  const [editMobile, setEditMobile] = useState(farmer?.mobile || '')

  const popoverRef = useRef(null)
  const isLoginPage = location.pathname === '/' || location.pathname === '/login'

  // Sync edits if farmer changes
  useEffect(() => {
    if (farmer) {
      setEditName(farmer.name || '')
      setEditDistrict(farmer.district || '')
      setEditFarmSize(farmer.farmSize || '')
      setEditMobile(farmer.mobile || '')
    }
  }, [farmer])

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setProfileOpen(false)
        setIsEditing(false)
      }
    }
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileOpen])

  if (isLoginPage) return null

  // Get active page title
  const pageTitles = {
    '/home': t.home || 'Farm Dashboard & Field Overview',
    '/dashboard': t.dashboard || 'Multi-Zone Field Monitoring',
    '/guide': t.cropGuide || 'How to Grow Crops — Step-by-Step Manuals',
    '/mandi': t.mandiPrices || 'Live APMC Mandi Rates & Profit Calculator',
    '/assistant': t.plantDoctor || 'Krishi AI Plant Doctor & Leaf Scanner',
    '/weather': t.weatherRadar || 'Live Satellite Weather & Soil Radar',
    '/sensors': t.iotSensors || 'Real IoT Sensor Network Panel',
    '/calculator': t.cropCalculator || 'Crop Planting & Acreage Calculator',
    '/schemes': t.schemes || 'Government Schemes & Subsidies',
    '/khata': t.expenseKhata || 'Farm Expense Khata & Ledger',
    '/about': t.about || 'About Krishi Smart Agriculture',
    '/contact': t.contact || 'Farmer Support & Contact Desk'
  }

  const currentTitle = pageTitles[location.pathname] || 'Krishi Smart Agriculture Platform'

  const handleSaveProfile = (e) => {
    e.preventDefault()
    if (!editName.trim()) return
    updateFarmerProfile({
      name: editName.trim(),
      district: editDistrict.trim(),
      farmSize: editFarmSize.trim(),
      mobile: editMobile.trim()
    })
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    setProfileOpen(false)
    navigate('/login')
  }

  const farmerName = farmer?.name || 'Kisan Mitra'
  const initials = getFarmerInitials(farmerName)

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: collapsed ? '76px' : '260px',
        right: 0,
        height: '64px',
        background: 'var(--header-bg, rgba(15, 23, 42, 0.92))',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
        zIndex: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      id="krishi-top-header"
    >
      {/* Left: Toggle & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: 'var(--text-primary, #fff)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Toggle navigation"
        >
          <Menu size={18} />
        </button>

        <div>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary, #fff)', letterSpacing: '-0.01em' }}>
            {currentTitle}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            {t.liveStatus || 'Agro-Telemetry Live • Kharif / Rabi Season Active'}
          </div>
        </div>
      </div>

      {/* Right: Theme Color Switcher, Language Selector, Quick Plant Pic CTA & Farmer Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', position: 'relative' }}>
        <ThemeToggle />
        <LanguageSelector />

        <Link
          to="/assistant"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            color: '#fff',
            textDecoration: 'none',
            padding: '0.45rem 0.9rem',
            borderRadius: '999px',
            fontSize: '0.82rem',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
          }}
        >
          <Camera size={14} />
          <span>{t.askPlantDoctor || 'Ask Plant Doctor'}</span>
        </Link>

        {/* Farmer Profile Pill & Dropdown Toggle */}
        <div ref={popoverRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: profileOpen ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              border: '1px solid ' + (profileOpen ? '#22c55e' : 'rgba(255, 255, 255, 0.15)'),
              padding: '0.35rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              color: '#e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title="Click to view & edit farmer profile"
          >
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22c55e, #15803d)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.72rem',
              fontWeight: 800,
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}>
              {initials}
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
              <span style={{ fontWeight: 700, color: '#fff', display: 'block' }}>
                {farmerName}
              </span>
              {farmer?.district && (
                <span style={{ fontSize: '0.66rem', color: '#86efac', display: 'block' }}>
                  {farmer.district.split(',')[0]}
                </span>
              )}
            </div>
            <ChevronDown size={14} color="#94a3b8" />
          </button>

          {/* Interactive Farmer Profile Dropdown Popover */}
          {profileOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '310px',
              background: '#0d2818',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              padding: '1.25rem',
              zIndex: 1000,
              color: '#fff',
              backdropFilter: 'blur(20px)'
            }}>
              {!isEditing ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      fontWeight: 900,
                      color: '#fff',
                      boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)'
                    }}>
                      {initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {farmerName}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <ShieldCheck size={13} /> Verified Kisan Member
                      </div>
                    </div>
                  </div>

                  {/* Profile Details List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                    {farmer?.mobile && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                        <Phone size={14} color="#86efac" />
                        <span>+91 {farmer.mobile}</span>
                      </div>
                    )}
                    {farmer?.district && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                        <MapPin size={14} color="#86efac" />
                        <span>{farmer.district}</span>
                      </div>
                    )}
                    {farmer?.farmSize && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                        <Layers size={14} color="#86efac" />
                        <span>Land: {farmer.farmSize}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions: Edit Profile & Switch Farmer */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        background: 'rgba(34, 197, 94, 0.15)',
                        border: '1px solid rgba(74, 222, 128, 0.4)',
                        color: '#4ade80',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Edit2 size={13} /> {t.editProfile || 'Edit Name'}
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      style={{
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(239, 68, 68, 0.12)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem'
                      }}
                      title="Switch Farmer"
                    >
                      <LogOut size={13} />
                    </button>
                  </div>
                </div>
              ) : (
                /* Edit Mode */
                <form onSubmit={handleSaveProfile}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#4ade80', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Edit2 size={14} /> {t.editProfile || 'Edit Farmer Details'}
                  </div>

                  <div style={{ marginBottom: '0.65rem' }}>
                    <label style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
                      {t.farmerName || 'Farmer Name'} *
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.45rem 0.65rem',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid #22c55e',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '0.82rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '0.65rem' }}>
                    <label style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
                      {t.villageDistrict || 'Village / District'}
                    </label>
                    <input
                      type="text"
                      value={editDistrict}
                      onChange={(e) => setEditDistrict(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.45rem 0.65rem',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '0.82rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '0.85rem' }}>
                    <label style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
                      {t.farmSize || 'Land Size (Acres)'}
                    </label>
                    <input
                      type="text"
                      value={editFarmSize}
                      onChange={(e) => setEditFarmSize(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.45rem 0.65rem',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '0.82rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="submit"
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        background: '#22c55e',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Check size={14} /> {t.saveProfile || 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: '#cbd5e1',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
