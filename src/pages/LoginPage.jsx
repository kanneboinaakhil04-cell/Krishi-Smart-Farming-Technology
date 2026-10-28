import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Leaf, User, Lock, Phone, ArrowRight, ShieldCheck,
  Sprout, Sparkles, CheckCircle2, AlertCircle, MapPin, Layers
} from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import { useLanguage } from '../context/LanguageContext'
import { useFarmer } from '../context/FarmerContext'

const DEMO_FARMERS = [
  {
    name: 'Ramesh Patel',
    mobile: '9876543210',
    district: 'Guntur, Andhra Pradesh',
    farmSize: '4.5 Acres',
    primaryCrop: 'Chilli / Paddy'
  },
  {
    name: 'Venkatesh Rao',
    mobile: '9848022334',
    district: 'Warangal, Telangana',
    farmSize: '3.0 Acres',
    primaryCrop: 'Cotton / Maize'
  },
  {
    name: 'Lakshmi Devi',
    mobile: '9448155667',
    district: 'Kolar, Karnataka',
    farmSize: '2.5 Acres',
    primaryCrop: 'Tomato / Vegetables'
  }
]

export default function LoginPage() {
  const navigate = useNavigate()
  const { t, lang } = useLanguage()
  const { login } = useFarmer()

  const [authMode, setAuthMode] = useState('otp') // 'otp' | 'password'
  const [farmerName, setFarmerName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [villageDistrict, setVillageDistrict] = useState('')
  const [farmSize, setFarmSize] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSendOtp = (e) => {
    e?.preventDefault()
    if (!farmerName.trim()) {
      setErrorMsg(
        lang === 'te'
          ? 'దయచేసి మీ పేరు నమోదు చేయండి (రైతు పేరు తప్పనిసరి)'
          : lang === 'hi'
          ? 'कृपया अपना नाम दर्ज करें (किसान का नाम अनिवार्य है)'
          : 'Please enter your Farmer Name to proceed'
      )
      return
    }
    if (!mobileNumber || mobileNumber.length < 10) {
      setErrorMsg(
        lang === 'te'
          ? 'దయచేసి సరైన 10-అంకెల మొబైల్ నంబర్ నమోదు చేయండి'
          : 'Please enter a valid 10-digit mobile number'
      )
      return
    }
    setErrorMsg('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOtpSent(true)
    }, 600)
  }

  const handleFarmerLogin = (e) => {
    e.preventDefault()

    if (!farmerName.trim()) {
      setErrorMsg(
        lang === 'te'
          ? 'దయచేసి మీ పేరు నమోదు చేయండి (రైతు పేరు తప్పనిసరి)'
          : lang === 'hi'
          ? 'कृपया अपना नाम दर्ज करें (किसान का नाम अनिवार्य है)'
          : 'Please enter your Farmer Name'
      )
      return
    }

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
      const profile = {
        name: farmerName.trim(),
        mobile: mobileNumber,
        district: villageDistrict.trim() || 'Andhra / Telangana Agro Zone',
        farmSize: farmSize.trim() || '3.5 Acres',
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      }
      login(profile)
      navigate('/home')
    }, 600)
  }

  const handleSelectDemoProfile = (demo) => {
    setFarmerName(demo.name)
    setMobileNumber(demo.mobile)
    setVillageDistrict(demo.district)
    setFarmSize(demo.farmSize)
    login({
      ...demo,
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    })
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
        maxWidth: '960px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(18px)',
        borderRadius: '24px',
        border: '1px solid rgba(74, 222, 128, 0.3)',
        boxShadow: '0 25px 60px -15px rgba(0,0,0,0.7)',
        overflow: 'hidden'
      }}>
        {/* Left Side: Welcoming Visual Branding */}
        <div style={{
          padding: '3rem 2.5rem',
          background: 'linear-gradient(135deg, rgba(20, 83, 45, 0.92), rgba(6, 78, 59, 0.95))',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.4rem 0.9rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              color: '#86efac'
            }}>
              <Leaf size={18} /> Krishi • {t.farmerPortal || 'Kisan Portal'}
            </div>
            <h1 style={{ fontSize: '2.3rem', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              {t.farmerLogin || 'Farmer Login'} <br />
              <span style={{ color: '#4ade80' }}>రైతు / किसान</span>
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              {t.brandSubtitle || 'Smart Technology, Better Farming'}. Enter your farmer details to access personalized crop guides, live Mandi rates, and AI plant disease doctor.
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
        <div style={{ padding: '2.5rem 2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', margin: '0 0 0.35rem 0' }}>
              {t.farmerLogin || 'Sign In to Your Farm'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
              Enter your name and mobile number to personalize your agricultural portal.
            </p>
          </div>

          {/* Mode Switcher: OTP or Password */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', padding: '0.25rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
            <button
              type="button"
              onClick={() => { setAuthMode('otp'); setOtpSent(false); }}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '8px',
                border: 'none',
                background: authMode === 'otp' ? 'var(--primary)' : 'transparent',
                color: authMode === 'otp' ? '#fff' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.82rem',
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
                padding: '0.5rem',
                borderRadius: '8px',
                border: 'none',
                background: authMode === 'password' ? 'var(--primary)' : 'transparent',
                color: authMode === 'password' ? '#fff' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.82rem',
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
            {/* Farmer Name (Required & Highlighted) */}
            <div style={{ marginBottom: '0.9rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#86efac', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <User size={15} />
                {t.farmerName || 'Farmer Name'} / రైతు పేరు *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Patel, Venkatesh Rao, Gurpreet Singh"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    background: 'rgba(34, 197, 94, 0.08)',
                    border: '1.5px solid #22c55e',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    outline: 'none',
                    boxShadow: '0 0 12px rgba(34, 197, 94, 0.15)'
                  }}
                />
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                This name will be displayed across your Farm Dashboard, Khata Ledger, and AI Doctor.
              </div>
            </div>

            {/* Mobile Number */}
            <div style={{ marginBottom: '0.9rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.35rem' }}>
                {t.mobileNumber || 'Mobile Number'} / మొబైల్ నంబర్ *
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

            {/* Village & District (Optional) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '0.9rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  {t.villageDistrict || 'Village / District'}
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={14} style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    type="text"
                    placeholder="e.g. Guntur, Warangal"
                    value={villageDistrict}
                    onChange={(e) => setVillageDistrict(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.65rem 0.55rem 1.9rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.82rem'
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  {t.farmSize || 'Land Size'}
                </label>
                <div style={{ position: 'relative' }}>
                  <Layers size={14} style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    type="text"
                    placeholder="e.g. 4.5 Acres"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.65rem 0.55rem 1.9rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.82rem'
                    }}
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
                    disabled={loading || mobileNumber.length < 10 || !farmerName.trim()}
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      background: (mobileNumber.length === 10 && farmerName.trim()) ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.05)',
                      color: (mobileNumber.length === 10 && farmerName.trim()) ? '#4ade80' : '#64748b',
                      border: '1px solid ' + ((mobileNumber.length === 10 && farmerName.trim()) ? 'rgba(74, 222, 128, 0.4)' : 'rgba(255,255,255,0.1)'),
                      borderRadius: '10px',
                      fontWeight: 700,
                      cursor: (mobileNumber.length === 10 && farmerName.trim()) ? 'pointer' : 'not-allowed',
                      fontSize: '0.85rem'
                    }}
                  >
                    {loading ? 'Sending OTP…' : (t.sendOtp || 'Send 4-Digit OTP Code')}
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
                  {t.kisanPin || 'Kisan PIN / Password'} *
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

          {/* Quick 1-Click Demo Farmers */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.65rem', textAlign: 'center', fontWeight: 600 }}>
              ⚡ Or 1-Click Quick Login as a Demo Farmer:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
              {DEMO_FARMERS.map((d) => (
                <button
                  key={d.name}
                  type="button"
                  onClick={() => handleSelectDemoProfile(d)}
                  style={{
                    padding: '0.5rem 0.6rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(74, 222, 128, 0.25)',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                    fontSize: '0.75rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.15)'
                    e.currentTarget.style.borderColor = '#4ade80'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.25)'
                  }}
                >
                  <div style={{ fontWeight: 800, color: '#86efac', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <User size={12} /> {d.name}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '2px' }}>
                    {d.district.split(',')[0]} • {d.farmSize}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
            Need help? Call Toll-Free Kisan Helpline: <strong>1800-180-1551</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
