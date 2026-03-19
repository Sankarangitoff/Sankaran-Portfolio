'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import ThemeToggle from './ThemeToggle'
import MobileMenu from './MobileMenu'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const { activeSection, scrolled } = useScrollSpy()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'glass py-4' : 'py-6'
        )}
      >
        <nav className="max-w-content mx-auto px-6 flex items-center justify-between">
          <a href="#" className="text-xl font-bold text-accent">
            SANKARAN
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'relative py-2 text-sm transition-colors',
                    activeSection === item.href.slice(1)
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-text-secondary hover:text-text-primary"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  )
}
