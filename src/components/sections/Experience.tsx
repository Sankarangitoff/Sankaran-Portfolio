'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import { urlFor } from '@/lib/sanity/image'
import type { Experience as ExperienceType } from '@/types'

interface ExperienceProps {
  data: ExperienceType
}

export default function Experience({ data }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 md:py-32 bg-surface/50">
      <div className="max-w-content mx-auto px-6">
        <SectionHeading title={data.heading} subtitle={data.subheading} />
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {data.entries?.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                i % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-accent -translate-x-1/2 mt-6" />

              <div className={`flex-1 pl-8 md:pl-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <Card>
                  <div className="flex items-start gap-4 mb-4">
                    {entry.companyLogo && (
                      <Image
                        src={urlFor(entry.companyLogo).width(48).height(48).url()}
                        alt={entry.company}
                        width={48}
                        height={48}
                        className="rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-lg">{entry.role}</h3>
                      <p className="text-accent">{entry.company}</p>
                      <p className="text-sm text-text-tertiary">
                        {entry.startDate} - {entry.isPresent ? 'Present' : entry.endDate}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {entry.achievements?.map((achievement, j) => (
                      <li key={j} className="text-text-secondary text-sm flex items-start gap-2">
                        <span className="text-accent mt-1">▹</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
