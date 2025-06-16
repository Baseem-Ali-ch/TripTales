import type React from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">BlogFolio</h3>
            <p className="text-muted-foreground mb-4">
              A modern platform for sharing stories, insights, and ideas with the world.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} label="Facebook" />
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} label="Twitter" />
              <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} label="Instagram" />
              <SocialLink href="#" icon={<Github className="h-5 w-5" />} label="GitHub" />
              <SocialLink href="#" icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-muted-foreground hover:text-primary transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/technology"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/category/design" className="text-muted-foreground hover:text-primary transition-colors">
                  Design
                </Link>
              </li>
              <li>
                <Link
                  href="/category/productivity"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Productivity
                </Link>
              </li>
              <li>
                <Link href="/category/lifestyle" className="text-muted-foreground hover:text-primary transition-colors">
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p className="mb-2">123 Blog Street</p>
              <p className="mb-2">San Francisco, CA 94103</p>
              <p className="mb-4">United States</p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:contact@blogfolio.com" className="hover:text-primary transition-colors">
                  contact@blogfolio.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} BlogFolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <Link href={href} className="text-muted-foreground hover:text-primary transition-colors" aria-label={label}>
      {icon}
    </Link>
  )
}
