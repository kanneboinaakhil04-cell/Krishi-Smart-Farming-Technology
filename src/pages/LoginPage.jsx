import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Leaf, User, Lock, Phone, ArrowRight, ShieldCheck,
  Sprout, Sparkles, CheckCircle2, AlertCircle, HelpCircle
} from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import { useLanguage } from '../context/LanguageContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [authMode, setAuthMode] = useState('otp') // 'otp' | 'password'
  const [mobileNumber, setMobileNumber] = useState('')
  const [farmerName, setFarmerName] = useState('')
  const [villageDistrict, setVillageDistrict] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSendOtp = (e) => {
    e?.preventDefault()
    if (!mobileNumber || mobileNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number')
      return
    }
    setErrorMsg('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOtpSent(true)
    }, 800)
  }

  const handleFarmerLogin = (e) => {
    e.preventDefault()
    if (!mobileNumber || mobileNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number')
      return
    }
    if (authMode === 'otp' && otpSent && otp.length < 4) {
      setErrorMsg('Please enter the 4-digit OTP (e.g. 1234)')
      return
    }
    if (authMode === 'password' && !password) {
      setErrorMsg('Please enter your password / Kisan PIN')
      return
    }

    setLoading(true)
    setErrorMsg('')
    setTimeout(() => {
      setLoading(false)
      // Save farmer profile to localStorage
      const profile = {
        name: farmerName || 'Kisan Mitra',
        mobile: mobileNumber,
        district: villageDistrict || 'Telangana / Andhra / Karnataka',
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      }
      localStorage.setItem('krishi_farmer_user', JSON.stringify(profile))
      navigate('/home')
    }, 700)
  }

  const handleDemoQuickAccess = () => {
    const profile = {
      name: 'Ramesh Patel (Farmer)',
      mobile: '9876543210',
      district: 'Guntur / Kolar Agro Zone',
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    }
    localStorage.setItem('krishi_farmer_user', JSON.stringify(profile))
    navigate('/home')
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 10% 20%, rgba(15, 23, 42, 0.9), rgba(5, 46, 22, 0.85)), url(/farm_wallpaper.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '1.5rem',
      position: 'relative'
    }}>
      {/* Background Dim with farm aesthetic */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5, 30, 15, 0.72)', backdropFilter: 'blur(3px)' }} />

      {/* Top Floating Language Bar on Login */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: 'rgba(15, 23, 42, 0.85)',
        padding: '0.4rem 0.8rem',
        borderRadius: '999px',
        border: '1px solid rgba(74, 222, 128, 0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <span style={{ fontSize: '0.75rem', color: '#86efac', fontWeight: 600 }}>Language / భాష / भाषा:</span>
        <LanguageSelector />
      </div>

      {/* Main Container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '920px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1.05fr 1fr',
        background: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(18px)',
        borderRadius: '24px',
        border: '1px solid rgba(74, 222, 128, 0.3)',
        boxShadow: '0 25px 60px -15px rgba(0,0,0,0.7)',
        overflow: 'hidden'
      }}>
        {/* Left Side: Welcoming Visual Branding */}
        <div style={{
          padding: '3rem 2.5rem',
          background: 'linear-gradient(135deg, rgba(20, 83, 45, 0.88), rgba(6, 78, 59, 0.92))',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255, 255, 255, 0.15)', padding: '0.4rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem', color: '#86efac' }}>
              <Leaf size={18} /> Krishi • {t.farmerPortal || 'Kisan Portal'}
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              {t.farmerLogin || 'Farmer Login'} <br />
              <span style={{ color: '#4ade80' }}>రైతు / किसान</span>
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              {t.brandSubtitle || 'Smart Technology, Better Farming'}. Access step-by-step crop growing manuals, real-time APMC Mandi prices, live soil moisture telemetry, and AI plant disease diagnosis.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#e2e8f0' }}>
                <CheckCircle2 size={18} color="#4ade80" /> {t.cropGuide || 'Step-by-Step Crop Cultivation & Daily Instructions'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#e2e8f0' }}>
                <CheckCircle2 size={18} color="#4ade80" /> {t.mandiPrices || 'Real-time Mandi APMC Market Prices & Profit Calculator'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#e2e8f0' }}>
                <CheckCircle2 size={18} color="#4ade80" /> {t.takePlantPic || 'Take Leaf Photo & Ask AI Plant Doctor Instantly'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#e2e8f0' }}>
                <CheckCircle2 size={18} color="#4ade80" /> {t.weatherRadar || 'Live Satellite Weather & Subterranean Soil Moisture'}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.15)', fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={16} color="#4ade80" /> Verified Kisan Authentication • Free for all Farmers
          </div>
        </div>

        {/* Right Side: Farmer Login Form */}
        <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: '0 0 0.35rem 0' }}>
              {t.farmerLogin || 'Sign In to Your Farm'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
              Enter your mobile number to receive a secure Kisan verification code.
            </p>
          </div>

          {/* Mode Switcher: OTP or Password */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', padding: '0.25rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <button
              type="button"
              onClick={() => { setAuthMode('otp'); setOtpSent(false); }}
              style={{
                flex: 1,
                padding: '0.55rem',
                borderRadius: '8px',
                border: 'none',
                background: authMode === 'otp' ? 'var(--primary)' : 'transparent',
                color: authMode === 'otp' ? '#fff' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Mobile OTP (OTP)
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('password')}
              style={{
                flex: 1,
                padding: '0.55rem',
                borderRadius: '8px',
                border: 'none',
                background: authMode === 'password' ? 'var(--primary)' : 'transparent',
                color: authMode === 'password' ? '#fff' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {t.kisanPin || 'Kisan PIN / Password'}
            </button>
          </div>

          {errorMsg && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              padding: '0.65rem 0.9rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <AlertCircle size={15} /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleFarmerLogin}>
            {/* Farmer Name (Optional) */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.35rem' }}>
                {t.farmerName || 'Farmer Name'} (Optional)
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  type="text"
                  placeholder="e.g. Ramesh Patel, Gurpreet Singh"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.35rem' }}>
                Mobile Number / मोबाइल नंबर *
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{
                  padding: '0.65rem 0.85rem',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '10px',
                  color: '#94a3b8',
                  fontSize: '0.9rem',
                  fontWeight: 700
                }}>
                  +91
                </div>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Phone size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* OTP Mode */}
            {authMode === 'otp' && (
              <div style={{ marginBottom: '1.25rem' }}>
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading || mobileNumber.length < 10}
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      background: mobileNumber.length === 10 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.05)',
                      color: mobileNumber.length === 10 ? '#4ade80' : '#64748b',
                      border: '1px solid ' + (mobileNumber.length === 10 ? 'rgba(74, 222, 128, 0.4)' : 'rgba(255,255,255,0.1)'),
                      borderRadius: '10px',
                      fontWeight: 700,
                      cursor: mobileNumber.length === 10 ? 'pointer' : 'not-allowed',
                      fontSize: '0.85rem'
                    }}
                  >
                    {loading ? 'Sending OTP…' : 'Send 4-Digit OTP Code'}
                  </button>
                ) : (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#4ade80' }}>
                        Enter 4-Digit OTP (Sent to +91 {mobileNumber})
                      </label>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Resend OTP
                      </button>
                    </div>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="e.g. 1 2 3 4"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        background: 'rgba(34, 197, 94, 0.08)',
                        border: '1px solid #22c55e',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '1.2rem',
                        letterSpacing: '0.3em',
                        textAlign: 'center',
                        fontWeight: 800
                      }}
                      autoFocus
                    />
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem', textAlign: 'center' }}>
                      💡 Demo Mode: Type any 4 digits (e.g. <strong>1234</strong>) to login.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Password Mode */}
            {authMode === 'password' && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.35rem' }}>
                  Kisan PIN / Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    type="password"
                    placeholder="Enter your secret PIN"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 8px 20px -4px rgba(34, 197, 94, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              {loading ? 'Logging In…' : (t.enterDashboard || 'Enter Krishi Dashboard')}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Demo Access Bypass Button */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.75rem' }}>or instant access without registration:</div>
            <button
              type="button"
              onClick={handleDemoQuickAccess}
              style={{
                width: '100%',
                padding: '0.6rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#86efac',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <Sparkles size={16} /> {t.quickGuestLogin || 'Quick Farmer Guest Login (1-Click)'}
            </button>
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
            Need help? Call Toll-Free Kisan Helpline: <strong>1800-180-1551</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
