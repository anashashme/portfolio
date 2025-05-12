"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Shield, Network, Database, Bug, Zap, Brain } from "lucide-react"

type Skill = {
  name: string
  value: number
  category: string
  icon: JSX.Element
  color: string
}

const skills: Skill[] = [
  // Programming
  { name: "Python", value: 90, category: "Programming", icon: <Code />, color: "#3776AB" },
  { name: "C++", value: 75, category: "Programming", icon: <Code />, color: "#00599C" },
  { name: "JavaScript", value: 70, category: "Programming", icon: <Code />, color: "#F7DF1E" },
  { name: "React", value: 65, category: "Programming", icon: <Code />, color: "#61DAFB" },

  // Security Operations
  { name: "Threat Hunting", value: 85, category: "Security Operations", icon: <Shield />, color: "#E53935" },
  { name: "SIEM", value: 90, category: "Security Operations", icon: <Shield />, color: "#43A047" },
  { name: "Incident Response", value: 80, category: "Security Operations", icon: <Shield />, color: "#FB8C00" },
  { name: "Security Monitoring", value: 85, category: "Security Operations", icon: <Shield />, color: "#5E35B1" },

  // Penetration Testing
  { name: "Web App Testing", value: 90, category: "Penetration Testing", icon: <Bug />, color: "#D81B60" },
  { name: "Network Testing", value: 85, category: "Penetration Testing", icon: <Bug />, color: "#8E24AA" },
  { name: "Social Engineering", value: 75, category: "Penetration Testing", icon: <Bug />, color: "#00ACC1" },
  { name: "Mobile App Testing", value: 70, category: "Penetration Testing", icon: <Bug />, color: "#7CB342" },

  // Digital Forensics
  { name: "Memory Analysis", value: 90, category: "Digital Forensics", icon: <Database />, color: "#039BE5" },
  { name: "Disk Forensics", value: 85, category: "Digital Forensics", icon: <Database />, color: "#00897B" },
  { name: "Network Forensics", value: 80, category: "Digital Forensics", icon: <Database />, color: "#FFB300" },
  { name: "Malware Analysis", value: 75, category: "Digital Forensics", icon: <Database />, color: "#5D4037" },

  // Network Security
  { name: "Firewall Management", value: 85, category: "Network Security", icon: <Network />, color: "#1E88E5" },
  { name: "IDS/IPS", value: 80, category: "Network Security", icon: <Network />, color: "#43A047" },
  { name: "VPN", value: 75, category: "Network Security", icon: <Network />, color: "#8E24AA" },
  { name: "Network Monitoring", value: 90, category: "Network Security", icon: <Network />, color: "#F4511E" },

  // AI & Machine Learning
  { name: "Threat Detection ML", value: 80, category: "AI & Machine Learning", icon: <Brain />, color: "#6200EA" },
  { name: "Anomaly Detection", value: 85, category: "AI & Machine Learning", icon: <Brain />, color: "#00BFA5" },
  { name: "Data Analysis", value: 75, category: "AI & Machine Learning", icon: <Brain />, color: "#FFD600" },
  { name: "Predictive Security", value: 70, category: "AI & Machine Learning", icon: <Brain />, color: "#DD2C00" },
]

const categories = [
  { id: "all", name: "All Skills", icon: <Zap className="h-5 w-5" /> },
  { id: "Programming", name: "Programming", icon: <Code className="h-5 w-5" /> },
  { id: "Security Operations", name: "Security Ops", icon: <Shield className="h-5 w-5" /> },
  { id: "Penetration Testing", name: "Pen Testing", icon: <Bug className="h-5 w-5" /> },
  { id: "Digital Forensics", name: "Forensics", icon: <Database className="h-5 w-5" /> },
  { id: "Network Security", name: "Network", icon: <Network className="h-5 w-5" /> },
  { id: "AI & Machine Learning", name: "AI & ML", icon: <Brain className="h-5 w-5" /> },
]

