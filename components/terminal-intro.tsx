"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TerminalIntro() {
  const [text, setText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [commandIndex, setCommandIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = [
    "whoami",
    "Anas Mustafa Hashmi",
    "cat skills.txt",
    "Cybersecurity | Penetration Testing | Digital Forensics | Python | Machine Learning",
    "ls projects/",
    "Network_Vigilance.py  Memory_Forensics.sh",
    "sudo ./start_portfolio.sh",
    "Access granted. Welcome to my portfolio...",
  ]

  useEffect(() => {
    if (commandIndex >= commands.length) {
      setIsComplete(true)
      return
    }

    const currentCommand = commands[commandIndex]
    let charIndex = 0

    const typingInterval = setInterval(
      () => {
        if (charIndex <= currentCommand.length) {
          setText(currentCommand.substring(0, charIndex))
          charIndex++
        } else {
          clearInterval(typingInterval)
          setTimeout(
            () => {
              setCommandIndex(commandIndex + 1)
              setText("")
            },
            commandIndex % 2 === 0 ? 300 : 1000,
          ) // Wait longer after responses
        }
      },
      commandIndex % 2 === 0 ? 100 : 30,
    ) // Type commands slower than responses

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(typingInterval)
      clearInterval(cursorInterval)
    }
  }, [commandIndex])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [text])

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border border-primary/20 shadow-lg overflow-hidden bg-black/90 dark:bg-black/70">
            <div className="bg-muted/20 px-4 py-2 border-b border-primary/20 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <Badge variant="outline" className="ml-2 text-xs font-mono">
                terminal@anas-hashmi:~
              </Badge>
            </div>
            <CardContent className="p-0">
              <div ref={terminalRef} className="font-mono text-sm text-green-500 p-4 h-[300px] overflow-y-auto">
                {commands.slice(0, commandIndex).map((cmd, i) => (
                  <div key={i} className="mb-2">
                    {i % 2 === 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-primary">$</span>
                        <span>{cmd}</span>
                      </div>
                    ) : (
                      <div className="pl-6 text-muted-foreground">{cmd}</div>
                    )}
                  </div>
                ))}
                {!isComplete && (
                  <div className="flex items-center gap-2">
                    <span className="text-primary">$</span>
                    <span>
                      {text}
                      {showCursor && <span className="animate-pulse">▋</span>}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
