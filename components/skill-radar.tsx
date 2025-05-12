"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const skills = [
  { name: "Penetration Testing", value: 90 },
  { name: "Digital Forensics", value: 85 },
  { name: "Network Security", value: 80 },
  { name: "Python Development", value: 75 },
  { name: "Machine Learning", value: 70 },
  { name: "Incident Response", value: 85 },
  { name: "Malware Analysis", value: 80 },
  { name: "Threat Intelligence", value: 75 },
]

export default function SkillRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!isInView) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      if (!container) return

      const { width, height } = container.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Calculate center and radius
    const center = { x: canvas.width / 2, y: canvas.height / 2 }
    const radius = Math.min(center.x, center.y) * 0.8

    // Draw radar background
    const drawRadarBackground = () => {
      const levels = 5
      ctx.strokeStyle = "rgba(var(--primary), 0.2)"
      ctx.fillStyle = "rgba(var(--primary), 0.05)"

      for (let i = levels; i > 0; i--) {
        const levelRadius = (radius * i) / levels

        ctx.beginPath()
        ctx.arc(center.x, center.y, levelRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      }

      // Draw axes
      const angleStep = (Math.PI * 2) / skills.length
      ctx.strokeStyle = "rgba(var(--primary), 0.3)"
      ctx.lineWidth = 1

      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = center.x + Math.cos(angle) * radius
        const y = center.y + Math.sin(angle) * radius

        ctx.beginPath()
        ctx.moveTo(center.x, center.y)
        ctx.lineTo(x, y)
        ctx.stroke()

        // Draw skill labels
        ctx.fillStyle = "var(--foreground)"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        const labelDistance = radius * 1.1
        const labelX = center.x + Math.cos(angle) * labelDistance
        const labelY = center.y + Math.sin(angle) * labelDistance

        ctx.fillText(skills[i].name, labelX, labelY)
      }
    }

    // Draw skill data
    const drawSkillData = (progress = 1) => {
      const angleStep = (Math.PI * 2) / skills.length
      ctx.fillStyle = "rgba(var(--primary), 0.3)"
      ctx.strokeStyle = "rgba(var(--primary), 0.8)"
      ctx.lineWidth = 2

      ctx.beginPath()
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const value = (skills[i].value / 100) * radius * progress
        const x = center.x + Math.cos(angle) * value
        const y = center.y + Math.sin(angle) * value

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Draw data points
      ctx.fillStyle = "rgba(var(--primary), 1)"
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const value = (skills[i].value / 100) * radius * progress
        const x = center.x + Math.cos(angle) * value
        const y = center.y + Math.sin(angle) * value

        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Animation
    let progress = 0
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawRadarBackground()

      progress += 0.02
      if (progress > 1) progress = 1

      drawSkillData(progress)

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [isInView])

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Skill <span className="text-primary">Proficiency</span>
          </h2>

          <Card className="border border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-center">Technical Expertise Radar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full relative">
                <canvas ref={canvasRef} className="w-full h-full" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
