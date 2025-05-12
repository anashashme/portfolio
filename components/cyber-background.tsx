"use client"

import { useEffect, useRef } from "react"

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Grid parameters
    const gridSize = 40
    let gridPoints: { x: number; y: number; vx: number; vy: number }[] = []

    // Initialize grid points
    const initGrid = () => {
      gridPoints = []
      const cols = Math.floor(canvas.width / gridSize) + 2
      const rows = Math.floor(canvas.height / gridSize) + 2

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          gridPoints.push({
            x: i * gridSize,
            y: j * gridSize,
            vx: Math.random() * 0.3 - 0.15,
            vy: Math.random() * 0.3 - 0.15,
          })
        }
      }
    }

    initGrid()
    window.addEventListener("resize", initGrid)

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update grid points
      gridPoints.forEach((point) => {
        point.x += point.vx
        point.y += point.vy

        // Boundary check with bounce
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1

        // Draw point
        ctx.beginPath()
        ctx.arc(point.x, point.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(var(--primary), 0.15)"
        ctx.fill()
      })

      // Draw connections
      ctx.strokeStyle = "rgba(var(--primary), 0.05)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < gridPoints.length; i++) {
        for (let j = i + 1; j < gridPoints.length; j++) {
          const dx = gridPoints[i].x - gridPoints[j].x
          const dy = gridPoints[i].y - gridPoints[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < gridSize * 1.5) {
            ctx.beginPath()
            ctx.moveTo(gridPoints[i].x, gridPoints[i].y)
            ctx.lineTo(gridPoints[j].x, gridPoints[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", initGrid)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
