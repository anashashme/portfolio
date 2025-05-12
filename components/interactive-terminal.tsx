"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, TerminalIcon, Copy, Check, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type CommandResult = {
  command: string
  output: string[]
  isError?: boolean
  isHTML?: boolean
}

export default function InteractiveTerminal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [command, setCommand] = useState("")
  const [history, setHistory] = useState<CommandResult[]>([
    {
      command: "help",
      output: [
        "Available commands:",
        "help - Show this help message",
        "whoami - Display user information",
        "ls - List files in current directory",
        "scan [target] - Scan a target for vulnerabilities",
        "ping [host] - Ping a host",
        "nmap [target] - Run a port scan",
        "hash [text] - Generate hash of text",
        "decrypt [text] - Attempt to decrypt text",
        "exploit [cve] - Show exploit information",
        "clear - Clear the terminal",
        "skills - List my technical skills",
        "contact - Show contact information",
      ],
    },
  ])
  const [copied, setCopied] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return

    const cmd = command.trim().toLowerCase()
    let result: CommandResult

    if (cmd === "clear") {
      setHistory([])
      setCommand("")
      return
    } else if (cmd === "help") {
      result = {
        command: cmd,
        output: [
          "Available commands:",
          "help - Show this help message",
          "whoami - Display user information",
          "ls - List files in current directory",
          "scan [target] - Scan a target for vulnerabilities",
          "ping [host] - Ping a host",
          "nmap [target] - Run a port scan",
          "hash [text] - Generate hash of text",
          "decrypt [text] - Attempt to decrypt text",
          "exploit [cve] - Show exploit information",
          "clear - Clear the terminal",
          "skills - List my technical skills",
          "contact - Show contact information",
        ],
      }
    } else if (cmd === "whoami") {
      result = {
        command: cmd,
        output: [
          "Anas Mustafa Hashmi",
          "Cybersecurity Specialist",
          "Location: Islamabad, Pakistan",
          "Specializations: Penetration Testing, Digital Forensics, Network Security",
        ],
      }
    } else if (cmd === "ls") {
      result = {
        command: cmd,
        output: [
          "projects/",
          "certifications/",
          "resume.pdf",
          "skills.txt",
          "contact.txt",
          "exploits/",
          "tools/",
          "reports/",
        ],
      }
    } else if (cmd.startsWith("scan")) {
      const target = cmd.split(" ")[1]
      if (!target) {
        result = {
          command: cmd,
          output: ["Error: Please specify a target to scan"],
          isError: true,
        }
      } else {
        result = {
          command: cmd,
          output: [
            `Scanning target: ${target}`,
            "Scanning ports...",
            "Checking for vulnerabilities...",
            "Analyzing response headers...",
            "Scan complete!",
            "Open ports: 22, 80, 443, 3306, 8080",
            "Potential vulnerabilities:",
            "- CVE-2021-44228 (Log4Shell) - Critical",
            "- CVE-2022-22965 (Spring4Shell) - High",
            "- CVE-2022-1388 (F5 BIG-IP) - Critical",
            "Recommendation: Update security patches immediately",
          ],
        }
      }
    } else if (cmd.startsWith("ping")) {
      const host = cmd.split(" ")[1]
      if (!host) {
        result = {
          command: cmd,
          output: ["Error: Please specify a host to ping"],
          isError: true,
        }
      } else {
        result = {
          command: cmd,
          output: [
            `PING ${host} (127.0.0.1): 56 data bytes`,
            `64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.080 ms`,
            `64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.075 ms`,
            `64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.079 ms`,
            `64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.073 ms`,
            `--- ${host} ping statistics ---`,
            `4 packets transmitted, 4 packets received, 0.0% packet loss`,
            `round-trip min/avg/max/stddev = 0.073/0.077/0.080/0.003 ms`,
          ],
        }
      }
    } else if (cmd.startsWith("nmap")) {
      const target = cmd.split(" ")[1]
      if (!target) {
        result = {
          command: cmd,
          output: ["Error: Please specify a target for port scanning"],
          isError: true,
        }
      } else {
        result = {
          command: cmd,
          output: [
            `Starting Nmap 7.93 ( https://nmap.org ) at ${new Date().toLocaleString()}`,
            `Nmap scan report for ${target}`,
            "Host is up (0.0023s latency).",
            "PORT     STATE SERVICE       VERSION",
            "22/tcp   open  ssh           OpenSSH 8.9p1 Ubuntu 3ubuntu0.1",
            "80/tcp   open  http          Apache httpd 2.4.52",
            "443/tcp  open  https         Apache httpd 2.4.52",
            "3306/tcp open  mysql         MySQL 8.0.32-0ubuntu0.22.04.2",
            "8080/tcp open  http-proxy    Nginx 1.18.0",
            "Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel",
            "",
            "Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .",
            `Nmap done: 1 IP address (1 host up) scanned in 14.28 seconds`,
          ],
        }
      }
    } else if (cmd.startsWith("hash")) {
      const text = cmd.substring(5)
      if (!text) {
        result = {
          command: cmd,
          output: ["Error: Please provide text to hash"],
          isError: true,
        }
      } else {
        // Simple hash simulation
        const hashMD5 = Array.from(text)
          .reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0)
          .toString(16)
          .padStart(32, "0")

        const hashSHA1 = Array.from(text)
          .reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0) * 31) | 0, 0)
          .toString(16)
          .padStart(40, "0")

        const hashSHA256 = Array.from(text)
          .reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0) * 127) | 0, 0)
          .toString(16)
          .padStart(64, "0")

        result = {
          command: cmd,
          output: [`Text: "${text}"`, `MD5: ${hashMD5}`, `SHA1: ${hashSHA1}`, `SHA256: ${hashSHA256}`],
        }
      }
    } else if (cmd.startsWith("decrypt")) {
      const text = cmd.substring(8)
      if (!text) {
        result = {
          command: cmd,
          output: ["Error: Please provide text to decrypt"],
          isError: true,
        }
      } else {
        result = {
          command: cmd,
          output: [
            "Attempting to decrypt...",
            "Running frequency analysis...",
            "Testing common ciphers...",
            "Results:",
            text.length > 20
              ? "Decryption unsuccessful. Text may be using strong encryption."
              : `Possible plaintext: "${Array.from(text).reverse().join("")}" (reversed)`,
            "Try different decryption methods or provide more context.",
          ],
        }
      }
    } else if (cmd.startsWith("exploit")) {
      const cve = cmd.split(" ")[1]
      if (!cve) {
        result = {
          command: cmd,
          output: ["Error: Please specify a CVE ID"],
          isError: true,
        }
      } else if (cve.toLowerCase() === "cve-2021-44228") {
        result = {
          command: cmd,
          isHTML: true,
          output: [
            "<div class='bg-red-500/10 p-3 rounded-md border border-red-500/30 mb-2'>",
            "  <div class='font-bold text-red-500 mb-1'>CVE-2021-44228 (Log4Shell)</div>",
            "  <div class='text-sm'>Critical Severity (CVSS: 10.0)</div>",
            "</div>",
            "<div class='mb-2'>",
            "  <div class='font-medium mb-1'>Description:</div>",
            "  <div class='text-sm text-muted-foreground'>Remote code execution vulnerability in Apache Log4j library that allows attackers to execute arbitrary code by sending a specially crafted request that gets logged.</div>",
            "</div>",
            "<div class='mb-2'>",
            "  <div class='font-medium mb-1'>Affected Systems:</div>",
            "  <div class='text-sm text-muted-foreground'>Apache Log4j versions 2.0 to 2.14.1</div>",
            "</div>",
            "<div class='mb-2'>",
            "  <div class='font-medium mb-1'>Mitigation:</div>",
            "  <div class='text-sm text-muted-foreground'>Upgrade to Log4j 2.15.0 or later. Set system property -Dlog4j2.formatMsgNoLookups=true</div>",
            "</div>",
          ],
        }
      } else {
        result = {
          command: cmd,
          output: [
            `Searching for exploit information for ${cve}...`,
            "No detailed information available for this CVE.",
            "Try searching for a known CVE like CVE-2021-44228 (Log4Shell).",
          ],
        }
      }
    } else if (cmd === "skills") {
      result = {
        command: cmd,
        output: [
          "Technical Skills:",
          "",
          "Penetration Testing:",
          "- Web Application Testing",
          "- Network Penetration Testing",
          "- Mobile Application Security",
          "- Social Engineering",
          "",
          "Digital Forensics:",
          "- Memory Forensics (Volatility)",
          "- Disk Forensics (Autopsy)",
          "- Network Forensics (Wireshark)",
          "- Malware Analysis",
          "",
          "Programming:",
          "- Python",
          "- C++",
          "- JavaScript",
          "- Bash Scripting",
          "",
          "Security Tools:",
          "- Metasploit, Burp Suite, Nmap",
          "- OWASP ZAP, Nikto, SQLmap",
          "- Kali Linux, Parrot OS",
        ],
      }
    } else if (cmd === "contact") {
      result = {
        command: cmd,
        output: [
          "Contact Information:",
          "Email: anashashmi029@gmail.com",
          "Phone: +92 316 5573 485",
          "LinkedIn: linkedin.com/in/anashashmi029",
          "GitHub: github.com/anashashme",
        ],
      }
    } else {
      result = {
        command: cmd,
        output: [`Command not found: ${cmd}. Type 'help' for available commands.`],
        isError: true,
      }
    }

    setHistory((prev) => [...prev, result])
    setCommand("")
  }

  const copyToClipboard = () => {
    const terminalContent = history
      .map((item) => {
        return `$ ${item.command}\n${item.isHTML ? "[HTML Content]" : item.output.join("\n")}`
      })
      .join("\n\n")

    navigator.clipboard.writeText(terminalContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadTerminalOutput = () => {
    const terminalContent = history
      .map((item) => {
        return `$ ${item.command}\n${item.isHTML ? "[HTML Content]" : item.output.join("\n")}`
      })
      .join("\n\n")

    const blob = new Blob([terminalContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "terminal-session.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    // Scroll to bottom of terminal when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    // Focus input when terminal is in view
    if (isInView && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isInView])

  return (
    <section id="interactive-terminal" className="py-16 md:py-24 relative overflow-hidden">
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
              <TerminalIcon className="h-6 w-6 text-primary" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Interactive <span className="text-primary">Terminal</span>
            </h2>
            <div className="w-20 h-1 bg-primary/30 rounded-full mt-4 mb-8" />
          </div>

          <Card className="border-primary/20 shadow-lg overflow-hidden">
            <CardHeader className="bg-black border-b border-primary/20 flex flex-row justify-between items-center">
              <CardTitle className="text-xl flex items-center gap-2 text-white">
                <span className="text-primary">guest@anas-hashmi</span>:~#
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="h-8 w-8 border-primary/50 text-primary hover:text-primary-foreground hover:bg-primary/80"
                  title="Copy terminal output"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={downloadTerminalOutput}
                  className="h-8 w-8 border-primary/50 text-primary hover:text-primary-foreground hover:bg-primary/80"
                  title="Download terminal output"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 bg-black">
              <div ref={terminalRef} className="font-mono text-sm text-green-500 p-4 h-[400px] overflow-y-auto">
                <div className="mb-4 text-primary">
                  Welcome to Anas Hashmi's interactive terminal. Type 'help' to see available commands.
                </div>
                {history.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center gap-2 text-primary">
                      <span>$</span>
                      <span>{item.command}</span>
                    </div>
                    {item.isHTML ? (
                      <div
                        className="pl-4 mt-2"
                        dangerouslySetInnerHTML={{
                          __html: item.output.join(""),
                        }}
                      />
                    ) : (
                      item.output.map((line, i) => (
                        <div key={i} className={`pl-4 ${item.isError ? "text-red-500" : "text-green-400"}`}>
                          {line}
                        </div>
                      ))
                    )}
                  </div>
                ))}
                <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
                  <span className="text-primary">$</span>
                  <Input
                    ref={inputRef}
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    className="flex-1 bg-transparent border-none text-green-500 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                    placeholder="Type a command..."
                  />
                  <Button type="submit" size="icon" variant="ghost" className="text-primary">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <div className="text-sm text-muted-foreground mb-4">
              Try commands like 'whoami', 'ls', 'scan example.com', or 'exploit cve-2021-44228' to interact with the
              terminal.
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {["help", "whoami", "ls", "scan example.com", "nmap target.com", "exploit cve-2021-44228", "skills"].map(
                (cmd) => (
                  <Badge
                    key={cmd}
                    variant="outline"
                    className="cursor-pointer bg-primary/10 hover:bg-primary/20"
                    onClick={() => {
                      setCommand(cmd)
                      if (inputRef.current) inputRef.current.focus()
                    }}
                  >
                    {cmd}
                  </Badge>
                ),
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
