'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CardProps {
  hover?: boolean
  className?: string
  children: React.ReactNode
}

export default function Card({ className, hover = true, children }: CardProps) {
  return (
    <motion.div
      className={cn(
        'glass p-6',
        hover && 'hover:border-accent/50 transition-colors duration-200',
        className
      )}
      whileHover={hover ? { y: -8, boxShadow: '0 20px 40px rgba(255, 107, 0, 0.1)' } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
