"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Lock, Eye, EyeOff, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PasswordStrength() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [password, setPassword] = useState("")
  const [strength, setStrength] = useState(0)
  const [feedback, setFeedback] = useState<string[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [timeToBreak, setTimeToBreak] = useState("")
  const [commonBreaches, setCommonBreaches] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const calculateStrength = (pass: string) => {
    if (!pass) {
      setStrength(0)
      setFeedback(["Enter a password to check its strength"])
      setTimeToBreak("")
      setCommonBreaches([])
      return
    }

    setIsAnalyzing(true)

    // Simulate analysis delay for UX
    setTimeout(() => {
      let score = 0
      const newFeedback: string[] = []

      // Length check
      if (pass.length < 8) {
        newFeedback.push("Password is too short (minimum 8 characters)")
      } else if (pass.length >= 12) {
        score += 25
      } else {
        score += 15
      }

      // Complexity checks
      if (/[A-Z]/.test(pass)) {
        score += 15
      } else {
        newFeedback.push("Add uppercase letters")
      }

      if (/[a-z]/.test(pass)) {
        score += 15
      } else {
        newFeedback.push("Add lowercase letters")
      }

      if (/[0-9]/.test(pass)) {
        score += 15
      } else {
        newFeedback.push("Add numbers")
      }

      if (/[^A-Za-z0-9]/.test(pass)) {
        score += 20
      } else {
        newFeedback.push("Add special characters")
      }

      // Check for variety of characters
      const uniqueChars = new Set(pass).size
      if (uniqueChars > pass.length * 0.7) {
        score += 10
      } else if (uniqueChars < pass.length * 0.5) {
        newFeedback.push("Use a greater variety of characters")
        score = Math.max(score - 10, 0)
      }

      // Common patterns check
      const commonPatterns = [
        "123456",
        "password",
        "qwerty",
        "admin",
        "welcome",
        "123123",
        "12345",
        "1234",
        "111111",
        "abc123",
      ]

      if (commonPatterns.some((pattern) => pass.toLowerCase().includes(pattern))) {
        score = Math.max(score - 20, 0)
        newFeedback.push("Avoid common patterns")
      }

      // Sequential characters check
      const sequentialCheck = (str: string) => {
        for (let i = 0; i < str.length - 2; i++) {
          const char1 = str.charCodeAt(i)
          const char2 = str.charCodeAt(i + 1)
          const char3 = str.charCodeAt(i + 2)

          if (char1 + 1 === char2 && char2 + 1 === char3) {
            return true
          }
        }
        return false
      }

      if (sequentialCheck(pass)) {
        score = Math.max(score - 10, 0)
        newFeedback.push("Avoid sequential characters")
      }

      // Repeated characters check
      const repeatedCheck = (str: string) => {
        for (let i = 0; i < str.length - 2; i++) {
          if (str[i] === str[i + 1] && str[i] === str[i + 2]) {
            return true
          }
        }
        return false
      }

      if (repeatedCheck(pass)) {
        score = Math.max(score - 10, 0)
        newFeedback.push("Avoid repeated characters")
      }

      setStrength(score)

      // Calculate time to break
      let timeEstimate = ""
      if (score < 20) {
        timeEstimate = "Instantly"
      } else if (score < 40) {
        timeEstimate = "A few minutes to hours"
      } else if (score < 60) {
        timeEstimate = "A few days to weeks"
      } else if (score < 80) {
        timeEstimate = "A few months to years"
      } else {
        timeEstimate = "Centuries"
      }
      setTimeToBreak(timeEstimate)

      // Simulate breach check
      const breaches: string[] = []
      if (pass.toLowerCase() === "password" || pass === "123456" || pass === "qwerty") {
        breaches.push("LinkedIn 2021 Breach (700M accounts)")
        breaches.push("Facebook 2019 Breach (533M accounts)")
      }
      if (pass.length < 6) {
        breaches.push("Found in multiple data breaches")
      }
      setCommonBreaches(breaches)

      if (score === 100) {
        setFeedback(["Excellent password!"])
      } else if (newFeedback.length === 0) {
        setFeedback(["Good password, but could be stronger"])
      } else {
        setFeedback(newFeedback)
      }

      setIsAnalyzing(false)
    }, 600)
  }

  const getStrengthColor = () => {
    if (strength < 40) return "bg-red-500"
    if (strength < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = () => {
    if (strength < 40) return "Weak"
    if (strength < 70) return "Moderate"
    if (strength < 90) return "Strong"
    return "Very Strong"
  }

  const generateSecurePassword = () => {
    const length = 16
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-="
    let password = ""

    // Ensure at least one of each character type
    password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]
    password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]
    password += "0123456789"[Math.floor(Math.random() * 10)]
    password += "!@#$%^&*()_+~`|}{[]:;?><,./-="[Math.floor(Math.random() * 30)]

    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)]
    }

    // Shuffle the password
    password = password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("")

    setPassword(password)
    calculateStrength(password)
  }

  useEffect(() => {
    if (isInView) {
      // Add example password when component comes into view
      setPassword("")
      calculateStrength("")
    }
  }, [isInView])

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex flex-col items-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary/10 p-2 rounded-full mb-4"
            >
              <Lock className="h-6 w-6 text-primary" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Password <span className="text-primary">Strength</span> Analyzer
            </h2>
            <div className="w-20 h-1 bg-primary/30 rounded-full mt-4 mb-8" />
          </div>

          <Card className="border-primary/20 shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-between">
                <span>Test Your Password Security</span>
                <Button variant="outline" size="sm" onClick={generateSecurePassword}>
                  Generate Secure Password
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Enter a password to check its strength
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      calculateStrength(e.target.value)
                    }}
                    className="border-primary/20 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Strength:</span>
                    <Badge
                      className={`
                        ${strength < 40 ? "bg-red-500" : strength < 70 ? "bg-yellow-500" : "bg-green-500"}
                        text-white
                      `}
                    >
                      {getStrengthText()}
                    </Badge>
                  </div>
                  <span className="text-sm">{strength}%</span>
                </div>
                <Progress value={strength} className="h-2" indicatorClassName={getStrengthColor()} />
              </div>

              {isAnalyzing ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-2">Analyzing password strength...</span>
                </div>
              ) : (
                <>
                  {password && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          <Info className="h-4 w-4 text-primary" />
                          Feedback
                        </h3>
                        <ul className="space-y-1 text-sm">
                          {feedback.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              {strength < 70 ? (
                                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              )}
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          <Info className="h-4 w-4 text-primary" />
                          Security Analysis
                        </h3>

                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="font-medium">Estimated time to crack: </span>
                            <span
                              className={`
                              ${
                                timeToBreak === "Instantly"
                                  ? "text-red-500"
                                  : timeToBreak.includes("hours")
                                    ? "text-orange-500"
                                    : timeToBreak.includes("days")
                                      ? "text-yellow-500"
                                      : "text-green-500"
                              }
                              font-medium
                            `}
                            >
                              {timeToBreak}
                            </span>
                          </div>

                          <div>
                            <span className="font-medium">Found in data breaches: </span>
                            {commonBreaches.length > 0 ? (
                              <div className="mt-1">
                                {commonBreaches.map((breach, index) => (
                                  <Badge key={index} variant="outline" className="bg-red-500/10 text-red-500 mr-1 mb-1">
                                    {breach}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-green-500">No matches found</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-1">Password Security Tips:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 list-disc pl-5">
                      <li>Use a minimum of 12 characters</li>
                      <li>Include uppercase and lowercase letters</li>
                      <li>Include numbers and special characters</li>
                      <li>Avoid using personal information</li>
                      <li>Use a different password for each account</li>
                      <li>Consider using a password manager</li>
                      <li>Enable two-factor authentication when available</li>
                      <li>Change passwords regularly (every 90 days)</li>
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
