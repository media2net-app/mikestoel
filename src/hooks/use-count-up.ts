import { useState, useEffect, useRef } from 'react'

interface UseCountUpProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  decimals?: number
  enabled?: boolean
}

export function useCountUp({ 
  end, 
  start = 0, 
  duration = 2000, 
  delay = 0, 
  decimals = 0,
  enabled = true 
}: UseCountUpProps) {
  const [count, setCount] = useState(start)
  const [isAnimating, setIsAnimating] = useState(false)
  const frameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) {
      setCount(end)
      return
    }

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current - delay
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      
      const currentCount = start + (end - start) * easeOutQuart
      setCount(Number(currentCount.toFixed(decimals)))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    setIsAnimating(true)
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [end, start, duration, delay, decimals, enabled])

  return { count, isAnimating }
}
