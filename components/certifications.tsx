"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

const certifications = [
  "eLearnSecurity Junior Penetration Tester - eJPTv2",
  "Certified Ethical Hacking (v12)",
  "Cyber Incident Response",
  "Information Security",
  "Cryptography",
  "Certified in Cybersecurity (CC - ISC2)",
  "Digital Forensics Essentials (DFE)",
  "Pre Security [TryHackMe]",
  "Malware Analysis and Introduction to Assembly Language",
  "The Bits and Bytes of Computer Networking",
  "Hands-on Introduction to Linux Commands and Shell Scripting",
  "Introduction to Cyber Security [TryHackMe]",
]

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="certifications" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-primary">Certifications</span> & Training
          </h2>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{cert}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
