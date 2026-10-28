import React, { createContext, useContext, useState, useEffect } from 'react'

export const DEFAULT_FARMER = {
  name: 'Ramesh Patel',
  mobile: '9876543210',
  district: 'Guntur, Andhra Pradesh',
  state: 'Andhra Pradesh',
  farmSize: '4.5 Acres',
  primaryCrop: 'Paddy / Chilli',
  isLoggedIn: true,
  loginTime: new Date().toISOString()
}

export function getFarmerInitials(name) {
  if (!name) return 'KM'
  const cleaned = name.replace(/[^a-zA-Z\s]/g, '').trim()
  if (!cleaned) return name.slice(0, 2).toUpperCase()
  const parts = cleaned.split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return cleaned.slice(0, 2).toUpperCase()
}

const FarmerContext = createContext()

export function FarmerProvider({ children }) {
  const [farmer, setFarmer] = useState(() => {
    try {
      const saved = localStorage.getItem('krishi_farmer_user')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to parse krishi_farmer_user from localStorage', e)
    }
    return DEFAULT_FARMER
  })

  const saveFarmer = (profile) => {
    setFarmer(profile)
    try {
      localStorage.setItem('krishi_farmer_user', JSON.stringify(profile))
    } catch (e) {
      console.error('Failed to save krishi_farmer_user to localStorage', e)
    }
  }

  const login = (farmerData) => {
    const profile = {
      ...DEFAULT_FARMER,
      ...farmerData,
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    }
    saveFarmer(profile)
  }

  const logout = () => {
    const guest = {
      name: 'Guest Farmer',
      mobile: '',
      district: 'Agro Zone',
      state: 'India',
      farmSize: '2.0 Acres',
      primaryCrop: 'Mixed Crops',
      isLoggedIn: false,
      loginTime: null
    }
    saveFarmer(guest)
  }

  const updateFarmerProfile = (updates) => {
    const updated = {
      ...farmer,
      ...updates
    }
    saveFarmer(updated)
  }

  return (
    <FarmerContext.Provider value={{
      farmer,
      login,
      logout,
      updateFarmerProfile,
      isLoggedIn: Boolean(farmer?.isLoggedIn)
    }}>
      {children}
    </FarmerContext.Provider>
  )
}

export function useFarmer() {
  const context = useContext(FarmerContext)
  if (!context) {
    throw new Error('useFarmer must be used within a FarmerProvider')
  }
  return context
}

