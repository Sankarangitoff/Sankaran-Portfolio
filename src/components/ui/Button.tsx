'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, href, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-accent text-white hover:bg-accent-light shadow-lg shadow-accent/20 hover:shadow-accent/40',
      secondary: 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
      ghost: 'text-text-secondary hover:text-accent hover:bg-surface',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    const Component = href ? 'a' : motion.button

    return (
      <Component
        ref={ref as any}
        href={href}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Button.displayName = 'Button'

export default Button
