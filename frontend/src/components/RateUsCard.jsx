import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiHeart, FiSend } from 'react-icons/fi'
import { toast } from 'react-toastify'

export const RateUsCard = () => {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0) {
      toast.error('Please select a star rating first.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating,
          comment: comment.trim()
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast.success('Thank you for rating PhishZero!')
      } else {
        const errData = await response.json().catch(() => ({}))
        toast.error(errData.error || 'Failed to submit rating. Please try again.')
      }
    } catch (err) {
      toast.error('Unable to submit rating. Please check your network connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-card/65 dark:bg-card/45 backdrop-blur-md border border-muted/20 dark:border-accent/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden text-left hover:scale-[1.01] hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/10 rounded-full filter blur-xl" />
      
      <div className="flex items-center space-x-2 text-accent">
        <FiStar className="w-5 h-5 fill-accent/20" />
        <h3 className="text-base font-bold text-[#0d1b2a] dark:text-white">Rate PhishZero</h3>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="rating-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <p className="text-xs text-muted leading-relaxed font-semibold">
              How would you rate your experience with PhishZero's security checks and scanning engines?
            </p>

            {/* Interactive Stars */}
            <div className="flex items-center space-x-2.5 py-2">
              {[1, 2, 3, 4, 5].map((starValue) => {
                const isActive = starValue <= (hoveredRating || rating)
                return (
                  <button
                    key={starValue}
                    type="button"
                    onClick={() => handleRatingClick(starValue)}
                    onMouseEnter={() => setHoveredRating(starValue)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 focus:outline-none transition-transform duration-200 hover:scale-125 cursor-pointer"
                  >
                    <FiStar
                      className={`w-8 h-8 transition-colors duration-200 ${
                        isActive
                          ? 'text-accent fill-accent filter drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]'
                          : 'text-muted/40 dark:text-muted/25'
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            {/* Comment Area */}
            <div className="space-y-1.5">
              <label htmlFor="comment" className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                Share your feedback (Optional)
              </label>
              <textarea
                id="comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Let us know what you like or how we can improve the platform..."
                className="w-full px-4 py-3 rounded-2xl border border-muted/20 dark:border-accent/10 focus:border-accent dark:focus:border-accent bg-primary/20 text-[#0d1b2a] dark:text-white placeholder-muted/50 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent resize-none transition-all duration-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className="w-full py-3 rounded-2xl bg-accent hover:bg-accent/80 disabled:bg-muted/20 disabled:text-muted/40 text-primary dark:text-primary font-bold text-xs tracking-wider cursor-pointer disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent/15 flex items-center justify-center space-x-2 transition-all"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  <span>Submit Rating</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="rating-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-safe/10 border border-safe flex items-center justify-center mx-auto">
              <FiHeart className="w-8 h-8 text-safe fill-safe/10 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-[#0d1b2a] dark:text-white">Rating Submitted!</h4>
              <p className="text-xs text-muted leading-relaxed font-semibold">
                Thank you for rating us {rating} out of 5 stars. Your feedback is highly appreciated!
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setRating(0)
                setComment('')
                setIsSubmitted(false)
              }}
              className="px-4 py-2 rounded-xl border border-muted/20 hover:border-accent/30 text-xs font-bold text-muted hover:text-accent cursor-pointer transition-colors"
            >
              Submit Another Rating
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default RateUsCard
