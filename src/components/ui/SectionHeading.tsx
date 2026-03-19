'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <motion.div
      className={cn('text-center mb-16', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  )
}
