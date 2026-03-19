'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SkillTagProps {
  name: string
  isPrimary?: boolean
}

export default function SkillTag({ name, isPrimary = false }: SkillTagProps) {
  return (
    <motion.span
      className={cn(
        'inline-block px-3 py-1.5 rounded-full text-sm font-mono transition-colors duration-150',
        isPrimary
          ? 'bg-accent text-white'
          : 'bg-surface text-text-secondary hover:bg-surface-hover'
      )}
      whileHover={{ scale: 1.05 }}
    >
      {name}
    </motion.span>
  )
}