export default function AdvancedSkillRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  // Filter skills based on active category
  const filteredSkills = activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory)

  useEffect(() => {
    if (!isInView) return

    // Reset animation when category changes
    setAnimationProgress(0)
    setIsAnimating(true)

    // Animate progress
    let startTime: number | null = null
    const duration = 1000 // 1 second animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      setAnimationProgress(progress)

      if (progress < 1 && isAnimating) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    if (isAnimating) {
      requestAnimationFrame(animate)
    }
  }, [isInView, activeCategory, isAnimating])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isInView) return

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

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw radar background
    const drawRadarBackground = () => {
      const levels = 5

      for (let i = levels; i > 0; i--) {
        const levelRadius = (radius * i) / levels

        // Draw level circle
        ctx.beginPath()
        ctx.arc(center.x, center.y, levelRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(var(--primary), ${0.03 * i})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(center.x, center.y, levelRadius, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(var(--primary), 0.2)"
        ctx.stroke()

        // Draw level label
        if (i < levels) {
          ctx.fillStyle = "var(--muted-foreground)"
          ctx.font = "10px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(`${(i * 20).toString()}%`, center.x, center.y - levelRadius - 5)
        }
      }
    }

    // Draw axes and labels
    const drawAxes = () => {
      const skills = filteredSkills
      const angleStep = (Math.PI * 2) / skills.length

      ctx.strokeStyle = "rgba(var(--primary), 0.3)"
      ctx.lineWidth = 1

      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = center.x + Math.cos(angle) * radius
        const y = center.y + Math.sin(angle) * radius

        // Draw axis line
        ctx.beginPath()
        ctx.moveTo(center.x, center.y)
        ctx.lineTo(x, y)
        ctx.stroke()

        // Draw skill label
        const labelDistance = radius * 1.1
        const labelX = center.x + Math.cos(angle) * labelDistance
        const labelY = center.y + Math.sin(angle) * labelDistance

        ctx.save()
        ctx.translate(labelX, labelY)
        ctx.rotate(angle + Math.PI / 2)

        // Adjust rotation for better readability
        if (angle > Math.PI / 2 && angle < (Math.PI * 3) / 2) {
          ctx.rotate(Math.PI)
        }

        ctx.fillStyle = hoveredSkill && hoveredSkill.name === skills[i].name ? "var(--primary)" : "var(--foreground)"
        ctx.font = hoveredSkill && hoveredSkill.name === skills[i].name ? "bold 12px sans-serif" : "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(skills[i].name, 0, 0)
        ctx.restore()
      }
    }

    // Draw skill data with animation
    const drawSkillData = () => {
      const skills = filteredSkills
      const angleStep = (Math.PI * 2) / skills.length

      // Draw skill polygon
      ctx.beginPath()

      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const value = (skills[i].value / 100) * radius * animationProgress
        const x = center.x + Math.cos(angle) * value
        const y = center.y + Math.sin(angle) * value

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.closePath()
      ctx.fillStyle = "rgba(var(--primary), 0.2)"
      ctx.fill()
      ctx.strokeStyle = "rgba(var(--primary), 0.8)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw data points
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const value = (skills[i].value / 100) * radius * animationProgress
        const x = center.x + Math.cos(angle) * value
        const y = center.y + Math.sin(angle) * value

        // Draw point
        ctx.beginPath()

        // Highlight hovered skill
        if (hoveredSkill && hoveredSkill.name === skills[i].name) {
          ctx.arc(x, y, 8, 0, Math.PI * 2)
          ctx.fillStyle = skills[i].color || "rgba(var(--primary), 1)"

          // Draw value label
          ctx.font = "bold 12px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillStyle = "white"
          ctx.fillText(skills[i].value.toString(), x, y)
        } else {
          ctx.arc(x, y, 5, 0, Math.PI * 2)
          ctx.fillStyle = skills[i].color || "rgba(var(--primary), 0.8)"
        }

        ctx.fill()
      }
    }

    // Handle mouse movement for hover effects
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      const skills = filteredSkills
      const angleStep = (Math.PI * 2) / skills.length

      // Check if mouse is over any skill point
      let hoveredSkill: Skill | null = null

      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const value = (skills[i].value / 100) * radius * animationProgress
        const x = center.x + Math.cos(angle) * value
        const y = center.y + Math.sin(angle) * value

        // Calculate distance from mouse to point
        const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2))

        if (distance < 15) {
          // Increased hit area for better UX
          hoveredSkill = skills[i]
          break
        }
      }

      setHoveredSkill(hoveredSkill)
    }

    // Draw everything
    drawRadarBackground()
    drawAxes()
    drawSkillData()

    // Add mouse event listeners
    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [filteredSkills, isInView, hoveredSkill, animationProgress])

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
            <CardHeader className="border-b border-primary/10">
              <div className="flex flex-col space-y-4">
                <CardTitle className="text-xl text-center">Technical Expertise Radar</CardTitle>

                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      size="sm"
                      className="gap-2"
                      onClick={() => {
                        setActiveCategory(category.id)
                        setIsAnimating(true)
                      }}
                    >
                      {category.icon}
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-[500px] w-full">
                <canvas ref={canvasRef} className="w-full h-full" />

                {hoveredSkill && (
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-full" style={{ backgroundColor: `${hoveredSkill.color}20` }}>
                        {hoveredSkill.icon}
                      </div>
                      <div>
                        <div className="font-medium">{hoveredSkill.name}</div>
                        <div className="text-sm text-muted-foreground">{hoveredSkill.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">{hoveredSkill.value}%</div>
                      <div className="w-full bg-muted/30 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${hoveredSkill.value}%`,
                            backgroundColor: hoveredSkill.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
