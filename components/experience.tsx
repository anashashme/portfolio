"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react"

const experiences = [
  {
    title: "Cybersecurity Support Trainee",
    company: "Trillium Information Security Systems",
    location: "Rawalpindi, Punjab, Pakistan",
    period: "May 2025 - Present",
    type: "Hybrid",
    description: [
      "Assisting in security incident response and vulnerability management processes.",
      "Conducting security assessments and implementing security controls.",
      "Supporting the SOC team with threat monitoring and analysis.",
      "Participating in security awareness training programs for clients.",
    ],
  },
  {
    title: "Teaching Assistant, VAPT",
    company: "Riphah International University",
    location: "Islamabad, Pakistan",
    period: "Feb 2025 - May 2025",
    type: "On-site",
    description: [
      "Assisting junior fellows in learning the fundamentals of Vulnerability assessment & Penetration Testing course.",
      "Grading the weekly lab tasks of the junior students.",
      "Demonstrating live attacks on VulnHub machines on controlled environment.",
    ],
  },
  {
    title: "Intern, Python Developer / AI Engineer",
    company: "SOFTOO",
    location: "Islamabad, Pakistan",
    period: "Aug 2024 - Dec 2024",
    type: "On-site",
    description: [
      "Developed and optimized AI models to solve real-world problems.",
      "Collaborated on software development projects, ensuring efficient code and performance.",
      "Integrating AI solutions into existing systems, ensuring seamless functionality and performance.",
    ],
  },
  {
    title: "Intern, SOC Analyst",
    company: "Canada Cloud Solution",
    location: "Toronto, Ontario, Canada",
    period: "July 2024 - Sept 2024",
    type: "Remote",
    description: [
      "Monitored and analyzed security events, assisting in incident response.",
      "Conducted threat intelligence gathering and vulnerability assessments.",
      "Communicated effectively with the team through Microsoft Teams.",
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="experience" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
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
              <Briefcase className="h-6 w-6 text-primary" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Work <span className="text-primary">Experience</span>
            </h2>
            <div className="w-20 h-1 bg-primary/30 rounded-full mt-4 mb-8" />
          </div>

          <div ref={ref} className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-1/2" />

            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative mb-12 md:mb-24 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right md:ml-auto md:mr-1/2" : "md:pl-12 md:ml-1/2"
                } md:w-1/2`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-auto md:right-0 top-8 w-5 h-5 rounded-full bg-primary shadow-lg md:transform md:translate-x-1/2 z-10">
                  {index === 0 && (
                    <span className="absolute top-0 left-0 w-full h-full rounded-full animate-ping bg-primary/50"></span>
                  )}
                </div>

                <Card
                  className={`border-primary/20 shadow-lg hover:shadow-xl transition-shadow ${index === 0 ? "border-primary/50 shadow-primary/20" : ""}`}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          {experience.title}
                          {index === 0 && (
                            <Badge className="ml-2 bg-green-500/20 text-green-500 border border-green-500/30">
                              Current
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-base mt-1 flex items-center gap-1">
                          <span className="font-medium text-primary">{experience.company}</span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {experience.period}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {experience.location}
                      </Badge>
                      <Badge variant="secondary">{experience.type}</Badge>
                    </div>

                    <ul className="space-y-2">
                      {experience.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
