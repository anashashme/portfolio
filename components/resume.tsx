"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

export default function Resume() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="resume" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            My <span className="text-primary">Resume</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Download my resume to learn more about my education, work experience, and skills.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              Download Resume
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <FileText className="h-5 w-5" />
              View Resume
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <span className="text-sm">🎓</span>
                </span>
                Education
              </h3>

              <div className="space-y-6">
                <div className="border-l-2 border-primary/30 pl-4 pb-6">
                  <h4 className="font-medium">Master of Computer Science</h4>
                  <p className="text-sm text-muted-foreground">Stanford University</p>
                  <p className="text-sm text-muted-foreground">2018 - 2020</p>
                </div>

                <div className="border-l-2 border-primary/30 pl-4">
                  <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                  <p className="text-sm text-muted-foreground">MIT</p>
                  <p className="text-sm text-muted-foreground">2014 - 2018</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <span className="text-sm">💼</span>
                </span>
                Experience
              </h3>

              <div className="space-y-6">
                <div className="border-l-2 border-primary/30 pl-4 pb-6">
                  <h4 className="font-medium">Senior Frontend Developer</h4>
                  <p className="text-sm text-muted-foreground">Google</p>
                  <p className="text-sm text-muted-foreground">2020 - Present</p>
                </div>

                <div className="border-l-2 border-primary/30 pl-4">
                  <h4 className="font-medium">Full-Stack Developer</h4>
                  <p className="text-sm text-muted-foreground">Facebook</p>
                  <p className="text-sm text-muted-foreground">2018 - 2020</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
