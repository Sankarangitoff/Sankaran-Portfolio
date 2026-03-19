'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import SkillTag from '@/components/ui/SkillTag'
import type { Skills as SkillsType } from '@/types'

interface SkillsProps {
  data: SkillsType
}

export default function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="py-24 md:py-32 bg-surface/50">
      <div className="max-w-content mx-auto px-6">
        <SectionHeading title={data.heading} subtitle={data.subheading} />
        <div className="grid md:grid-cols-2 gap-6">
          {data.categories?.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills?.map((skill, j) => (
                    <SkillTag key={j} name={skill.name} isPrimary={skill.isPrimary} />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
