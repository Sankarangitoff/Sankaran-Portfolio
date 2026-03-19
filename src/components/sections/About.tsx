'use client'

import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import { urlFor } from '@/lib/sanity/image'
import type { About as AboutType, SiteSettings } from '@/types'

interface AboutProps {
  data: AboutType
  settings: SiteSettings
}

export default function About({ data, settings }: AboutProps) {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-content mx-auto px-6">
        <SectionHeading title={data.heading} />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {settings.profileImage && (
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass p-2 rounded-2xl inline-block">
                <Image
                  src={urlFor(settings.profileImage).width(400).height(400).url()}
                  alt="Profile"
                  width={400}
                  height={400}
                  className="rounded-xl"
                />
              </div>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="prose prose-invert prose-lg mb-8">
              <PortableText value={data.story} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {data.quickFacts?.map((fact, i) => (
                <Card key={i} hover={false} className="text-center p-4">
                  <span className="text-2xl mb-2 block">{fact.icon}</span>
                  <p className="font-bold text-accent">{fact.stat}</p>
                  <p className="text-sm text-text-secondary">{fact.label}</p>
                </Card>
              ))}
            </div>
            <p className="text-text-secondary">📍 {data.locationBadge}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
