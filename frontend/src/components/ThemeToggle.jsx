import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { FiSun, FiMoon } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-card border border-muted/20 hover:border-accent/50 hover:bg-card/80 text-accent transition-all duration-300 focus:outline-none flex items-center justify-center cursor-pointer"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      id="theme-toggle-btn"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -15, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 15, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.25 }}
        >
          {theme === 'dark' ? (
            <FiSun className="w-5 h-5 text-accent" />
          ) : (
            <FiMoon className="w-5 h-5 text-[#0077bb]" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
export default ThemeToggle
