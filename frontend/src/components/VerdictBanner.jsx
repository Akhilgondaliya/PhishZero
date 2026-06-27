import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiAlertTriangle, FiXCircle } from 'react-icons/fi'
import { ThemeContext } from '../context/ThemeContext'

export const VerdictBanner = ({ verdict = 'Safe', url = '' }) => {
  const normalizedVerdict = verdict.toLowerCase()
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'

  let styles = {
    bg: isDark ? 'bg-safe/10 text-safe' : 'bg-safe/20 text-safe',
    icon: <FiCheckCircle className="w-12 h-12 text-safe" />,
    badgeText: 'text-safe',
    title: 'This Website Looks Safe',
    description: 'Our checks found no active threat indicators or warning flags. It looks clean and secure to visit.',
    // Safe green pulse transitions using theme safe rgb(0, 255, 136) in dark mode, and rgb(22, 101, 52) in light mode
    animate: {
      scale: 1,
      opacity: 1,
      borderColor: isDark ? [
        'rgba(0, 255, 136, 0.25)', 
        'rgba(0, 255, 136, 0.55)', 
        'rgba(0, 255, 136, 0.25)'
      ] : [
        'rgba(22, 163, 74, 0.40)', 
        'rgba(22, 163, 74, 0.70)', 
        'rgba(22, 163, 74, 0.40)'
      ],
      backgroundColor: isDark ? [
        'rgba(0, 255, 136, 0.05)',
        'rgba(0, 255, 136, 0.1)',
        'rgba(0, 255, 136, 0.05)'
      ] : [
        'rgba(22, 163, 74, 0.05)',
        'rgba(22, 163, 74, 0.1)',
        'rgba(22, 163, 74, 0.05)'
      ]
    },
    transition: {
      borderColor: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
      backgroundColor: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
      scale: { type: 'spring', damping: 15 }
    }
  }

  if (normalizedVerdict === 'suspicious') {
    styles = {
      bg: 'bg-amber-500/10 dark:bg-amber-500/10 text-amber-500',
      icon: <FiAlertTriangle className="w-12 h-12 text-amber-500" />,
      badgeText: 'text-amber-500',
      title: 'Caution: Suspicious Indicators',
      description: 'Heads up! A few warning flags were triggered (like a brand-new registration or no HTTPS). Proceed with caution.',
      // Suspicious amber warning slow pulse
      animate: {
        scale: 1,
        opacity: 1,
        borderColor: [
          'rgba(245, 158, 11, 0.25)', 
          'rgba(245, 158, 11, 0.8)', 
          'rgba(245, 158, 11, 0.25)'
        ],
        backgroundColor: [
          'rgba(245, 158, 11, 0.06)',
          'rgba(245, 158, 11, 0.12)',
          'rgba(245, 158, 11, 0.06)'
        ]
      },
      transition: {
        borderColor: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
        backgroundColor: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
        scale: { type: 'spring', damping: 15 }
      }
    }
  } else if (normalizedVerdict === 'phishing') {
    styles = {
      bg: 'bg-rose-500/10 dark:bg-rose-500/10 text-rose-500',
      icon: <FiXCircle className="w-12 h-12 text-rose-500" />,
      badgeText: 'text-rose-500',
      title: 'Warning: Phishing Risk!',
      description: 'This URL looks like a fake clone of a popular brand or contains critical security flags. Do NOT enter any passwords or credit card details here!',
      // Phishing police beacon fast warning alarm pulse
      animate: {
        scale: [1, 1.01, 1],
        opacity: 1,
        borderColor: [
          'rgba(244, 63, 94, 0.3)', 
          'rgba(244, 63, 94, 1)', 
          'rgba(244, 63, 94, 0.3)'
        ],
        backgroundColor: [
          'rgba(244, 63, 94, 0.05)',
          'rgba(244, 63, 94, 0.16)',
          'rgba(244, 63, 94, 0.05)'
        ]
      },
      transition: {
        scale: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' },
        borderColor: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' },
        backgroundColor: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' }
      }
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={styles.animate}
      transition={styles.transition}
      className={`relative border rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center overflow-hidden ${styles.bg}`}
      id="verdict-banner-container"
    >
      
      {/* 🟢 SAFE CELEBRATION: Radiating Shield Protection Waves */}
      {normalizedVerdict === 'safe' && (
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none flex items-center justify-center">
          {/* Pulsing deep green aura behind everything */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.08, 0.22, 0.08]
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: 'easeInOut'
            }}
            className="absolute w-72 h-72 rounded-full filter blur-3xl bg-safe/10"
          />
          {/* Ripple Wave 1 */}
          <motion.div
            animate={{
              scale: [0.5, 2.2],
              opacity: [0.4, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: 'easeOut'
            }}
            className="absolute w-36 h-36 border border-safe/30 rounded-full"
          />
          {/* Ripple Wave 2 */}
          <motion.div
            animate={{
              scale: [0.5, 2.2],
              opacity: [0.4, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              delay: 1.25,
              ease: 'easeOut'
            }}
            className="absolute w-36 h-36 border border-safe/20 rounded-full"
          />
        </div>
      )}

      {/* 🔴 DANGER Flashing Aura Rings */}
      {normalizedVerdict === 'phishing' && (
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <motion.div
            animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.06, 0.18, 0.06] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0 bg-rose-500/10 rounded-full filter blur-3xl"
          />
        </div>
      )}

      {/* 🟡 CAUTION Glow Pulse */}
      {normalizedVerdict === 'suspicious' && (
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <motion.div
            animate={{ opacity: [0.08, 0.22, 0.08] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-amber-500/5 rounded-full filter blur-2xl"
          />
        </div>
      )}

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-4 animate-float">
          {styles.icon}
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          {styles.title}
        </h2>
        
        <p className="max-w-md text-sm text-[#0d1b2a]/80 dark:text-white/80 font-medium mb-4">
          {styles.description}
        </p>
        
        <div className="w-full max-w-xl bg-card/50 dark:bg-card/50 px-4 py-3 rounded-xl border border-muted/10 flex items-center justify-center space-x-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-muted">Scanned URL:</span>
          <span className="text-sm font-mono break-all font-bold text-[#0d1b2a] dark:text-white select-all">{url}</span>
        </div>
      </div>

    </motion.div>
  )
}
export default VerdictBanner
