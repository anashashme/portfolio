"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MoonIcon, SunIcon, MenuIcon, XIcon, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md border-b border-primary/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" onClick={() => scrollToSection("hero")}>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="bg-primary/10 p-2 rounded-full"
            >
              <ShieldAlert className="h-5 w-5 text-primary" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                Anas <span className="text-primary">Hashmi</span>
              </span>
              <span className="text-xs text-muted-foreground">Cybersecurity Specialist</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {["about", "skills", "experience", "education", "projects", "certifications", "contact"].map(
              (item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="relative px-4 py-2 text-sm font-medium hover:text-primary transition-colors rounded-md group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary group-hover:w-4/5 transition-all duration-300 -translate-x-1/2"></span>
                </motion.button>
              ),
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="ml-4"
            >
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
              >
                <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
            >
              {isOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md shadow-md border-b border-primary/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-1">
              {["about", "skills", "experience", "education", "projects", "certifications", "contact"].map(
                (item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="py-2 px-3 text-sm font-medium hover:text-primary transition-colors rounded-md text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.button>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
