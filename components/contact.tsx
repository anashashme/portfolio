"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Mail, Phone, Github, Linkedin, ExternalLink } from "lucide-react"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Get In <span className="text-primary">Touch</span>
          </h2>

          <Card className="border-none shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-primary p-8 text-white">
                  <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
                  <p className="mb-8 opacity-90">
                    I'm currently available for freelance work, internships, and full-time positions in cybersecurity
                    and related fields.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 mt-1" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="opacity-90">Islamabad, Pakistan</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="h-5 w-5 mt-1" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href="mailto:anashashmi029@gmail.com"
                          className="opacity-90 hover:opacity-100 transition-opacity"
                        >
                          anashashmi029@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="h-5 w-5 mt-1" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href="tel:+923165573485" className="opacity-90 hover:opacity-100 transition-opacity">
                          +92 316 5573 485
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">Social Profiles</h3>

                  <div className="grid grid-cols-1 gap-4">
                    <Button variant="outline" size="lg" className="gap-2 justify-start hover:bg-primary/10" asChild>
                      <a href="https://github.com/anashashme" target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                        GitHub
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </a>
                    </Button>

                    <Button variant="outline" size="lg" className="gap-2 justify-start hover:bg-primary/10" asChild>
                      <a href="https://linkedin.com/in/anashashmi029" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                        LinkedIn
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </a>
                    </Button>

                    <div className="mt-8">
                      <h4 className="font-medium mb-2">Availability</h4>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                        <span>Available for new opportunities</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Response Time</h4>
                      <p className="text-muted-foreground">Usually within 24 hours</p>
                    </div>
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
