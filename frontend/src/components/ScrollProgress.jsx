import React from 'react'
import useScrollProgress from '../hooks/useScrollProgress'

export const ScrollProgress = () => {
  const progress = useScrollProgress()

  return (
    <div
      id="scroll-progress-bar"
      className="fixed top-0 left-0 h-[3px] bg-accent z-[9999] transition-all duration-75 ease-out"
      style={{ width: `${progress}%` }}
    />
  )
}
export default ScrollProgress
