'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import { urlFor } from '@/lib/sanity/image'
import type { Testimonials as TestimonialsType } from '@/types'

interface TestimonialsProps {
  data: TestimonialsType
}

export default function Testimonials({ data }: TestimonialsProps) {
  const [current, setCurrent] = useState(0)
  const items = data.items || []

  useEffect(() => {
    if (items.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [items.length])

  if (!items.length) return null

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-surface/50">
      <div className="max-w-content mx-auto px-6">
        <SectionHeading title={data.heading} subtitle={data.subheading} />
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="text-center">
                <svg className="w-12 h-12 text-accent/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg text-text-secondary mb-6 italic">
                  "{items[current].quote}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  {items[current].avatar && (
                    <Image
                      src={urlFor(items[current].avatar).width(48).height(48).url()}
                      alt={items[current].name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  )}
                  <div className="text-left">
                    <p className="font-semibold">{items[current].name}</p>
                    <p className="text-sm text-text-tertiary">
                      {items[current].role} at {items[current].company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          {items.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? 'bg-accent' : 'bg-border hover:bg-accent/50'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
