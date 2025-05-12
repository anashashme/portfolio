import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Education from "@/components/education"
import Projects from "@/components/projects"
import Certifications from "@/components/certifications"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import EnhancedThreatIntelligence from "@/components/enhanced-threat-intelligence"
import HackingSimulation from "@/components/hacking-simulation"
import CustomCursor from "@/components/custom-cursor"
import MatrixRain from "@/components/matrix-rain"
import InteractiveTerminal from "@/components/interactive-terminal"
import PasswordStrength from "@/components/password-strength"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <MatrixRain />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <EnhancedThreatIntelligence />
        <InteractiveTerminal />
        <HackingSimulation />
        <PasswordStrength />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
