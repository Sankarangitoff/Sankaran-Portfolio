// Content types — replaces Sanity-specific types with plain JSON types
// Images are stored as string paths (e.g. '/uploads/profile.jpg')
// Files are stored as string paths (e.g. '/uploads/resume.pdf')
// Rich text is stored as string arrays (one string per paragraph)

export interface SiteSettings {
  siteName: string
  siteDescription: string
  profileImage?: string
  resumePDF?: string
  email: string
  phone?: string
  location: string
  availability: string
  githubUrl?: string
  linkedinUrl?: string
  showTestimonials: boolean
  showTechCredit: boolean
}

export interface Hero {
  greeting: string
  name: string
  title: string
  tagline: string
  ctaButtons: CTAButton[]
}

export interface CTAButton {
  label: string
  link: string
  style: 'primary' | 'secondary' | 'ghost'
}

export interface About {
  heading: string
  story: string[]
  coreTags: string[]
  highlights: string[]
  quickFacts: QuickFact[]
  locationBadge: string
}

export interface QuickFact {
  icon: string
  stat: string
  label: string
}

export interface Skills {
  heading: string
  subheading: string
  categories: SkillCategory[]
}

export interface SkillSubcategory {
  name: string
  skills: string[]
}

export interface SkillCategory {
  name: string
  skills: Skill[]
  subcategories?: SkillSubcategory[]
}

export interface Skill {
  name: string
  isPrimary: boolean
}

export interface Projects {
  heading: string
  subheading: string
  items: Project[]
}

export interface Project {
  title: string
  image?: string
  challenge: string
  solution: string
  techStack: string[]
  impacts: Impact[]
  githubUrl?: string
  liveUrl?: string
  order: number
}

export interface Impact {
  icon: string
  metric: string
  description: string
}

export interface Experience {
  heading: string
  subheading?: string
  entries: ExperienceEntry[]
}

export interface ExperienceEntry {
  role: string
  company: string
  companyLogo?: string
  startDate: string
  endDate?: string
  isPresent: boolean
  achievements: string[]
  order: number
  techStack?: string[]
  stats?: { label: string; value: number }[]
  xp?: number
}

export interface Achievements {
  heading: string
  subheading: string
  items: Achievement[]
}

export interface Achievement {
  icon: string
  metric: string
  label: string
  description: string
  size: 'small' | 'medium' | 'large'
}

export interface Testimonials {
  heading: string
  subheading: string
  items: Testimonial[]
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  avatar?: string
}

export interface PortfolioContent {
  siteSettings: SiteSettings
  hero: Hero
  about: About
  skills: Skills
  projects: Projects
  experience: Experience
  achievements: Achievements
  testimonials: Testimonials
}

export type ContentSection = keyof PortfolioContent
