'use client'

import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export default function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 md:hidden"
        >
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={onClose} />
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute right-0 top-0 bottom-0 w-64 bg-surface p-6 flex flex-col"
          >
            <div className="flex justify-end mb-8">
              <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="space-y-4 flex-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className={`block py-2 text-lg transition-colors ${
                      activeSection === item.href.slice(1)
                        ? 'text-accent'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-border">
              <ThemeToggle />
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
