'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import SkillTag from '@/components/ui/SkillTag'
import { urlFor } from '@/lib/sanity/image'
import type { Projects as ProjectsType } from '@/types'

interface ProjectsProps {
  data: ProjectsType
}

export default function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-content mx-auto px-6">
        <SectionHeading title={data.heading} subtitle={data.subheading} />
        <div className="grid lg:grid-cols-2 gap-8">
          {data.items?.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="overflow-hidden">
                {project.image && (
                  <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                    <Image
                      src={urlFor(project.image).width(600).height(300).url()}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                  </div>
                )}
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-text-secondary text-sm mb-2"><strong>Challenge:</strong> {project.challenge}</p>
                <p className="text-text-secondary text-sm mb-4"><strong>Solution:</strong> {project.solution}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack?.map((tech, j) => (
                    <SkillTag key={j} name={tech} />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {project.impacts?.map((impact, j) => (
                    <div key={j} className="text-center p-2 bg-surface rounded-lg">
                      <span className="text-lg">{impact.icon}</span>
                      <p className="text-accent font-bold">{impact.metric}</p>
                      <p className="text-xs text-text-tertiary">{impact.description}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent">GitHub →</a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent">Live Demo →</a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
