import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  // Default to dark mode, checking localStorage first
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    // Default to dark mode; only load light mode if the user explicitly selected it
    return savedTheme === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
      document.body.classList.add('dark')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
      document.body.classList.remove('dark')
    }
    
    // Save selection to persistent storage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
export default ThemeProvider
