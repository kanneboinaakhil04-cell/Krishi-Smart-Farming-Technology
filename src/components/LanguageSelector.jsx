import React, { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
]

export default function LanguageSelector({ variant = 'default' }) {
  const { lang, changeLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          background: 'rgba(255, 255, 255, 0.12)',
          border: '1px solid rgba(74, 222, 128, 0.4)',
          color: '#ffffff',
          padding: '0.4rem 0.85rem',
          borderRadius: '999px',
          fontSize: '0.82rem',
          fontWeight: 700,
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
        }}
        title="Change Language / భాషను ఎంచుకోండి / भाषा चुनें"
      >
        <Globe size={15} color="#4ade80" />
        <span style={{ color: '#ffffff', fontWeight: 700 }}>{currentLang.native}</span>
        <ChevronDown size={13} color="#ffffff" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          right: 0,
          background: '#0d2818',
          border: '1px solid rgba(74, 222, 128, 0.3)',
          borderRadius: '12px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
          padding: '0.4rem',
          zIndex: 1100,
          minWidth: '170px',
          backdropFilter: 'blur(16px)'
        }}>
          <div style={{ padding: '0.35rem 0.6rem', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#86efac', letterSpacing: '0.05em' }}>
            Select Language / భాష
          </div>
          {LANGUAGES.map(l => {
            const isSelected = l.code === lang
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  changeLanguage(l.code)
                  setIsOpen(false)
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '8px',
                  background: isSelected ? 'rgba(34, 197, 94, 0.25)' : 'transparent',
                  border: 'none',
                  color: isSelected ? '#4ade80' : '#e2e8f0',
                  fontSize: '0.84rem',
                  fontWeight: isSelected ? 800 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{l.flag}</span>
                  <div>
                    <div>{l.native}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{l.label}</div>
                  </div>
                </div>
                {isSelected && <Check size={14} color="#4ade80" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
