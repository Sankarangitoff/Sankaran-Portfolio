'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import { urlFor } from '@/lib/sanity/image'
import type { SiteSettings } from '@/types'

interface ResumeProps {
  settings: SiteSettings
}

export default function Resume({ settings }: ResumeProps) {
  const resumeUrl = settings.resumePDF?.asset?._ref
    ? `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${settings.resumePDF.asset._ref.replace('file-', '').replace('-pdf', '.pdf')}`
    : null

  return (
    <section id="resume" className="py-24 md:py-32 bg-surface/50">
      <div className="max-w-content mx-auto px-6">
        <SectionHeading
          title="Resume"
          subtitle="Download my resume to learn more about my experience and qualifications."
        />
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {resumeUrl ? (
            <>
              <div className="glass p-8 rounded-2xl">
                <svg className="w-16 h-16 text-accent mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-text-secondary text-center mb-4">
                  Sankaran_Rajendran_Resume.pdf
                </p>
                <div className="flex gap-4 justify-center">
                  <Button href={resumeUrl} variant="primary">
                    Download PDF
                  </Button>
                  <Button
                    href={resumeUrl}
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault()
                      window.open(resumeUrl, '_blank')
                    }}
                  >
                    View Online
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="glass p-8 rounded-2xl text-center">
              <svg className="w-16 h-16 text-text-tertiary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-text-secondary">
                Resume coming soon. Please check back later or contact me directly.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
