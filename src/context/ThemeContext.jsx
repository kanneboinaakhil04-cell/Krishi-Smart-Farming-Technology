import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Theme options: 'white' (Fresh White & Emerald Green) or 'green' (Deep Emerald Green & Farm Wallpaper)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('krishi_theme') || 'white'
  })

  useEffect(() => {
    localStorage.setItem('krishi_theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
    if (theme === 'white') {
      document.body.classList.add('theme-white-green')
      document.body.classList.remove('theme-deep-green')
    } else {
      document.body.classList.add('theme-deep-green')
      document.body.classList.remove('theme-white-green')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'white' ? 'green' : 'white'))
  }

  const changeTheme = (newTheme) => {
    if (newTheme === 'white' || newTheme === 'green') {
      setTheme(newTheme)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
