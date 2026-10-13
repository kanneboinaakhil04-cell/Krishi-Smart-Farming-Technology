import React from 'react'
import { Palette, Check, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

export default function ThemeToggle() {
  const { theme, changeTheme } = useTheme()
  const { lang } = useLanguage()

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.08)',
      padding: '3px',
      borderRadius: '999px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      gap: '2px'
    }} title="Change Color Theme: White & Green / Deep Green">
      {/* White & Green Option */}
      <button
        type="button"
        onClick={() => changeTheme('white')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '4px 10px',
          borderRadius: '999px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.75rem',
          fontWeight: 700,
          transition: 'all 0.2s',
          background: theme === 'white' ? '#ffffff' : 'transparent',
          color: theme === 'white' ? '#166534' : '#f1f5f9',
          boxShadow: theme === 'white' ? '0 2px 8px rgba(0,0,0,0.25)' : 'none'
        }}
      >
        <span style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#16a34a',
          border: '1.5px solid #fff',
          display: 'inline-block'
        }} />
        <span>{lang === 'te' ? 'తెలుపు & ఆకుపచ్చ' : lang === 'hi' ? 'सफेद और हरा' : 'White & Green'}</span>
      </button>

      {/* Deep Green Farm Wallpaper Option */}
      <button
        type="button"
        onClick={() => changeTheme('green')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '4px 10px',
          borderRadius: '999px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.75rem',
          fontWeight: 700,
          transition: 'all 0.2s',
          background: theme === 'green' ? 'linear-gradient(135deg, #16a34a, #15803d)' : 'transparent',
          color: theme === 'green' ? '#ffffff' : '#f1f5f9',
          boxShadow: theme === 'green' ? '0 2px 8px rgba(22, 101, 52, 0.4)' : 'none'
        }}
      >
        <span style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#4ade80',
          display: 'inline-block'
        }} />
        <span>{lang === 'te' ? 'ముదురు ఆకుపచ్చ' : lang === 'hi' ? 'गहरा हरा' : 'Deep Green'}</span>
      </button>
    </div>
  )
}
