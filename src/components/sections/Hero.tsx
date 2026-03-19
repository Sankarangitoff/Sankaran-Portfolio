'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Button from '@/components/ui/Button'
import type { Hero as HeroType, SiteSettings } from '@/types'

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false })

interface HeroProps {
  data: HeroType
  settings: SiteSettings
}

export default function Hero({ data, settings }: HeroProps) {
  const [displayText, setDisplayText] = useState('')
  const fullText = data.title

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [fullText])

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <Scene />
      <div className="max-w-content mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-text-secondary mb-2">{data.greeting}</p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
            {data.name}
          </h1>
          <p className="text-2xl md:text-3xl text-text-secondary mb-4 h-10">
            {displayText}<span className="animate-pulse">|</span>
          </p>
          <p className="text-lg text-text-secondary mb-8 max-w-lg">{data.tagline}</p>
          <div className="flex flex-wrap gap-4">
            {data.ctaButtons?.map((btn, i) => (
              <Button key={i} variant={btn.style} href={btn.link}>{btn.label}</Button>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg className="w-6 h-6 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
