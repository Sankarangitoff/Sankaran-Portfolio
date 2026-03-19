'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'glass p-6',
          hover && 'hover:border-accent/50 transition-colors duration-200',
          className
        )}
        whileHover={hover ? { y: -8, boxShadow: '0 20px 40px rgba(255, 107, 0, 0.1)' } : undefined}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export default Card
