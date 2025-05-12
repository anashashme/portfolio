"use client"

import { useEffect, useRef, useState } from "react"

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Matrix rain characters - mix of Japanese katakana, binary, and cybersecurity symbols
    const chars =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>!@#$%^&*()_+-=;:,./?|~`\\\"'01010101"
    const charArray = chars.split("")

    // Create drops
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []
    const speeds: number[] = []
    const colors: string[] = []

    // Initialize drops with varying speeds and colors
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height)
      speeds[i] = Math.random() * 0.5 + 0.5 // Random speed between 0.5 and 1

      // Randomly assign colors with primary color being more common
      const colorRand = Math.random()
      if (colorRand > 0.85) {
        colors[i] = "rgba(255, 255, 255, 0.8)" // White (rare)
      } else if (colorRand > 0.7) {
        colors[i] = "rgba(255, 0, 0, 0.8)" // Red (uncommon)
      } else if (colorRand > 0.55) {
        colors[i] = "rgba(0, 255, 255, 0.8)" // Cyan (uncommon)
      } else {
        colors[i] = "rgba(0, 255, 0, 0.8)" // Green (common)
      }
    }

    // Draw matrix rain
    const draw = () => {
      // Add semi-transparent black background to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)]

        // Calculate x position
        const x = i * fontSize

        // Calculate y position
        const y = drops[i] * fontSize

        // Set character color with gradient effect
        const gradient = ctx.createLinearGradient(x, y - fontSize, x, y + fontSize)
        gradient.addColorStop(0, "rgba(0, 255, 0, 0.1)")
        gradient.addColorStop(0.5, colors[i])
        gradient.addColorStop(1, "rgba(0, 255, 0, 0.1)")

        ctx.fillStyle = gradient
        ctx.font = `${fontSize}px monospace`
        ctx.fillText(char, x, y)

        // Randomly change some characters to primary color for highlight
        if (Math.random() > 0.98) {
          ctx.fillStyle = "rgba(var(--primary), 1)"
          ctx.fillText(char, x, y)
        }

        // Move drop down and reset if it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Increment drop position based on speed
        drops[i] += speeds[i]
      }
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      if (isVisible) {
        draw()
      }
      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Handle scroll events to adjust opacity
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight

      // Fade out matrix effect as user scrolls down
      if (scrollY > viewportHeight * 0.5) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationId)
    }
  }, [isVisible])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-30 transition-opacity duration-1000 ${
        isVisible ? "opacity-20" : "opacity-0"
      }`}
    />
  )
}
