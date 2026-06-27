import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'

export const QuizCalloutBanner = () => {
  const prompts = [
    "Do you know how to identify a spoofed email sender?",
    "Can you tell if an HTTPS website is actually a phishing scam?",
    "Do you check where a QR code leads before scanning it?",
    "Over 90% of cyberattacks start with email phishing. Are you prepared?",
    "Would you detect a fake login panel drawn over a real app?"
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % prompts.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [prompts.length])

  if (!isVisible) return null

  return (
    <div className="w-full mt-16 sm:mt-20 bg-card/85 dark:bg-card/45 backdrop-blur-md border-b border-muted/20 dark:border-accent/10 px-4 py-3 flex items-center justify-between z-40 relative select-none">
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        
        {/* Question Prompt */}
        <div className="flex items-center space-x-2.5 text-center sm:text-left self-start sm:self-auto">
          <span className="text-base flex-shrink-0 animate-bounce">💡</span>
          <div className="font-bold text-muted dark:text-white/90">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="inline-block"
              >
                {prompts[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Action Button & Close */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <Link
            to="/quiz"
            className="flex items-center space-x-1 px-4 py-1.5 rounded-xl bg-accent hover:bg-accent/80 text-primary dark:text-primary font-extrabold text-[11px] sm:text-xs tracking-wider transition-all shadow-md shadow-accent/20 hover:scale-105 active:scale-95 cursor-pointer"
            id="banner-take-quiz-btn"
          >
            <span>Test Your Skills</span>
            <span className="font-sans">→</span>
          </Link>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-md hover:bg-primary/20 hover:text-accent transition-colors cursor-pointer text-muted"
            aria-label="Dismiss banner"
            id="banner-close-btn"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  )
}

export default QuizCalloutBanner
