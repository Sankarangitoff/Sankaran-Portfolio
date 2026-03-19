'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import type { Achievements as AchievementsType } from '@/types'

interface AchievementsProps {
  data: AchievementsType
}

function CountUp({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const numericTarget = parseInt(target.replace(/[^0-9]/g, '')) || 0

  useEffect(() => {
    if (isInView && numericTarget > 0) {
      const duration = 2000
      const steps = 60
      const increment = numericTarget / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= numericTarget) {
          setCount(numericTarget)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, numericTarget])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function Achievements({ data }: AchievementsProps) {
  return (
    <section id="achievements" className="py-24 md:py-32">
      <div className="max-w-content mx-auto px-6">
        <SectionHeading title={data.heading} subtitle={data.subheading} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.items?.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center h-full">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <p className="text-3xl font-bold text-accent mb-1">
                  <CountUp target={item.metric} suffix={item.metric.includes('+') ? '+' : ''} />
                </p>
                <p className="text-sm text-text-secondary">{item.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
