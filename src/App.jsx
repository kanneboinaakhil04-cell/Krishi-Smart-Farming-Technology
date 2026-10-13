import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopHeader from './components/TopHeader'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import IrrigationPage from './pages/IrrigationPage'
import AIAssistant from './pages/AIAssistant'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CropCalculator from './pages/CropCalculator'
import SensorPanel from './pages/SensorPanel'
import WeatherPage from './pages/WeatherPage'
import CropGuidePage from './pages/CropGuidePage'
import MandiPricePage from './pages/MandiPricePage'

import KisanSchemesPage from './pages/KisanSchemesPage'
import FarmExpenseKhataPage from './pages/FarmExpenseKhataPage'

function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/' || location.pathname === '/login'
  const [collapsed, setCollapsed] = useState(false)

  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setCollapsed(true)
      } else {
        setCollapsed(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'transparent' }}>
      {/* ── Left-Side Dashboard Sidebar ── */}
      {!isLoginPage && <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}

      {/* ── Main Content Area (Offset for left sidebar) ── */}
      <div style={{
        flex: 1,
        minWidth: 0,
        maxWidth: isLoginPage ? '100%' : (collapsed ? 'calc(100vw - 76px)' : 'calc(100vw - 260px)'),
        marginLeft: isLoginPage ? 0 : (collapsed ? '76px' : '260px'),
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}>
        {/* Top Header bar */}
        {!isLoginPage && <TopHeader collapsed={collapsed} setCollapsed={setCollapsed} />}

        {/* Inner Content with top offset when header is visible */}
        <main style={{ flex: 1, paddingTop: isLoginPage ? 0 : '64px', minWidth: 0, boxSizing: 'border-box' }}>
          <Routes>
            {/* First page is Farmer Login */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Main Application Pages */}
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schemes" element={<KisanSchemesPage />} />
            <Route path="/khata" element={<FarmExpenseKhataPage />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/calculator" element={<CropCalculator />} />
            <Route path="/sensors" element={<SensorPanel />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/guide" element={<CropGuidePage />} />
            <Route path="/mandi" element={<MandiPricePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {!isLoginPage && <Footer />}
      </div>
    </div>
  )
}

export default App
