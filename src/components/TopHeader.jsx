import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu, X, Bell, User, MapPin, Sparkles, LogOut,
  Droplets, ShieldCheck, Camera
} from 'lucide-react'
import LanguageSelector from './LanguageSelector'
import ThemeToggle from './ThemeToggle'
import { useLanguage } from '../context/LanguageContext'

export default function TopHeader({ collapsed, setCollapsed }) {
  const location = useLocation()
  const { t } = useLanguage()
  const isLoginPage = location.pathname === '/' || location.pathname === '/login'

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
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

        {/* Farmer Profile Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0.35rem 0.75rem',
          borderRadius: '999px',
          fontSize: '0.8rem',
          color: '#e2e8f0'
        }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#22c55e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>
            K
          </div>
          <span style={{ fontWeight: 600 }}>Kisan Mitra</span>
        </div>
      </div>
    </header>
  )
}
