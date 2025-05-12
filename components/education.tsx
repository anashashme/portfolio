"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Award, Calendar, School } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const education = [
  {
    degree: "BS, Cyber Security",
    institution: "Riphah International University",
    period: "Oct 2021 - May 2025",
    details: ["FYP: Advanced Persistent Threat (APT) Detection & Prevention."],
  },
  {
    degree: "FSc, Pre-Medical",
    institution: "Punjab Group Of Colleges",
    period: "Sep 2018 - Mar 2020",
    details: [],
  },
]

const honors = [
  {
    title: "CTF Competition Winner 2024",
    sponsor: "CyberAlphas",
    description:
      "Demonstrated exceptional skills in cybersecurity challenges, securing first place in the competition.",
  },
]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="education" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

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
              <GraduationCap className="h-6 w-6 text-primary" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Education & <span className="text-primary">Honors</span>
            </h2>
            <div className="w-20 h-1 bg-primary/30 rounded-full mt-4 mb-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                Education
              </h3>

              <div className="space-y-6">
                {education.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="transition-all duration-300"
                  >
                    <Card className="border-primary/20 shadow-lg overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-primary to-primary/50" />
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <School className="h-5 w-5 text-primary" />
                          {item.degree}
                        </CardTitle>
                        <CardDescription className="text-base flex flex-col sm:flex-row sm:items-center gap-2">
                          <span className="font-medium">{item.institution}</span>
                          <Badge variant="outline" className="flex items-center gap-1 sm:ml-2 w-fit">
                            <Calendar className="h-3 w-3" />
                            {item.period}
                          </Badge>
                        </CardDescription>
                      </CardHeader>
                      {item.details.length > 0 && (
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1">
                            {item.details.map((detail, i) => (
                              <li key={i} className="text-muted-foreground">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Honors & Awards
              </h3>

              <div className="space-y-6">
                {honors.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    whileHover={{ y: -5 }}
                    className="transition-all duration-300"
                  >
                    <Card className="border-primary/20 shadow-lg overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600" />
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Award className="h-5 w-5 text-yellow-500" />
                            {item.title}
                          </CardTitle>
                          <Badge className="bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30">Winner</Badge>
                        </div>
                        {item.sponsor && (
                          <CardDescription className="text-sm">Sponsored by {item.sponsor}</CardDescription>
                        )}
                      </CardHeader>
                      {item.description && (
                        <CardContent>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg text-center"
                >
                  <p className="text-muted-foreground">
                    Continuously participating in CTF competitions and cybersecurity challenges to enhance skills.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
