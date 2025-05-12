"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Zap, Globe, Server, Lock } from "lucide-react"

type ThreatEvent = {
  id: string
  type: "malware" | "ddos" | "ransomware" | "phishing" | "intrusion" | "vulnerability"
  source: { lat: number; lng: number; country: string }
  target: { lat: number; lng: number; country: string }
  timestamp: Date
  severity: "critical" | "high" | "medium" | "low"
  status: "active" | "mitigated" | "investigating"
  details: string
  progress: number
}

type ThreatStats = {
  totalAttacks: number
  mitigatedAttacks: number
  activeThreats: number
  criticalAlerts: number
  countriesTargeted: Set<string>
  countriesAttacking: Set<string>
  attackTypes: Record<string, number>
}

const threatTypeIcons = {
  malware: <Server className="h-4 w-4" />,
  ddos: <Zap className="h-4 w-4" />,
  ransomware: <Lock className="h-4 w-4" />,
  phishing: <AlertTriangle className="h-4 w-4" />,
  intrusion: <Shield className="h-4 w-4" />,
  vulnerability: <Globe className="h-4 w-4" />,
}

const severityColors = {
  critical: "bg-red-500 text-white",
  high: "bg-orange-500 text-white",
  medium: "bg-yellow-500 text-black",
  low: "bg-blue-500 text-white",
}

const statusColors = {
  active: "bg-red-500/20 text-red-500 border-red-500/50",
  mitigated: "bg-green-500/20 text-green-500 border-green-500/50",
  investigating: "bg-yellow-500/20 text-yellow-500 border-yellow-500/50",
}

