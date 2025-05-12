"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    content:
      "John is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
    author: "Sarah Johnson",
    position: "CTO at TechCorp",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    content:
      "Working with John was a pleasure. He understood our requirements perfectly and delivered a solution that exceeded our expectations.",
    author: "Michael Chen",
    position: "Product Manager at StartupX",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    content:
      "John's technical expertise and creativity make him a valuable asset to any team. He's not just a developer, but a true problem solver.",
    author: "Emily Rodriguez",
    position: "Lead Developer at InnovateCo",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Here's what people are saying about my work and collaboration experience.
          </p>

          <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <CardContent className="pt-6 flex-grow">
                    <Quote className="h-8 w-8 text-primary/40 mb-4" />
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                        <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.position}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
