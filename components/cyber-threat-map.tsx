"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Attack = {
  id: number
  source: { lat: number; lng: number }
  target: { lat: number; lng: number }
  type: string
  progress: number
}

export default function CyberThreatMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [attacks, setAttacks] = useState<Attack[]>([])
  const [stats, setStats] = useState({
    totalAttacks: 0,
    blockedAttacks: 0,
    activeThreats: 0,
  })

  // Generate random coordinates
  const randomCoordinate = () => ({
    lat: Math.random() * 150 - 75,
    lng: Math.random() * 360 - 180,
  })

  // Convert geo coordinates to canvas coordinates
  const geoToCanvas = (lat: number, lng: number, width: number, height: number): { x: number; y: number } => {
    const x = ((lng + 180) / 360) * width
    const y = ((90 - lat) / 180) * height
    return { x, y }
  }

  // Generate a new attack
  const generateAttack = () => {
    const attackTypes = ["DDoS", "Ransomware", "Phishing", "SQL Injection", "XSS", "Zero-day"]
    return {
      id: Date.now(),
      source: randomCoordinate(),
      target: { lat: 33.6844, lng: 73.0479 }, // Islamabad coordinates
      type: attackTypes[Math.floor(Math.random() * attackTypes.length)],
      progress: 0,
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Load world map image
    const worldMap = new Image()
    worldMap.src = "/placeholder.svg?height=400&width=800"
    worldMap.crossOrigin = "anonymous"

    // Animation loop
    let animationId: number
    let lastAttackTime = 0

    const animate = (timestamp: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw world map
      if (worldMap.complete) {
        ctx.globalAlpha = 0.2
        ctx.drawImage(worldMap, 0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 1
      }

      // Generate new attack every 2-5 seconds
      if (timestamp - lastAttackTime > Math.random() * 3000 + 2000) {
        const newAttack = generateAttack()
        setAttacks((prev) => [...prev, newAttack])
        setStats((prev) => ({
          ...prev,
          totalAttacks: prev.totalAttacks + 1,
          activeThreats: prev.activeThreats + 1,
        }))
        lastAttackTime = timestamp
      }

      // Draw and update attacks
      setAttacks((prevAttacks) => {
        const updatedAttacks = prevAttacks.map((attack) => {
          const source = geoToCanvas(attack.source.lat, attack.source.lng, canvas.width, canvas.height)
          const target = geoToCanvas(attack.target.lat, attack.target.lng, canvas.width, canvas.height)

          // Calculate current position based on progress
          const x = source.x + (target.x - source.x) * (attack.progress / 100)
          const y = source.y + (target.y - source.y) * (attack.progress / 100)

          // Draw source point
          ctx.beginPath()
          ctx.arc(source.x, source.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(255, 50, 50, 0.7)"
          ctx.fill()

          // Draw target point
          ctx.beginPath()
          ctx.arc(target.x, target.y, 5, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(50, 150, 255, 0.9)"
          ctx.fill()

          // Draw attack line
          ctx.beginPath()
          ctx.moveTo(source.x, source.y)
          ctx.lineTo(x, y)
          ctx.strokeStyle = `rgba(255, 100, 100, ${0.7 - attack.progress / 200})`
          ctx.lineWidth = 2
          ctx.stroke()

          // Draw attack point
          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(255, 200, 50, 0.9)"
          ctx.fill()

          // Update progress
          const newProgress = attack.progress + 0.5
          if (newProgress >= 100) {
            // Attack reached target
            setStats((prev) => ({
              ...prev,
              blockedAttacks: prev.blockedAttacks + 1,
              activeThreats: prev.activeThreats - 1,
            }))
            return null // Remove this attack
          }

          return { ...attack, progress: newProgress }
        })

        return updatedAttacks.filter(Boolean) as Attack[]
      })

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Live <span className="text-primary">Threat</span> Intelligence
          </h2>

          <Card className="border border-primary/20 shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">Global Cyber Threat Map</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <canvas ref={canvasRef} className="w-full h-[400px]" />
                <div className="absolute top-4 right-4 flex gap-4">
                  <div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-md">
                    <div className="text-sm font-medium">Total Attacks</div>
                    <div className="text-xl font-bold">{stats.totalAttacks}</div>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-md">
                    <div className="text-sm font-medium">Blocked</div>
                    <div className="text-xl font-bold text-green-500">{stats.blockedAttacks}</div>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-md">
                    <div className="text-sm font-medium">Active Threats</div>
                    <div className="text-xl font-bold text-red-500">{stats.activeThreats}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
