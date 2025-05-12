import Link from "next/link"
import { Github, Linkedin, Mail, Phone } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-12 relative bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Anas Mustafa Hashmi. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            <Link
              href="https://github.com/anashashme"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-transform hover:scale-110"
            >
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link
              href="https://linkedin.com/in/anashashmi029"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-transform hover:scale-110"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link
              href="mailto:anashashmi029@gmail.com"
              aria-label="Email"
              className="transition-transform hover:scale-110"
            >
              <Mail className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="tel:+923165573485" aria-label="Phone" className="transition-transform hover:scale-110">
              <Phone className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* GitHub Corner */}
      <a href="https://github.com/anashashme/portfolio" className="github-corner" aria-label="View source on GitHub">
        <svg
          width="80"
          height="80"
          viewBox="0 0 250 250"
          style={{
            fill: "var(--primary-color)",
            color: "var(--background)",
            position: "absolute",
            top: 0,
            border: 0,
            right: 0,
          }}
          aria-hidden="true"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"/>

\
