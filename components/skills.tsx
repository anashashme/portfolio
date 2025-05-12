"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Shield, Network, Database, Bug } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    id: "programming",
    title: "Programming Languages",
    icon: <Code className="h-5 w-5" />,
    color: "from-blue-500 to-indigo-500",
    skills: [
      { name: "Python", level: 90 },
      { name: "C++", level: 75 },
      { name: "Machine Learning", level: 70 },
      { name: "OOP", level: 85 },
      { name: "DSA", level: 80 },
      { name: "React.js", level: 65 },
    ],
  },
  {
    id: "security",
    title: "Security Operations & Monitoring",
    icon: <Shield className="h-5 w-5" />,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Sysmon", level: 85 },
      { name: "Osquery", level: 80 },
      { name: "Wazuh", level: 75 },
      { name: "Splunk", level: 90 },
      { name: "Zeek(Bro)", level: 85 },
      { name: "Snort/Suricata", level: 80 },
    ],
  },
  {
    id: "forensics",
    title: "Digital Forensics & Incident Response",
    icon: <Database className="h-5 w-5" />,
    color: "from-purple-500 to-violet-500",
    skills: [
      { name: "Memory Forensics", level: 90 },
      { name: "Autopsy", level: 85 },
      { name: "Wireshark", level: 95 },
      { name: "Redline", level: 80 },
      { name: "KAPE", level: 75 },
      { name: "Volatility", level: 90 },
      { name: "Velociraptor", level: 70 },
      { name: "TheHive", level: 75 },
      { name: "IDA Pro", level: 65 },
      { name: "Ghidra", level: 70 },
      { name: "YARA", level: 85 },
    ],
  },
  {
    id: "network",
    title: "Network Security & Traffic Analysis",
    icon: <Network className="h-5 w-5" />,
    color: "from-red-500 to-rose-500",
    skills: [
      { name: "Wireshark", level: 95 },
      { name: "Nmap", level: 90 },
      { name: "Zeek(Bro)", level: 85 },
      { name: "Snort/Suricata", level: 80 },
      { name: "Cisco Packet Tracer", level: 75 },
    ],
  },
  {
    id: "vapt",
    title: "Vulnerability Assessment & Penetration Testing",
    icon: <Bug className="h-5 w-5" />,
    color: "from-amber-500 to-yellow-500",
    skills: [
      { name: "Nikto", level: 85 },
      { name: "WPScan", level: 80 },
      { name: "Gobuster", level: 90 },
      { name: "Sublist3r", level: 85 },
      { name: "ffuf", level: 80 },
      { name: "Metasploit", level: 95 },
      { name: "Nmap", level: 90 },
      { name: "Nessus", level: 85 },
      { name: "OpenVAS", level: 80 },
      { name: "BurpSuite", level: 90 },
      { name: "ZAP", level: 85 },
      { name: "MISP", level: 75 },
      { name: "YARA", level: 85 },
    ],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeTab, setActiveTab] = useState("programming")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  // Auto-rotate through skill categories
  useEffect(() => {
    if (!isInView) return

    const categories = skillCategories.map((cat) => cat.id)
    let currentIndex = categories.indexOf(activeTab)

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % categories.length
      setActiveTab(categories[currentIndex])
    }, 5000)

    return () => clearInterval(interval)
  }, [isInView, activeTab])

  const getIconAnimation = (skillName: string) => {
    if (hoveredSkill === skillName) {
      return {
        rotate: [0, 15, -15, 10, -10, 5, -5, 0],
        scale: [1, 1.2, 1.2, 1.1, 1.1, 1.05, 1.05, 1],
        transition: { duration: 0.5 },
      }
    }
    return {}
  }

  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary/10 p-2 rounded-full mb-4"
            >
              <Code className="h-6 w-6 text-primary" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Technical <span className="text-primary">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-primary/30 rounded-full mt-4 mb-6" />
          </div>

          <div ref={ref} className="space-y-8">
            <div className="flex flex-wrap justify-center gap-3">
              {skillCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    activeTab === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : "bg-muted/50 hover:bg-muted"
                  }`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div animate={activeTab === category.id ? { rotate: 360 } : {}} transition={{ duration: 0.5 }}>
                    {category.icon}
                  </motion.div>
                  <span className="font-medium">{category.title.split(" ")[0]}</span>
                </motion.button>
              ))}
            </div>

            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                {skillCategories.map(
                  (category) =>
                    activeTab === category.id && (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                      >
                        <Card
                          className={`border-none shadow-lg overflow-hidden bg-gradient-to-br ${category.color}/5 h-full`}
                        >
                          <CardHeader className={`border-b border-${category.color.split("-")[1]}-500/20`}>
                            <CardTitle className="flex items-center gap-2">
                              <div className={`p-2 rounded-full bg-gradient-to-r ${category.color} text-white`}>
                                {category.icon}
                              </div>
                              {category.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {category.skills.map((skill, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: i * 0.05,
                                    type: "spring",
                                    stiffness: 100,
                                  }}
                                  whileHover={{
                                    y: -8,
                                    scale: 1.05,
                                    boxShadow: "0 10px 25px -5px rgba(var(--primary), 0.3)",
                                  }}
                                  className="bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-muted/50 card-hover-effect"
                                  onMouseEnter={() => setHoveredSkill(skill.name)}
                                  onMouseLeave={() => setHoveredSkill(null)}
                                >
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">{skill.name}</span>
                                    <Badge className={`bg-gradient-to-r ${category.color} text-white border-none`}>
                                      Expert
                                    </Badge>
                                  </div>
                                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${skill.level}%` }}
                                      transition={{
                                        duration: 1.2,
                                        delay: 0.2 + i * 0.05,
                                        ease: "easeOut",
                                      }}
                                      className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                                    />
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 animate-gradient-x"></div>
              <div className="relative bg-primary/5 border border-primary/10 rounded-lg p-6 text-center">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/10 rounded-full"></div>

                <p className="text-lg relative z-10 font-medium">
                  <span className="text-primary">Continuously</span> expanding my skillset through{" "}
                  <span className="relative inline-block">
                    research
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/50"></span>
                  </span>
                  ,{" "}
                  <span className="relative inline-block">
                    practice
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/50"></span>
                  </span>
                  , and{" "}
                  <span className="relative inline-block">
                    professional development
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/50"></span>
                  </span>
                  .
                </p>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-8 bg-primary/5 -rotate-3"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
