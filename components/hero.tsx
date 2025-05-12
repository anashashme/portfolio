"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Shield, Code, Database, Lock, ExternalLink } from "lucide-react"
import { TypeAnimation } from "react-type-animation"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/5 dark:from-primary/10 dark:to-background/10"
      />

      {/* Professional geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(var(--primary), 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--primary), 0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        ></div>

        {/* Binary code background */}
        <div className="absolute inset-0 opacity-5">
          <div className="binary-rain"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex flex-col"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start mb-6"
            >
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2">
                <span className="text-primary">Anas</span> Mustafa Hashmi
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <div className="h-12 flex items-center">
                <TypeAnimation
                  sequence={[
                    "Cybersecurity Specialist",
                    1000,
                    "Penetration Tester",
                    1000,
                    "SOC Analyst",
                    1000,
                    "Python Developer",
                    1000,
                    "Digital Forensics Expert",
                    1000,
                  ]}
                  wrapper="h2"
                  speed={50}
                  className="text-2xl md:text-3xl font-medium"
                  repeat={Number.POSITIVE_INFINITY}
                />
              </div>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Passionate about emerging technologies, cyber threat intelligence, and proactive defense strategies
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button size="lg" onClick={scrollToAbout} className="rounded-full px-8 gap-2 group">
                Explore My Work
                <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>

              <Button variant="outline" size="lg" className="rounded-full px-8 gap-2" asChild>
                <a href="https://github.com/anashashme" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  GitHub Profile
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <Badge variant="outline" className="bg-primary/10 border-primary/20 text-sm py-1.5">
                #Cybersecurity
              </Badge>
              <Badge variant="outline" className="bg-primary/10 border-primary/20 text-sm py-1.5">
                #PenetrationTesting
              </Badge>
              <Badge variant="outline" className="bg-primary/10 border-primary/20 text-sm py-1.5">
                #DigitalForensics
              </Badge>
              <Badge variant="outline" className="bg-primary/10 border-primary/20 text-sm py-1.5">
                #Python
              </Badge>
              <Badge variant="outline" className="bg-primary/10 border-primary/20 text-sm py-1.5">
                #MachineLearning
              </Badge>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center relative"
          >
            {/* Professional abstract graphic */}
            <div className="relative w-[500px] h-[500px]">
              {/* Main circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-primary/20 animate-[spin_20s_linear_infinite]"></div>

              {/* Outer circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-primary/10 animate-[spin_25s_linear_infinite_reverse]"></div>

              {/* Inner circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-primary/30 animate-[spin_15s_linear_infinite_reverse]"></div>

              {/* Shield icon in center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/10 p-8 rounded-full">
                <Shield className="h-16 w-16 text-primary" />
              </div>

              {/* Orbiting elements */}
              <div className="absolute top-1/2 left-1/2 w-64 h-64 animate-[spin_8s_linear_infinite]">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/20 p-3 rounded-full">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 w-64 h-64 animate-[spin_12s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-primary/20 p-3 rounded-full">
                  <Database className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 w-64 h-64 animate-[spin_10s_linear_infinite]">
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/20 p-3 rounded-full">
                  <Code className="h-6 w-6 text-primary" />
                </div>
              </div>

              {/* Decorative dots */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-primary/60"
                  style={{
                    transform: `rotate(${i * 30}deg) translateX(160px) rotate(-${i * 30}deg)`,
                  }}
                ></div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ opacity }}>
        <ChevronDown className="h-8 w-8 opacity-50" onClick={scrollToAbout} />
      </motion.div>
    </section>
  )
}
