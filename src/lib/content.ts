import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import type { PortfolioContent, ContentSection } from '@/types/content'

const dataDir = path.join(process.cwd(), 'data')

const SECTIONS: ContentSection[] = [
  'siteSettings',
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'achievements',
  'testimonials',
]

export function isValidSection(section: string): section is ContentSection {
  return SECTIONS.includes(section as ContentSection)
}

export function getSection<K extends ContentSection>(section: K): PortfolioContent[K] {
  const filePath = path.join(dataDir, `${section}.json`)
  const raw = readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

export function getAllContent(): PortfolioContent {
  return {
    siteSettings: getSection('siteSettings'),
    hero: getSection('hero'),
    about: getSection('about'),
    skills: getSection('skills'),
    projects: getSection('projects'),
    experience: getSection('experience'),
    achievements: getSection('achievements'),
    testimonials: getSection('testimonials'),
  }
}

export function writeSection<K extends ContentSection>(section: K, data: PortfolioContent[K]): void {
  const filePath = path.join(dataDir, `${section}.json`)
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}
