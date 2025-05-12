"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, Code, Zap, Lock, Database } from "lucide-react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Security Operations",
      description: "Monitoring and analyzing security events to protect digital assets",
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Penetration Testing",
      description: "Identifying and exploiting vulnerabilities in systems and applications",
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: "Digital Forensics",
      description: "Investigating incidents and recovering digital evidence",
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Development",
      description: "Building secure applications with Python and modern frameworks",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "AI Integration",
      description: "Leveraging machine learning for advanced threat detection",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Certifications",
      description: "Industry-recognized credentials in cybersecurity",
    },
  ]

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col items-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary/10 p-2 rounded-full mb-4"
            >
              <Shield className="h-6 w-6 text-primary" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              About <span className="text-primary">Me</span>
            </h2>
            <div className="w-20 h-1 bg-primary/30 rounded-full mt-4 mb-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="order-2 md:order-1"
            >
              <p className="text-lg text-muted-foreground mb-6">
                Cybersecurity graduate passionate about emerging technologies, cyber threat intelligence, and proactive
                defense strategies. I'm deeply focused on understanding and mitigating advanced cyber threats through a
                combination of technical expertise and analytical thinking. Eager to apply hands-on skills to real-world
                challenges and contribute to a more secure digital landscape.
              </p>

              <p className="text-muted-foreground mb-8">
                With expertise in vulnerability assessment, penetration testing, and digital forensics, I'm committed to
                staying at the forefront of cybersecurity innovation and best practices. My approach combines technical
                proficiency with a methodical mindset, allowing me to identify security gaps and implement effective
                solutions. I believe in continuous learning and adapting to the ever-evolving threat landscape.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span className="font-medium">Problem solver with analytical mindset</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span className="font-medium">Continuous learner in the evolving security landscape</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span className="font-medium">Passionate about ethical hacking and secure coding</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="order-1 md:order-2 flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full blur-xl opacity-70 animate-pulse" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                  <Image src="/images/profile-image.png" alt="Anas Mustafa Hashmi" fill className="object-cover" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="transition-all duration-300"
              >
                <Card className="bg-primary/5 border-primary/10 hover:border-primary/30 h-full transition-colors">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="bg-background rounded-full p-3 mb-4 shadow-md">{feature.icon}</div>
                    <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
