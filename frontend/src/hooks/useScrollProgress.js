import { useState, useEffect } from 'react'

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight
      const totalScrollableHeight = scrollHeight - clientHeight
      
      if (totalScrollableHeight > 0) {
        const percentage = (window.scrollY / totalScrollableHeight) * 100
        setScrollProgress(percentage)
      } else {
        setScrollProgress(0)
      }
    }

    window.addEventListener('scroll', updateScrollProgress)
    
    // Call once initially to set starting height state
    updateScrollProgress()

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
    }
  }, [])

  return scrollProgress
}
export default useScrollProgress
