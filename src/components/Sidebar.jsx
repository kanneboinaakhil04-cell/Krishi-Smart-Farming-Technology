import React, { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Activity, BookOpen, Store, Bot,
  Cloud, Droplets, Calculator, ChevronLeft, ChevronRight,
  Leaf, Info, Phone, LogOut, Sparkles, Shield, User,
  Bell, HelpCircle
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation()
  const { t } = useLanguage()
  const isLoginPage = location.pathname === '/' || location.pathname === '/login'

  const sidebarItems = [
    { to: '/home',        icon: <Leaf size={18} />,            label: t.home || 'Home & Overview',   badge: 'Home' },
    { to: '/dashboard',   icon: <LayoutDashboard size={18} />, label: t.dashboard || 'Farm Dashboard',    badge: 'Live' },
    { to: '/guide',       icon: <BookOpen size={18} />,        label: t.cropGuide || 'Step-by-Step Guide', badge: 'Manual' },
    { to: '/mandi',       icon: <Store size={18} />,           label: t.mandiPrices || 'Mandi Prices & Profit', badge: 'APMC' },
    { to: '/assistant',   icon: <Bot size={18} />,             label: t.plantDoctor || 'AI Plant Doctor',   badge: 'Camera' },
    { to: '/weather',     icon: <Cloud size={18} />,           label: t.weatherRadar || 'Weather & Soil Radar', badge: 'GPS' },
    { to: '/sensors',     icon: <Activity size={18} />,        label: t.iotSensors || 'IoT Sensors Panel', badge: 'IoT' },
    { to: '/calculator',  icon: <Calculator size={18} />,      label: t.cropCalculator || 'Planting Calculator', badge: 'Acre' },
    { to: '/schemes',     icon: <Shield size={18} />,          label: t.schemes || 'Govt Schemes & Subsidies', badge: 'Govt' },
    { to: '/khata',       icon: <BookOpen size={18} />,        label: t.expenseKhata || 'Farm Expense Khata', badge: 'Khata' },
  ]

  if (isLoginPage) return null

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: collapsed ? '76px' : '260px',
        background: '#0d2818',
        backgroundLinear: 'linear-gradient(180deg, #092012 0%, #0d2818 50%, #05190d 100%)',
        borderRight: '1px solid rgba(34, 197, 94, 0.2)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.4)',
        overflowX: 'hidden'
      }}
      id="krishi-left-sidebar"
    >
      {/* Top Header / Brand Logo */}
      <div>
        <div style={{
          padding: collapsed ? '1.25rem 0.75rem' : '1.25rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <Link
            to="/home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none',
              color: '#fff'
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #22c55e, #15803d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
            }}>
              <Leaf size={20} />
            </div>
            {!collapsed && (
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  Krishi<span style={{ color: '#4ade80', fontSize: '0.85em' }}>Smart</span>
                </div>
                <div style={{ fontSize: '0.68rem', color: '#86efac', fontWeight: 600, letterSpacing: '0.04em' }}>
                  FARMER DASHBOARD
                </div>
              </div>
            )}
          </Link>

          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                borderRadius: '6px',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Collapse sidebar"
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {collapsed && (
          <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            <button
              onClick={() => setCollapsed(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#86efac',
                cursor: 'pointer',
                borderRadius: '6px',
                padding: '4px',
                display: 'inline-flex'
              }}
              title="Expand sidebar"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Section Label */}
        {!collapsed && (
          <div style={{
            padding: '1.1rem 1.25rem 0.4rem',
            fontSize: '0.68rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#64748b'
          }}>
            Farm Navigation
          </div>
        )}

        {/* Navigation Items */}
        <nav style={{ padding: '0.5rem 0.6rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {sidebarItems.map((item) => {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: collapsed ? '0.65rem 0' : '0.65rem 0.85rem',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#fff' : '#cbd5e1',
                  background: isActive ? 'linear-gradient(90deg, rgba(34, 197, 94, 0.25), rgba(34, 197, 94, 0.08))' : 'transparent',
                  borderLeft: isActive ? '3px solid #22c55e' : '3px solid transparent',
                  transition: 'all 0.15s',
                  position: 'relative'
                })}
                title={collapsed ? item.label : undefined}
              >
                <span style={{ color: '#4ade80', flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && (
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.label}
                  </span>
                )}
                {!collapsed && item.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#86efac'
                  }}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Bottom Area: AI Doctor Quick Prompt + Farmer Profile / Exit */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        {!collapsed && (
          <Link
            to="/assistant"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(21, 128, 61, 0.25))',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              padding: '0.7rem 0.85rem',
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#fff',
              marginBottom: '0.75rem'
            }}
          >
            <Sparkles size={18} color="#4ade80" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#4ade80' }}>{t.takePlantPic || 'Take Plant Pic'}</div>
              <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>{t.plantDoctor || 'Ask AI Plant Doctor'}</div>
            </div>
          </Link>
        )}

        {/* Company & Support links */}
        {!collapsed && (
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 0.4rem 0.5rem', fontSize: '0.72rem', color: '#94a3b8' }}>
            <Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t.about || 'About'}</Link>
            <Link to="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t.helpDesk || 'Help Desk'}</Link>
            <span style={{ color: '#4ade80' }}>v2.4 Live</span>
          </div>
        )}

        {/* Exit / Switch Farmer */}
        <Link
          to="/login"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '0.65rem',
            padding: '0.6rem 0.75rem',
            borderRadius: '8px',
            color: '#f87171',
            background: 'rgba(239, 68, 68, 0.08)',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 600,
            transition: 'all 0.2s'
          }}
          title="Switch Farmer / Logout"
        >
          <LogOut size={16} />
          {!collapsed && <span>{t.switchFarmer || 'Exit / Switch Farmer'}</span>}
        </Link>
      </div>
    </aside>
  )
}