export default function EnhancedThreatIntelligence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })
  const [threats, setThreats] = useState<ThreatEvent[]>([])
  const [stats, setStats] = useState<ThreatStats>({
    totalAttacks: 12,
    mitigatedAttacks: 9,
    activeThreats: 2,
    criticalAlerts: 2,
    countriesTargeted: new Set<string>(),
    countriesAttacking: new Set<string>(),
    attackTypes: {},
  })
  const [activeTab, setActiveTab] = useState("map")
  const [isPaused, setIsPaused] = useState(false)
  const [selectedThreat, setSelectedThreat] = useState<ThreatEvent | null>(null)
  const [showLegend, setShowLegend] = useState(false)

  // Generate random coordinates
  const randomCoordinate = () => ({
    lat: Math.random() * 150 - 75,
    lng: Math.random() * 360 - 180,
  })

  // Get random country
  const getRandomCountry = () => {
    const countries = [
      "United States",
      "Russia",
      "China",
      "North Korea",
      "Iran",
      "Ukraine",
      "Germany",
      "United Kingdom",
      "Brazil",
      "India",
      "Japan",
      "Australia",
      "Canada",
      "France",
      "Israel",
      "Pakistan",
      "South Korea",
      "Singapore",
    ]
    return countries[Math.floor(Math.random() * countries.length)]
  }

  // Generate a new threat event
  const generateThreatEvent = (): ThreatEvent => {
    const threatTypes = ["malware", "ddos", "ransomware", "phishing", "intrusion", "vulnerability"] as const
    const severityLevels = ["critical", "high", "medium", "low"] as const
    const statusOptions = ["active", "mitigated", "investigating"] as const

    const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)]
    const sourceCountry = getRandomCountry()
    const targetCountry = getRandomCountry()
    const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)]
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)]

    const threatDetails = {
      malware: [
        "Trojan detected in system files",
        "Rootkit attempting to hide in kernel",
        "Spyware collecting user data",
        "Worm spreading across network",
        "Backdoor installed in application",
        "Keylogger capturing credentials",
      ],
      ddos: [
        "SYN flood targeting web servers",
        "UDP flood overwhelming network",
        "HTTP flood targeting API endpoints",
        "Amplification attack using DNS",
        "Slowloris attack on web server",
        "NTP amplification attack detected",
      ],
      ransomware: [
        "File encryption in progress",
        "Ransom demand detected",
        "Data exfiltration before encryption",
        "Boot record encryption attempt",
        "Ransomware spreading via SMB",
        "Backup deletion attempt detected",
      ],
      phishing: [
        "Credential harvesting campaign",
        "Executive impersonation attempt",
        "Malicious attachment in email",
        "Fake login portal detected",
        "Spear phishing targeting executives",
        "Clone of corporate website detected",
      ],
      intrusion: [
        "Unauthorized access to database",
        "Lateral movement detected",
        "Privilege escalation attempt",
        "Suspicious command execution",
        "Brute force attack on SSH",
        "Unusual admin account activity",
      ],
      vulnerability: [
        "Zero-day exploit attempted",
        "Unpatched system targeted",
        "SQL injection attempt",
        "Cross-site scripting detected",
        "Remote code execution attempt",
        "Path traversal attack detected",
      ],
    }

    const details = threatDetails[threatType][Math.floor(Math.random() * threatDetails[threatType].length)]

    return {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      type: threatType,
      source: { ...randomCoordinate(), country: sourceCountry },
      target: { ...randomCoordinate(), country: targetCountry },
      timestamp: new Date(),
      severity,
      status,
      details,
      progress: 0,
    }
  }

  // Update stats based on threats
  const updateStats = (threatsList: ThreatEvent[]) => {
    const newStats: ThreatStats = {
      totalAttacks: threatsList.length,
      mitigatedAttacks: threatsList.filter((t) => t.status === "mitigated").length,
      activeThreats: threatsList.filter((t) => t.status === "active").length,
      criticalAlerts: threatsList.filter((t) => t.severity === "critical").length,
      countriesTargeted: new Set(threatsList.map((t) => t.target.country)),
      countriesAttacking: new Set(threatsList.map((t) => t.source.country)),
      attackTypes: {},
    }

    // Count attack types
    threatsList.forEach((threat) => {
      if (newStats.attackTypes[threat.type]) {
        newStats.attackTypes[threat.type]++
      } else {
        newStats.attackTypes[threat.type] = 1
      }
    })

    setStats(newStats)
  }

  // Format time ago
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds} seconds ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`
    const days = Math.floor(hours / 24)
    return `${days} day${days !== 1 ? "s" : ""} ago`
  }

  useEffect(() => {
    if (!isInView || isPaused) return

    // Initialize with some threats
    const initialThreats = Array(12)
      .fill(null)
      .map(() => {
        const threat = generateThreatEvent()
        // Set most threats to mitigated to match the stats
        if (Math.random() < 0.75) {
          threat.status = "mitigated"
        }
        return threat
      })

    // Ensure we have exactly 2 active threats and 2 critical alerts
    let activeCount = initialThreats.filter((t) => t.status === "active").length
    let criticalCount = initialThreats.filter((t) => t.severity === "critical").length

    // Adjust active threats
    for (let i = 0; i < initialThreats.length && activeCount !== 2; i++) {
      if (activeCount < 2 && initialThreats[i].status !== "active") {
        initialThreats[i].status = "active"
        activeCount++
      } else if (activeCount > 2 && initialThreats[i].status === "active") {
        initialThreats[i].status = "mitigated"
        activeCount--
      }
    }

    // Adjust critical alerts
    for (let i = 0; i < initialThreats.length && criticalCount !== 2; i++) {
      if (criticalCount < 2 && initialThreats[i].severity !== "critical") {
        initialThreats[i].severity = "critical"
        criticalCount++
      } else if (criticalCount > 2 && initialThreats[i].severity === "critical") {
        initialThreats[i].severity = "medium"
        criticalCount--
      }
    }

    // Create a specific North Korea to Canada malware threat
    const keyloggerThreat: ThreatEvent = {
      id: "keylogger-nk-ca",
      type: "malware",
      source: { lat: 40.339852, lng: 127.510093, country: "North Korea" },
      target: { lat: 56.130366, lng: -106.346771, country: "Canada" },
      timestamp: new Date(),
      severity: "low",
      status: "active",
      details: "Keylogger capturing credentials",
      progress: 65,
    }

    // Replace one of the threats with our specific one
    initialThreats[0] = keyloggerThreat

    setThreats(initialThreats)
    setSelectedThreat(keyloggerThreat)

    // Generate new threats periodically
    const threatInterval = setInterval(() => {
      if (isPaused) return

      const newThreat = generateThreatEvent()
      setThreats((prev) => {
        const updated = [...prev, newThreat]
        // Keep only the most recent 100 threats
        if (updated.length > 100) {
          updated.shift()
        }
        updateStats(updated)
        return updated
      })
    }, 10000) // Slower rate to keep the display stable

    // Update threat statuses periodically
    const statusInterval = setInterval(() => {
      if (isPaused) return

      setThreats((prev) =>
        prev.map((threat) => {
          // Randomly update some threat statuses
          if (threat.status === "active" && Math.random() > 0.9) {
            return { ...threat, status: "investigating" }
          }
          if (threat.status === "investigating" && Math.random() > 0.8) {
            return { ...threat, status: "mitigated" }
          }
          return threat
        }),
      )
    }, 8000)

    // Update threat progress
    const progressInterval = setInterval(() => {
      if (isPaused) return

      setThreats((prev) =>
        prev.map((threat) => {
          if (threat.status === "active") {
            const newProgress = threat.progress + 1
            if (newProgress >= 100) {
              return { ...threat, status: "mitigated", progress: 100 }
            }
            return { ...threat, progress: newProgress }
          }
          return threat
        }),
      )
    }, 1000)

    return () => {
      clearInterval(threatInterval)
      clearInterval(statusInterval)
      clearInterval(progressInterval)
    }
  }, [isInView, isPaused])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isInView) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      if (!container) return
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Load world map image
    const worldMap = new Image()
    worldMap.src = "/placeholder.svg?height=400&width=800"
    worldMap.crossOrigin = "anonymous"

    // Convert geo coordinates to canvas coordinates
    const geoToCanvas = (lat: number, lng: number): { x: number; y: number } => {
      const x = ((lng + 180) / 360) * canvas.width
      const y = ((90 - lat) / 180) * canvas.height
      return { x, y }
    }

    // Handle mouse movement for hover effects
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Check if mouse is over any threat line
      let hoveredThreat: ThreatEvent | null = null

      for (const threat of threats) {
        const source = geoToCanvas(threat.source.lat, threat.source.lng)
        const target = geoToCanvas(threat.target.lat, threat.target.lng)

        // Calculate distance from mouse to line
        const lineLength = Math.sqrt(Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2))
        const t =
          ((mouseX - source.x) * (target.x - source.x) + (mouseY - source.y) * (target.y - source.y)) /
          (lineLength * lineLength)

        if (t >= 0 && t <= 1) {
          const closestX = source.x + t * (target.x - source.x)
          const closestY = source.y + t * (target.y - source.y)
          const distance = Math.sqrt(Math.pow(mouseX - closestX, 2) + Math.pow(mouseY - closestY, 2))

          if (distance < 10) {
            hoveredThreat = threat
            break
          }
        }

        // Check if mouse is over source or target point
        const sourceDistance = Math.sqrt(Math.pow(mouseX - source.x, 2) + Math.pow(mouseY - source.y, 2))
        const targetDistance = Math.sqrt(Math.pow(mouseX - target.x, 2) + Math.pow(mouseY - target.y, 2))

        if (sourceDistance < 10 || targetDistance < 10) {
          hoveredThreat = threat
          break
        }
      }

      setSelectedThreat(hoveredThreat)

      // Change cursor style
      canvas.style.cursor = hoveredThreat ? "pointer" : "default"
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    let animationId: number

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#020817"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 0.5

      // Draw latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const y = ((90 - lat) / 180) * canvas.height
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw longitude lines
      for (let lng = -180; lng <= 180; lng += 30) {
        const x = ((lng + 180) / 360) * canvas.width
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw threats
      threats.forEach((threat) => {
        const source = geoToCanvas(threat.source.lat, threat.source.lng)
        const target = geoToCanvas(threat.target.lat, threat.target.lng)

        // Calculate current position based on progress
        const progress = threat.status === "mitigated" ? 1 : threat.progress / 100
        const currentX = source.x + (target.x - source.x) * progress
        const currentY = source.y + (target.y - source.y) * progress

        // Draw source point
        ctx.beginPath()
        ctx.arc(source.x, source.y, threat === selectedThreat ? 5 : 3, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(239, 68, 68, 0.8)"
        ctx.fill()

        // Draw target point
        ctx.beginPath()
        ctx.arc(target.x, target.y, threat === selectedThreat ? 7 : 5, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(59, 130, 246, 0.9)"
        ctx.fill()

        // Draw attack line
        ctx.beginPath()
        ctx.moveTo(source.x, source.y)
        ctx.lineTo(currentX, currentY)

        // Line color based on threat severity
        let lineColor
        switch (threat.severity) {
          case "critical":
            lineColor = "rgba(239, 68, 68, 0.8)"
            break
          case "high":
            lineColor = "rgba(249, 115, 22, 0.8)"
            break
          case "medium":
            lineColor = "rgba(234, 179, 8, 0.8)"
            break
          case "low":
            lineColor = "rgba(59, 130, 246, 0.8)"
            break
          default:
            lineColor = "rgba(239, 68, 68, 0.8)"
        }

        // Highlight selected threat with glow effect
        if (threat === selectedThreat) {
          ctx.strokeStyle = lineColor.replace("0.8", "1.0")
          ctx.lineWidth = 3

          // Add glow effect for selected threat
          ctx.shadowColor = lineColor.replace("0.8", "1.0")
          ctx.shadowBlur = 15
        } else {
          ctx.strokeStyle = lineColor
          ctx.lineWidth = threat.severity === "critical" ? 2 : 1
          ctx.shadowBlur = 0
        }

        ctx.stroke()
        ctx.shadowBlur = 0

        // Draw attack point with enhanced glow effect
        if (threat.status === "active") {
          ctx.beginPath()
          ctx.arc(currentX, currentY, threat === selectedThreat ? 6 : 4, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
          ctx.shadowColor = "rgba(255, 255, 255, 0.9)"
          ctx.shadowBlur = 20
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    worldMap.onload = () => {
      animate()
    }

    // If the image is already loaded
    if (worldMap.complete) {
      animate()
    }

    // Clean up
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      canvas.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [threats, isInView, selectedThreat])

  return (
    <section ref={containerRef} className="py-16 bg-[#020817]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            Live <span className="text-blue-500">Threat</span> Intelligence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#0a0f1a] border border-blue-900/30 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-medium text-gray-300 mb-2">Total Attacks</h3>
              <p className="text-4xl font-bold text-white">{stats.totalAttacks}</p>
            </div>

            <div className="bg-[#0a0f1a] border border-blue-900/30 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-medium text-gray-300 mb-2">Mitigated Attacks</h3>
              <p className="text-4xl font-bold text-white">{stats.mitigatedAttacks}</p>
            </div>

            <div className="bg-[#0a0f1a] border border-blue-900/30 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-medium text-gray-300 mb-2">Active Threats</h3>
              <p className="text-4xl font-bold text-white">{stats.activeThreats}</p>
            </div>

            <div className="bg-[#0a0f1a] border border-blue-900/30 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-medium text-gray-300 mb-2">Critical Alerts</h3>
              <p className="text-4xl font-bold text-white">{stats.criticalAlerts}</p>
            </div>
          </div>

          <div className="bg-[#0a0f1a] border border-blue-900/30 rounded-lg shadow-lg overflow-hidden">
            <div className="flex border-b border-blue-900/30">
              <button
                className={`px-6 py-3 text-sm font-medium ${activeTab === "map" ? "bg-blue-900/20 text-blue-400 border-b-2 border-blue-500" : "text-gray-400 hover:text-gray-300"}`}
                onClick={() => setActiveTab("map")}
              >
                Map View
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${activeTab === "list" ? "bg-blue-900/20 text-blue-400 border-b-2 border-blue-500" : "text-gray-400 hover:text-gray-300"}`}
                onClick={() => setActiveTab("list")}
              >
                Threat List
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${activeTab === "stats" ? "bg-blue-900/20 text-blue-400 border-b-2 border-blue-500" : "text-gray-400 hover:text-gray-300"}`}
                onClick={() => setActiveTab("stats")}
              >
                Statistics
              </button>
            </div>

            {activeTab === "map" && (
              <div className="relative">
                <div className="h-[400px] w-full">
                  <canvas ref={canvasRef} className="w-full h-full" />
                </div>

                {selectedThreat && (
                  <div className="absolute top-4 left-4 bg-[#0a0f1a]/90 backdrop-blur-sm border border-blue-900/50 rounded-lg p-4 shadow-lg max-w-xs">
                    <div className="text-lg font-medium text-white mb-1">{selectedThreat.type}</div>
                    <div className="text-sm text-gray-300 mb-2">
                      {selectedThreat.source.country} → {selectedThreat.target.country}
                    </div>
                    <div className="text-sm text-gray-400 mb-3">{selectedThreat.details}</div>
                    <Badge
                      className={`${
                        selectedThreat.severity === "critical"
                          ? "bg-red-500 text-white"
                          : selectedThreat.severity === "high"
                            ? "bg-orange-500 text-white"
                            : selectedThreat.severity === "medium"
                              ? "bg-yellow-500 text-black"
                              : "bg-blue-500 text-white"
                      }`}
                    >
                      {selectedThreat.severity}
                    </Badge>
                  </div>
                )}

                <button
                  className="absolute bottom-4 right-4 bg-[#0a0f1a]/90 backdrop-blur-sm border border-blue-900/50 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
                  onClick={() => setShowLegend(!showLegend)}
                >
                  Toggle Legend
                </button>

                {showLegend && (
                  <div className="absolute bottom-4 left-4 bg-[#0a0f1a]/90 backdrop-blur-sm border border-blue-900/50 rounded-lg p-4 shadow-lg">
                    <div className="text-sm font-medium text-white mb-2">Threat Severity</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-xs text-gray-300">Critical</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-xs text-gray-300">High</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-xs text-gray-300">Medium</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-gray-300">Low</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "list" && (
              <div className="max-h-[400px] overflow-y-auto">
                <div className="divide-y divide-blue-900/30">
                  {threats.map((threat) => (
                    <div key={threat.id} className="p-4 hover:bg-blue-900/10">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              threat.severity === "critical"
                                ? "bg-red-500/20"
                                : threat.severity === "high"
                                  ? "bg-orange-500/20"
                                  : threat.severity === "medium"
                                    ? "bg-yellow-500/20"
                                    : "bg-blue-500/20"
                            }`}
                          >
                            {threatTypeIcons[threat.type]}
                          </div>
                          <div>
                            <div className="font-medium text-white">{threat.details}</div>
                            <div className="text-sm text-gray-400 mt-1">
                              {threat.source.country} → {threat.target.country}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge
                            className={`${
                              threat.severity === "critical"
                                ? "bg-red-500 text-white"
                                : threat.severity === "high"
                                  ? "bg-orange-500 text-white"
                                  : threat.severity === "medium"
                                    ? "bg-yellow-500 text-black"
                                    : "bg-blue-500 text-white"
                            }`}
                          >
                            {threat.severity}
                          </Badge>
                          <div className="text-xs text-gray-400">{timeAgo(threat.timestamp)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "stats" && (
              <div className="p-4 max-h-[400px] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Attack Types</h3>
                    <div className="space-y-4">
                      {Object.entries(stats.attackTypes).map(([type, count]) => (
                        <div key={type} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize text-gray-300">{type}</span>
                            <span className="text-gray-400">
                              {count} ({Math.round((count / stats.totalAttacks) * 100)}%)
                            </span>
                          </div>
                          <div className="h-2 w-full bg-blue-900/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(count / stats.totalAttacks) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Geographic Data</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-300">Top Target Countries</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {Array.from(stats.countriesTargeted)
                            .slice(0, 8)
                            .map((country) => (
                              <Badge
                                key={country}
                                variant="outline"
                                className="bg-blue-500/10 text-blue-400 border-blue-500/30"
                              >
                                {country}
                              </Badge>
                            ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-300">Top Source Countries</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {Array.from(stats.countriesAttacking)
                            .slice(0, 8)
                            .map((country) => (
                              <Badge
                                key={country}
                                variant="outline"
                                className="bg-red-500/10 text-red-400 border-red-500/30"
                              >
                                {country}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
