'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import type { About as AboutType, SiteSettings } from '@/types'

interface AboutProps {
  data: AboutType
  settings: SiteSettings
}

function renderHighlight(text: string) {
  // Split on **bold** markers and wrap matched segments in accent-colored spans
  const parts = text.split(/\*\*(.*?)\*\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-accent font-semibold">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

export default function About({ data, settings }: AboutProps) {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-content mx-auto px-6">
        <SectionHeading title={data.heading} />

        {/* Two-column row: content left, image right, equal height */}
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* LEFT: Structured content */}
          <motion.div
            className="flex-1 flex flex-col min-w-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Intro paragraph */}
            <div className="prose prose-invert prose-lg mb-6">
              {data.story?.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Core Expertise tags */}
            {data.coreTags && data.coreTags.length > 0 && (
              <div className="mb-6">
                <p className="text-xs text-accent uppercase tracking-widest font-semibold mb-3">
                  Core Expertise
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.coreTags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-accent/10 border border-accent/20 text-accent-light px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Accent bullet points */}
            {data.highlights && data.highlights.length > 0 && (
              <div className="mb-6 space-y-3">
                {data.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-accent text-sm mt-0.5 flex-shrink-0">▸</span>
                    <span className="text-text-secondary text-sm leading-relaxed">
                      {renderHighlight(highlight)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Location badge — pushed to bottom */}
            <p className="text-text-secondary text-sm mt-auto">
              📍 {data.locationBadge}
            </p>
          </motion.div>

          {/* RIGHT: Profile image — matches content height */}
          {settings.profileImage && (
            <motion.div
              className="lg:w-[40%] flex-shrink-0 flex max-h-[400px] lg:max-h-none"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.div
                className="glass p-2 rounded-2xl relative overflow-hidden group flex-1 flex"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Orange glow effect behind image */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-accent/20 via-transparent to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Image
                  src={settings.profileImage}
                  alt="Profile"
                  width={500}
                  height={500}
                  className="rounded-xl relative z-10 w-full h-full object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Full-width stat cards row */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {data.quickFacts?.map((fact, i) => (
            <Card key={i} hover={false} className="text-center p-4">
              <span className="text-2xl mb-2 block">{fact.icon}</span>
              <p className="font-bold text-accent">{fact.stat}</p>
              <p className="text-sm text-text-secondary">{fact.label}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
